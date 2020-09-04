package org.dew.wrapp;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;

import javax.servlet.annotation.WebServlet;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "WebModule", loadOnStartup = 1, urlPatterns = { "/module" })
public 
class WebModule extends HttpServlet
{
  private static final long serialVersionUID = -4191338398759264803L;
  
  private static final String URL_WRAPP_UPDATE = "http://localhost:8080/wrapp/wrapp/update?module=hello";
  
  protected String updateResult;
  
  public
  void init()
    throws ServletException
  {
    System.out.println("WebModule.init()...");
    
    try {
      HttpURLConnection connection = (HttpURLConnection) new URL(URL_WRAPP_UPDATE).openConnection();
      connection.setConnectTimeout(30000);
      connection.setReadTimeout(30000);
      
      updateResult = "HTTP " + connection.getResponseCode();
    }
    catch(Exception ex) {
      updateResult = ex.toString();
    }
    
    System.out.println("WebModule.init() " + updateResult);
  }
  
  @Override
  protected 
  void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException
  {
    request.setAttribute("message", updateResult);
    
    RequestDispatcher requestDispatcher = request.getRequestDispatcher("index.jsp");
    requestDispatcher.forward(request, response);
  }
}
