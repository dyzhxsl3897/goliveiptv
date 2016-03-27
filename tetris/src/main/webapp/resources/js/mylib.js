/**
 * Main library
 */
var EPG = {
	item : {
		bricks : []
	},

	map : null,

	getElement : function(id) {
		return document.getElementById(id);
	},

	cumulativeOffset : function(element) {
		var top = 0, left = 0;
		do {
			top += element.offsetTop || 0;
			left += element.offsetLeft || 0;
			element = element.offsetParent;
		} while (element);
		return {
			top : top,
			left : left
		};
	},

	relativeOffset : function(element) {
		var top = 0, left = 0;
		top += element.offsetTop || 0;
		left += element.offsetLeft || 0;
		return {
			top : top,
			left : left
		};
	},

	createImg : function(imageNo, posX, posY) {
		var image = document.createElement("img");
		image.src = "/resources/images/bricks/" + imageNo + ".png";
		image.style.position = "absolute";
		image.style.top = posX + "px";
		image.style.left = posY + "px";
		EPG.getElement("playboard").appendChild(image);
		return image;
	},

	createItem : function(itemNo) {
		var type = parseInt(parseInt(itemNo) / 10 - 1);
		var direct = parseInt(parseInt(itemNo) % 10 - 1);
		var item = {
			bricks : []
		};
		for (var i = 0; i < ITEM_START[type][direct].length; i++) {
			var image = EPG.createImg(itemNo, ITEM_START[type][direct][i][0] * CELL_H, ITEM_START[type][direct][i][1] * CELL_W);
			item.bricks.push(image);
		}
		return item;
	},

	moveImg : function(image, posX, posY) {
		image.style.top = posX;
		image.style.left = posY;
	},

	moveItem : function(item, top, left) {
		if (EPG.canMoveItem(item, top, left)) {
			for (var i = 0; i < item.bricks.length; i++) {
				var posX = parseInt(item.bricks[i].style.top.substring(0, item.bricks[i].style.top.indexOf("px")));
				var posY = parseInt(item.bricks[i].style.left.substring(0, item.bricks[i].style.left.indexOf("px")));
				EPG.moveImg(item.bricks[i], posX + top, posY + left);
			}
		}
	},

	canMoveItem : function(item, top, left) {
		for (var i = 0; i < item.bricks.length; i++) {
			var posX = parseInt(item.bricks[i].style.top.substring(0, item.bricks[i].style.top.indexOf("px")));
			var posY = parseInt(item.bricks[i].style.left.substring(0, item.bricks[i].style.left.indexOf("px")));
			var newPosX = posX + top;
			var newPosY = posY + left;
			var x = newPosX / CELL_H;
			var y = newPosY / CELL_W;
			if (x < 0 || x > PLAYBOARD_MAX_H - 1 || y < 0 || y > PLAYBOARD_MAX_W - 1) {
				return false;
			}
			if (EPG.map[x][y] == 1) {
				return false;
			}
		}
		return true;
	},

	setMap : function() {
		var item = EPG.item;
		for (var i = 0; i < item.bricks.length; i++) {
			var posX = parseInt(item.bricks[i].style.top.substring(0, item.bricks[i].style.top.indexOf("px")));
			var posY = parseInt(item.bricks[i].style.left.substring(0, item.bricks[i].style.left.indexOf("px")));
			var x = posX / CELL_H;
			var y = posY / CELL_W;
			EPG.map[x][y] = 1;
		}
	},

	clearLine : function(lineNo) {
		var playboard = EPG.getElement("playboard");
		var allImages = playboard.childNodes;

		// clear one line
		var imagesNeedToRemove = [];
		for (var i = 0; i < allImages.length; i++) {
			var image = allImages[i];
			var posX = parseInt(image.style.top.substring(0, image.style.top.indexOf("px")));
			var posY = parseInt(image.style.left.substring(0, image.style.left.indexOf("px")));
			var x = posX / CELL_H;
			var y = posY / CELL_W;
			if (x == lineNo) {
				imagesNeedToRemove.push(image);
				EPG.map[x][y] = 0;
			}
		}
		while (imagesNeedToRemove.length > 0) {
			var image = imagesNeedToRemove.pop();
			playboard.removeChild(image);
		}

		// move all images above this line number down for one cell

	},

	clearFilledLines : function() {
		for (var i = 0; i < EPG.map.length; i++) {
			for (var j = 0; j < EPG.map[i].length; j++) {
				if (EPG.map[i][j] == 0) {
					break;
				}
			}
			if (j == PLAYBOARD_MAX_W) {
				EPG.clearLine(i);
			}
		}
	},

	clearPlayboard : function() {
		var playboard = EPG.getElement("playboard");
		while (playboard.hasChildNodes()) {
			playboard.removeChild(playboard.firstChild);
		}
		EPG.clearMap();
	},

	clearMap : function() {
		EPG.map = new Array();
		for (var i = 0; i < PLAYBOARD_MAX_H; i++) {
			EPG.map[i] = new Array();
			for (var j = 0; j < PLAYBOARD_MAX_W; j++) {
				EPG.map[i][j] = 0;
			}
		}
	}
};
