package org.dew.wrapp.web;

import java.io.IOException;

import java.util.logging.Logger;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;

import javax.servlet.annotation.WebServlet;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.dew.wrapp.App;
import org.dew.wrapp.User;
import org.dew.wrapp.WebUtil;

import org.dew.wrapp.log.LoggerFactory;

@WebServlet(name = "WebHome", loadOnStartup = 0, urlPatterns = { "/home" })
public 
class WebHome extends HttpServlet
{
  private static final long serialVersionUID = 7047915303038143986L;
  
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
    Logger logger = LoggerFactory.getLogger(WebPage.class);
    
    User user = WebUtil.getUser(request);
    
    if(user == null) {
      logger.warning("Home page is private.");
      // response.setStatus(HttpServletResponse.SC_FORBIDDEN);
      RequestDispatcher requestDispatcher = request.getRequestDispatcher("/" + App.LOGOUT_PAGE);
      requestDispatcher.forward(request, response);
      return;
    }
    
    logger.fine("View home page (username=" + user.getUserName() + ", home=" + user.getHome() + ")...");
    
    String homePage = user.getHome();
    if(homePage == null || homePage.length() == 0) {
      homePage = App.DEFAULT_HOME_PAGE;
    }
    if(homePage.lastIndexOf('.') < 0) homePage += ".jsp";
    
    RequestDispatcher requestDispatcher = request.getRequestDispatcher("/" + homePage);
    requestDispatcher.forward(request, response);
  }
}
