function Runnings(previousState) {

  this.runinfos =   previousState ?  this.fromState(previousState) : this.empty();
  this.maxpass = 4;
  
}
 
Runnings.prototype.empty = function ()  {
	this.nextrun = 1;
 	return {
	 /*	0: {score:0,win:"Welcome to the English World",fail:"不要紧，万事开头难，再来"},
		1: {score:2,win:"1st pass",fail:"是色弱还是不认识单词？找朋友帮忙吧"},
		2: {score:5,win:"2nd pass",fail:"英语中从“千”开始采用 1000 为跳级单位"},
		3: {score:10,win:"3rd pass",fail:"周末该去动物园溜达溜达了"},
		4: {score:20,win:"4th pass",fail:"快到门口水果摊看看吧"},
		5: {score:30,win:"5th pass",fail:"多亲近大自然，有空去郊外看看吧"},
		6: {score:40,win:"6th pass",fail:"和妈妈一起去菜场看看吧"},
		7: {score:50,win:"7th pass",fail:"有些交通工具还没有坐过吧？"},
		8: {score:60,win:"8th pass",fail:"把家里的物品贴上英文标签如何呢？"},
		9: {score:100,win:"8th pass",fail:"还是起来做个运动吧，反正又不限时间"},
				10: {score:300,win:"8th pass",fail:"哈哈哈，加油，这一关单词是长了点"},
	*/
			0: {score:0,win:"IATA->Airport PASS",fail:"不要紧，万事开头难，再来"},
		1: {score:60,win:"ICAO->Airport pass",fail:"哈哈哈，加油，有空多玩玩"},
		2: {score:120,win:"Airport->IATA pass",fail:"没关系，再来"},
		3: {score:180,win:"Airport->ICAO pass",fail:"ICAO是比较难背啦，加油"} 
	};
}
Runnings.prototype.fromState = function (state) {
	if(state.runinfos == null){
 		return this.empty();
	}
	else{
		this.nextrun = state.nextrun;
		return state.runinfos;
	}
}
Runnings.prototype.getcurrentRun =   function (score) {
	var currentrun = this.nextrun;
	for(var i = this.nextrun ; i < this.maxpass; i ++){
		if(score >= this.runinfos[i].score){
			this.nextrun ++;
			break;
		}
	}
	if((this.nextrun - currentrun) == 1){
		return true;
	}
	else {
		return false;
	}
}
Runnings.prototype.serialize = function () {
	return {
		runinfos:this.runinfos,
		nextrun:this.nextrun
	};
}