/**
 *路由配置 
 */
const Router = require('koa-router')
const router = new Router()
const user = require('./controller/user')
const merchant = require('./controller/merchant')
const order = require('./controller/order')

//注册
router.post('/user/register', user.register)
//查询会员信息
router.post('/user/queryById', user.queryById)
//商品信息
router.post('/merchant/merchantInfo', merchant.merchantInfo)
//必选项
router.post('/merchant/merchantMustChoose', merchant.merchantMustChoose)
//菜品种类
router.post('/merchant/dishesCates', merchant.dishesCates)
//菜品列表
router.post('/merchant/dishesList', merchant.dishesList)
//下单
router.post('/order/submitOrder', order.submitOrder)
//查询订单列表
router.post('/order/searchOrder', order.searchOrder)
//口味列表
router.post('/merchant/flavorList', merchant.flavorList)
//充值卡
router.post('/merchant/storeCard',merchant.storeCard)
//店铺基础信息
router.post('/merchant/merchantBasicInfo',merchant.merchantBasicInfo)

module.exports = router
