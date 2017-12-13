const Koa = require('koa')
const app = new Koa()
const Monk = require('monk')
const db = new Monk('localhost/order')//链接到库
const order = db.get('order')//表
const checkoutParam = require('../middleware/checkoutParam')

module.exports = {
	//提交订单
	async submitOrder(ctx){
		let data = {}
		let amountPrice = 0
		let memberAmount = 0
		//计算总价
		for(let i=0;i<ctx.request.body.snackOrderDishes.length;i++){
			amountPrice += Number(ctx.request.body.snackOrderDishes[i].dishesPrice) +  Number(ctx.request.body.snackOrderDishes[i].cuisinePrice)
			memberAmount += Number(ctx.request.body.snackOrderDishes[i].memberPrice)
		}
		ctx.request.body.orderTotalAmount = amountPrice
		ctx.request.body.memberAmount = memberAmount
		ctx.request.body.createTime = new Date().getTime()
		data.order = ctx.request.body
		//订单插入数据库
		order.insert(data)
		ctx.body = {
			data:data
		}
	},
	//查询订单
	async searchOrder(ctx){
		let temp = await order.find({'order.openId':ctx.request.body.openId})
		let newArry = []
		for(let value of temp){
			newArry.push(value.order)
		}
		ctx.body = {data:{orderList:newArry}}
	}
}