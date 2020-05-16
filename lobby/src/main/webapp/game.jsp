<%@ page isELIgnored="false"%>
<%@ pagecontentType="text/html;charset=UTF-8" %>
<html>
<head>
<meta name="page-view-size" content="644*534" />
<meta http-equiv="Expires" CONTENT="0">
<meta http-equiv="Cache-Control" CONTENT="no-cache">
<meta http-equiv="Pragma" CONTENT="no-cache">
<link rel="shortcut icon" href="${pageContext.request.contextPath}/favicon.png" />

<title>游戏页面</title>
</head>
<body>
	<div id="startGame">
		<div style="position: absolute; top: 0px; left: 0px;">
			<img alt="" src="${pageContext.request.contextPath}/resources/images/game/loading.gif" style="width: 640; height: 530;">
		</div>
	</div>
	<div style="z-index: 99">
		<object id="j2me-object" classid="ipanel:j2me-midp2" width="644" height="534">
			<param name="jad" value="http://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}/rest/resources/jad/${param.gamename}.jad">
            <param name="jar" value="http://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}/rest/resources/jad/${param.gamename}.jar">
			<param name="userid" value="053702181995_216">
			<param name="localAddr" value="${pageContext.request.localAddr}">
			<param name="localName" value="${pageContext.request.localName}">
			<param name="localPort" value="${pageContext.request.localPort}">
			<param name="contextPath" value="${pageContext.request.contextPath}">
			<param name="pathInfo" value="${pageContext.request.pathInfo}">
			<param name="pathTranslated" value="${pageContext.request.pathTranslated}">
			<param name="protocol" value="${pageContext.request.protocol}">
			<param name="queryString" value="${pageContext.request.queryString}">
			<param name="remoteAddr" value="${pageContext.request.remoteAddr}">
			<param name="remoteHost" value="${pageContext.request.remoteHost}">
			<param name="remotePort" value="${pageContext.request.remotePort}">
			<param name="remoteUser" value="${pageContext.request.remoteUser}">
			<param name="requestURI" value="${pageContext.request.requestURI}">
			<param name="requestURL" value="${pageContext.request.requestURL}">
			<param name="serverName" value="${pageContext.request.serverName}">
			<param name="serverPort" value="${pageContext.request.serverPort}">
			<param name="servletPath" value="${pageContext.request.servletPath}">
			<param name="apiurl" value="http://39.98.243.254:8080/lobby/rest">
			<param name="imageurl" value="http://39.98.243.254:8080/lobby/rest/resources/image">
			<param name="audiourl" value="http://39.98.243.254:8080/lobby/rest/resources/audio">
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
