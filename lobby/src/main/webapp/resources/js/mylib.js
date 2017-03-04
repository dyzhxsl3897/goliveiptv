var EPG = {
	currentCard : 1,

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
	},

	getElement : function(id) {
		return document.getElementById(id);
	}
};

var HomePageNavigation = [//
{
	card : 0,
	link : "/"
}, {
	card : 1,
	link : "/tetris/tetris.jsp"
}, {
	card : 2,
	link : "/tohellwithjohnny/tohellwithjohnny.jsp"
}, {
	card : 3,
	link : "/sokoban/sokoban.jsp"
}, {
	card : 4,
	link : "/goldminer/goldminer.jsp"
}, {
	card : 5,
	link : "/flappybird/flappybird.jsp"
}, {
	card : 6,
	link : "/paopaolong/paopaolong.jsp"
} //
];

var HomePageCardMoveMatrix = [// up --> down --> left --> right
{
	card : 0,
	up : 0,
	down : 2,
	left : 0,
	right : 0
}, {
	card : 1,
	up : 0,
	down : 4,
	left : 1,
	right : 2
}, {
	card : 2,
	up : 0,
	down : 3,
	left : 1,
	right : 2
}, {
	card : 3,
	up : 2,
	down : 6,
	left : 1,
	right : 3
}, {
	card : 4,
	up : 1,
	down : 4,
	left : 4,
	right : 5
}, {
	card : 5,
	up : 1,
	down : 5,
	left : 4,
	right : 6
}, {
	card : 6,
	up : 3,
	down : 6,
	left : 5,
	right : 6
} //
];
