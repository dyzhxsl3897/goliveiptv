/**
 * Main library
 */
var EPG = {
	isPlaying : true,

	goldList : [],

	stoneList : [],

	createImg : function(imageName, percent, top, left) {
		var image = document.createElement("img");
		image.src = EPG.getContextPath() + "/resources/images/" + imageName + ".png";
		image.style.position = "absolute";
		image.style.top = top + "px";
		image.style.left = left + "px";
		image.style.width = parseInt(image.width * percent, 10);
		image.style.height = parseInt(image.height * percent, 10);
		return image;
	},

	createHook : function() {
		var hookImg = EPG.createImg("hook", 1, 0, 305);
		hookImg.style.transform = "rotate(0deg)";
		hookImg.style["transform-origin"] = "100% 100%";
		EPG.getElement("hookboard").appendChild(hookImg);
	},

	createGold : function(goldNo, top, left) {
		var goldImg = EPG.createImg("gold", GOLD_SIZE[goldNo], top, left);
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
		EPG.getElement("playboard").appendChild(goldImg);
		EPG.goldList.push(gold);
		return gold;
	},

	createStone : function(stoneNo, top, left) {
		var stoneImg = EPG.createImg("stone", STONE_SIZE[stoneNo], top, left);
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
		EPG.getElement("playboard").appendChild(stoneImg);
		EPG.stoneList.push(stone);
		return stone;
	},

	isOutSideOfPlayBoard : function(item) {
		if (parseInt(item.top, 10) + parseInt(item.height, 10) > PLAYBOARD_HEIGHT
				|| parseInt(item.left, 10) + parseInt(item.width, 10) > PLAYBOARD_WIDTH) {
			return true;
		}
		return false;
	},

	isNewItemCoverOthers : function(item1, item2) {
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
		console.log("point.x" + point.x);
		console.log("parseInt(item.left, 10)" + parseInt(item.left, 10));
		console.log("parseInt(item.left, 10) + parseInt(item.width, 10)" + parseInt(item.left, 10) + parseInt(item.width, 10));
		console.log("point.y" + point.y);
		console.log("parseInt(item.top, 10)" + parseInt(item.top, 10));
		console.log("parseInt(item.top, 10) + parseInt(item.height, 10)" + parseInt(item.top, 10) + parseInt(item.height, 10));
		if (point.x >= parseInt(item.left, 10) && point.x <= parseInt(item.left, 10) + parseInt(item.width, 10) && point.y >= parseInt(item.top, 10)
				&& point.y <= parseInt(item.top, 10) + parseInt(item.height, 10)) {
			return true;
		}
		return false;
	},

	initGame : function() {
		EPG.createHook();
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
