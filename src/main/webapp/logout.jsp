<%@ page import="org.dew.wrapp.*" %>
<!DOCTYPE html>
<% 
	WebUtil.logout(request);
	response.sendRedirect(request.getContextPath());
%>