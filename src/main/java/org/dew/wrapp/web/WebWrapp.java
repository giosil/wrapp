package org.dew.wrapp.web;

import java.io.IOException;

import javax.servlet.ServletException;

import javax.servlet.annotation.WebServlet;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.dew.wrapp.App;
import org.dew.wrapp.User;
import org.dew.wrapp.WebUtil;

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
  void doPost(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException
  {
    doGet(request, response);
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
        
        String module  = request.getParameter("module");
        String oldPassword = request.getParameter("op");
        
        if(module != null && module.length() > 0) {
          App.update(request.getParameter("module"));
        }
        else if(oldPassword != null && oldPassword.length() > 0) {
          String newPassword = request.getParameter("np");
          User user = WebUtil.getUser(request);
          if(user != null) {
            App.updatePassword(user.getUserName(), oldPassword, newPassword);
          }
        }
        
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
    App.destroy();
  }
}
