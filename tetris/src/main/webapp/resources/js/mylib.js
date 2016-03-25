/**
 * Main library
 */
var EPG = {
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
		image.id = imageNo + "_img";
		image.src = "/resources/images/bricks/" + imageNo + ".png";
		image.style.position = "relative";
		image.style.left = posX + "px";
		image.style.top = posY + "px";
		EPG.getElement("playboard").appendChild(image);
		return image;
	},

	moveImg : function(image, posX, posY) {
		image.style.left = posX;
		image.style.top = posY;
	}
};
