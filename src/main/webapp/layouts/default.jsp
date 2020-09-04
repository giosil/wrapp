<%@ page import="org.dew.wrapp.*" %>
<%
	Page wpage = WebUtil.getPage(request);
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<title><%= wpage.getTitle() %></title>

<%@ include file="_imp_header.jsp" %>

<% 
	WebUtil.writePageAttributes(out, wpage);
%>
<% 
	WebUtil.writeCSSImport(out, wpage);
%>
</head>
<body <%=WebUtil.getBodyClass(request)%>>
	<div id="wrapper">
		<%
			WebUtil.writePageHeader(request, out, wpage.getTitle(), wpage.getDescription());
		%>
		<%= wpage.getHeader() %>
		<%= wpage.getContent() %>
		<div id="view-root"></div>
		<%
			WebUtil.writePageFooter(request, out);
		%>
		<%= wpage.getFooter() %>
		<a id="back-to-top" href="#" class="btn btn-primary btn-lg back-to-top" role="button" title="Top" data-toggle="tooltip" data-placement="left"><span class="glyphicon glyphicon-chevron-up"></span></a>
	</div>
	<%@ include  file="_imp_footer.jsp" %>
	
	<% 
		WebUtil.writeScriptImport(out, wpage);
	%>
	<script>
		<%= wpage.getScript() %>
	</script>
</body>
</html>