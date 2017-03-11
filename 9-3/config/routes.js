'use strict'

var Router = require('koa-router')
var User = require('../app/controllers/user')
var App = require('../app/controllers/app')

module.exports = function(){
    var router = new Router({
        prefix: '/api/1'
    })

// 一般来说，一个路由对应一个控制器
    router.get('/u/signup', User.signup)
    router.get('/u/verify', User.verify)
    router.get('/u/update', User.update)
    router.get('/u/signature', App.signature)

    return router
}