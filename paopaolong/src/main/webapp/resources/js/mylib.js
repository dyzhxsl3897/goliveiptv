/**
 * Main library
 */
var EPG = {
	isPlaying : true,

	waitingBall : null,// The ball under the arrow, waiting to be shoot

	nextBall : null,// The small ball for next

	movingBall : null,// The ball is moving

	isBallMoving : false,

	ballMovingBasePoint : null,

	ballDegree : 0,

	ballMovementTimer : null,

	setBallMovementTimer : function(level) {
		EPG.ballMovementTimer = setInterval(function() {
			EPG.moveBall();
		}, BALL_MOVE_SPEED);
	},

	clearBallMovementTimer : function() {
		if (null != EPG.ballMovementTimer) {
			clearInterval(EPG.ballMovementTimer);
		}

		// Set ball moving to false
		EPG.isBallMoving = false;
	},

	fireBall : function() {
		// Set initial parameters
		EPG.isBallMoving = true;
		EPG.ballDegree = EPG.getArrowDegree();
		EPG.ballMovingBasePoint = {
			top : 366,
			left : 180,
			steps : 0
		};

		// Set movingBall for the ball movement
		EPG.movingBall = EPG.waitingBall;

		// Set nextBall as waitingBall
		EPG.waitingBall = EPG.nextBall;
		EPG.waitingBall.style.top = "366px";
		EPG.waitingBall.style.left = "180px";
		EPG.waitingBall.style.width = "38px";
		EPG.waitingBall.style.height = "38px";

		// Create new nextBall
		EPG.createNextBall();

		// Fire the ball
		EPG.setBallMovementTimer();
	},

	moveBall : function() {
		if (EPG.isBallTouchLeftBoundary()) {
			EPG.ballMovingBasePoint = {
				top : EPG.getMovingBallTop(),
				left : EPG.getMovingBallLeft(),
				steps : 0
			};
			EPG.ballDegree = -1 * EPG.ballDegree;

			EPG.ballMovingBasePoint.steps++;
			EPG.movingBall.style.top = parseInt(EPG.ballMovingBasePoint.top - EPG.ballMovingBasePoint.steps * 5
					* Math.cos(EPG.ballDegree * Math.PI / 180), 10);
			EPG.movingBall.style.left = parseInt(EPG.ballMovingBasePoint.left + EPG.ballMovingBasePoint.steps * 5
					* Math.sin(EPG.ballDegree * Math.PI / 180), 10);
		} else if (EPG.isBallTouchRightBoundary()) {
			EPG.ballMovingBasePoint = {
				top : EPG.getMovingBallTop(),
				left : EPG.getMovingBallLeft(),
				steps : 0
			};
			EPG.ballDegree = -1 * EPG.ballDegree;

			EPG.ballMovingBasePoint.steps++;
			EPG.movingBall.style.top = parseInt(EPG.ballMovingBasePoint.top - EPG.ballMovingBasePoint.steps * 5
					* Math.cos(EPG.ballDegree * Math.PI / 180), 10);
			EPG.movingBall.style.left = parseInt(EPG.ballMovingBasePoint.left + EPG.ballMovingBasePoint.steps * 5
					* Math.sin(EPG.ballDegree * Math.PI / 180), 10);
		} else if (EPG.isBallTouchTopBoundary()) {
			EPG.clearBallMovementTimer();
		} else {
			EPG.ballMovingBasePoint.steps++;
			EPG.movingBall.style.top = parseInt(EPG.ballMovingBasePoint.top - EPG.ballMovingBasePoint.steps * 5
					* Math.cos(EPG.ballDegree * Math.PI / 180), 10);
			EPG.movingBall.style.left = parseInt(EPG.ballMovingBasePoint.left + EPG.ballMovingBasePoint.steps * 5
					* Math.sin(EPG.ballDegree * Math.PI / 180), 10);
		}
	},

	isBallTouchLeftBoundary : function() {
		if (EPG.getMovingBallLeft() < 0) {
			return true;
		} else {
			return false;
		}
	},

	isBallTouchRightBoundary : function() {
		if (EPG.getMovingBallLeft() > 468) {
			return true;
		} else {
			return false;
		}
	},

	isBallTouchTopBoundary : function() {
		if (EPG.getMovingBallTop() <= 0) {
			return true;
		} else {
			return false;
		}
	},

	getMovingBallTop : function() {
		return parseInt(EPG.movingBall.style.top.match(/[-+]?\d+/g), 10);
	},

	getMovingBallLeft : function() {
		return parseInt(EPG.movingBall.style.left.match(/[-+]?\d+/g), 10);
	},

	createImg : function(imageName, percent, top, left, width, height) {
		var image = document.createElement("img");
		image.src = EPG.getContextPath() + "/resources/images/" + imageName + ".png";
		image.style.position = "absolute";
		image.style.top = top + "px";
		image.style.left = left + "px";
		if (percent == null) {
			image.style.width = width;
			image.style.height = height;
		} else {
			image.style.width = parseInt(image.width * percent, 10);
			image.style.height = parseInt(image.height * percent, 10);
		}
		return image;
	},

	createBall : function(color, top, left) {
		var newBallImg = EPG.createImg(color + "Ball", null, top, left, 38, 38);
		EPG.getElement("playboard").appendChild(newBallImg);
		EPG.waitingBall = newBallImg;
	},

	createWaitingBall : function(color) {
		var newBallImg = EPG.createImg(color + "Ball", null, 366, 180, 38, 38);
		EPG.getElement("playboard").appendChild(newBallImg);
		EPG.waitingBall = newBallImg;
	},

	createNextBall : function() {
		var color = parseInt(Math.random() * 4, 10);
		var newBallImg = EPG.createImg(BALL_COLOR[color] + "Ball", null, 409, 185, 26, 26);
		EPG.getElement("playboard").appendChild(newBallImg);
		EPG.nextBall = newBallImg;
	},

	arrowTurnRight : function() {
		var arrowImg = EPG.getElement("arrowImg");
		if (EPG.getArrowDegree() < 75) {
			EPG.setArrowDegree(EPG.getArrowDegree() + 3);
		}
	},

	arrowTurnLeft : function() {
		var arrowImg = EPG.getElement("arrowImg");
		if (EPG.getArrowDegree() > -75) {
			EPG.setArrowDegree(EPG.getArrowDegree() - 3);
		}
	},

	getArrowDegree : function() {
		var arrowImg = EPG.getElement("arrowImg");
		return parseInt(arrowImg.style.transform.toString().match(/[-+]?\d+(\.\d+)?/g)[0], 10);
	},

	setArrowDegree : function(degree) {
		var arrowImg = EPG.getElement("arrowImg");
		arrowImg.style.transform = "rotate(" + degree + "deg)";
	},

	initGame : function() {
		var left = 0;
		for (var i = 0; i < 13; i++) {
			var color = parseInt(Math.random() * 4, 10);
			EPG.createBall(BALL_COLOR[color], 0, left);
			left += 38;
		}
		var left = 19;
		for (var i = 0; i < 12; i++) {
			var color = parseInt(Math.random() * 4, 10);
			EPG.createBall(BALL_COLOR[color], 33, left);
			left += 38;
		}
		var left = 0;
		for (var i = 0; i < 13; i++) {
			var color = parseInt(Math.random() * 4, 10);
			EPG.createBall(BALL_COLOR[color], 66, left);
			left += 38;
		}
		var left = 19;
		for (var i = 0; i < 12; i++) {
			var color = parseInt(Math.random() * 4, 10);
			EPG.createBall(BALL_COLOR[color], 99, left);
			left += 38;
		}

		var arrowImg = EPG.getElement("arrowImg");
		arrowImg.style.transform = "rotate(0deg)";
		arrowImg.style["transform-origin"] = "15px 56px 0px";

		var color = parseInt(Math.random() * 4, 10);
		EPG.createWaitingBall(BALL_COLOR[color]);
		EPG.createNextBall();
	},

	getElement : function(id) {
		return document.getElementById(id);
	},

	getContextPath : function() {
		return window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2));
	}
};
