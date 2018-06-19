/*
 * 项目启动文件
 */
const Koa = require('koa')
//文件读取
const fs = require('fs')
const app = new Koa()
//解析post参数
const bodyParser = require('koa-bodyparser')
//路由
const router = require('./router')
//解决跨域问题
const cors = require('koa2-cors')

app.use(cors())
app.use(bodyParser())
//加载路由
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)
console.log('port run at 3000')
//@@@@@@