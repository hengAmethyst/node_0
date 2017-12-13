/**
 *个人信息 
 */
//连接mongodb数据库
const Koa = require('koa')
const app = new Koa()
const Monk = require('monk')
const db = new Monk('localhost/order')//链接到库
const user = db.get('user')//表
const checkoutParam = require('../middleware/checkoutParam')
const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer()
const fs = require('fs')

module.exports = {
	//会员注册
  async register (ctx) {
  	//需要校验的参数
  	var param = {
  		openId:'',
  		phone:''
  	}
  	//参数校验
	if(!checkoutParam(ctx,param)){
		return new Promise(resolve => {
			ctx.body = {
	  			code:1,
	  			msg:'参数错误'
			}
			resolve()
		})
	}
  	//查询看数据库里是否有该用户
	let tempData = null
	await user.find({openId:ctx.request.body.openId}).then(data => {
		tempData = data
	})
	if(tempData.length>0){
		ctx.body = {
  			code:5005,
  			msg:'该用户已经是会员'
		}
	}
	else{
		user.insert(ctx.request.body)
		ctx.body = {
	      data: ctx.request.body,
	      code: 0,
	      msg:'成功'
	    }
	}
  },
  //用户信息查询
  async queryById (ctx) {
  	let tempData = null
	await user.find({openId:ctx.request.body.openId}).then(data => {
		tempData = data
	})
	//是会员
	if(tempData.length>0){
		ctx.body = {
			data: tempData[0],
			code:0,
			msg:'查询成功'
		}
	}
	else{
		ctx.body = {
			msg:'该用户不是会员',
			code:1
		}
	}
  },
  //修改会员信息
  async rewriteUserInfo (ctx) {
  	//校验参数
  	let tempData = null
	await user.find({phone:ctx.request.body.phone}).then(data => {
		tempData = data
	})
	//是会员
	if(tempData.length>0){
		await user.find({phone:ctx.request.body.phone}).then(() => {
			user.insert(ctx.request.body)
		})
		ctx.body = {
			code:0,
			msg:'修改成功'
		}
	}
	else{
		ctx.body = {
			msg:'该用户不是会员',
			code:1
		}
	}
  }
}