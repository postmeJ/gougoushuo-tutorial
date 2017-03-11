'use strict'

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