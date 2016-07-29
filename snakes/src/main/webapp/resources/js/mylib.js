/**
 * Main library
 */
var EPG = {
	getElement : function(id) {
		return document.getElementById(id);
	},

	isPlaying : false,

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

	moveSnake : function() {
		// Move body
		for (var i = EPG.snakeBody.length - 1; i >= 0; i--) {
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

	},

	initSnake : function(headPosX, headPosY) {
		EPG.drawSnakeHead(headPosX, headPosY);
		EPG.drawSnakeBody(headPosX, headPosY - SNAKE_PIECE_W, 0);
		EPG.drawSnakeBody(headPosX, headPosY - SNAKE_PIECE_W * 2, 0);
		EPG.drawSnakeBody(headPosX, headPosY - SNAKE_PIECE_W * 3, 0);
		EPG.drawSnakeBody(headPosX, headPosY - SNAKE_PIECE_W * 4, 0);
		EPG.drawSnakeBody(headPosX, headPosY - SNAKE_PIECE_W * 5, 0);
	},

	getContextPath : function() {
		return window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2));
	}
};
