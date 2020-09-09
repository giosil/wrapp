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
import org.dew.wrapp.Page;
import org.dew.wrapp.User;
import org.dew.wrapp.WebUtil;
import org.dew.wrapp.log.LoggerFactory;

@WebServlet(name = "WebPage", loadOnStartup = 0, urlPatterns = { "/page/*" })
public 
class WebPage extends HttpServlet
{
  private static final long serialVersionUID = -6452766828817687812L;
  
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
    
    String pageId = request.getPathInfo();
    if(pageId != null && pageId.length() > 0) {
      if(pageId.startsWith("/")) pageId = pageId.substring(1);
    }
    
    logger.fine("View page " + pageId + "...");
    
    if(pageId == null || pageId.length() == 0) {
      logger.warning("Invalid page id = " + pageId);
      
      request.setAttribute("message", "Invalid page id.");
      RequestDispatcher requestDispatcher = request.getRequestDispatcher("message.jsp");
      requestDispatcher.forward(request, response);
      return;
    }
    
    // Get page
    Page page = App.getPage(pageId);
    if(page == null) {
      logger.warning("Page " + pageId + " not found");
      
      request.setAttribute("message", "Page not found.");
      RequestDispatcher requestDispatcher = request.getRequestDispatcher("../layouts/message.jsp");
      requestDispatcher.forward(request, response);
      return;
    }
    
    // Check layout
    String layout = page.getLayout();
    if(layout == null || layout.length() == 0) {
      layout = "default.jsp";
    }
    if(layout.lastIndexOf('.') < 0) layout += ".jsp";
    
    // Check modifier (is the page private?)
    String modifier = page.getModifier();
    if(modifier != null && modifier.equalsIgnoreCase("private")) {
      User user = WebUtil.checkUser(request, response);
      if(user == null) {
        logger.warning("Page " + pageId + " is private.");
        return;
      }
    }
    
    request.setAttribute("page", page);
    
    RequestDispatcher requestDispatcher = request.getRequestDispatcher("../layouts/" + layout);
    requestDispatcher.forward(request, response);
  }
}
