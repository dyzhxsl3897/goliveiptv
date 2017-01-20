/**
 * Remote key press function
 */

var paopaolong = {
	pressLeft : function() {
		if (EPG.isPlaying) {
			EPG.arrowTurnLeft();
		}
	},
	pressRight : function() {
		if (EPG.isPlaying) {
			EPG.arrowTurnRight();
		}
	},
	pressUp : function() {
		if (EPG.isPlaying) {
		}
	},
	pressDown : function() {
		if (EPG.isPlaying) {
		}
	},
	pressEnter : function() {
		if (EPG.isPlaying && !EPG.isBallMoving) {
			EPG.fireBall();
		}
	}
}
