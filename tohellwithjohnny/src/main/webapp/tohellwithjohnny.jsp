<%@ page isELIgnored="false"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="page-view-size" content="640*530" />
<meta http-equiv="Expires" CONTENT="0">
<meta http-equiv="Cache-Control" CONTENT="no-cache">
<meta http-equiv="Pragma" CONTENT="no-cache">

<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/base.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/tohellwithjohnny.css">

<title>To Hell With Johnny</title>
</head>
<body background="${pageContext.request.contextPath}/resources/images/background.png">
	<div id="main">
		<div id="gamePanel" tabindex="0">
			<div class="score">
				Current Level:&nbsp;<span id="score">0</span>
			</div>
			<div id="startBtn" onclick="Start(this)"></div>
		</div>
	</div>
	<script src="${pageContext.request.contextPath}/resources/js/const.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/mylib.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/remoteoperation.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/init.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/tohellwithjohnny/Player.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/tohellwithjohnny/BlockBase.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/tohellwithjohnny/NormalBlock.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/tohellwithjohnny/FlipBlock.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/tohellwithjohnny/ThornBlock.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/tohellwithjohnny/MissBlock.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/tohellwithjohnny/BlockFactory.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/tohellwithjohnny/Game.js"></script>
</body>
</html>
