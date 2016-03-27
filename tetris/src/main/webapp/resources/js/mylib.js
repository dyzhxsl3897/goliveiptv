/**
 * Main library
 */
var EPG = {
	item : {
		bricks : []
	},

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
		for (var i = 0; i < item.bricks.length; i++) {
			var posX = parseInt(item.bricks[i].style.top.substring(0, item.bricks[i].style.top.indexOf("px")));
			var posY = parseInt(item.bricks[i].style.left.substring(0, item.bricks[i].style.left.indexOf("px")));
			EPG.moveImg(item.bricks[i], posX + top, posY + left);
		}
	}
};
