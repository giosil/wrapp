<%@ page import="org.dew.wrapp.*" %>
<%
	User user = WebUtil.checkUser(request, response);
	if (user == null) return;
	Object oMessage = request.getAttribute("message");
	String sMessage = oMessage != null ? oMessage.toString() : "";
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<title>Wrapp | Message</title>

<%@ include file="_imp_header.jsp" %>

</head>
<body <%=WebUtil.getBodyClass(request)%>>
	<div id="wrapper">
		<%
			WebUtil.writePageHeader(request, out, "Message", "");
		%>
		<div id="view-root">
			<strong><%= sMessage %></strong>
		</div>
		<%
			WebUtil.writePageFooter(request, out);
		%>
	</div>
	<%@ include  file="_imp_footer.jsp" %>
</body>
</html>