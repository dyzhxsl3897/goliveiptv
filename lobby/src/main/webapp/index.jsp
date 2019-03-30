<%@ page isELIgnored="false"%>
<%@ pagecontentType="text/html;charset=UTF-8" %>
<html lang="zh">
<head>
<meta http-equiv="Expires" CONTENT="0">
<meta http-equiv="Cache-Control" CONTENT="no-cache">
<meta http-equiv="Pragma" CONTENT="no-cache">
<link rel="shortcut icon" href="#" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/index.css">

<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/jqueryui/jquery-ui-1.12.1.custom/jquery-ui.min.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/jqueryui/jquery-ui-1.12.1.custom/jquery-ui.theme.min.css">

<script src="${pageContext.request.contextPath}/resources/js/jquery-1.12.1.min.js"></script>

<script src="${pageContext.request.contextPath}/resources/jqueryui/jquery-ui-1.12.1.custom/jquery-ui.min.js"></script>

<script src="${pageContext.request.contextPath}/resources/jqueryupload/jQuery-File-Upload-9.28.0/js/vendor/jquery.ui.widget.js"></script>
<script src="${pageContext.request.contextPath}/resources/jqueryupload/jQuery-File-Upload-9.28.0/js/jquery.iframe-transport.js"></script>
<script src="${pageContext.request.contextPath}/resources/jqueryupload/jQuery-File-Upload-9.28.0/js/jquery.fileupload.js"></script>
<script src="${pageContext.request.contextPath}/resources/jqueryupload/jQuery-File-Upload-9.28.0/js/jquery.fileupload-process.js"></script>
<script src="${pageContext.request.contextPath}/resources/jqueryupload/jQuery-File-Upload-9.28.0/js/jquery.fileupload-validate.js"></script>

<title>Good IPTV Games</title>
</head>
<body>
	<div>
		<img alt="" src="${pageContext.request.contextPath}/resources/images/index/iptv.png">
	</div>
	<div style="position: fixed; left: 60px;">
		<div>
			<img alt="" src="${pageContext.request.contextPath}/resources/images/index/font_already_uploaded.png">
		</div>
		<div style="position: fixed; top: 40px; left: 450px;">
			<img alt="" src="${pageContext.request.contextPath}/resources/images/index/font_help.png">
		</div>
		<div>
			<button class="ui-button ui-widget ui-corner-all" id="refreshAllGamesBtn" onclick="reloadAllGames();">刷新游戏列表</button>
			<div class="menu">
				<ul id="menu">
				</ul>
			</div>
			<div class="jquery-fileupload">
				<div class="">
					<input id="uploadImg" type="file" name="uploadImg" multiple style="display: none" />
					<button class="ui-button ui-widget ui-corner-all" id="chooseFile">+选择文件</button>
					<button class="ui-button ui-widget ui-corner-all" id="uploadFile">~开始上传</button>
					<button class="ui-button ui-widget ui-corner-all" id="rechooseFile">+重新选择</button>
				</div>
				<div id="progress">
					<div class="bar" style="width: 0%;"></div>
				</div>
			</div>
		</div>
		<div>
			<div id="upload_successfully_div" style="position: relative; top: 20px; left: 10px; display: none;">
				<img alt="" src="${pageContext.request.contextPath}/resources/images/index/font_upload_successfully.png">
			</div>
			<div id="upload_failed_div" style="position: relative; top: 20px; left: 10px; display: none;">
				<img alt="" src="${pageContext.request.contextPath}/resources/images/index/font_upload_failed.png">
			</div>
		</div>
	</div>

	<script type="text/javascript">
		function getContextPath() {
			return "${pageContext.request.contextPath}";
		}
	</script>
	<script src="${pageContext.request.contextPath}/resources/js/index.js"></script>
</body>
</html>
