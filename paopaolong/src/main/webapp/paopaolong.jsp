<%@ page isELIgnored="false"%>
<%@ pagecontentType="text/html;charset=UTF-8" %>
<html>
<head>
<meta name="page-view-size" content="640*530" />
<meta http-equiv="Expires" CONTENT="0">
<meta http-equiv="Cache-Control" CONTENT="no-cache">
<meta http-equiv="Pragma" CONTENT="no-cache">

<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/paopaolong.css">

<title>泡泡龙</title>
</head>
<body background="${pageContext.request.contextPath}/resources/images/Background.png">
	<div id="playboard" style="position: absolute; top: 80px; left: 7px; width: 506px; height: 450px;"></div>
	<img id="arrowImg" src="${pageContext.request.contextPath}/resources/images/arrow.png" style="position: absolute; top: 410px; left: 190px;" />
	<script src="${pageContext.request.contextPath}/resources/js/const.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/mylib.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/remoteoperation.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/init.js"></script>
</body>
</html>
