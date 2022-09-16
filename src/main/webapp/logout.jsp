<%@ page import="org.dew.wrapp.*" %>
<% 
	WebUtil.logout(request);
	response.sendRedirect(request.getContextPath());
%>