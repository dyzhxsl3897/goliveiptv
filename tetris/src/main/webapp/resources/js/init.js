document.onkeydown = function(e) {
	e = e || window.event;
	var keyCode = e.which || e.keyCode;
	if (keyCode == KEY_RIGHT || keyCode == PC_KEY_RIGHT) {
		Tetris.pressRight(item);
	} else if (keyCode == KEY_LEFT || keyCode == PC_KEY_LEFT) {
		Tetris.pressLeft(item);
	} else if (keyCode == KEY_UP || keyCode == PC_KEY_UP) {
		Tetris.pressUp(item);
	} else if (keyCode == KEY_DOWN || keyCode == PC_KEY_DOWN) {
		Tetris.pressDown(item);
	}
}

var item = EPG.createItem(11);

var i = 0;
var mytimer = setInterval(function() {
	if (i < PLAYBOARD_MAX_H - 3) {
		EPG.moveItem(item, CELL_H, 0);
		i++;
	} else {
		clearMytimer(item);
	}
}, 500);

function clearMytimer(item) {
	clearInterval(mytimer);
	var item = EPG.createItem(12);
}
