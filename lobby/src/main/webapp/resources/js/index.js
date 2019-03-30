function reloadAllGames() {
	$("#menu").html("");

	$.get(getContextPath() + "/rest/admin/getallgames", function(data) {
		var allGames = data.allGames;
		var i;
		for (i = 0; i < allGames.length; i++) {
			$("#menu").append("<li><div>" + allGames[i] + "</div></li>");
		}
	});
}

function initializeFileUploadWidget() {
	$("#chooseFile").on("click", function() {
		$("#uploadImg").click();
	});

	$('#uploadImg').fileupload({
		url : getContextPath() + '/rest/admin/uploadgame',
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
		reloadAllGames();
	})
	// 上传请求结束后，不管成功，错误或者中止都会被触发
	.on("fileuploadalways", function(e, data) {

	})
}

$(document).ready(function() {
	initializeFileUploadWidget();

	reloadAllGames();
});