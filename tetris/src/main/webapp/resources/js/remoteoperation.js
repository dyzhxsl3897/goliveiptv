/**
 * Remote key press function
 */

var Tetris = {
	pressLeft : function() {
		if (EPG.isPlaying) {
			EPG.moveItem(EPG.item, 0, -CELL_W);
		}
	},
	pressRight : function() {
		if (EPG.isPlaying) {
			EPG.moveItem(EPG.item, 0, CELL_W);
		}
	},
	pressUp : function() {
		if (EPG.isPlaying) {
			EPG.transformItem();
		}
	},
	pressDown : function() {
		if (EPG.isPlaying) {
			EPG.moveItem(EPG.item, CELL_H, 0);
		}
	}
}
