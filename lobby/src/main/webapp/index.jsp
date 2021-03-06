<%@ page isELIgnored="false"%>
<%@ pagecontentType="text/html;charset=UTF-8" %>
<html lang="zh">
<head>
<meta http-equiv="Expires" CONTENT="0">
<meta http-equiv="Cache-Control" CONTENT="no-cache">
<meta http-equiv="Pragma" CONTENT="no-cache">
<link rel="shortcut icon" href="${pageContext.request.contextPath}/favicon.png" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/index.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/w3.css">

<style type="text/css">
.myButton {
	box-shadow: 0px 1px 0px 0px #f0f7fa;
	background:linear-gradient(to bottom, #33bdef 5%, #019ad2 100%);
	background-color:#33bdef;
	border-radius:6px;
	border:1px solid #057fd0;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:15px;
	font-weight:bold;
	padding:6px 24px;
	margin:2px 1px;
	text-decoration:none;
	text-shadow:0px -1px 0px #5b6178;
}
.myButton:hover {
	background:linear-gradient(to bottom, #019ad2 5%, #33bdef 100%);
	background-color:#019ad2;
}
.myButton:active {
	position:relative;
	top:1px;
}
</style>

<script src="${pageContext.request.contextPath}/resources/js/jquery-1.12.1.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/jqueryupload/jQuery-File-Upload-9.28.0/js/vendor/jquery.ui.widget.js"></script>
<script src="${pageContext.request.contextPath}/resources/jqueryupload/jQuery-File-Upload-9.28.0/js/jquery.iframe-transport.js"></script>
<script src="${pageContext.request.contextPath}/resources/jqueryupload/jQuery-File-Upload-9.28.0/js/jquery.fileupload.js"></script>
<script src="${pageContext.request.contextPath}/resources/jqueryupload/jQuery-File-Upload-9.28.0/js/jquery.fileupload-process.js"></script>
<script src="${pageContext.request.contextPath}/resources/jqueryupload/jQuery-File-Upload-9.28.0/js/jquery.fileupload-validate.js"></script>

<title>Good IPTV Games</title>

</head>
<body>
	<h4 id="headerTxt"></h4>
	<div>
		<img alt="" src="${pageContext.request.contextPath}/resources/images/index/iptv.png">
	</div>
	<div style="position: fixed; left: 20px;">
		<div>
			<img alt="" src="${pageContext.request.contextPath}/resources/images/index/font_already_uploaded.png">
		</div>
		<div style="position: fixed; top: 40px; left: 550px;">
			<img alt="" src="${pageContext.request.contextPath}/resources/images/index/font_help.png">
		</div>
		<div>
			<div>
				<button class="myButton w3-small" id="refreshAllGamesBtn" onclick="$indexJs.reloadAllGames();">刷新游戏列表</button>
			</div>
			<div class="jquery-fileupload">
				<input id="uploadGame" type="file" name="uploadGame" multiple style="display: none" />
				<button class="myButton w3-small" id="chooseFile">选择jar和jad文件</button>
				<button class="myButton w3-small" id="uploadFile">开始上传</button>
				<button class="myButton w3-small" id="rechooseFile">重新选择</button>
				<button class="myButton w3-small" id="deleteGame" onclick="$indexJs.deleteGame();">删除选中游戏</button>
			</div>
			<div class="jquery-fileupload">
				<input id="uploadResource" type="file" name="uploadResource" multiple style="display: none" />
				<button class="myButton w3-small" id="chooseResourceFile">选择素材文件</button>
				<button class="myButton w3-small" id="uploadResourceFile">开始上传</button>
				<button class="myButton w3-small" id="rechooseResourceFile">重新选择</button>
				<button class="myButton w3-small" id="deleteGame" onclick="$indexJs.deleteResource();">删除选中游戏素材</button>
			</div>
			<iframe id="show_game_iframe" name="show_game_iframe" src="${pageContext.request.contextPath}/show_game.jsp" width="520px" height="500">
			</iframe>
		</div>
		<div id="progress" style="margin-top: 10px; margin-left: 0px; margin-right: 0px; margin-bottom: 0px; background-color: #e1e2e4; height: 20px; width: 336px; border-style: solid; border-width: 1px; border-color: #cccccc;">
			<div class="bar" style="background-color: #4caf50;height: 20px; width: 0%;"></div>
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
			};
	
			$indexJs.reloadAllGames = function() {
				$("#show_game_iframe")[0].contentWindow.$showGameJs.reloadAllGames();
			};

			$indexJs.deleteGame = function() {
				var selectedGame = $("#show_game_iframe").contents().find("#game p a.selected").attr("gameName");
				if (selectedGame != undefined) {
					$.get($indexJs.getContextPath() + "/rest/resources/deletegame/" + selectedGame, function () {
						$indexJs.reloadAllGames();
					});
				}
			};

			$indexJs.deleteResource = function() {
				var selectedResources = [];
				var selectedCheckboxes = $("#show_game_iframe").contents().find("#res p input:checked").each(function() {
					selectedResources.push($(this).val());
				});
				var selectedGame = $("#show_game_iframe").contents().find("#game p a.selected").attr("gameName");
				if (selectedGame != undefined && selectedResources.length > 0) {
					$.ajax({
						type: "POST",
						url: $indexJs.getContextPath() + "/rest/resources/deleteresource/" + selectedGame,
						data: JSON.stringify(selectedResources),
						contentType: "application/json; charset=utf-8",
						success: function (data) {
							$indexJs.reloadAllGames();
						}
					});
				}
			};
	
			$indexJs.initializeGameUploadWidget = function() {
				$("#chooseFile").on("click", function() {
					$("#uploadGame").click();
				});
	
				$('#uploadGame').fileupload({
					url : $indexJs.getContextPath() + '/rest/resources/uploadgame',
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
					$("#upload_failed_div").hide();
					$("#upload_successfully_div").hide();
	
					// 绑定开始上传事件
					$('#uploadFile').click(function() {
						$("#uploadFile").hide();
						data.submit();
						// 解绑，防止重复执行
						$("#uploadFile").off("click");
					})
	
					// 绑定点击重选事件
					$("#rechooseFile").click(function() {
						$("#uploadGame").click();
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
					$('#progress .bar').css('width', progress + '%');
				})
				// 上传请求失败时触发的回调函数
				.on("fileuploadfail", function(e, data) {
				})
				// 上传请求成功时触发的回调函数
				.on("fileuploaddone", function(e, data) {
				})
				// 上传请求结束后，不管成功，错误或者中止都会被触发
				.on("fileuploadalways", function(e, data) {
				})
				// 所有上传停止以后
				.bind('fileuploadstop', function (e) {
					$("#upload_failed_div").hide();
					$("#upload_successfully_div").show();
					$indexJs.reloadAllGames();
					$("#chooseFile").show();
					$("#uploadFile").show();
					$("#rechooseFile").show();
				});
			};

			$indexJs.buildUploadResourceUrl = function() {
				var gameName = $("#show_game_iframe").contents().find("#game p a.selected").attr("gameName");
				return $indexJs.getContextPath() + '/rest/resources/uploadresource/' + gameName;
			};

			$indexJs.initializeResourceUploadWidget = function() {
				$("#chooseResourceFile").on("click", function() {
					$("#uploadResource").click();
				});
	
				$('#uploadResource').fileupload({
					Type : 'POST',
					autoUpload : false,
					acceptFileTypes : /(jpg|png|wav)$/i,
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
					// 根据选中的游戏名字改变URL
					var gameName = $("#show_game_iframe").contents().find("#game p a.selected").attr("gameName");
					if (gameName != undefined) {
						data.url = $indexJs.getContextPath() + '/rest/resources/uploadresource/' + gameName;
						// 隐藏或显示页面元素
						$('#progress .bar').css('width', '0%');
						$('#progress').hide();
						$("#chooseResourceFile").hide();
						$("#uploadResourceFile").show();
						$("#rechooseResourceFile").show();
						$("#upload_failed_div").hide();
						$("#upload_successfully_div").hide();
		
						// 绑定开始上传事件
						$('#uploadResourceFile').click(function() {
							$("#uploadResourceFile").hide();
							data.submit();
							// 解绑，防止重复执行
							$("#uploadResourceFile").off("click");
						})
		
						// 绑定点击重选事件
						$("#rechooseResourceFile").click(function() {
							$("#uploadResource").click();
							// 解绑，防止重复执行
							$("#rechooseResourceFile").off("click");
						})
					}
				})
				// 当一个单独的文件处理队列结束触发(验证文件格式和大小)
				.on("fileuploadprocessalways", function(e, data) {
					// 获取文件
					var file = data.files[0];
					// 获取错误信息
					if (file.error) {
						console.log(file.error);
						$("#uploadResourceFile").hide();
					}
				})
				// 显示上传进度条
				.on("fileuploadprogressall", function(e, data) {
					$('#progress').show();
					var progress = parseInt(data.loaded / data.total * 100, 10);
					$('#progress .bar').css('width', progress + '%');
				})
				// 上传请求失败时触发的回调函数
				.on("fileuploadfail", function(e, data) {
				})
				// 上传请求成功时触发的回调函数
				.on("fileuploaddone", function(e, data) {
				})
				// 上传请求结束后，不管成功，错误或者中止都会被触发
				.on("fileuploadalways", function(e, data) {
				})
				// 所有上传停止以后
				.bind('fileuploadstop', function (e) {
					$("#upload_failed_div").hide();
					$("#upload_successfully_div").show();
					$indexJs.reloadAllGames();
					$("#chooseResourceFile").show();
					$("#uploadResourceFile").show();
					$("#rechooseResourceFile").show();
				});
			};
	
			$indexJs.loadBuildVersion = function() {
				$.get("${pageContext.request.contextPath}/buildversion.txt", function(data) {
					$("#headerTxt").text("当前大厅测试版本 (" + data + ")");
				});
			};
			
			window.$indexJs = $indexJs;
		})(window, undefined);
	
		$(document).ready(function() {
			$indexJs.loadBuildVersion();
			$('#progress').hide();
			$indexJs.initializeGameUploadWidget();
			$indexJs.initializeResourceUploadWidget();
		});
	</script>
</body>
</html>
