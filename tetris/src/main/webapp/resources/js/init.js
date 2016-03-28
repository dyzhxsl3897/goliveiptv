document.onkeydown = function(e) {
	e = e || window.event;
	var keyCode = e.which || e.keyCode;
	if (keyCode == KEY_RIGHT || keyCode == PC_KEY_RIGHT) {
		Tetris.pressRight();
	} else if (keyCode == KEY_LEFT || keyCode == PC_KEY_LEFT) {
		Tetris.pressLeft();
	} else if (keyCode == KEY_UP || keyCode == PC_KEY_UP) {
		Tetris.pressUp();
	} else if (keyCode == KEY_DOWN || keyCode == PC_KEY_DOWN) {
		Tetris.pressDown();
	}
}

var type = parseInt(Math.random() * ITEM_START.length, 10);
var direct = parseInt(Math.random() * ITEM_START[type].length, 10);
EPG.clearPlayboard();
EPG.isPlaying = true;
EPG.setScore(0);
EPG.setLevel(0);

//EPG.item = EPG.createItem(34);
 EPG.item = EPG.createItem((type + 1) * 10 + direct + 1);
 EPG.setTimer(EPG.level);
