package org.dew.wrapp.web;

import java.io.*;

import javax.servlet.http.*;

import org.dew.wrapp.User;
import org.dew.wrapp.WebUtil;

import javax.servlet.*;
import javax.servlet.annotation.WebServlet;

@WebServlet(name = "WebLogin", loadOnStartup = 0, urlPatterns = { "/login" })
public 
class WebLogin extends HttpServlet 
{
  private static final long serialVersionUID = 2981713432753542045L;
  
  public 
  void doGet(HttpServletRequest request, HttpServletResponse response) 
    throws ServletException, IOException 
  {
    doPost(request, response);
  }
  
  public 
  void doPost(HttpServletRequest request, HttpServletResponse response) 
    throws ServletException, IOException 
  {
    User user = WebUtil.login(request);
    
    if(user != null) {
      RequestDispatcher requestDispatcher = request.getRequestDispatcher("/home.jsp");
      requestDispatcher.forward(request, response);
    }
    else {
      RequestDispatcher requestDispatcher = request.getRequestDispatcher("/index.jsp");
      requestDispatcher.forward(request, response);
    }
  }
}
