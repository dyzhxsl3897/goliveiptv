var EPG = {
	pressLeft : function() {
	},
	pressRight : function() {
	},
	pressUp : function() {
		var element = document.getElementsByClassName("selected")[0];
		var previousSiblingElement = element.previousElementSibling;
		if (null != previousSiblingElement) {
			classList(element).remove("selected");
			classList(previousSiblingElement).add("selected");
		}
	},
	pressDown : function() {
		var element = document.getElementsByClassName("selected")[0];
		var nextSiblingElement = element.nextElementSibling;
		if (null != nextSiblingElement) {
			classList(element).remove("selected");
			classList(nextSiblingElement).add("selected");
		}
	},
	pressEnter : function() {
		var gameId = document.getElementsByClassName("selected")[0].id;
		window.location.href = "http://39.98.243.254:8080/lobby/game.jsp?gamename="
				+ gameId;
	}
};
