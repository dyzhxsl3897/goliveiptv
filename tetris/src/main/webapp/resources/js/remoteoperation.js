/**
 * Remote key press function
 */

var Tetris = {
	pressLeft : function() {
		EPG.moveItem(EPG.item, 0, -CELL_W);
	},
	pressRight : function() {
		EPG.moveItem(EPG.item, 0, CELL_W);
	},
	pressUp : function() {
	},
	pressDown : function() {
		EPG.moveItem(EPG.item, CELL_H, 0);
	}
}
