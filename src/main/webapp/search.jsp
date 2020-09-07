<%@ page import="org.dew.wrapp.*, org.dew.wrapp.util.*" %>
<%
	User user = WebUtil.checkUser(request, response);
	if(user == null) return;
	String sQO = null;
	String sQS = request.getParameter("qs");
	if(sQS == null) {
		sQS = "";
		sQO = "";
	}
	else {
		sQO = WUtil.toHTMLText(sQS, "");
		sQS = sQS.toLowerCase();
		if(sQS.length() > 3) {
			// singolare / plurale
			sQS = sQS.substring(0, sQS.length()-2);
		}
		sQS = sQS.replace("<", "&lt;").replace(">", "&gt;").replace("&", "&amp;");
	}
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<title><%= App.getAppName() %> | <%= App.getMessage("search") %></title>

<%@ include file="_imp_header.jsp"%>
</head>
<body <%=WebUtil.getBodyClass(request)%>>
	<div id="wrapper">
	<% WebUtil.writePageHeader(request, out, App.getMessage("search"), "Internal search engine."); %>
		<div class="row">
			<div class="col-lg-12">
				<div class="ibox float-e-margins">
					<div class="ibox-content">
						<h2>Term: <span class="text-navy"><%= sQO %></span></h2>
						<small>Search performed within the portal</small> <br />
						<div class="hr-line-dashed"></div>
						<% WebUtil.writeSearchResult(request, out, sQS); %>
					</div>
				</div>
			</div>
		</div>
	<% WebUtil.writePageFooter(request, out); %>
		<a id="back-to-top" href="#" class="btn btn-primary btn-lg back-to-top" role="button" title="Top" data-toggle="tooltip" data-placement="left"><span class="glyphicon glyphicon-chevron-up"></span></a>
	</div>
	
	<%@ include  file="_imp_footer.jsp" %>
</body>
</html>