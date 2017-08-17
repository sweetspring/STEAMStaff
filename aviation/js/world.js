function World( previousState, wtype) {
   this.livings = previousState ? this.fromState(previousState): this.empty();
   this.candidatecount = 4;
  //this.pos = new Array([ 150, -80 ], [ -130, 80 ], [ -180, -80 ]); 
  this.gridindes = new Array(0,1,2,3);
  //this.candidates = previousState ? this.fromStateC(previousState,wtype) : this.emptyC(wtype);
  this.candidatesgrid = previousState ? this.fromStateC(previousState,wtype) : this.emptyC(wtype);
  this.livingscount = 9;
}
 
World.prototype.emptyC = function (wtype) {
	 this.theone = 0;
	return this.getOneSet(wtype);
};

World.prototype.fromStateC = function (state,wtype) {
	if(state.world.candidatesgrid == null){
		this.emptyC(wtype);
	}
	else{
		  this.theone =   state.world.theone;
 		return state.world.candidatesgrid;
	}
};
World.prototype.fromState = function (state) {
		if(state.world.livings == null){
			return  this.empty();
		}
		else{
			return state.world.livings;
		}
}
 
World.prototype.empty = function () {
 			return   {
			 				0:new Array("LDS",
"CAN",
"CGO",
"CGQ",
"CHW",
"CIF",
"CKG",
"CSX",
"CTU",
"DLC",
"ENY",
"FOC",
"HAK",
"HET",
"HFE",
"HGH",
"HMI",
"HRB",
"HTN",
"HYN",
"INC",
"KHG",
"KHN",
"KMG",
"KOW",
"KWE",
"KWL",
"LXA",
"NDG",
"NKG",
"NNG",
"PEK",
"PVG",
"SHA",
"SHE",
"SWA",
"SYX",
"SZX",
"TAO",
"TNA",
"TSN",
"TXN",
"TYN",
"URC",
"WUH",
"XIY",
"XMN",
"XNN",
"YIN",
"YNT",
"ZGC",
"ZHA",
"JNG",
"CIF",
"HKG"),
				1:new Array("XXXX",
"ZGGG",
"ZHCC",
"ZYCC",
"ZLJQ",
"ZBCF",
"ZUCK",
"ZGHA",
"ZUUU",
"ZYTL",
"ZLYA",
"ZSFZ",
"ZJHK",
"ZBHH",
"ZSOF",
"ZSHC",
"ZWHM",
"ZYHB",
"ZWTN",
"ZSLQ",
"ZLIC",
"ZWSH",
"ZSCN",
"ZPPP",
"ZSGZ",
"ZUGY",
"ZGKL",
"ZULS",
"ZYQQ",
"ZSNJ",
"ZGNN",
"ZBAA",
"ZSPD",
"ZSSS",
"ZYTX",
"ZGOW",
"ZJSY",
"ZGSZ",
"ZSQD",
"ZSJN",
"ZBTJ",
"ZSTX",
"ZBYN",
"ZWWW",
"ZHHH",
"ZLXY",
"ZSAM",
"ZLXN",
"ZWYN",
"ZSYT",
"ZLLL",
"ZGZJ",
"ZSJG",
"ZBCF",
"VHHH"),
				2:new Array(
					"伊春(林都) 机场",
"广州白云国际机场",
"郑州新郑国际机场",
"长春大房身机场",
"酒泉机场",
"赤峰土城子机场",
"重庆江北国际机场",
"长沙黄花国际机场",
"成都双流国际机场",
"大连周水子国际机场",
"延安二十里堡机场",
"福州长乐国际机场",
"美兰国际机场",
"呼和浩特据白塔机场",
"合肥骆岗机场",
"萧山国际机场",
"哈密机场",
"哈尔滨太平国际机场(阎家岗机场)",
"和田机场",
"台州路桥机场(黄岩路桥机场)",
"银川河东机场",
"喀什机场",
"南昌昌北机场",
"昆明巫家坝国际机场",
"赣州黄金机场",
"贵阳龙洞堡机场",
"桂林两江国际机场",
"拉萨贡嘎机场",
"齐齐哈尔三家子机场",
"南京禄口国际机场",
"南宁吴墟机场(吴圩机场)",
"北京首都国际机场",
"上海浦东国际机场",
"上海虹桥机场",
"沈阳桃仙国际机场",
"汕头外砂机场",
"三亚凤凰机场",
"深圳宝安国际机场",
"青岛流亭机场",
"济南遥墙机场",
"天津滨海国际机场",
"黄山屯溪机场",
"太原武宿机场",
"乌鲁木齐地窝堡国际机场",
"武汉天河机场",
"咸阳国际机场",
"厦门高崎国际机场",
"西宁曹家堡机场",
"伊宁机场",
"烟台莱山机场",
"兰州中川机场",
"湛江机场",
"济宁嘉祥机场(曲阜机场）",
"赤峰玉龙机场",
"香港国际机场(赤鱲角机场)"),
				3:new Array("apple", "apricot", "banana", "cherry", "grape",
							"hawthorn", "kiwi", "lemon", "mango", "orange", "pamegranate",
							"pomelo", "peach", "pear", "pineapple", "strawberry", "watermelon","mandarin_orange",
"coconut","blueberry") ,
												4:new Array("apple", "apricot", "banana", "cherry", "grape",
							"hawthorn", "kiwi", "lemon", "mango", "orange", "pamegranate",
							"pomelo", "peach", "pear", "pineapple", "strawberry", "watermelon","mandarin_orange",
"coconut","blueberry") 
			};
}

World.prototype.pickupOther = function (selected,wtype) {
	var max = this.livings[wtype].length;
	var option1 = Math.floor(Math.random() * (max - 1));
	var option2 = Math.floor(Math.random() * (max - 2));
	var option3 = Math.floor(Math.random() * (max - 3));

	var list = new Array(max);
	var a, b,c;
	for (var i = 0; i < max; i++) {
		list[i] = i;
	}

	list[selected] = list[max - 1];
	a = list[option1];
	list[option1] = list[max - 2];
	b = list[option2];
	list[option2] = list[max - 3];
	c = list[option3];
	return [ selected,a, b, c];
}
// Save all pic positions and the index of the one
World.prototype.getOneSet = function (wtype) {	
	this.theone = Math.floor(Math.random() * this.livings[wtype].length);
	var myoptions = this.pickupOther(this.theone,wtype);
	var pics = [];
	this.gridindes = this.shuffle([0,1,2,3]);
	for (var i = 0; i < this.candidatecount; i++) {
		pics[i] = new CandidateGrid(this.gridindes[i], myoptions[i]);
	}
	return pics;
};
World.prototype.serialize = function (wtype) {

  this.candidatesgrid = this.getOneSet(wtype);
  return {
	livingscount: this.livingscount,
	livings: this.livings,
	theone:this.theone,
    candidatesgrid: this.candidatesgrid
  };
};
 
 
World.prototype.shuffle =function(inputArr) {
    var valArr = [],k = ''; 

    for (k in inputArr) { // Get key and value arrays
      if (inputArr.hasOwnProperty(k)) {
        valArr.push(inputArr[k]);
      }
    }
    valArr.sort(function () {
      return 0.5 - Math.random();
    });

    return valArr;
}