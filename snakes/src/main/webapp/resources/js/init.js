document.onkeydown = function(e) {
	e = e || window.event;
	var keyCode = e.which || e.keyCode;
	if (keyCode == KEY_RIGHT || keyCode == PC_KEY_RIGHT) {
		LobbyControl.pressRight();
	} else if (keyCode == KEY_LEFT || keyCode == PC_KEY_LEFT) {
		LobbyControl.pressLeft();
	} else if (keyCode == KEY_UP || keyCode == PC_KEY_UP) {
		LobbyControl.pressUp();
	} else if (keyCode == KEY_DOWN || keyCode == PC_KEY_DOWN) {
		LobbyControl.pressDown();
	} else if (keyCode == KEY_ENTER) {
		LobbyControl.pressEnter();
	}
};

EPG.initSnake(PLAYBOARD_HEIGHT / 5 * 2, PLAYBOARD_WIDTH / 5 * 3);

