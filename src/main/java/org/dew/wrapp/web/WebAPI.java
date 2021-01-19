package org.dew.wrapp.web;

import java.io.IOException;
import java.util.logging.Logger;

import javax.servlet.ServletException;

import javax.servlet.annotation.WebServlet;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.dew.wrapp.App;
import org.dew.wrapp.User;
import org.dew.wrapp.WebUtil;
import org.dew.wrapp.log.LoggerFactory;

@WebServlet(name = "WebAPI", loadOnStartup = 1, urlPatterns = { "/api/*" })
public 
class WebAPI extends HttpServlet
{
  private static final long serialVersionUID = -589644688846752668L;
  
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
    Logger logger = LoggerFactory.getLogger(WebAPI.class);
    
    String command = request.getPathInfo();
    if(command != null && command.length() > 0) {
      if(command.startsWith("/")) command = command.substring(1);
    }
    if(command == null || command.length() == 0) {
      command = "reload";
    }
    
    logger.fine("WebWrapp command=" + command);
    
    try {
      
      if(command.equalsIgnoreCase("reload")) {
        int pages = App.reload();
        
        logger.fine("WebWrapp " + command + " " + pages + " pages");
      }
      else if(command.equalsIgnoreCase("refresh")) {
        String module  = request.getParameter("module");
        
        if(module != null && module.length() > 0) {
          int pages = App.refresh(module);
          
          logger.fine("WebWrapp " + command + " " + module + " has affected " + pages + " pages");
        }
        else {
          
          logger.warning("WebWrapp Invalid module=" + module);
          response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
          return;
          
        }
      }
      else if(command.equalsIgnoreCase("update")) {
        
        String oldPassword = request.getParameter("op");
        String newPassword = request.getParameter("np");
        
        if(oldPassword != null && oldPassword.length() > 0 && newPassword != null && newPassword.length() > 0) {
          User user = WebUtil.getUser(request);
          if(user != null) {
            
            String  username  = user.getUserName();
            boolean resUpdate = App.updatePassword(username, oldPassword, newPassword);
            logger.fine("WebWrapp update password for " + username + " returned " + resUpdate);
            if(!resUpdate) {
              response.setStatus(HttpServletResponse.SC_FORBIDDEN);
              return;
            }
            
          }
          else {
            
            logger.warning("WebWrapp user not logged to perform update password");
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            return;
            
          }
        }
        else {
          
          logger.warning("WebWrapp Invalid oldPassword=" + oldPassword + ", newPassword=" + newPassword);
          response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
          return;
          
        }
      }
      else if(command.equalsIgnoreCase("nop")) {
        
        User user = WebUtil.getUser(request);
        
        logger.fine("WebWrapp " + command + " (user=" + user + ")");
      
      }
      else {
        
        logger.warning("WebWrapp Unknow command " + command);
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        return;
        
      }
    }
    catch(Exception ex) {
      logger.severe("Exception executing command " + command + ": " + ex);
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
