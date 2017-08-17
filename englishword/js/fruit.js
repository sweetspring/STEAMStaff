var fruits = new Array("apple", "apricot", "banana", "cherry", "grape",
		"hawthorn", "kiwi", "lemon", "mango", "orange", "pamegranate",
		"pomelo", "peach", "pear", "pineapple", "strawberry", "watermelon");

function rotateImgDegree(ctx, img, degree) {
	var height = img.height;
	var width = img.width;
	ctx.rotate(degree * Math.PI / 180);

	// ctx.drawImage(img, -width/2,-height/2);
	ctx.drawImage(img, -width / 2, -height / 2);
}

function pickupOther(selected) {
	var max = fruits.length;
	var option1 = Math.floor(Math.random() * (max - 1));
	var option2 = Math.floor(Math.random() * (max - 2));
	var list = new Array(max);
	var a, b;
	for (var i = 0; i < max; i++) {
		list[i] = i;
	}

	list[selected] = list[max - 1];
	a = list[option1];
	list[option1] = list[max - 2];
	b = list[option2];
	// alert(selected + " " +a+" " +b);
	return [ a, b ];
}

function message(won) {
	var type = won ? "game-won" : "game-over";
	var message = won ? "You win!" : "Game over!";
	messageContainer = document.querySelector(".game-message");
	if (typeof ga !== "undefined") {
		ga("send", "event", "game", "end", type, this.score);
	}

	messageContainer.classList.add(type);
	messageContainer.getElementsByTagName("p")[0].textContent = message;

};
function Init() {
	/*
	 * document.addEventListener("touchstart", touchHandler, true);
	 * document.addEventListener("touchmove", touchHandler, true);
	 * document.addEventListener("touchend", touchHandler, true);
	 * document.addEventListener("touchcancel", touchHandler, true);
	 */
	score = 0;
	if (window.localStorage) {
		best = localStorage.getItem("fruitbest");
		if (best == null) {
			best = 0;
		}
	} else {
		alert("浏览暂不支持localStorage");
	}
	document.querySelector(".best-container").innerHTML = best;
	document.getElementById("score").innerHTML = score;
	messageContainer = document.querySelector(".game-message");

	messageContainer.classList.remove("game-won");
	messageContainer.classList.remove("game-over");

	getOneSet();
}
function getpoint3() {
	pos[0][0] = cw / 2 + Math.floor(Math.random() * (cw / 2 - width));
	pos[0][1] = ch / 2 + Math.floor(Math.random() * (ch / 2 - height));
	pos[1][0] = Math.floor(Math.random() * (cw / 2 - width));
	pos[1][1] = ch / 2 + Math.floor(Math.random() * (ch / 2 - height));
	pos[2][0] = Math.floor(Math.random() * (cw - pos[0][0]));
	pos[2][1] = Math.floor(Math.random() * (ch / 2 - height));
	shiftarray();
}
function shiftarray() {
	var offset = Math.floor(Math.random() * 3);
	var tempx = pos[0][0];
	var tempy = pos[0][1];
	if (offset == 1) {
		pos[0][0] = pos[1][0];
		pos[0][1] = pos[1][1];
		pos[1][0] = pos[2][0];
		pos[1][1] = pos[2][1];
		pos[2][0] = tempx;
		pos[2][1] = tempy;
	} else if (offset == 2) {
		pos[0][0] = pos[2][0];
		pos[0][1] = pos[2][1];
		pos[2][0] = pos[1][0];
		pos[2][1] = pos[1][1];
		pos[1][0] = tempx;
		pos[1][1] = tempy;
	}
}
function getOneSet() {
	myctx.clearRect(0, 0, cw, ch);
	theone = Math.floor(Math.random() * fruits.length);
	var myimg = document.getElementById(fruits[theone]);
	document.getElementById("mycmd").innerHTML = "选择:" + fruits[theone];
	var myoptions = pickupOther(theone);
	var myimgoption1 = document.getElementById(fruits[myoptions[0]]);
	var myimgoption2 = document.getElementById(fruits[myoptions[1]]);
	// rotateImgDegree(myctx,myimg, degree1);
	getpoint3();
	myctx.drawImage(myimg, pos[0][0], pos[0][1]);
	myctx.drawImage(myimgoption1, pos[1][0], pos[1][1]);
	myctx.drawImage(myimgoption2, pos[2][0], pos[2][1]);
}

function doMouseUp(e) {

	var point = getPointOnCanvas(c, e.pageX, e.pageY);

	checkMrRight(point.x, point.y);
}
function getPointOnCanvas(canvas, x, y) {
	var bbox = canvas.getBoundingClientRect();

	return {
		x : x - bbox.left * (canvas.width / bbox.width),

		y : y - bbox.top * (canvas.height / bbox.height)

	};

}
function checkMrRight(posx, posy) {
	var posindex = -1;
	for (var i = 0; i < pos.length; i++) {
		if (posx > pos[i][0] && posx < (pos[i][0] + width) && posy > pos[i][1]
				&& posy < (pos[i][1] + height)) {

			posindex = i;
			break;
		}
	}

	if (posindex == 0) {

		score++;
		document.getElementById("score").innerHTML = score;
		if (score > firstmilescore) {
			message(true);
		} else {
			getOneSet();
		}

	} else {
		message(false);
	}
}

function touchEnd(event) {
	var touchEndClientX, touchEndClientY;

	if (window.navigator.msPointerEnabled) {
		touchEndClientX = event.pageX;
		touchEndClientY = event.pageY;
	} else {
		touchEndClientX = event.changedTouches[0].clientX;
		touchEndClientY = event.changedTouches[0].clientY;
	}
	var point = getPointOnCanvas(c, touchEndClientX, touchEndClientY);
	checkMrRight(point.x, point.y);
}

function updateBest() {
	thisrunbest = thisrunbest + score;

	var vbest = parseInt(document.querySelector(".best-container").innerHTML);
	if (thisrunbest > vbest) {
		document.querySelector(".best-container").innerHTML = thisrunbest;
	}
	if (window.localStorage) {
		localStorage.setItem("fruitbest", thisrunbest);
	} else {
		alert("浏览暂不支持localStorage");
	}
}
function PassOne() {
	isContinue = 1;
	updateBest();


	Init();
}
function Fail() {
	if (isContinue == 1) {
		updateBest();
	}
	thisrunbest = 0;
	isContinue = 0;
	Init();
}

function load() {

	document.addEventListener('touchstart', touch, false);
	document.addEventListener('touchmove', touch, false);
	document.addEventListener('touchend', touch, false);

	function touch(event) {
		var event = event || window.event;
		var x, y;
		var d = event.target ? event.target : event.srcElement;
		var obj;

		switch (event.type) {
		case "touchstart":
			if (d.id == "content1") {
				event.preventDefault();

			}
			break;
		case "touchend":
			if (d.id == "content1") {

				var touchEndClientX, touchEndClientY;

				if (window.navigator.msPointerEnabled) {
					touchEndClientX = event.pageX;
					touchEndClientY = event.pageY;
				} else {
					touchEndClientX = event.changedTouches[0].clientX;
					touchEndClientY = event.changedTouches[0].clientY;
				}
				var point = getPointOnCanvas(c, touchEndClientX,
						touchEndClientY);
				checkMrRight(point.x, point.y);
			}
			break;
		case "touchmove":
			if (d.id == "content1") {
				event.preventDefault();

			}
			break;
		}
	}
}

function touchHandler(event) {
	var touches = event.changedTouches, first = touches[0], type = "";
	switch (event.type) {
	case "touchstart":
		type = "mousedown";
		break;
	case "touchmove":
		type = "mousemove";
		break;
	case "touchend":
		type = "mouseup";
		break;
	default:
		return;
	}

	var simulatedEvent = document.createEvent("MouseEvent");
	simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX,
			first.screenY, first.clientX, first.clientY, false, false, false,
			false, 0/* left */, null);
	first.target.dispatchEvent(simulatedEvent);
	// event.preventDefault();
}
