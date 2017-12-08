/**
 *路由配置 
 */
const Router = require('koa-router')
const router = new Router()
const user = require('./controller/user')
//注册
router.post('/user/register', user.register)
module.exports = router