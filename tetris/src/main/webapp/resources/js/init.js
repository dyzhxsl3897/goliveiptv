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

var image = EPG.createImg(11, 0, 0);
var mytimer = setInterval(function() {
	var pos = EPG.relativeOffset(image);
	if (pos.top < 200) {
		EPG.moveImg(image, pos.left, pos.top + 10);
	} else {
		clearMytimer();
	}
}, 500);

function clearMytimer() {
	clearInterval(mytimer);
}
