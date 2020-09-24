<%@ page import="java.util.Locale, org.dew.wrapp.*" contentType="text/html; charset=UTF-8" %>
<%
	Locale locale  = WebUtil.getLocale(request);
	Object message = request.getAttribute("message");
%>
<!DOCTYPE html>
<html lang="it">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title><%= App.getAppName() %></title>
	<%@ include file="_imp_header.jsp" %>
</head>
<body class="gray-bg">
	<div class="middle-box text-center loginscreen animated fadeInDown">
		<div>
			<div>
				<h1 class="logo-name"><%= App.getAppName() %></h1>
			</div>
			<br>
			<h3><%= App.getMessage(locale, "welcome") %></h3>
			<form class="m-t" role="form" action="login" method="POST" id="loginForm">
				<div class="form-group">
					<input type="text" class="form-control" placeholder="Username" id="j_username" name="j_username" required autofocus>
				</div>
				<div class="form-group">
					<input type="password" class="form-control" placeholder="Password" name="j_password" id="j_password" required>
				</div>
				<% if(message != null) { %>
					<p style="text-align: center; color: #cc0000; font-weight: bold;"><%= message %></p>
				<% } %>
				<br>
				<button type="submit" class="btn btn-primary block full-width m-b"><i class="fa fa-sign-in"></i> <%= App.getMessage(locale, "login") %></button>
			</form>
		</div>
	</div>
	<%@ include file="_imp_footer.jsp" %>
</body>
</html>