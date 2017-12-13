const Koa = require('koa')
const app = new Koa()
const Monk = require('monk')
const db = new Monk('localhost/order')//链接到库
const merchant = db.get('merchant')//表
const merchantMust = db.get('merchantMust')
const dishesCates = db.get('dishesCates')
const dishesList = db.get('dishesList')
const flavorList = db.get('flavorList')

module.exports = {
	// 商品信息
	async merchantInfo(ctx) {
		await merchant.find({merchantId:ctx.request.body.merchantId}).then(data => {
			ctx.body = {
		      data: data[0],
		      code: 0,
		      msg:'成功'
		    }
		})
	},
	//商品必选项
	async merchantMustChoose(ctx){
		await merchantMust.find({merchantId:ctx.request.body.merchantId}).then(data => {
			ctx.body = {
		      data: data[0],
		      code: 0,
		      msg:'成功'
		    }
		}) 
	},
	//菜品种类
	async dishesCates(ctx){
		await dishesCates.find({merchantId:ctx.request.body.merchantId}).then(data => {
			ctx.body = {
		      data: data,
		      code: 0,
		      msg:'成功'
		    }
		}) 
	},
	//菜品列表
	async dishesList(ctx){
		await dishesList.find({merchantId:ctx.request.body.merchantId}).then(data => {
			ctx.body = {
		      data: data,
		      code: 0,
		      msg:'成功'
		    }
		}) 
	},
	//口味设置
	async flavorList(ctx){
		await flavorList.find({merchantId:ctx.request.body.merchantId}).then(data => {
			ctx.body = {
		      data: data,
		      code: 0,
		      msg:'成功'
		    }
		})
	}
}
