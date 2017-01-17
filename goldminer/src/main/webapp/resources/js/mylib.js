/**
 * Main library
 */
var EPG = {
	isPlaying : true,

	goldList : [],

	stoneList : [],

	coinbag : null,

	hookImg : null,

	lineImg : null,

	hookDegreeDir : 1,

	hookLengthDir : 1,

	hookTurnTimer : null,

	hookCatchTimer : null,

	setHookTurnTimer : function(level) {
		EPG.clearHookTurnTimer();
		EPG.hookTurnTimer = setInterval(function() {
			EPG.turnHook();
		}, HOOK_TURN_SPEED);
	},

	clearHookTurnTimer : function() {
		if (null != EPG.hookTurnTimer) {
			clearInterval(EPG.hookTurnTimer);
		}
	},

	setHookCatchTimer : function(level) {
		EPG.clearHookCatchTimer();
		EPG.hookCatchTimer = setInterval(function() {
			EPG.moveHook();
		}, HOOK_CATCH_SPEED);
	},

	clearHookCatchTimer : function() {
		if (null != EPG.hookCatchTimer) {
			clearInterval(EPG.hookCatchTimer);
		}
	},

	turnHook : function() {
		if (EPG.getHookDegree() >= 77 || EPG.getHookDegree() <= -77) {
			EPG.hookDegreeDir = 0 - EPG.hookDegreeDir;
		}
		if (EPG.getHookDegree() == 1) {
		}
		EPG.setHookDegree(EPG.getHookDegree() + EPG.hookDegreeDir);
	},

	moveHook : function() {
		var hookImg = EPG.hookImg;
		var lineImg = EPG.lineImg;
		var degree = EPG.getHookDegree();
		var y = parseInt(hookImg.style["transform-origin"].match(/[-+]?\d+/g)[1], 10);
		if (EPG.isHookBack()) {
			EPG.hookLengthDir = 1;
			EPG.clearHookCatchTimer();
			EPG.setHookTurnTimer();
			return;
		} else if (EPG.isHookTouchBoundary()) {
			EPG.hookLengthDir = -1;
		}
		hookImg.style.top = EPG.getHookTop() + 5 * EPG.hookLengthDir;
		lineImg.style.height = EPG.getLineLength() + 5 * EPG.hookLengthDir;
		y -= 5 * EPG.hookLengthDir;
		hookImg.style["transform-origin"] = "18px " + y + "px 0px";
	},

	catchItem : function() {
		EPG.clearHookTurnTimer();
		EPG.setHookCatchTimer();
	},

	isHookBack : function() {
		if (EPG.getHookTop() == 0 && EPG.hookLengthDir == -1) {
			return true;
		} else {
			return false;
		}
	},

	isHookTouchBoundary : function() {
		var hookImg = EPG.hookImg;
		var degree = EPG.getHookDegree();
		var bottomLeftTop = EPG.getHookTop() + 21 - (EPG.getHookTop() + 25) * Math.cos(degree * Math.PI / 180);
		var bottomLeftLeft = EPG.getHookLeft() - (EPG.getHookTop() + 25) * Math.sin(degree * Math.PI / 180);
		var bottomRightTop = EPG.getHookTop() + 21 - (EPG.getHookTop() + 25) * Math.cos(degree * Math.PI / 180);
		var bottomRightLeft = EPG.getHookLeft() + 36 - (EPG.getHookTop() + 25) * Math.sin(degree * Math.PI / 180);
		if (bottomLeftTop > 430 || bottomRightTop > 430 || bottomLeftLeft < 0 || bottomRightLeft > 640) {
			return true;
		} else {
			return false;
		}
	},

	createImg : function(imageName, percent, top, left, width, height) {
		var image = document.createElement("img");
		image.src = EPG.getContextPath() + "/resources/images/" + imageName + ".png";
		image.style.position = "absolute";
		image.style.top = top + "px";
		image.style.left = left + "px";
		if (percent == null) {
			image.style.width = width;
			image.style.height = height;
		} else {
			image.style.width = parseInt(image.width * percent, 10);
			image.style.height = parseInt(image.height * percent, 10);
		}
		return image;
	},

	createHook : function() {
		// Create hook image
		var hookImg = EPG.createImg("hook", null, 0, 305, 36, 21);
		hookImg.style.transform = "rotate(0deg)";
		hookImg.style["transform-origin"] = "18px -25px 0px";
		EPG.getElement("hookboard").appendChild(hookImg);
		EPG.hookImg = hookImg;

		// Create line image
		var lineImg = EPG.createImg("line", null, -26, 322, 1, 600);
		lineImg.style.height = 26;
		lineImg.style.transform = "rotate(0deg)";
		lineImg.style["transform-origin"] = "0px 0px 0px";
		EPG.getElement("hookboard").appendChild(lineImg);
		EPG.lineImg = lineImg;
	},

	getLineLength : function() {
		return parseInt(EPG.lineImg.style.height.match(/[-+]?\d+/g), 10);
	},

	getHookTop : function() {
		return parseInt(EPG.hookImg.style.top.match(/[-+]?\d+/g), 10);
	},

	getHookLeft : function() {
		return parseInt(EPG.hookImg.style.left.match(/[-+]?\d+/g), 10);
	},

	getHookDegree : function() {
		return parseInt(EPG.hookImg.style.transform.toString().match(/[-+]?\d+(\.\d+)?/g)[0], 10);
	},

	setHookDegree : function(degree) {
		// Set hook image degree
		var hookImg = EPG.hookImg;
		hookImg.style.transform = "rotate(" + degree + "deg)";

		// Set line image degree
		var lineImg = EPG.lineImg;
		lineImg.style.transform = "rotate(" + degree + "deg)";
	},

	createGold : function(goldNo, top, left) {
		var goldImg = EPG.createImg("gold", null, top, left, parseInt(169 * GOLD_SIZE[goldNo], 10), parseInt(135 * GOLD_SIZE[goldNo], 10));
		var gold = {
			top : top,
			left : left,
			width : goldImg.style.width,
			height : goldImg.style.height,
			img : goldImg
		};
		if (EPG.isOutSideOfPlayBoard(gold)) {
			return null;
		}
		for (var i = 0; i < EPG.goldList.length; i++) {
			if (EPG.isNewItemCoverOthers(gold, EPG.goldList[i])) {
				return null;
			}
		}
		for (var i = 0; i < EPG.stoneList.length; i++) {
			if (EPG.isNewItemCoverOthers(gold, EPG.stoneList[i])) {
				return null;
			}
		}
		if (EPG.isNewItemCoverOthers(gold, EPG.coinbag)) {
			return null;
		}
		EPG.getElement("playboard").appendChild(goldImg);
		EPG.goldList.push(gold);
		return gold;
	},

	createStone : function(stoneNo, top, left) {
		var stoneImg = EPG.createImg("stone", null, top, left, parseInt(82 * STONE_SIZE[stoneNo], 10), parseInt(60 * STONE_SIZE[stoneNo], 10));
		var stone = {
			top : top,
			left : left,
			width : stoneImg.style.width,
			height : stoneImg.style.height,
			img : stoneImg
		};
		if (EPG.isOutSideOfPlayBoard(stone)) {
			return null;
		}
		for (var i = 0; i < EPG.goldList.length; i++) {
			if (EPG.isNewItemCoverOthers(stone, EPG.goldList[i])) {
				return null;
			}
		}
		for (var i = 0; i < EPG.stoneList.length; i++) {
			if (EPG.isNewItemCoverOthers(stone, EPG.stoneList[i])) {
				return null;
			}
		}
		if (EPG.isNewItemCoverOthers(stone, EPG.coinbag)) {
			return null;
		}
		EPG.getElement("playboard").appendChild(stoneImg);
		EPG.stoneList.push(stone);
		return stone;
	},

	createCoinbag : function(top, left) {
		var coinbagImg = EPG.createImg("coinbag", null, top, left, parseInt(50 * 0.75, 10), parseInt(72 * 0.75, 10));
		var coinbag = {
			top : top,
			left : left,
			width : coinbagImg.style.width,
			height : coinbagImg.style.height,
			img : coinbagImg
		};
		if (EPG.isOutSideOfPlayBoard(coinbag)) {
			return null;
		}
		for (var i = 0; i < EPG.goldList.length; i++) {
			if (EPG.isNewItemCoverOthers(coinbag, EPG.goldList[i])) {
				return null;
			}
		}
		for (var i = 0; i < EPG.stoneList.length; i++) {
			if (EPG.isNewItemCoverOthers(coinbag, EPG.stoneList[i])) {
				return null;
			}
		}
		if (EPG.isNewItemCoverOthers(coinbag, EPG.coinbag)) {
			return null;
		}
		EPG.getElement("playboard").appendChild(coinbagImg);
		EPG.coinbag = coinbag;
		return coinbag;
	},

	isOutSideOfPlayBoard : function(item) {
		if (parseInt(item.top, 10) + parseInt(item.height, 10) > PLAYBOARD_HEIGHT
				|| parseInt(item.left, 10) + parseInt(item.width, 10) > PLAYBOARD_WIDTH) {
			return true;
		}
		return false;
	},

	isNewItemCoverOthers : function(item1, item2) {
		if (null == item2) {
			return false;
		}
		var points = [];
		points[0] = {
			x : parseInt(item1.left, 10),
			y : parseInt(item1.top, 10)
		};
		points[1] = {
			x : parseInt(item1.left, 10) + parseInt(item1.width, 10),
			y : parseInt(item1.top, 10)
		};
		points[2] = {
			x : parseInt(item1.left, 10),
			y : parseInt(item1.top, 10) + parseInt(item1.height, 10)
		};
		points[3] = {
			x : parseInt(item1.left, 10) + parseInt(item1.width, 10),
			y : parseInt(item1.top, 10) + parseInt(item1.height, 10)
		};
		points[4] = {
			x : parseInt(item2.left, 10),
			y : parseInt(item2.top, 10)
		};
		points[5] = {
			x : parseInt(item2.left, 10) + parseInt(item2.width, 10),
			y : parseInt(item2.top, 10)
		};
		points[6] = {
			x : parseInt(item2.left, 10),
			y : parseInt(item2.top, 10) + parseInt(item2.height, 10)
		};
		points[7] = {
			x : parseInt(item2.left, 10) + parseInt(item2.width, 10),
			y : parseInt(item2.top, 10) + parseInt(item2.height, 10)
		};
		for (var i = 0; i < 4; i++) {
			if (EPG.isPointInsideRectangle(points[i], item2)) {
				return true;
			}
		}
		for (var i = 4; i < 8; i++) {
			if (EPG.isPointInsideRectangle(points[i], item1)) {
				return true;
			}
		}
		return false;
	},

	isPointInsideRectangle : function(point, item) {
		if (point.x >= parseInt(item.left, 10) && point.x <= parseInt(item.left, 10) + parseInt(item.width, 10) && point.y >= parseInt(item.top, 10)
				&& point.y <= parseInt(item.top, 10) + parseInt(item.height, 10)) {
			return true;
		}
		return false;
	},

	initGame : function() {
		EPG.createHook();
		counter = 0;
		while (counter < 1) {
			var top = parseInt(Math.random() * PLAYBOARD_HEIGHT, 10);
			var left = parseInt(Math.random() * PLAYBOARD_WIDTH, 10);
			var coinbag = EPG.createCoinbag(top, left);
			if (coinbag != null) {
				counter++;
			}
		}
		var counter = 0;
		while (counter < 5) {
			var top = parseInt(Math.random() * PLAYBOARD_HEIGHT, 10);
			var left = parseInt(Math.random() * PLAYBOARD_WIDTH, 10);
			var gold = EPG.createGold(0, top, left);
			if (gold != null) {
				counter++;
			}
		}
		counter = 0;
		while (counter < 3) {
			var top = parseInt(Math.random() * PLAYBOARD_HEIGHT, 10);
			var left = parseInt(Math.random() * PLAYBOARD_WIDTH, 10);
			var gold = EPG.createGold(1, top, left);
			if (gold != null) {
				counter++;
			}
		}
		counter = 0;
		while (counter < 2) {
			var top = parseInt(Math.random() * PLAYBOARD_HEIGHT, 10);
			var left = parseInt(Math.random() * PLAYBOARD_WIDTH, 10);
			var gold = EPG.createGold(2, top, left);
			if (gold != null) {
				counter++;
			}
		}
		counter = 0;
		while (counter < 2) {
			var top = parseInt(Math.random() * PLAYBOARD_HEIGHT, 10);
			var left = parseInt(Math.random() * PLAYBOARD_WIDTH, 10);
			var stone = EPG.createStone(0, top, left);
			if (stone != null) {
				counter++;
			}
		}
		counter = 0;
		while (counter < 2) {
			var top = parseInt(Math.random() * PLAYBOARD_HEIGHT, 10);
			var left = parseInt(Math.random() * PLAYBOARD_WIDTH, 10);
			var stone = EPG.createStone(1, top, left);
			if (stone != null) {
				counter++;
			}
		}
	},

	getElement : function(id) {
		return document.getElementById(id);
	},

	getContextPath : function() {
		return window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2));
	}
};
