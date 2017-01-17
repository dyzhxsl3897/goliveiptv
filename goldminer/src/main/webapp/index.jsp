<%@ page isELIgnored="false"%>
<%@ pagecontentType="text/html;charset=UTF-8" %>
<html>
<head>
<meta name="page-view-size" content="640*530" />
<meta http-equiv="Expires" CONTENT="0">
<meta http-equiv="Cache-Control" CONTENT="no-cache">
<meta http-equiv="Pragma" CONTENT="no-cache">

<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/index.css">

<title>Gold Miner</title>
</head>
<body background="${pageContext.request.contextPath}/resources/images/Background.png">
	<img src="${pageContext.request.contextPath}/resources/images/info/money.png" style="position: absolute; top: 10px; left: 0px;" />
	<img src="${pageContext.request.contextPath}/resources/images/info/goal.png" style="position: absolute; top: 50px; left: 0px;" />
	<img src="${pageContext.request.contextPath}/resources/images/info/time.png" style="position: absolute; top: 10px; left: 480px;" />
	<img src="${pageContext.request.contextPath}/resources/images/info/level.png" style="position: absolute; top: 50px; left: 480px;" />
	<div id="hookboard" style="position: absolute; top: 100px; left: 0px; width: 640px; height: 430px;"></div>
	<div id="playboard" style="position: absolute; top: 150px; left: 0px; width: 640px; height: 380px;"></div>
	<script src="${pageContext.request.contextPath}/resources/js/const.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/mylib.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/remoteoperation.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/init.js"></script>
</body>
</html>
