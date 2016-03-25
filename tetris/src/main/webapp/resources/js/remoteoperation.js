/**
 * Remote key press function
 */

var Tetris = {
	pressLeft : function() {
		var image = EPG.getElement("11_img");
		image.style.left = parseInt(image.style.left) - 5 + 'px';
	},
	pressRight : function() {
		var image = EPG.getElement("11_img");
		image.style.left = parseInt(image.style.left) + 5 + 'px';
	},
	pressUp : function() {
		var image = EPG.getElement("11_img");
		image.style.top = parseInt(image.style.top) - 5 + 'px';
	},
	pressDown : function() {
		var image = EPG.getElement("11_img");
		image.style.top = parseInt(image.style.top) + 5 + 'px';
	}
}
