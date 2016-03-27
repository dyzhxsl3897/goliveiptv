/**
 * Remote key press function
 */

var Tetris = {
	pressLeft : function(item) {
		EPG.moveItem(item, 0, -CELL_W);
	},
	pressRight : function() {
		EPG.moveItem(item, 0, CELL_W);
	},
	pressUp : function() {
		EPG.moveItem(item, -CELL_H, 0);
	},
	pressDown : function() {
		EPG.moveItem(item, CELL_H, 0);
	}
}
