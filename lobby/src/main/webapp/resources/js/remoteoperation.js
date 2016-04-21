/**
 * Remote key press function
 */

var LobbyControl = {
	pressUp : function() {
		EPG.getElement("Link_" + EPG.currentCard).classList.remove("selected");
		EPG.currentCard = HomePageCardMoveMatrix[EPG.currentCard].up;
		EPG.getElement("Link_" + EPG.currentCard).classList.add("selected");
	},
	pressDown : function() {
		EPG.getElement("Link_" + EPG.currentCard).classList.remove("selected");
		EPG.currentCard = HomePageCardMoveMatrix[EPG.currentCard].down;
		EPG.getElement("Link_" + EPG.currentCard).classList.add("selected");
	},
	pressLeft : function() {
		EPG.getElement("Link_" + EPG.currentCard).classList.remove("selected");
		EPG.currentCard = HomePageCardMoveMatrix[EPG.currentCard].left;
		EPG.getElement("Link_" + EPG.currentCard).classList.add("selected");
	},
	pressRight : function() {
		EPG.getElement("Link_" + EPG.currentCard).classList.remove("selected");
		EPG.currentCard = HomePageCardMoveMatrix[EPG.currentCard].right;
		EPG.getElement("Link_" + EPG.currentCard).classList.add("selected");
	},
	pressEnter : function() {
		location.href = HomePageNavigation[EPG.currentCard].link;
	}
}
