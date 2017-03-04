<%@ page isELIgnored="false"%>
<%@ pagecontentType="text/html;charset=UTF-8" %>
<html>
<head>
<meta name="page-view-size" content="640*530" />
<meta http-equiv="Expires" CONTENT="0">
<meta http-equiv="Cache-Control" CONTENT="no-cache">
<meta http-equiv="Pragma" CONTENT="no-cache">

<title>小鸟飞飞</title>
</head>
<body>
	<div style="position: absolute; top: 50px; left: 0px;">
		<h1>哥正在玩儿命给你加载……</h1>
		<h1>这里还需要个图 :)</h1>
		<img alt="" src="/resources/images/loading.gif" style="width:435;height:45;">
	</div>
	<div style="z-index: 99">
		<object id="j2me-object" classid="ipanel:j2me-midp2" width="644" height="534">
			<param name="ServerURL" value="http://202.99.114.28:9191/IPTVGameAPI/">
			<param name="ResourcesURL" value="http://202.99.114.28:9191/IPTVGameResource/game_package/">
			<param name="jad" value="${pageContext.request.contextPath}/resources/games/flappybird/flappybird.jad">
			<param name="jar" value="${pageContext.request.contextPath}/resources/games/flappybird/flappybird.jar">
			<param name="Province" value="GuangDong" />
			<param name="Diqu" value="GuangDong">
			<param name="userId" value="02211111111">
			<param name="userType" value="3">
			<param name="business_monthly" value="3">
			<param name="beans" value="0">
			<param name="gameCode" value="LTG_10034">
			<param name="GameID" value="DefendFairyVillage2">
			<param name="recoCode" value="LTR_10001">
			<param name="NewInterface" value="true">
			<param name="-Xkeypass" value="true">
		</object>
	</div>
	<script src="${pageContext.request.contextPath}/resources/js/const.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/cssutil.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/mylib.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/remoteoperation.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/init.js"></script>
</body>
</html>
