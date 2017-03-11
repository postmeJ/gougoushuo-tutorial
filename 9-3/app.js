'use strict'

var fs = require('fs')
var path = require('path')
var mongoose = require('mongoose')
var db = 'mongodb://localhost/imooc-App'

mongoose.Promise = require('bluebird')
mongoose.connect(db)

var models_path = path.join(__dirname, '/app/models')

var walk = function(modelPath) {
  fs
    .readdirSync(modelPath)
    .forEach(function(file) {
      var filePath = path.join(modelPath, '/' + file)
      var stat = fs.statSync(filePath)

      if (stat.isFile()) {
        if (/(.*)\.(js|coffee)/.test(file)) {
          require(filePath)
        }
      }
      else if (stat.isDirectory()) {
        walk(filePath)
      }
    })
}
walk(models_path)


var koa = require('koa')
var logger = require('koa-logger')
var session = require('koa-session')
var bodyParser = require('koa-bodyparser')
var app = koa()

app.keys = ['imooc'] // koa-session的cookie的加密的key，建议设置复杂点
app.use(logger())
app.use(session(app))
app.use(bodyParser())

//实际过程中当然不会这样去写，我们会用router这个模块

// app.use(function *(next){
//     console.log(this.href)
//     console.log(this.method)
//     this.body = {
//         success: true
//     }
//     yield next
// })

var router = require('./config/routes')()

// 固定用法，不用纠结
// 查看readme文件
app
    .use(router.routes())
    .use(router.allowedMethods())


app.listen(1234)
console.log('listening: 1234')