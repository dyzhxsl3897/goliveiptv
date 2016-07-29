/**
 * Remote key press function
 */

var Snakes = {
	pressLeft : function() {
		if (EPG.isPlaying) {
			if (EPG.snakeHead.dir == 1 || EPG.snakeHead.dir == 3) {
				EPG.snakeHead.dir = 2;
			}
		}
	},
	pressRight : function() {
		if (EPG.isPlaying) {
			if (EPG.snakeHead.dir == 1 || EPG.snakeHead.dir == 3) {
				EPG.snakeHead.dir = 0;
			}
		}
	},
	pressUp : function() {
		if (EPG.isPlaying) {
			if (EPG.snakeHead.dir == 0 || EPG.snakeHead.dir == 2) {
				EPG.snakeHead.dir = 3;
			}
		}
	},
	pressDown : function() {
		if (EPG.isPlaying) {
			if (EPG.snakeHead.dir == 0 || EPG.snakeHead.dir == 2) {
				EPG.snakeHead.dir = 1;
			}
		}
	},
	pressEnter : function() {
		if (EPG.isPlaying) {// If is playing, then enter means pause
			if (null != EPG.timer) {
				EPG.clearTimer();
			} else {
				EPG.setTimer(EPG.level);
			}
		}
	}
}
