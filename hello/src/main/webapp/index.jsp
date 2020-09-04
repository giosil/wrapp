<!DOCTYPE html>
<%
	Object message = request.getAttribute("message");
	if(message == null) message = "";
%>
<html lang="it">
<head>
  <title>Hello</title>
</head>
<body>
  <h1>Hello module 1.0.0</h1>
  
  <strong><%=  message %></strong>
</body>
</html>