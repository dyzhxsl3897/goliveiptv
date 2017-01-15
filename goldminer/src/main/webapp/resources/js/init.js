document.onkeydown = function(e) {
	e = e || window.event;
	var keyCode = e.which || e.keyCode;
	if (keyCode == KEY_RIGHT || keyCode == PC_KEY_RIGHT) {
		goldMiner.pressRight();
	} else if (keyCode == KEY_LEFT || keyCode == PC_KEY_LEFT) {
		goldMiner.pressLeft();
	} else if (keyCode == KEY_UP || keyCode == PC_KEY_UP) {
		goldMiner.pressUp();
	} else if (keyCode == KEY_DOWN || keyCode == PC_KEY_DOWN) {
		goldMiner.pressDown();
	}
}

EPG.isPlaying = true;

 EPG.initGame();
//console.log(Math.sin(30 * Math.PI / 180));
 EPG.setHookTurnTimer();
