<%@ page import="org.dew.wrapp.*, org.dew.wrapp.util.*" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<title>Wrapp | Help</title>

<%@ include file="_imp_header.jsp"%>
</head>
<body <%=WebUtil.getBodyClass(request)%>>
	<div id="wrapper">
	<% WebUtil.writePageHeader(request, out, "Help", "Manual and resources."); %>
		<div class="row">
			<div class="col-lg-12">
				<div class="ibox float-e-margins">
					<div class="ibox-content">
						<h2>Help page</h2>
						Manual and resources.
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