/**
 * Remote key press function
 */

var Tetris = {
	pressLeft : function() {
		var pos = EPG.cumulativeOffset(EPG.getElement("BG_IMG"));
		var image = EPG.getElement("BG_IMG");
		image.style.left = parseInt(image.style.left) - 5 + 'px';
	},
	pressRight : function() {
		var pos = EPG.cumulativeOffset(EPG.getElement("BG_IMG"));
		var image = EPG.getElement("BG_IMG");
		image.style.left = parseInt(image.style.left) + 5 + 'px';
	},
	pressUp : function() {
		var pos = EPG.cumulativeOffset(EPG.getElement("BG_IMG"));
		var image = EPG.getElement("BG_IMG");
		image.style.top = parseInt(image.style.top) - 5 + 'px';
	},
	pressDown : function() {
		var pos = EPG.cumulativeOffset(EPG.getElement("BG_IMG"));
		var image = EPG.getElement("BG_IMG");
		image.style.top = parseInt(image.style.top) + 5 + 'px';
	}
}
