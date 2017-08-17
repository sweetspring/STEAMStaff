function KeyboardInputManager() {
	this.events = {};

	if (window.navigator.msPointerEnabled) {
		// Internet Explorer 10 style
		this.eventTouchstart = "MSPointerDown";
		this.eventTouchmove = "MSPointerMove";
		this.eventTouchend = "MSPointerUp";
	} else {
		this.eventTouchstart = "touchstart";
		this.eventTouchmove = "touchmove";
		this.eventTouchend = "touchend";
	}

	this.eventMouseUp = "mouseup";

	this.listen();
}

KeyboardInputManager.prototype.on = function(event, callback) {
	if (!this.events[event]) {
		this.events[event] = [];
	}
	this.events[event].push(callback);
};

KeyboardInputManager.prototype.emit = function(event, data) {
	var callbacks = this.events[event];
	if (callbacks) {
		callbacks.forEach(function(callback) {
			callback(data);
		});
	}
};

KeyboardInputManager.prototype.listen = function() {
	var self = this;
	// Respond to button presses
	this.bindButtonPress(".retry-button", this.restart);
	this.bindButtonPress(".restart-button", this.restart);
	this.bindButtonPress(".keep-playing-button", this.keepPlaying);
 
	// Respond to swipe events
	var touchStartClientX, touchStartClientY;
	// var gameContainer = document.getElementsByClassName("game-container")[0];
	var divContainer = document.getElementById("grids");
 	if (self.checkMobile() == false) {
		divContainer.addEventListener(this.eventMouseUp, function(e) {
				self.emit("mouseup", e.target.id);
		});		 
	} else {
		 	 divContainer
				.addEventListener(
						this.eventTouchend,
						function(event) {
							if ((!window.navigator.msPointerEnabled && event.touches.length > 0)
									|| event.targetTouches > 0
									|| self.targetIsInput(event)) {
								return;  
							}
							 //alert(event.target.id);
 							 self.emit("touchend",  event.target.id);
							 

							event.preventDefault();

						}); 
	}

	divContainer.addEventListener(this.eventTouchstart, function(event) {
		event.preventDefault();
	});

	divContainer.addEventListener(this.eventTouchmove, function(event) {
		event.preventDefault();
	});
	 
}

KeyboardInputManager.prototype.restart = function(event) {
	event.preventDefault();
	this.emit("restart");
};

KeyboardInputManager.prototype.keepPlaying = function(event) {
	event.preventDefault();
	this.emit("keepPlaying");
};

KeyboardInputManager.prototype.bindButtonPress = function(selector, fn) {
	var button = document.querySelector(selector);
	button.addEventListener("mouseup", fn.bind(this));
	// button.addEventListener(this.eventTouchend, fn.bind(this));
};

KeyboardInputManager.prototype.targetIsInput = function(event) {
	return event.target.tagName.toLowerCase() === "input";
};

KeyboardInputManager.prototype.isPC = function() {
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid
			|| bIsCE || bIsWM) {
 		return false;
	} else {
 		return true;
	}
}
KeyboardInputManager.prototype.checkMobile = function() {

/*
 * 智能机浏览器版本信息:
 * 
 */
  var browser={
    versions:function(){ 
           var u = navigator.userAgent, app = navigator.appVersion; 
           return {// 移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, // IE内核
                presto: u.indexOf('Presto') > -1, // opera内核
                webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
                //mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), // 是否为移动终端
				mobile: u.indexOf('Mobile') > -1,
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, // 是否iPad
                webApp: u.indexOf('Safari') == -1 // 是否web应该程序，没有头部与底部
            };
         }(),
         language:(navigator.browserLanguage || navigator.language).toLowerCase()
} 
/*
 * document.writeln("语言版本: "+browser.language); document.writeln(" 是否为移动终端:
 * "+browser.versions.mobile); document.writeln(" ios终端:
 * "+browser.versions.ios); document.writeln(" android终端:
 * "+browser.versions.android); document.writeln(" 是否为iPhone:
 * "+browser.versions.iPhone); document.writeln(" 是否iPad:
 * "+browser.versions.iPad); document.writeln(navigator.userAgent);
 */
 // alert(browser.versions.mobile);

return browser.versions.mobile;
}