function classList(e) {
	if (e.classList) {
		return e.classList;
	} else {
		return new CssClassList(e);
	}
}

function CssClassList(e) {
	this.e = e;
}

CssClassList.prototype.contains = function(c) {
	if (c.length != 0 && c.indexOf(" ") == -1) {
		var classes = this.e.className;
		if (!classes) {
			return false;
		}
		if (classes === c) {
			return true;
		}
		return classes.search("\\b" + c + "\\b") != -1;
	}
};

CssClassList.prototype.add = function(c) {
	if (this.contains(c)) {
		return;
	}
	var classes = this.e.className;
	var hasSpace = (classes[classes.length - 1] == " ");
	if (classes && !hasSpace) {
		c = " " + c;
	}
	this.e.className = classes + c;
};

CssClassList.prototype.remove = function(c) {
	if (c.length != 0 && c.indexOf(" ") == -1) {
		var pattern = new RegExp("\\b" + c + "\\b\\s*", "g");
		var classes = this.e.className;
		this.e.className = classes.replace(pattern, "");
	}
};

CssClassList.prototype.toggle = function(c) {
	if (c.length != 0 && c.indexOf(" ") == -1) {
		if (this.contains(c)) {
			this.remove(c);
			return false;
		} else {
			this.add(c);
			return true;
		}
	}
};

CssClassList.prototype.toString = function() {
	return this.e.className;
};

CssClassList.prototype.toArray = function() {
	return this.e.className.match(/\b\w+\b/g || []);
}