<%@ page import="java.util.Locale, org.dew.wrapp.*" contentType="text/html; charset=UTF-8" %>
<%
	Locale locale  = WebUtil.getLocale(request);
	String lang    = WebUtil.getLanguage(locale);
	Object message = request.getAttribute("message");
%>
<!DOCTYPE html>
<html lang="<%= lang %>">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<title><%= App.getAppName() %> | <%= App.getMessage(locale, "message") %></title>

<%@ include file="_imp_header.jsp" %>

</head>
<body <%=WebUtil.getBodyClass(request)%>>
	<div id="wrapper">
		<%
			WebUtil.writePageHeader(request, out, App.getMessage(locale, "message"), "");
		%>
		<div id="view-root">
		<% if(message != null) { %>
			<strong><%= message %></strong>
		<%  } %>
		</div>
		<%
			WebUtil.writePageFooter(request, out);
		%>
	</div>
	<%@ include  file="_imp_footer.jsp" %>
</body>
</html>