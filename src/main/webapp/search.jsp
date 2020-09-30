<%@ page import="java.util.Locale, org.dew.wrapp.*, org.dew.wrapp.util.*" contentType="text/html; charset=UTF-8" %>
<%
	Locale locale = WebUtil.getLocale(request);
	String lang   = WebUtil.getLanguage(locale);
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
			// singular / plural
			sQS = sQS.substring(0, sQS.length()-2);
		}
		sQS = sQS.replace("<", "&lt;").replace(">", "&gt;").replace("&", "&amp;");
	}
%>
<!DOCTYPE html>
<html lang="<%= lang %>">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<title><%= App.getAppName() %> | <%= App.getMessage(locale, "search") %></title>

<%@ include file="_imp_header.jsp"%>
</head>
<body <%= WebUtil.getBodyClass(request) %>>
	<div id="wrapper">
	<% WebUtil.writePageHeader(request, out, App.getMessage(locale, "search"), ""); %>
		<div class="row">
			<div class="col-lg-12">
				<div class="ibox float-e-margins">
					<div class="ibox-content">
						<h2><%= App.getMessage(locale, "term") %>: <span class="text-navy"><%= sQO %></span></h2>
						<br />
						<div class="hr-line-dashed"></div>
						<% WebUtil.writeSearchResult(request, out, locale, sQS); %>
					</div>
				</div>
			</div>
		</div>
	<% WebUtil.writePageFooter(request, out); %>
		<a id="back-to-top" href="#" class="btn btn-primary btn-lg back-to-top" role="button" title="<%= App.getMessage(locale, "top") %>" data-toggle="tooltip" data-placement="left"><span class="glyphicon glyphicon-chevron-up"></span></a>
	</div>
	
	<%@ include  file="_imp_footer.jsp" %>
</body>
</html>