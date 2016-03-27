/**
 * Main library
 */
var EPG = {
	isPlaying : false,

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
		return image;
	},

	createItem : function(itemNo) {
		var type = parseInt(parseInt(itemNo, 10) / 10 - 1, 10);
		var direct = parseInt(parseInt(itemNo, 10) % 10 - 1, 10);
		var item = {
			type : type,
			direct : direct,
			bricks : []
		};
		for (var i = 0; i < ITEM_START[type][direct].length; i++) {
			var newPosX = ITEM_START[type][direct][i][0] * CELL_H;
			var newPosY = ITEM_START[type][direct][i][1] * CELL_W;
			var x = newPosX / CELL_H;
			var y = newPosY / CELL_W;

			if (x < 0 || x > PLAYBOARD_MAX_H - 1 || y < 0 || y > PLAYBOARD_MAX_W - 1) {
				return null;
			}
			if (EPG.map[x][y] == 1) {
				return null;
			}

			var image = EPG.createImg(itemNo, ITEM_START[type][direct][i][0] * CELL_H, ITEM_START[type][direct][i][1] * CELL_W);
			item.bricks.push(image);
		}
		for (var i = 0; i < item.bricks.length; i++) {
			EPG.getElement("playboard").appendChild(item.bricks[i]);
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
				var posX = parseInt(item.bricks[i].style.top.substring(0, item.bricks[i].style.top.indexOf("px")), 10);
				var posY = parseInt(item.bricks[i].style.left.substring(0, item.bricks[i].style.left.indexOf("px")), 10);
				EPG.moveImg(item.bricks[i], posX + top, posY + left);
			}
		}
	},

	transformItem : function() {
		var playboard = EPG.getElement("playboard");
		var type = EPG.item.type;
		var direct = EPG.item.direct;
		var newItem = {
			type : type,
			direct : (direct + 1) % 4,
			bricks : []
		};

		var imageNo = (type + 1) * 10 + direct + 1;
		// do transformation, create new transformed item
		for (var i = 0; i < EPG.item.bricks.length; i++) {
			var brick = EPG.item.bricks[i];
			var posX = parseInt(brick.style.top.substring(0, brick.style.top.indexOf("px")), 10);
			var posY = parseInt(brick.style.left.substring(0, brick.style.left.indexOf("px")), 10);
			var newPosX = posX + ITEM_TRANSFORM[type][direct][i][0] * CELL_H;
			var newPosY = posY + ITEM_TRANSFORM[type][direct][i][1] * CELL_W;
			var x = newPosX / CELL_H;
			var y = newPosY / CELL_W;

			// if can't transform, the quit
			if (x < 0 || x > PLAYBOARD_MAX_H - 1 || y < 0 || y > PLAYBOARD_MAX_W - 1) {
				return;
			}
			if (EPG.map[x][y] == 1) {
				return;
			}

			// create one brick
			var image = EPG.createImg(imageNo, newPosX, newPosY);
			newItem.bricks.push(image);
		}

		// remove old form
		for (var i = 0; i < EPG.item.bricks.length; i++) {
			playboard.removeChild(EPG.item.bricks[i]);
		}

		// add new form
		for (var i = 0; i < EPG.item.bricks.length; i++) {
			playboard.appendChild(newItem.bricks[i]);
		}
		EPG.item = newItem;
	},

	canMoveItem : function(item, top, left) {
		for (var i = 0; i < item.bricks.length; i++) {
			var posX = parseInt(item.bricks[i].style.top.substring(0, item.bricks[i].style.top.indexOf("px")), 10);
			var posY = parseInt(item.bricks[i].style.left.substring(0, item.bricks[i].style.left.indexOf("px")), 10);
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
			var posX = parseInt(item.bricks[i].style.top.substring(0, item.bricks[i].style.top.indexOf("px")), 10);
			var posY = parseInt(item.bricks[i].style.left.substring(0, item.bricks[i].style.left.indexOf("px")), 10);
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
			var posX = parseInt(image.style.top.substring(0, image.style.top.indexOf("px")), 10);
			var posY = parseInt(image.style.left.substring(0, image.style.left.indexOf("px")), 10);
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
