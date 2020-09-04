package org.dew.wrapp.web;

import java.io.IOException;

import javax.servlet.ServletException;

import javax.servlet.annotation.WebServlet;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.dew.wrapp.App;

@WebServlet(name = "WebWrapp", loadOnStartup = 1, urlPatterns = { "/wrapp/*" })
public 
class WebWrapp extends HttpServlet
{
  private static final long serialVersionUID = -2452362559094147489L;
  
  public
  void init()
    throws ServletException
  {
    App.startup();
  }
  
  @Override
  protected 
  void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException
  {
    String command = request.getPathInfo();
    if(command != null && command.length() > 0) {
      if(command.startsWith("/")) command = command.substring(1);
    }
    if(command == null || command.length() == 0) {
      command = "reload";
    }
    
    try {
      
      if(command.equalsIgnoreCase("reload")) {
        
        App.reload();
        
      }
      else if(command.equalsIgnoreCase("update")) {
        
        App.update(request.getParameter("module"));
        
      }
      
    }
    catch(Exception ex) {
      ex.printStackTrace();
      response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
      return;
    }
    
    response.setStatus(HttpServletResponse.SC_NO_CONTENT);
  }
  
  public
  void destroy()
  {
    App.shutdown();
  }
}

