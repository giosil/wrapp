<%@ page import="java.util.Locale, org.dew.wrapp.*" contentType="text/html; charset=UTF-8" %>
<%
	Page   wpage  = WebUtil.getPage(request);
	Locale locale = WebUtil.getLocale(request);
	String lang   = WebUtil.getLanguage(locale);
	String debug  = request.getParameter("debug");
%>
<!DOCTYPE html>
<html lang="<%= lang %>">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<title><%= App.getAppName() %> | <%= wpage.getTitle(locale) %></title>

<%@ include file="_imp_header.jsp" %>

<% 
	WebUtil.writePageAttributes(out, wpage);
	
	WebUtil.writeCSSImport(out, wpage);
%>
</head>
<body <%= WebUtil.getBodyClass(request) %>>
	<div id="wrapper">
		<%
			WebUtil.writePageHeader(request, out, wpage.getTitle(locale), wpage.getDescription(locale));
		%>
		<%= wpage.getHeader(locale) %>
		<%= wpage.getContent(locale) %>
		<div id="view-root"></div>
		<%
			WebUtil.writePageFooter(request, out);
		%>
		<%= wpage.getFooter(locale) %>
		<a id="back-to-top" href="#" class="btn btn-primary btn-lg back-to-top" role="button" title="<%= App.getMessage(locale, "top") %>" data-toggle="tooltip" data-placement="left"><span class="glyphicon glyphicon-chevron-up"></span></a>
	</div>
	<%@ include  file="_imp_footer.jsp" %>
	
	<% 
		WebUtil.writeScriptImport(out, wpage, locale, debug);
	%>
	<script>
		<%= wpage.getScript() %>
	</script>
</body>
</html>