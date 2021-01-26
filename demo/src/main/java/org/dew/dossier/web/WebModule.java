package org.dew.dossier.web;

import java.io.IOException;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;

import javax.servlet.annotation.WebServlet;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.dew.dossier.util.ConnectionManager;
import org.dew.nosql.INoSQLDB;

@WebServlet(name = "WebModule", loadOnStartup = 0, urlPatterns = { "/module" })
public 
class WebModule extends HttpServlet
{
  private static final long serialVersionUID = -4191338398759264803L;
  
  private static final String URL_WRAPP_REFRESH = "http://localhost:8080/wrapp/api/refresh?module=dossier";
  
  protected String refreshResult;
  
  @Override
  public
  void init()
      throws ServletException
  {
    System.out.println("WebModule.init()...");
    
    try {
      HttpURLConnection connection = (HttpURLConnection) new URL(URL_WRAPP_REFRESH).openConnection();
      connection.setConnectTimeout(1000);
      connection.setReadTimeout(1000);
      
      refreshResult = "HTTP " + connection.getResponseCode();
    }
    catch(Exception ex) {
      refreshResult = ex.toString();
    }
    
    System.out.println("WebModule.init() " + refreshResult);
  }
  
  @Override
  protected 
  void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException
  {
    request.setAttribute("message", refreshResult);
    
    RequestDispatcher requestDispatcher = request.getRequestDispatcher("index.jsp");
    requestDispatcher.forward(request, response);
  }
  
  @Override
  public 
  void destroy() 
  {
    System.out.println("WebModule.destroy()...");
    
    try {
      INoSQLDB noSQLDB = ConnectionManager.getDefaultNoSQLDB();
      
      noSQLDB.save(new HashMap<String, Object>());
    }
    catch(Exception ex) {
      System.err.println("WebModule.destroy(): " + ex);
    }
  }
}
