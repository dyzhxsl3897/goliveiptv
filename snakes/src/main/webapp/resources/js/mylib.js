/**
 * Main library
 */
var EPG = {
	getElement : function(id) {
		return document.getElementById(id);
	},

	snakeHead : {
		dir : 0,
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
		// Move head
		var currHeadX = parseInt(EPG.snakeHead.snakeHead.style.top.substring(0, EPG.snakeHead.snakeHead.style.top.indexOf("px")), 10);
		var currHeadY = parseInt(EPG.snakeHead.snakeHead.style.left.substring(0, EPG.snakeHead.snakeHead.style.left.indexOf("px")), 10);
		var incrementalX = ((parseInt(EPG.snakeHead.dir / 2, 10) * 2 - 1) * (-5)) * ((EPG.snakeHead.dir) % 2);
		var incrementalY = ((parseInt(EPG.snakeHead.dir / 2, 10) * 2 - 1) * (-5)) * ((EPG.snakeHead.dir + 1) % 2);
		EPG.moveImg(EPG.snakeHead.snakeHead, currHeadX + incrementalX, currHeadY + incrementalY);

		// Move body
		for (var i = 0; i < EPG.snakeBody.length; i++) {
			var currBody = EPG.snakeBody[i].snakeBody;
			var currDir = EPG.snakeBody[i].dir;
			var currBodyX = parseInt(currBody.style.top.substring(0, currBody.style.top.indexOf("px")), 10);
			var currBodyY = parseInt(currBody.style.left.substring(0, currBody.style.left.indexOf("px")), 10);
			var incrementalX = ((parseInt(currDir / 2, 10) * 2 - 1) * (-5)) * ((currDir) % 2);
			var incrementalY = ((parseInt(currDir / 2, 10) * 2 - 1) * (-5)) * ((currDir + 1) % 2);
			EPG.moveImg(currBody, currBodyX + incrementalX, currBodyY + incrementalY);
		}
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
