module.exports = function(ctx,param){
	let paramList = new Array()
	for(let key in param){
		paramList.push(key)
	}
	let reqList = new Array()
	for(let key in ctx.request.body){
		reqList.push(key)
	}
	//对比判断
	let index = null
	let indexList = []
	for(let i=0;i<paramList.length;i++){
		index = false
		for(let j=0;j<reqList.length;j++){
			if(paramList[i] == reqList[j]){
				index = true
				break
			}
		}
		indexList.push(index)
	}
	let isRight = true
	for(let value of indexList){
		if(!value){
			isRight = false
			break
		}
	}
	//参数正确
	if(isRight){
		return true
	}
	//参数错误
	else{
		return false
	}
}
