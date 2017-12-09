/**
 *个人信息 
 */
//连接mongodb数据库
const Monk = require('monk')
const db = new Monk('localhost/order')//链接到库
const user = db.get('user')//表

module.exports = {
	//会员注册
  async register (ctx) {
	let tempData = null
	await user.find({phone:ctx.request.body.openId}).then(data => {
		tempData = data
	})
	if(tempData.length>0){
		ctx.body = {
			data:{
	  			code:1,
	  			msg:'该用户已经是会员'
			}
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
  }
}