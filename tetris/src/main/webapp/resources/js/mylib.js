/**
 * Main library
 */
var KEY_BACK = 0x0008; // 返回/删除
var KEY_ENTER = 0x000D; // 确定
var KEY_PAGE_UP = 0x0021; // 上页
var KEY_PAGE_DOWN = 0x0022; // 下页
var KEY_LEFT = 0x0025; // 左
var KEY_UP = 0x0026; // 上
var KEY_RIGHT = 0x0027; // 右
var KEY_DOWN = 0x0028; // 下
var PC_KEY_LEFT = 37; // pc左
var PC_KEY_UP = 38; // pc上
var PC_KEY_RIGHT = 39; // pc右
var PC_KEY_DOWN = 40; // pc下
var KEY_0 = 0x0030; // 0
var KEY_1 = 0x0031; // 1
var KEY_2 = 0x0032; // 2
var KEY_3 = 0x0033; // 3
var KEY_4 = 0x0034; // 4
var KEY_5 = 0x0035; // 5
var KEY_6 = 0x0036; // 6
var KEY_7 = 0x0037; // 7
var KEY_8 = 0x0038; // 8
var KEY_9 = 0x0039; // 9
var KEY_VOL_UP = 0x0103; // Vol+，音量加
var KEY_VOL_DOWN = 0x0104; // Vol-，音量减
var KEY_MUTE = 0x0105; // Mute，静音
var KEY_TRACK = 0x0106; // Audio Track，切换音轨
var KEY_PLAY_PAUSE = 0x0107; // >||，播放，暂停
var KEY_FAST_FORWARD = 0x0108; // >> ，快进
var KEY_FAST_REWIND = 0x0109; // << ，快退
var KEY_IPTV_EVENT = 0x0300; // 虚拟事件按键
var KEY_RED = 0x0113; // 红色键
var KEY_GREEN = 0x0114; // 绿色键
var KEY_YELLOW = 0x0115; // 黄色键
var KEY_BLUE = 0x0116; // 蓝色键

var EPG = {
	getElement : function(id) {
		return document.getElementById(id);
	},

	cumulativeOffset : function(element) {
		var top = 0, left = 0;
		do {
			top += element.offsetTop || 0;
			left += element.offsetLeft || 0;
			element = element.offsetParent;
		} while (element);
		return {
			top : top,
			left : left
		};
	}
};