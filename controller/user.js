/**
 *个人信息 
 */
//连接mongodb数据库
const Monk = require('monk')
const db = new Monk('localhost/order')//链接到库
const user = db.get('user')//表

module.exports = {
  async register (ctx) {
  	let tempData = null
  	
  	if(true){
  		user.find({param:{phone: '12321321398'}}).then(data => {
//		console.log('xxx',ctx.request.body.param)
//		tempData = data
		console.log(data)
  	})
  		ctx.body = {
  			data:{
	  			code:1,
	  			msg:'该用户已经是会员'
  			}
  		}
  	}
  	else{
  	user.find({phone:'12321321398'}).then(data => {
//		console.log('xxx',ctx.request.body.param)
//		tempData = data
		console.log(data)
  	})

  		user.insert(ctx.request.body)
  		ctx.body = {
	      data: ctx.request.body,
	      code: 0,
	      msg:'成功'
	    }
  	}
  }
}