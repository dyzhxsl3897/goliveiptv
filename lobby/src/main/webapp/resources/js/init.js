function back() {
	var url = decodeURIComponent('http://192.168.18.4:8080');

	// 有款烽火机顶盒不支持 decodeURIComponent 这个函数
	if (url == null || url == '') {

		url = 'http://192.168.18.4:8080';
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
window.document.onkeypress = function(keyEvent) {

	keyEvent = keyEvent ? keyEvent : window.event;
	var keyvalue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
	if (keyvalue == KEY_RIGHT || keyvalue == PC_KEY_RIGHT) {
		LobbyControl.pressRight();
	} else if (keyvalue == KEY_LEFT || keyvalue == PC_KEY_LEFT) {
		LobbyControl.pressLeft();
	} else if (keyvalue == KEY_UP || keyvalue == PC_KEY_UP) {
		LobbyControl.pressUp();
	} else if (keyvalue == KEY_DOWN || keyvalue == PC_KEY_DOWN) {
		LobbyControl.pressDown();
	} else if (keyvalue == KEY_ENTER) {
		LobbyControl.pressEnter();
	}
	// G("gameTest").innerHTML = "============="+keyvalue+"=============="

	if (keyvalue == 0x0300) {
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
		var msg = Utility.getEvent();
		msg = eval('(' + msg + ')');
		var eventCode = msg.event_code;
		if (eventCode == undefined) {
			back();
		}
	}

};
document.onkeydown = window.document.onkeypress;
/*-
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
 }
 */
classList(EPG.getElement("Link_" + EPG.currentCard)).add("selected");
