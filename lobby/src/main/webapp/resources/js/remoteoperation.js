function back() {
	var url = decodeURIComponent('http://39.98.243.254:8080/lobby/game_home.jsp');

	// 有款烽火机顶盒不支持 decodeURIComponent 这个函数
	if (url == null || url == '') {
		url = 'http://39.98.243.254:8080/lobby/game_home.jsp';
	}

	window.location.href = url;
}
window.JVM_EVENT = {
	DOWNLOAD_START : 0,
	DOWNLOAD_END : 1,
	PLAY_START : 2,
	PLAY_END : 3,
	DOWNLOAD_ERROR : 4,
	PLAY_ERROR : 5,
	RESULT_ERROR : 1,
	isError : function(eventResult) {
		if (eventResult == RESULT_ERROR)
			return true;
		return false;
	},
	notError : function(eventResult) {
		return !this.isError(eventResult);
	}
};

window.document.onkeydown = function(keyEvent) {
	keyEvent = keyEvent ? keyEvent : window.event;
	var keyvalue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
	if (keyvalue == PC_KEY_RIGHT) {
		EPG.pressRight();
	} else if (keyvalue == PC_KEY_LEFT) {
		EPG.pressLeft();
	} else if (keyvalue == PC_KEY_UP) {
		EPG.pressUp();
	} else if (keyvalue == PC_KEY_DOWN) {
		EPG.pressDown();
	} else if (keyvalue == KEY_ENTER) {
		EPG.pressEnter();
	}
}

window.document.onkeypress = function(keyEvent) {
	keyEvent = keyEvent ? keyEvent : window.event;
	var keyvalue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
	if (keyvalue == KEY_RIGHT || keyvalue == PC_KEY_RIGHT) {
		EPG.pressRight();
	} else if (keyvalue == KEY_LEFT || keyvalue == PC_KEY_LEFT) {
		EPG.pressLeft();
	} else if (keyvalue == KEY_UP || keyvalue == PC_KEY_UP) {
		EPG.pressUp();
	} else if (keyvalue == KEY_DOWN || keyvalue == PC_KEY_DOWN) {
		EPG.pressDown();
	} else if (keyvalue == KEY_ENTER) {
		EPG.pressEnter();
	} else if (keyvalue == 0x0300) {
		var msg = Utility.getEvent();
		msg = eval('(' + msg + ')');
		var type = msg.type;
		var eventCode = msg.event_code;
		if (type != 'EVENT_JVM_CLIENT') {
			return;
		}
		switch (eventCode) {
		case JVM_EVENT.DOWNLOAD_START:
			break;
		case JVM_EVENT.DOWNLOAD_END:
			break;
		case JVM_EVENT.PLAY_START:
			break;
		case JVM_EVENT.PLAY_END: {
			showPage();
			back();
		}
			break;
		case JVM_EVENT.DOWNLOAD_ERROR: {
			showPage();
			back();
		}
			break;
		case JVM_EVENT.PLAY_ERROR: {
			showPage();
			back();
		}
			break;
		default:
			break;
		}
	} else {
		// var msg = Utility.getEvent();
		var msg = "other options";
		msg = eval('(' + msg + ')');
		var eventCode = msg.event_code;
		if (eventCode == undefined) {
			back();
		}
	}

};
