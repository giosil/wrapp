package org.dew.wrapp.web;

import java.io.*;
import java.util.logging.Logger;

import javax.servlet.http.*;

import org.dew.wrapp.User;
import org.dew.wrapp.WebUtil;

import org.dew.wrapp.log.LoggerFactory;

import javax.servlet.*;
import javax.servlet.annotation.WebServlet;

@WebServlet(name = "WebLogin", loadOnStartup = 0, urlPatterns = { "/login" })
public 
class WebLogin extends HttpServlet 
{
  private static final long serialVersionUID = -5974493225737900330L;
  
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
    Logger logger = LoggerFactory.getLogger(WebLogin.class);
    
    User user = WebUtil.login(request);
    
    if(user != null) {
      logger.fine(user.getName() + " logged in.");
      
      RequestDispatcher requestDispatcher = request.getRequestDispatcher("/home.jsp");
      requestDispatcher.forward(request, response);
    }
    else {
      logger.fine("access rejected");
      
      RequestDispatcher requestDispatcher = request.getRequestDispatcher("/index.jsp");
      requestDispatcher.forward(request, response);
    }
  }
}
