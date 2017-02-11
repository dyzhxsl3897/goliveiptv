/**
 * Remote key press function
 */

var LobbyControl = {
	pressUp : function() {
		classList(EPG.getElement("Link_" + EPG.currentCard)).remove("selected");
		EPG.currentCard = HomePageCardMoveMatrix[EPG.currentCard].up;
		classList(EPG.getElement("Link_" + EPG.currentCard)).add("selected");
	},
	pressDown : function() {
		classList(EPG.getElement("Link_" + EPG.currentCard)).remove("selected");
		EPG.currentCard = HomePageCardMoveMatrix[EPG.currentCard].down;
		classList(EPG.getElement("Link_" + EPG.currentCard)).add("selected");
	},
	pressLeft : function() {
		classList(EPG.getElement("Link_" + EPG.currentCard)).remove("selected");
		EPG.currentCard = HomePageCardMoveMatrix[EPG.currentCard].left;
		classList(EPG.getElement("Link_" + EPG.currentCard)).add("selected");
	},
	pressRight : function() {
		classList(EPG.getElement("Link_" + EPG.currentCard)).remove("selected");
		EPG.currentCard = HomePageCardMoveMatrix[EPG.currentCard].right;
		classList(EPG.getElement("Link_" + EPG.currentCard)).add("selected");
	},
	pressEnter : function() {
		location.href = HomePageNavigation[EPG.currentCard].link;
	}
}
