document.onkeydown = function(e) {
	e = e || window.event;
	var keyCode = e.which || e.keyCode;
	if (keyCode == KEY_RIGHT || keyCode == PC_KEY_RIGHT) {
		Snakes.pressRight();
	} else if (keyCode == KEY_LEFT || keyCode == PC_KEY_LEFT) {
		Snakes.pressLeft();
	} else if (keyCode == KEY_UP || keyCode == PC_KEY_UP) {
		Snakes.pressUp();
	} else if (keyCode == KEY_DOWN || keyCode == PC_KEY_DOWN) {
		Snakes.pressDown();
	} else if (keyCode == KEY_ENTER) {
		Snakes.pressEnter();
	}
};

EPG.isPlaying = true;
EPG.setScore(0);
EPG.setLevel(0);
EPG.initSnake(PLAYBOARD_HEIGHT / 5 * 2, PLAYBOARD_WIDTH / 5 * 3);
EPG.setTimer(EPG.level);