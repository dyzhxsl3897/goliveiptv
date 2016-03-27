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
EPG.item = EPG.createItem((type + 1) * 10 + direct + 1);

var mytimer = setInterval(function() {
	if (EPG.canMoveItem(EPG.item, CELL_H, 0)) {
		EPG.moveItem(EPG.item, CELL_H, 0);
	} else {
		EPG.setMap();
		EPG.clearFilledLines();
		var type = parseInt(Math.random() * ITEM_START.length, 10);
		var direct = parseInt(Math.random() * ITEM_START[type].length, 10);
		EPG.item = EPG.createItem((type + 1) * 10 + direct + 1);
		if (null == EPG.item) {
			clearMytimer();
			EPG.isPlaying = false;
		}
	}
}, 500);

function clearMytimer() {
	clearInterval(mytimer);
}
