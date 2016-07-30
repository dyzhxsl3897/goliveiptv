document.onkeydown = function(e) {
	e = e || window.event;
	var keyCode = e.which || e.keyCode;
	if (keyCode == KEY_RIGHT || keyCode == PC_KEY_RIGHT) {
		ToHellWithJohnny.pressRight();
	} else if (keyCode == KEY_LEFT || keyCode == PC_KEY_LEFT) {
		ToHellWithJohnny.pressLeft();
	} else if (keyCode == KEY_UP || keyCode == PC_KEY_UP) {
		ToHellWithJohnny.pressUp();
	} else if (keyCode == KEY_DOWN || keyCode == PC_KEY_DOWN) {
		ToHellWithJohnny.pressDown();
	} else if (keyCode == KEY_ENTER) {
		ToHellWithJohnny.pressEnter();
	}
};
