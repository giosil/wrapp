<%@ page import="java.util.Locale, org.dew.wrapp.*" contentType="text/html; charset=UTF-8" %>
<%
	Locale locale = WebUtil.getLocale(request);
	String lang   = WebUtil.getLanguage(locale);
%>
<!DOCTYPE html>
<html lang="<%= lang %>">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<title><%= App.getAppName() %> | <%= App.getMessage(locale, "home") %></title>

<%@ include file="_imp_header.jsp" %>
</head>
<body <%=WebUtil.getBodyClass(request)%>>
	<div id="wrapper">
		<%
			WebUtil.writePageHeader(request, out, App.getMessage(locale, "home"), "");
		%>
		<h2><%= App.getMessage(locale, "welcome") %></h2>
		<%
			WebUtil.writePageFooter(request, out);
		%>
	</div>
	<%@ include  file="_imp_footer.jsp" %>
</body>
</html>