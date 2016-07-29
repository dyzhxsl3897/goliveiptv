/**
 * Main library
 */
var EPG = {
	getElement : function(id) {
		return document.getElementById(id);
	},

	isPlaying : false,

	needIncrease : false,

	timer : null,

	score : 0,

	setScore : function(newScore) {
		EPG.score = newScore;
		// TODO EPG.getElement("score").innerHTML = EPG.score;
	},

	level : 0,

	setLevel : function(newLevel) {
		EPG.level = newLevel;
		// TODO EPG.getElement("level").innerHTML = EPG.level + 1;
	},

	setTimer : function(level) {
		EPG.clearTimer();
		EPG.timer = setInterval(function() {
			EPG.moveSnake();
		}, SPEED_LV[EPG.level]);
	},

	clearTimer : function() {
		if (null != EPG.timer) {
			clearInterval(EPG.timer);
			EPG.timer = null;
		}
	},

	snakeHead : {
		dir : 0,// Right 0, Down: 1, Left: 2, Up: 3
		snakeHead : null
	},

	snakeBody : [],

	stars : [],

	diamonds : [],

	createImg : function(imageName, posX, posY) {
		var image = document.createElement("img");
		image.src = EPG.getContextPath() + "/resources/images/snakes/" + imageName + ".png";
		image.style.position = "absolute";
		image.style.top = posX + "px";
		image.style.left = posY + "px";
		return image;
	},

	moveImg : function(image, posX, posY) {
		image.style.top = posX;
		image.style.left = posY;
	},

	drawSnakeHead : function(posX, posY) {
		var snakeHead = EPG.createImg("snake-head", posX, posY);
		EPG.getElement("playboard").appendChild(snakeHead);
		EPG.snakeHead.snakeHead = snakeHead;
	},

	drawSnakeBody : function(posX, posY, dir) {
		var snakeBody = EPG.createImg("snake-body", posX, posY);
		EPG.getElement("playboard").appendChild(snakeBody);
		var snakeBodyElement = {};
		snakeBodyElement.dir = dir;
		snakeBodyElement.snakeBody = snakeBody;
		EPG.snakeBody.push(snakeBodyElement);
	},

	drawStar : function() {
		var posX = Math.floor(Math.random() * (PLAYBOARD_HEIGHT / STEP)) * STEP;
		var posY = Math.floor(Math.random() * (PLAYBOARD_WIDTH / STEP)) * STEP;
		var star = EPG.createImg("star", posX, posY);
		EPG.getElement("playboard").appendChild(star);
		EPG.stars.push(star);
	},

	drawDiamond : function() {
		var posX = Math.floor(Math.random() * (PLAYBOARD_HEIGHT / STEP)) * STEP;
		var posY = Math.floor(Math.random() * (PLAYBOARD_WIDTH / STEP)) * STEP;
		var diamond = EPG.createImg("diamond", posX, posY);
		EPG.getElement("playboard").appendChild(diamond);
		EPG.diamonds.push(diamond);
	},

	moveSnake : function() {
		// If need increase snake body from last move, then do it here
		if (EPG.needIncrease) {
			var tailBody = EPG.snakeBody[EPG.snakeBody.length - 1].snakeBody;
			var posX = parseInt(tailBody.style.top.substring(0, tailBody.style.top.indexOf("px")), 10);
			var posY = parseInt(tailBody.style.left.substring(0, tailBody.style.left.indexOf("px")), 10);
			var dir = EPG.snakeBody[EPG.snakeBody.length - 1].dir;
			EPG.drawSnakeBody(posX, posY, dir);
		}

		// Move body
		var lastBodyNumber = EPG.snakeBody.length - 1;
		if (EPG.needIncrease) {
			lastBodyNumber--;
		}
		for (var i = lastBodyNumber; i >= 0; i--) {
			// Move current snake body
			var currBody = EPG.snakeBody[i].snakeBody;
			var currDir = EPG.snakeBody[i].dir;
			var currBodyX = parseInt(currBody.style.top.substring(0, currBody.style.top.indexOf("px")), 10);
			var currBodyY = parseInt(currBody.style.left.substring(0, currBody.style.left.indexOf("px")), 10);
			var incrementalX = ((parseInt(currDir / 2, 10) * 2 - 1) * (-1 * STEP)) * ((currDir) % 2);
			var incrementalY = ((parseInt(currDir / 2, 10) * 2 - 1) * (-1 * STEP)) * ((currDir + 1) % 2);
			EPG.moveImg(currBody, currBodyX + incrementalX, currBodyY + incrementalY);

			// Check if need to change this body's direction
			if (i > 0) {
				var lastBodyDir = EPG.snakeBody[i - 1].dir;
			} else {
				var lastBodyDir = EPG.snakeHead.dir;
			}
			EPG.snakeBody[i].dir = lastBodyDir;
		}

		// Move head
		var currHeadX = parseInt(EPG.snakeHead.snakeHead.style.top.substring(0, EPG.snakeHead.snakeHead.style.top.indexOf("px")), 10);
		var currHeadY = parseInt(EPG.snakeHead.snakeHead.style.left.substring(0, EPG.snakeHead.snakeHead.style.left.indexOf("px")), 10);
		var incrementalX = ((parseInt(EPG.snakeHead.dir / 2, 10) * 2 - 1) * (-1 * STEP)) * ((EPG.snakeHead.dir) % 2);
		var incrementalY = ((parseInt(EPG.snakeHead.dir / 2, 10) * 2 - 1) * (-1 * STEP)) * ((EPG.snakeHead.dir + 1) % 2);
		EPG.moveImg(EPG.snakeHead.snakeHead, currHeadX + incrementalX, currHeadY + incrementalY);

		// If snake head hits its body or hit the boarder
		if (EPG.isOver(currHeadX + incrementalX, currHeadY + incrementalY)) {
			EPG.clearTimer();
			EPG.isPlaying = false;
			// TODO do something here when game is over
		}

		// Check if snake is eating something...
		for (var i = 0; i < EPG.diamonds.length; i++) {
			var diamond = EPG.diamonds[i];
			var diamondX = parseInt(diamond.style.top.substring(0, diamond.style.top.indexOf("px")), 10);
			var diamondY = parseInt(diamond.style.left.substring(0, diamond.style.left.indexOf("px")), 10);
			if ((currHeadX + incrementalX) == diamondX && (currHeadY + incrementalY) == diamondY) {
				EPG.eatDiamond(diamond);
				return;
			}
		}

		EPG.needIncrease = false;
	},

	eatDiamond : function(diamond) {
		// Remove currently diamond
		var playboard = EPG.getElement("playboard");
		playboard.removeChild(diamond);
		EPG.diamonds.pop();

		// Draw a new diamond randomly
		EPG.drawDiamond();

		// Increase snake body
		EPG.needIncrease = true;
	},

	isOver : function(headPosX, headPosY) {
		// Check if snake head hit the boarder
		if (headPosX < 0 || headPosY < 0 || headPosX > PLAYBOARD_HEIGHT || headPosY > PLAYBOARD_WIDTH - STEP) {
			return true;
		}

		// Check if snake head hit its body, then game over
		for (var i = EPG.snakeBody.length - 1; i >= 0; i--) {
			var currBody = EPG.snakeBody[i].snakeBody;
			var currBodyX = parseInt(currBody.style.top.substring(0, currBody.style.top.indexOf("px")), 10);
			var currBodyY = parseInt(currBody.style.left.substring(0, currBody.style.left.indexOf("px")), 10);
			if (headPosX == currBodyX && headPosY == currBodyY) {
				return true;
			}
		}
		return false;
	},

	initSnake : function(numOfBodys) {
		EPG.drawSnakeHead(0, SNAKE_PIECE_W * (numOfBodys + 1));
		for (var i = 0; i < numOfBodys; i++) {
			EPG.drawSnakeBody(0, SNAKE_PIECE_W * (numOfBodys - i), 0);
		}
	},

	getContextPath : function() {
		return window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2));
	}
};
