<%@page import="org.json.JSONArray"%>
<%@page import="org.springframework.web.context.WebApplicationContext"%>
<%@page import="java.util.List"%>
<%@page import="com.zhongdan.lobby.bl.services.AdminService"%>
<%@page import="org.springframework.web.context.support.WebApplicationContextUtils"%>
<%@ page isELIgnored="false"%>
<%@ pagecontentType="text/html;charset=UTF-8" %>
<%
	WebApplicationContext context = WebApplicationContextUtils
			.getWebApplicationContext(this.getServletContext());
	AdminService adminService = (AdminService) context.getBean("com.zhongdan.lobby.bl.services.AdminService");
	List<String> games = adminService.getAllAvailableGames();
	JSONArray gamesJson = new JSONArray();
	for (int i = 0; i < games.size(); i++) {
		gamesJson.put(games.get(i));
	}
%>
<html>
<head>
<meta name="page-view-size" content="640*530" />
<meta http-equiv="Expires" CONTENT="0">
<meta http-equiv="Cache-Control" CONTENT="no-cache">
<meta http-equiv="Pragma" CONTENT="no-cache">
<link rel="shortcut icon" href="${pageContext.request.contextPath}/favicon.png" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/game_home.css">
<script src="${pageContext.request.contextPath}/resources/js/const.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/mylib.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/cssutil.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/remoteoperation.js"></script>
<title>游戏页面</title>
</head>
<body>
	<h3 id="headerTxt"></h3>
	<div>
		<img alt="" src="${pageContext.request.contextPath}/resources/images/game_home/iptv.png">
	</div>
	<div>
		<ul id="games">
		</ul>
	</div>
	<script type="text/javascript">
		var games =
	<%=gamesJson.toString()%>
		;
	</script>
	<script type="text/javascript">
		function reloadAllGames() {
			var gamesList = document.getElementById("games");
			gamesList.innerHTML = "";

			var i;
			for (i = 0; i < games.length; i++) {
				var liNode = document.createElement("li");
				var textNode = document.createTextNode(games[i]);
				liNode.setAttribute("id", games[i]);
				if (i == 0) {
					classList(liNode).add("selected");
				} else {
					classList(liNode).remove("selected");
				}
				liNode.appendChild(textNode);
				gamesList.appendChild(liNode);
			}
		}

		function loadBuildVersion()
		{
		    var rawFile = new XMLHttpRequest();
		    rawFile.open("GET", 'buildversion.txt', false);
		    rawFile.onreadystatechange = function ()
		    {
		        if(rawFile.readyState === 4)
		        {
		            if(rawFile.status === 200 || rawFile.status == 0)
		            {
		                var buildversion = rawFile.responseText;
		                var allText = "当前游戏大厅测试版本 (" + buildversion + ")";
		                document.getElementById("headerTxt").innerHTML = allText;
		            }
		        }
		    }
		    rawFile.send(null);
		}

		loadBuildVersion();
		reloadAllGames();
	</script>
</body>
</html>
