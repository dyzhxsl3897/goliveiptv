<%@ page isELIgnored="false"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="page-view-size" content="640*530" />
<meta http-equiv="Expires" CONTENT="0">
<meta http-equiv="Cache-Control" CONTENT="no-cache">
<meta http-equiv="Pragma" CONTENT="no-cache">

<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/index.css">

<title>Tetris Game Pad</title>
</head>
<body background="${pageContext.request.contextPath}/resources/images/Background.png">
	<div id="playboard" style="position: absolute; top: 40px; left: 185px; width: 270px; height: 450px;"></div>
	<div id="next" style="position: absolute; top: 100px; left: 470px; width: 150px; height: 150px;"></div>
	<img id="levelImg" src="${pageContext.request.contextPath}/resources/images/level.png" style="position: absolute; top: 75px; left: 45px; width: 55px; height: 55px;" />
	<div id="level" style="position: absolute; top: 85px; left: 55px; width: 35px; height: 35px;"></div>
	<div id="score" style="position: absolute; top: 225px; left: 30px; width: 100px; height: 20px;"></div>
	<script src="${pageContext.request.contextPath}/resources/js/const.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/mylib.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/remoteoperation.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/init.js"></script>
</body>
</html>
