<%@ page isELIgnored="false"%>
<%@ pagecontentType="text/html;charset=UTF-8" %>
<html lang="zh">
<head>
<meta http-equiv="Expires" CONTENT="0">
<meta http-equiv="Cache-Control" CONTENT="no-cache">
<meta http-equiv="Pragma" CONTENT="no-cache">
<link rel="shortcut icon" href="${pageContext.request.contextPath}/favicon.png" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/w3.css">

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
	<div class="w3-cell-row">
		<div class="w3-container w3-cell" style="width: 50%;">
			<div id="game">
			</div>
		</div>
		
		<div class="w3-container w3-cell" style="width: 50%;">
			<div id="res">
			</div>
		</div>
	</div>
	<script type="text/javascript">
	(function(window, undefined) {
		var $showGameJs = {};

		$showGameJs.getContextPath = function() {
			return "${pageContext.request.contextPath}";
		}

		$showGameJs.getResource = function(gameName) {
			var res = $("#res");
			$(res).html("");
			
			$.get($showGameJs.getContextPath() + "/rest/admin/getgameresources/" + gameName, function(data) {
				var allRes = data.allResources;
				for (i = 0; i < allRes.length; i++) {
					var resParagraph = document.createElement("p");
					var checkBox = document.createElement("input");
					$(resParagraph).append();
					var label = document.createElement("label");
					$(resParagraph).html(allRes[i]);
					$(res).append(resParagraph);
				}
			});
		};

		$showGameJs.reloadAllGames = function() {
			var game = $("#game");
			var res = $("#res");
			$(game).html("");
			$(res).html("");

			$.get($showGameJs.getContextPath() + "/rest/admin/getallgames", function(data) {
				var allGames = data.allGames;
				for (i = 0; i < allGames.length; i++) {
					var gameParagraph = document.createElement("p");
					var gameLink = document.createElement("a");
					$(gameParagraph).append(gameLink);
					$(gameLink).html(allGames[i]);
					$(gameLink).attr('href', "#");
					$(gameLink).attr('gameName', allGames[i]);
					$(gameLink).click(function() {
						$showGameJs.getResource($(this).attr("gameName"));
					});
					$(game).append(gameParagraph);
				}
			});
		}

		window.$showGameJs = $showGameJs;
	})(window, undefined);

	$(document).ready(function() {
		$showGameJs.reloadAllGames();
	});
	</script>
</body>