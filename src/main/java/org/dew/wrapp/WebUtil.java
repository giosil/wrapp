package org.dew.wrapp;

import java.io.IOException;
import java.io.Writer;
import java.lang.reflect.Method;
import java.security.Principal;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.servlet.jsp.PageContext;

import org.dew.wrapp.impl.DefaultMenuManager;
import org.dew.wrapp.impl.TopMenuManager;
import org.dew.wrapp.json.JSON;
import org.dew.wrapp.mgr.AMenuManager;
import org.dew.wrapp.mgr.ILoginManager;
import org.dew.wrapp.util.WUtil;

public 
class WebUtil 
{
  public static 
  String jsString(Object value) 
  {
    if (value == null) return "''";
    String sValue = null;
    if (value instanceof Date) {
      sValue = WUtil.formatDate((Date) value, "IT");
    }
    else if (value instanceof Calendar) {
      sValue = WUtil.formatDate((Calendar) value, "IT");
    }
    else {
      sValue = value.toString();
    }
    if (sValue == null || sValue.length() == 0) return "''";
    return "'" + sValue.replace("'", "\\'") + "'";
  }
  
  public static 
  String jsDate(Date value) 
  {
    if (value == null) return "null";
    return "new Date('" + WUtil.formatDate(value, "-") + "')";
  }
  
  public static 
  String jsDate(Calendar value) 
  {
    if (value == null) return "null";
    return "new Date('" + WUtil.formatDate(value, "-") + "')";
  }
  
  public static 
  User getUser(HttpServletRequest request) 
  {
    if (request == null) return null;
    User user = null;
    HttpSession httpSession = request.getSession();
    if (httpSession != null) {
      Object oUser = httpSession.getAttribute("user");
      if (oUser instanceof User) {
        user = (User) oUser;
      }
    }
    if (user == null) {
      try {
        Principal userPrincipal = request.getUserPrincipal();
        if (userPrincipal != null) {
          if (userPrincipal instanceof User) {
            user = (User) userPrincipal;
          } 
          else {
            user = new User(userPrincipal.getName());
          }
        }
      }
      catch (Exception ex) {
        ex.printStackTrace();
      }
    }
    if (user != null) {
      String sLogout = request.getParameter("logout");
      if (sLogout != null && sLogout.equals("1")) {
        // Don't use logout(request): loop!
        logout(user, request);
        return null;
      }
    } 
    else {
      String username = request.getParameter("j_username");
      String password = request.getParameter("j_password");
      if (username != null && username.length() > 0 && password != null && password.length() > 0) {
        return login(request);
      }
    }
    return user;
  }
  
  public static 
  Page getPage(HttpServletRequest request) 
  {
    if(request == null) return new Page();
    
    Object page = request.getAttribute("page");
    if(page == null) return new Page();
    
    if(page instanceof Page) {
      return (Page) page;
    }
    
    Page result = App.getPage(page.toString());
    if(result == null) return new Page();
    
    return result;
  }
  
  public static 
  Locale getLocale(HttpServletRequest request) 
  {
    User user = getUser(request);
    if(user != null) {
      String locale = user.getLocale();
      if(locale != null && locale.length() > 1) {
        return App.toLocale(locale);
      }
    }
    return App.getLocale();
  }
  
  public static 
  String getBodyClass(HttpServletRequest request)
      throws ServletException, IOException 
  {
    AMenuManager aMenuManager = getMenu(request);
    if (aMenuManager == null) return "";
    String sBodyClass = aMenuManager.getBodyClass();
    if (sBodyClass == null || sBodyClass.length() == 0) return "";
    return "class=\"" + sBodyClass + "\"";
  }
  
  public static 
  AMenuManager getMenu(HttpServletRequest request) 
      throws ServletException, IOException 
  {
    if (request == null) return null;
    HttpSession httpSession = request.getSession();
    if (httpSession != null) {
      boolean refresh = WUtil.toBoolean(httpSession.getAttribute("refresh"), false);
      if(refresh) {
        httpSession.setAttribute("refresh", Boolean.FALSE);
        
        User user = null;
        Object oMenu = httpSession.getAttribute("menu");
        if (oMenu instanceof AMenuManager) {
          user = ((AMenuManager) oMenu).getUser();
        }
        else {
          user = getUser(request);
        }
        
        ILoginManager loginManager = App.getLoginManagerInstance();
        
        AMenuManager menuManager = null;
        try {
          menuManager = loginManager.createMenuManager(user);
          if(menuManager != null) {
            httpSession.setAttribute("menu", menuManager);
            return menuManager;
          }
        }
        catch(Exception ex) {
          ex.printStackTrace();
        }
      }
      
      Object menuManager = httpSession.getAttribute("menu");
      if (menuManager instanceof AMenuManager) {
        return (AMenuManager) menuManager;
      }
    }
    return null;
  }
  
  public static 
  void writeMenu(HttpServletRequest request, Writer out) 
      throws ServletException, IOException 
  {
    if (request == null || out == null) return;
    AMenuManager menuManger = null;
    HttpSession httpSession = request.getSession();
    if (httpSession != null) {
      Object oMenu = httpSession.getAttribute("menu");
      if (oMenu instanceof AMenuManager) {
        menuManger = (AMenuManager) oMenu;
      }
    }
    if (menuManger != null) {
      menuManger.write(request, out);
    }
    return;
  }
  
  public static 
  void writeHeader(HttpServletRequest request, Writer out, User user) 
      throws ServletException, IOException 
  {
    if (request == null || out == null) return;
    
    String contextPath = request.getContextPath();
    if(contextPath == null) contextPath = "";
    if(!contextPath.startsWith("/")) contextPath = "/" + contextPath;
    if(!contextPath.endsWith("/"))   contextPath =  contextPath + "/";
    
    Locale locale = App.getLocale(user);
    
    out.write("<div class=\"row border-bottom\" id=\"ptop\">");
    out.write("<nav class=\"navbar navbar-static-top\" role=\"navigation\" style=\"margin-bottom: 0\">");
    out.write("<div class=\"navbar-header\">");
    out.write("<a class=\"navbar-minimalize minimalize-styl-2 btn btn-primary\" href=\"#\"><i class=\"fa fa-bars\"></i> </a>");
    out.write("<form role=\"search\" class=\"navbar-form-custom\" action=\"" + contextPath + App.SEARCH_PAGE + "\">");
    out.write("<div class=\"form-group\"><input type=\"text\" placeholder=\""  + App.getMessage(locale, "search") + "...\" class=\"form-control\" name=\"qs\" id=\"qs\"></div>");
    out.write("</form>");
    out.write("</div>");
    out.write("<ul class=\"nav navbar-top-links navbar-right\" style=\"margin-top: 10px;\">");
    out.write("<li><a href=\"" + contextPath + App.HOME_PAGE   + "\" style=\"display:inline;\"><i class=\"fa fa-home\"></i> " + App.getMessage(locale, "home") + "</a> | </li>");
    out.write("<li><a href=\"" + contextPath + App.HELP_PAGE   + "\" target=\"_blank\" style=\"display:inline;\"><i class=\"fa fa-question-circle\"></i> " + App.getMessage(locale, "help") + "</a> | </li>");
    out.write("<li><a href=\"" + contextPath + App.LOGOUT_PAGE + "\" style=\"display:inline;\"><i class=\"fa fa-sign-out\"></i>" + App.getMessage(locale, "logout") + "</a></li>");
    out.write("</ul>");
    out.write("</nav></div>");
  }
  
  public static 
  void writeTitleH(HttpServletRequest request, Writer out, String sTitle)
      throws ServletException, IOException 
  {
    writeTitleH(request, out, sTitle, null, false);
  }
  
  public static 
  void writeTitleH(HttpServletRequest request, Writer out, String sTitle, String sSubTitle)
      throws ServletException, IOException 
  {
    writeTitleH(request, out, sTitle, sSubTitle, false);
  }
  
  public static 
  void writeTitleH(HttpServletRequest request, Writer out, String sTitle, boolean boSideMenu)
      throws ServletException, IOException 
  {
    writeTitleH(request, out, sTitle, null, boSideMenu);
  }
  
  public static 
  void writeTitleH(HttpServletRequest request, Writer out, String sTitle, String sSubTitle, boolean boSideMenu)
      throws ServletException, IOException 
  {
    String contextPath = request.getContextPath();
    if(contextPath == null) contextPath = "";
    if(!contextPath.startsWith("/")) contextPath = "/" + contextPath;
    if(!contextPath.endsWith("/"))   contextPath =  contextPath + "/";
    
    AMenuManager menuManger = null;
    HttpSession httpSession = request.getSession();
    if (httpSession != null) {
      Object oMenu = httpSession.getAttribute("menu");
      if (oMenu instanceof AMenuManager) {
        menuManger = (AMenuManager) oMenu;
      }
    }
    out.write("<div class=\"row\" id=\"pheader\">");
    if (sTitle != null && sTitle.length() > 0) {
      if (boSideMenu) {
        out.write("<h2 style=\"margin-top: 8px; margin-bottom: 4px; margin-left: 8px;\" id=\"ptitle\">" + sTitle);
      }
      else {
        out.write("<h2 style=\"margin-top: 0px; margin-bottom: 4px;\" id=\"ptitle\">" + sTitle);
      }
      if (sSubTitle != null && sSubTitle.length() > 0) {
        out.write(" &nbsp;<small>" + sSubTitle + "</small>");
      }
      out.write("</h2>");
      if (menuManger != null) {
        List<MenuItem> listOfMenuItem = menuManger.getBreadcrumb(request);
        if (listOfMenuItem != null && listOfMenuItem.size() > 0) {
          if (boSideMenu) {
            out.write("<div style=\"margin-bottom: 6px; margin-left: 8px;\" id=\"pbreadcrumb\">");
          }
          else {
            out.write("<div style=\"margin-bottom: 6px;\" id=\"pbreadcrumb\">");
          }
          User user = menuManger.getUser();
          
          Locale locale = App.getLocale(user);
          
          if(user == null) {
            out.write(App.getMessage(locale, "home"));
          }
          else {
            out.write("<a href=\"" + contextPath + App.HOME_PAGE + "\">" + App.getMessage(locale, "home") + "</a>");
          }
          
          MenuItem menuItem0 = listOfMenuItem.get(0);
          String sLink0 = menuItem0.getLink();
          if (sLink0 != null && sLink0.length() > 0) {
            out.write(" / <a href=\"" + sLink0 + "\">" + menuItem0.getText() + "</a>");
          }
          else {
            out.write(" / <a>" + menuItem0.getText() + "</a>");
          }
          if (listOfMenuItem.size() > 1) {
            MenuItem menuItem1 = listOfMenuItem.get(1);
            out.write(" / <strong>" + menuItem1.getText() + "</strong>");
          }
          out.write("</div>");
        }
      }
    }
    out.write("</div>");
  }
  
  public static 
  void writePageHeader(HttpServletRequest request, Writer out) 
      throws ServletException, IOException 
  {
    writePageHeader(request, out, null, null, null, null);
  }
  
  public static 
  void writePageHeader(HttpServletRequest request, Writer out, String sTitle)
      throws ServletException, IOException 
  {
    writePageHeader(request, out, sTitle, null, null, null);
  }
  
  public static 
  void writePageHeader(HttpServletRequest request, Writer out, String sTitle, String sSubTitle)
      throws ServletException, IOException 
  {
    writePageHeader(request, out, sTitle, sSubTitle, null, null);
  }
  
  public static 
  void writePageHeader(HttpServletRequest request, Writer out, String sTitle, String sSubTitle, String sHelpTitle, String sHelpText) 
      throws ServletException, IOException 
  {
    writeMenu(request, out);
    AMenuManager menuManager = getMenu(request);
    if (menuManager != null) {
      if (menuManager instanceof DefaultMenuManager) {
        out.write("<div id=\"page-wrapper\" class=\"gray-bg\">");
        writeHeader(request, out, menuManager.getUser());
        writeTitleH(request, out, sTitle, sSubTitle, true);
        out.write("<div class=\"wrapper wrapper-content animated\">");
        writeHelp(out, sHelpTitle, sHelpText);
      }
      else if (menuManager instanceof TopMenuManager) {
        out.write("<div id=\"page-wrapper\" class=\"gray-bg\">");
        out.write("<div class=\"wrapper wrapper-content animated\">");
        writeTitleH(request, out, sTitle, sSubTitle, false);
        writeHelp(out, sHelpTitle, sHelpText);
      }
    }
    else {
      out.write("<div id=\"page-wrapper\" class=\"gray-bg\">");
      out.write("<div class=\"wrapper wrapper-content animated\">");
      writeHelp(out, sHelpTitle, sHelpText);
    }
  }
  
  public static 
  void writePageFooter(HttpServletRequest request, Writer out) 
      throws ServletException, IOException 
  {
    out.write("</div>"); // id="page-wrapper"
    out.write("</div>"); // id="wrapper wrapper-content animated"
    out.write("<div id=\"pfooter\"></div>");
  }
  
  public static 
  void writeFooter(HttpServletRequest request, Writer out) 
      throws ServletException, IOException 
  {
    if (request == null || out == null) return;
    out.write("<div class=\"row\"><div class=\"footer\"><div>");
    out.write("</div></div></div>");
  }
  
  public static 
  void writeHelp(Writer out, String sTitle, String sText) 
      throws ServletException, IOException 
  {
    if (sTitle == null || sTitle.length() == 0) return;
    if (sText  == null || sText.length()  == 0) return;
    out.write("\n");
    out.write("<div class=\"row\">\n");
    out.write("<div class=\"ibox float-e-margins collapsed\">\n");
    out.write("<div class=\"ibox-title\">\n");
    out.write("<h5>" + sTitle + "</h5>\n");
    out.write("<div class=\"ibox-tools\">\n");
    out.write("<a class=\"collapse-link\"> <i class=\"fa fa-chevron-up\"></i></a>\n");
    out.write("</div>\n");
    out.write("</div>\n");
    out.write("<div class=\"ibox-content\" style=\"position: relative\">\n");
    out.write(sText + "\n");
    out.write("</div>\n");
    out.write("</div>\n");
    out.write("</div>\n");
  }
  
  public static 
  void writeSearchResult(HttpServletRequest request, Writer out, Locale locale, String sText)
      throws ServletException, IOException 
  {
    if (request == null || out == null) return;
    
    AMenuManager menuManger = null;
    HttpSession httpSession = request.getSession();
    if (httpSession != null) {
      Object oMenu = httpSession.getAttribute("menu");
      if (oMenu instanceof AMenuManager) {
        menuManger = (AMenuManager) oMenu;
      }
    }
    boolean boAtLeastOne = false;
    if (menuManger != null) {
      List<MenuItem> listOfMenuItem = menuManger.search(sText);
      if (listOfMenuItem != null && listOfMenuItem.size() > 0) {
        for (int i = 0; i < listOfMenuItem.size(); i++) {
          MenuItem menuItem = listOfMenuItem.get(i);
          String sLink = menuItem.getLink();
          if (sLink == null || sLink.length() == 0 || sLink.equals("#"))
            continue;
          String sParentId = menuItem.getParent();
          MenuItem menuItemPar = null;
          if (sParentId != null && sParentId.length() > 0) {
            menuItemPar = menuManger.getMenuItemById(sParentId);
          }
          if (menuItemPar != null) {
            out.write("<div class=\"search-result\">");
            out.write("<h3><a href=\"" + sLink + "\">" + menuItem.getText() + "</a></h3>");
            out.write("<p>" + App.getMessage(locale, "page") + " " + App.getMessage(locale, "home") + " / " + menuItemPar.getText() + " / " + menuItem.getText() + "</p>");
            out.write("</div><div class=\"hr-line-dashed\"></div>");
          }
          else {
            out.write("<div class=\"search-result\">");
            out.write("<h3><a href=\"" + sLink + "\">" + menuItem.getText() + "</a></h3>");
            out.write("<p>" + App.getMessage(locale, "page") + " " + App.getMessage(locale, "home") + " / " + menuItem.getText() + "</p>");
            out.write("</div><div class=\"hr-line-dashed\"></div>");
          }
          boAtLeastOne = true;
        }
      }
    }
    if (!boAtLeastOne) {
      out.write("<p>" + App.getMessage(locale, "error.nores") + "</p>");
    }
    return;
  }
  
  public static 
  void writeScriptImport(Writer out, String scriptFile) 
      throws ServletException, IOException 
  {
    if (scriptFile == null || scriptFile.length() == 0) return;
    String html= "<script src=\"" + scriptFile + "?" + App.STARTUP_TIME + "\" type=\"text/javascript\"></script>";
    out.write(html);
  }
  
  public static 
  void writeScriptImport(Writer out, String scriptFile, String debugScriptFile, Object debugParam) 
    throws ServletException, IOException 
  {
    boolean debug = WUtil.toBoolean(debugParam, false);
    
    String html = null;
    if(debug) {
      if(debugScriptFile != null && debugScriptFile.length() > 0) {
        html = "<script src=\"" + debugScriptFile + "?" + App.STARTUP_TIME + "\" type=\"text/javascript\"></script>";
      }
      else if (scriptFile != null && scriptFile.length() > 0) {
        html = "<script src=\"" + scriptFile + "?" + App.STARTUP_TIME + "\" type=\"text/javascript\"></script>";
      }
      else {
        return;
      }
    }
    else {
      if (scriptFile != null && scriptFile.length() > 0) {
        html = "<script src=\"" + scriptFile + "?" + App.STARTUP_TIME + "\" type=\"text/javascript\"></script>";
      }
      else {
        return;
      }
    }
    out.write(html);
  }
  
  public static 
  void writeScriptImport(Writer out, Page page) 
      throws ServletException, IOException 
  {
    if (page == null) return;
    
    String[] asScripts = page.getScripts();
    if(asScripts == null || asScripts.length == 0) {
      return;
    }
    
    String marker = String.valueOf(App.STARTUP_TIME);
    
    StringBuilder sb = new StringBuilder(70 * asScripts.length);
    for(int i = 0; i < asScripts.length; i++) {
      String scriptFile = asScripts[i];
      if(scriptFile == null || scriptFile.length() == 0) {
        continue;
      }
      sb.append("<script src=\"" + addMarkerIfNotExists(scriptFile, marker) + "\" type=\"text/javascript\"></script>\n");
    }
    
    out.write(sb.toString());
  }
  
  public static 
  void writeScriptImport(Writer out, Page page, Object debugParam) 
      throws ServletException, IOException 
  {
    boolean debug = WUtil.toBoolean(debugParam, false);
    
    if(debug) {
      writeScriptImport(out, page, "*", ".min.js", ".js");
    }
    else {
      writeScriptImport(out, page);
    }
  }
  
  public static 
  void writeScriptImport(Writer out, Page page, String filter, String target, String replacement) 
      throws ServletException, IOException 
  {
    if (page == null) return;
    
    String[] asScripts = page.getScripts();
    if(asScripts == null || asScripts.length == 0) {
      return;
    }
    
    // Parse filter...
    boolean starts  = false;
    boolean ends    = false;
    boolean include = false;
    boolean equals  = false;
    boolean not     = false;
    boolean replace = target != null && target.length() > 0 && replacement != null;
    if(filter != null && filter.length() > 0) {
      if(filter.startsWith("!")) {
        not    = true;
        filter = filter.substring(1);
      }
      if(filter.startsWith("*") && filter.endsWith("*")) {
        include = true;
        if(filter.equals("*")) {
          filter = "";
        }
        else {
          filter = filter.substring(1, filter.length()-1);
        }
      }
      else if(filter.startsWith("*")) {
        ends   = true;
        filter = filter.substring(1);
      }
      else if(filter.endsWith("*")) {
        starts = true;
        filter = filter.substring(0, filter.length()-1);
      }
      else {
        equals = true;
      }
    }
    
    String marker = String.valueOf(App.STARTUP_TIME);
    
    StringBuilder sb = new StringBuilder(70 * asScripts.length);
    for(int i = 0; i < asScripts.length; i++) {
      String scriptFile = asScripts[i];
      if(scriptFile == null || scriptFile.length() == 0) {
        continue;
      }
      
      // Check filter to replace...
      if(starts && replace) {
        if(!not && scriptFile.startsWith(filter)) {
          scriptFile = scriptFile.replace(target, replacement);
        }
        else if(not && !scriptFile.startsWith(filter)) {
          scriptFile = scriptFile.replace(target, replacement);
        }
      }
      else if(ends && replace) {
        if(!not && scriptFile.endsWith(filter)) {
          scriptFile = scriptFile.replace(target, replacement);
        }
        else if(not && !scriptFile.endsWith(filter)) {
          scriptFile = scriptFile.replace(target, replacement);
        }
      }
      else if(include && replace) {
        if(!not && (filter.length() == 0 || scriptFile.indexOf(filter) >= 0)) {
          scriptFile = scriptFile.replace(target, replacement);
        }
        else if(not && !(filter.length() == 0 || scriptFile.indexOf(filter) >= 0)) {
          scriptFile = scriptFile.replace(target, replacement);
        }
      }
      else if(equals && replace) {
        if(!not && scriptFile.equals(filter)) {
          scriptFile = scriptFile.replace(target, replacement);
        }
        else if(not && !scriptFile.equals(filter)) {
          scriptFile = scriptFile.replace(target, replacement);
        }
      }
      
      sb.append("<script src=\"" + addMarkerIfNotExists(scriptFile, marker) + "\" type=\"text/javascript\"></script>\n");
    }
    
    out.write(sb.toString());
  }
  
  public static 
  void writeCSSImport(Writer out, String cssFile) 
      throws ServletException, IOException 
  {
    if (cssFile == null || cssFile.length() == 0) return;
    String html= "<link href=\"" + cssFile + "?" + App.STARTUP_TIME + "\" rel=\"stylesheet\">";
    out.write(html);
  }
  
  public static 
  void writeCSSImport(Writer out, Page page) 
      throws ServletException, IOException 
  {
    if (page == null) return;
    
    String[] asCss = page.getCss();
    if(asCss == null || asCss.length == 0) {
      return;
    }
    
    String marker = String.valueOf(App.STARTUP_TIME);
    
    StringBuilder sb = new StringBuilder(55 * asCss.length);
    for(int i = 0; i < asCss.length; i++) {
      String cssFile = asCss[i];
      if(cssFile == null || cssFile.length() == 0) {
        continue;
      }
      sb.append("<link href=\"" + addMarkerIfNotExists(cssFile, marker) + "\" rel=\"stylesheet\">\n");
    }
    
    out.write(sb.toString());
  }
  
  public static 
  String addMarkerIfNotExists(String url, String marker) 
  {
    if(url == null || url.length() == 0) {
      return url;
    }
    int par = url.indexOf('?');
    if(par >= 0) return url;
    if(marker != null && marker.length() > 0) {
      return url + "?" + marker;
    }
    return url;
  }
  
  public static 
  String replaceMarker(String url, String newMarker) 
  {
    if(url == null || url.length() == 0) {
      return url;
    }
    int par = url.indexOf('?');
    if(par >= 0) {
      int sep = url.indexOf('&', par + 1);
      if(sep > 0) {
        return url.substring(0, par) + "?" + newMarker + "&" + url.substring(sep + 1);
      }
      else {
        return url.substring(0, par) + "?" + newMarker;
      }
    }
    if(newMarker != null && newMarker.length() > 0) {
      return url + "?" + newMarker;
    }
    return url;
  }
  
  public static 
  void writeUserInfo(HttpServletRequest request, Writer out) 
      throws ServletException, IOException 
  {
    User user = getUser(request);
    if(user == null) return;
    
    String js = "<script>";
    js += "window._userLogged={";
    js += "id:" + user.getId() + ",";
    js += "userName:"   + jsString(user.getUserName()) + ",";
    js += "currLogin: " + jsDate(user.getCurrLogin())  + ",";
    js += "tokenId: "   + jsString(user.getTokenId())  + ",";
    js += "role:"       + jsString(user.getRole())     + ",";
    js += "email:"      + jsString(user.getEmail())    + ",";
    js += "mobile:"     + jsString(user.getMobile())   + ",";
    js += "locale:"     + jsString(user.getLocale());
    js += "};";
    js += "</script>";
    out.write(js);
  }
  
  public static 
  void writeConfig(Writer out) 
      throws ServletException, IOException 
  {
    Map<String,Object> config = App.getPublicConfig();
    if(config == null || config.isEmpty()) {
      out.write("<script>window._config={};</script>");
      return;
    }
    String js = "<script>window._config=" + JSON.stringify(config) + ";</script>";
    out.write(js);
  }
  
  public static 
  void writePageAttributes(Writer out, Page page) 
      throws ServletException, IOException 
  {
    if(page == null) {
      out.write("<script>window._page={};</script>");
      return;
    }
    Map<String, Object> attributes = page.getAttributes();
    if(attributes == null || attributes.isEmpty()) {
      out.write("<script>window._page={};</script>");
      return;
    }
    String js = "<script>window._page=" + JSON.stringify(attributes) + ";</script>";
    out.write(js);
  }
  
  public static 
  void append(PageContext pageContext, String attributeName, String text) 
  {
    if (pageContext == null) return;
    append(pageContext.getRequest(), attributeName, text);
  }
  
  public static 
  void append(ServletRequest request, String attributeName, String text) 
  {
    if (request == null) return;
    if (text == null || text.length() == 0) return;
    if (attributeName == null || attributeName.length() == 0) return;
    Object attribute = request.getAttribute(attributeName);
    if (attribute == null) {
      request.setAttribute(attributeName, text);
      return;
    }
    String sAttribute = attribute.toString();
    if (sAttribute.indexOf(text) < 0) {
      request.setAttribute(attributeName, sAttribute + "\n" + text);
    }
  }
  
  public static 
  User login(HttpServletRequest request) 
  {
    String sUsername = request.getParameter("j_username");
    String sPassword = request.getParameter("j_password");
    
    ILoginManager loginManager = App.getLoginManagerInstance();
    
    User user = null;
    try {
      user = loginManager.login(sUsername, sPassword);
    }
    catch(Exception ex) {
      ex.printStackTrace();
      request.setAttribute("message", App.getMessage("error.login"));
      return null;
    }
    
    if (user != null) {
      HttpSession httpSession = request.getSession(true);
      httpSession.setAttribute("user", user);
      
      String remoteAddr = request.getHeader("X-Forwarded-For");
      if(remoteAddr == null || remoteAddr.length() == 0) {
        remoteAddr = request.getRemoteAddr();
      }
      
      AMenuManager menuManager = null;
      try {
        menuManager = loginManager.createMenuManager(user);
        if(menuManager != null) {
          httpSession.setAttribute("menu", menuManager);
        }
      }
      catch(Exception ex) {
        ex.printStackTrace();
        request.setAttribute("message", App.getMessage("error.menu"));
        return null;
      }
    } 
    else {
      request.setAttribute("message", App.getMessage("error.user"));
    }
    return user;
  }
  
  public static 
  boolean logout(User user, HttpServletRequest request) 
  {
    boolean result = invoke(request, "logout");
    HttpSession httpSession = request.getSession();
    if (httpSession != null) {
      httpSession.invalidate();
    }
    return result;
  }
  
  public static 
  boolean logout(HttpServletRequest request) 
  {
    boolean result = invoke(request, "logout");
    HttpSession httpSession = request.getSession();
    if (httpSession != null) {
      httpSession.invalidate();
    }
    return result;
  }
  
  private static 
  boolean invoke(Object object, String methodName) 
  {
    boolean result = false;
    try {
      Method method = null;
      Method[] methods = object.getClass().getMethods();
      for (Method m : methods) {
        if (m.getName().equals(methodName)) {
          method = m;
          break;
        }
      }
      if (method != null) {
        method.invoke(object, new Object[0]);
        result = true;
      }
    } 
    catch (Throwable th) {
      th.printStackTrace();
    }
    return result;
  }
}