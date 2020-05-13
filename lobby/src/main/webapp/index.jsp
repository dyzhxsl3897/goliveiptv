<%@ page isELIgnored="false"%>
<%@ pagecontentType="text/html;charset=UTF-8" %>
<html lang="zh">
<head>
<meta http-equiv="Expires" CONTENT="0">
<meta http-equiv="Cache-Control" CONTENT="no-cache">
<meta http-equiv="Pragma" CONTENT="no-cache">
<link rel="shortcut icon" href="${pageContext.request.contextPath}/favicon.png" />
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
	<h3 id="headerTxt"></h3>
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
			<button class="ui-button ui-widget ui-corner-all" id="refreshAllGamesBtn" onclick="$indexJs.reloadAllGames();">刷新游戏列表</button>
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
		(function(window, undefined) {
			var $indexJs = {};
	
			$indexJs.getContextPath = function() {
				return "${pageContext.request.contextPath}";
			}
	
			$indexJs.reloadAllGames = function() {
				$("#menu").html("");
	
				$.get($indexJs.getContextPath() + "/rest/admin/getallgames", function(data) {
					var allGames = data.allGames;
					var i;
					for (i = 0; i < allGames.length; i++) {
						$("#menu").append("<li><div>" + allGames[i] + "</div></li>");
					}
				});
			}
	
			$indexJs.initializeFileUploadWidget = function() {
				$("#chooseFile").on("click", function() {
					$("#uploadImg").click();
				});
	
				$('#uploadImg').fileupload({
					url : $indexJs.getContextPath() + '/rest/admin/uploadgame',
					Type : 'POST',
					autoUpload : false,
					acceptFileTypes : /(jar|jad)$/i,
					maxNumberOfFiles : 1,// 最大上传文件数目
					maxFileSize : 100000000, // 文件上限100MB
					minFileSize : 1,// 文件下限 1B
					messages : {// 文件错误信息
						acceptFileTypes : '文件类型不匹配',
						maxFileSize : '文件过大',
						minFileSize : '文件过小'
					}
				})// 图片添加完成后触发的事件
				.on("fileuploadadd", function(e, data) {
					// 隐藏或显示页面元素
					$('#progress .bar').css('width', '0%');
					$('#progress').hide();
					$("#chooseFile").hide();
					$("#uploadFile").show();
					$("#rechooseFile").show();
	
					// 绑定开始上传事件
					$('#uploadFile').click(function() {
						$("#uploadFile").hide();
						data.submit();
						// 解绑，防止重复执行
						$("#uploadFile").off("click");
					})
	
					// 绑定点击重选事件
					$("#rechooseFile").click(function() {
						$("#uploadImg").click();
						// 解绑，防止重复执行
						$("#rechooseFile").off("click");
					})
				})
				// 当一个单独的文件处理队列结束触发(验证文件格式和大小)
				.on("fileuploadprocessalways", function(e, data) {
					// 获取文件
					var file = data.files[0];
					// 获取错误信息
					if (file.error) {
						console.log(file.error);
						$("#uploadFile").hide();
					}
				})
				// 显示上传进度条
				.on("fileuploadprogressall", function(e, data) {
					$('#progress').show();
					var progress = parseInt(data.loaded / data.total * 100, 10);
					$('#progress').css('width', '15%');
					$('#progress .bar').css('width', progress + '%');
				})
				// 上传请求失败时触发的回调函数
				.on("fileuploadfail", function(e, data) {
					console.log(data.errorThrown);
					$("#upload_successfully_div").hide();
					$("#upload_failed_div").show();
				})
				// 上传请求成功时触发的回调函数
				.on("fileuploaddone", function(e, data) {
					console.log(data.result);
					$("#upload_failed_div").hide();
					$("#upload_successfully_div").show();
					$indexJs.reloadAllGames();
				})
				// 上传请求结束后，不管成功，错误或者中止都会被触发
				.on("fileuploadalways", function(e, data) {
	
				})
			}
	
			$indexJs.loadBuildVersion = function() {
				$.get("${pageContext.request.contextPath}/buildversion.txt", function(data) {
					$("#headerTxt").text("当前大厅测试版本 (" + data + ")");
				});
			};
			
			window.$indexJs = $indexJs;
		})(window, undefined);
	
		$(document).ready(function() {
			$indexJs.loadBuildVersion();
			$indexJs.initializeFileUploadWidget();
			$indexJs.reloadAllGames();
		});
	</script>
</body>
</html>
