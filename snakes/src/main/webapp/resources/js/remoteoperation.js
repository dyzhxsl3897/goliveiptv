/**
 * Remote key press function
 */

var Snakes = {
	pressLeft : function() {
		if (EPG.isPlaying) {
			if (EPG.snakeHead.dir == 1 || EPG.snakeHead.dir == 3) {
				EPG.snakeHead.dir = 2;
				EPG.snakeHead.snakeHead.src = EPG.getContextPath() + "/resources/images/snakes/snake-head-left.png";
			}
		}
	},
	pressRight : function() {
		if (EPG.isPlaying) {
			if (EPG.snakeHead.dir == 1 || EPG.snakeHead.dir == 3) {
				EPG.snakeHead.dir = 0;
				EPG.snakeHead.snakeHead.src = EPG.getContextPath() + "/resources/images/snakes/snake-head.png";
			}
		}
	},
	pressUp : function() {
		if (EPG.isPlaying) {
			if (EPG.snakeHead.dir == 0 || EPG.snakeHead.dir == 2) {
				if (EPG.snakeHead.dir == 0) {
					EPG.snakeHead.snakeHead.src = EPG.getContextPath() + "/resources/images/snakes/snake-head-up-right.png";
				} else if (EPG.snakeHead.dir == 2) {
					EPG.snakeHead.snakeHead.src = EPG.getContextPath() + "/resources/images/snakes/snake-head-up-left.png";
				}
				EPG.snakeHead.dir = 3;
			}
		}
	},
	pressDown : function() {
		if (EPG.isPlaying) {
			if (EPG.snakeHead.dir == 0 || EPG.snakeHead.dir == 2) {
				if (EPG.snakeHead.dir == 0) {
					EPG.snakeHead.snakeHead.src = EPG.getContextPath() + "/resources/images/snakes/snake-head-down-right.png";
				} else if (EPG.snakeHead.dir == 2) {
					EPG.snakeHead.snakeHead.src = EPG.getContextPath() + "/resources/images/snakes/snake-head-down-left.png";
				}
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
