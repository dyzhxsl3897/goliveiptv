<%@ page isELIgnored="false"%>
<%@ pagecontentType="text/html;charset=UTF-8" %>
<html>
<head>
<meta name="page-view-size" content="644*364" />
<meta http-equiv="Expires" CONTENT="0">
<meta http-equiv="Cache-Control" CONTENT="no-cache">
<meta http-equiv="Pragma" CONTENT="no-cache">

<title>游戏页面</title>
</head>
<body>
	<div id="startGame">
		<div style="position: absolute; top: 0px; left: 0px;">
			<img alt="" src="${pageContext.request.contextPath}/resources/images/game/loading.gif" style="width: 640; height: 530;">
		</div>
	</div>
	<div style="z-index: 99">
		<object id="j2me-object" classid="ipanel:j2me-midp2" width="644" height="364">
			<param name="jad" value="${pageContext.request.contextPath}/resources/games/${param.gamename}.jad">
			<param name="jar" value="${pageContext.request.contextPath}/resources/games/${param.gamename}.jar">
		</object>
	</div>
	<script type="text/javascript">
		// 返回
		function back() {
			window.location.href = "http://39.98.243.254:8080/lobby/game_home.jsp";
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

			keyOperateFlag = true;

			keyEvent = keyEvent ? keyEvent : window.event;
			var keyvalue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;

			if (keyvalue == 8 || keyvalue == 126 || keyvalue == 270) {
				back();
				return;
			}

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
		if (stbModel == 'EC2108U_pub') {
			if (window.history && window.history.pushState) {
				window.history.pushState('forward', null, '#');
				window.addEventListener('popstate', forbidBack);
			}

			function forbidBack() {
				window.removeEventListener('popstate', forbidBack);
				window.history.pushState('forward', null, '#');
				window.history.forward(1);
				window.location.replace('${backURI}');
				//window.location.href = '${backURI}';
				return;
			}
		}

		function hiddenPage() {
			document.getElementById('startGame').style.display = 'none';
		}

		function showPage() {
			document.getElementById('startGame').style.display = 'block';
		}
	</script>
</body>
</html>
