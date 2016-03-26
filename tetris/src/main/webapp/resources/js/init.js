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

var image1 = EPG.createImg(11, 0, CELL_H * 0);
var image2 = EPG.createImg(11, 0, CELL_H * 1);
var image3 = EPG.createImg(11, CELL_W * 1, CELL_H * 1);
var image4 = EPG.createImg(11, CELL_W * 1, CELL_H * 2);
var item = [];
item.push(image1);
item.push(image2);
item.push(image3);
item.push(image4);

var i = 0;
var mytimer = setInterval(function() {
	if (i < PLAYBOARD_V - 3) {
		EPG.moveItem(item, CELL_H, 0);
		i++;
	} else {
		clearMytimer(item);
	}
}, 500);

function clearMytimer(item) {
	clearInterval(mytimer);
	console.log(item);
	var image1 = EPG.createImg(11, 0, CELL_H * 0);
	var image2 = EPG.createImg(11, 0, CELL_H * 1);
	var image3 = EPG.createImg(11, CELL_W * 1, CELL_H * 1);
	var image4 = EPG.createImg(11, CELL_W * 1, CELL_H * 2);
	var item = [];
	item.push(image1);
	item.push(image2);
	item.push(image3);
	item.push(image4);
}
