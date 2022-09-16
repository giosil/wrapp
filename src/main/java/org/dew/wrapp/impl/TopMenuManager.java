package org.dew.wrapp.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.dew.wrapp.App;
import org.dew.wrapp.MenuItem;
import org.dew.wrapp.User;
import org.dew.wrapp.mgr.AMenuManager;

public 
class TopMenuManager extends AMenuManager 
{
  private static final long serialVersionUID = 3669509984508149585L;
  
  public TopMenuManager()
  {
  }
  
  public TopMenuManager(User user)
  {
    this.user = user;
  }
  
  @Override
  public String build(HttpServletRequest request) 
  {
    StringBuilder sb = new StringBuilder(770 + 100 * mapItems.size());
    
    String sRequestURI = request.getRequestURI();
    String sParamMenu  = request.getParameter("m");
    
    String sUserName = "";
    String sUserRole = "";
    if (user != null) {
      sUserName = user.getUserName();
      sUserRole = user.getRole();
    }
    if (sUserName == null || sUserName.length() == 0) {
      sUserName = "user";
    }
    if (sUserRole == null || sUserRole.length() == 0) {
      sUserRole = "user";
    }
    
    Locale locale = App.getLocale(user);
    
    String contextPath = request.getContextPath();
    if(contextPath == null) contextPath = "";
    if(!contextPath.startsWith("/")) contextPath = "/" + contextPath;
    if(!contextPath.endsWith("/"))   contextPath =  contextPath + "/";
    
    sb.append("<div class=\"row border-bottom white-bg\">");
    sb.append("<nav class=\"navbar navbar-static-top\" role=\"navigation\">");
    sb.append("<div class=\"navbar-header\">");
    sb.append("<button aria-controls=\"navbar\" aria-expanded=\"false\" data-target=\"#navbar\" data-toggle=\"collapse\" class=\"navbar-toggle collapsed\" type=\"button\">");
    sb.append("<i class=\"fa fa-reorder\"></i>");
    sb.append("</button>");
    sb.append("<a href=\"" + contextPath + App.HOME_PAGE + "\" class=\"navbar-brand\">" + App.getMessage(locale, "home") + "</a>");
    sb.append("</div>");
    
    sb.append("<div class=\"navbar-collapse collapse\" id=\"navbar\">");
    sb.append("<ul class=\"nav navbar-nav\">");
    
    List<MenuItem> listMainMenu = getMainMenu();
    if (listMainMenu != null && listMainMenu.size() > 0) {
      for (int i = 0; i < listMainMenu.size(); i++) {
        MenuItem menuItem = listMainMenu.get(i);
        if (menuItem == null) continue;
        
        String sIcon = menuItem.getIcon();
        if (sIcon == null || sIcon.length() == 0) {
          sIcon = "fa-edit";
        }
        String sText = menuItem.getText();
        if (sText == null || sText.length() == 0) {
          sText = menuItem.getId();
        }
        String sLink = menuItem.getLink();
        if (sLink == null || sLink.length() == 0) {
          sLink = "#";
        }
        
        boolean boAtLeastOneActive = false;
        StringBuilder sbc = null;
        List<MenuItem> listChildren = getChildren(menuItem);
        if (listChildren != null && listChildren.size() > 0) {
          sbc = new StringBuilder(75 * listChildren.size());
          for (int j = 0; j < listChildren.size(); j++) {
            MenuItem menuItemChild = listChildren.get(j);
            if (menuItemChild == null) continue;
            
            String sTextChild = menuItemChild.getText();
            if (sTextChild == null || sTextChild.length() == 0) {
              sTextChild = menuItemChild.getId();
            }
            String sLinkChild = menuItemChild.getLink();
            if (sLinkChild == null || sLinkChild.length() == 0) {
              sLinkChild = "#";
            }
            
            boolean boMatch = menuItemChild.matchLink(sRequestURI, sParamMenu);
            if (boMatch) {
              menuItemChild.setActive(true);
              boAtLeastOneActive = true;
            }
            else {
              menuItemChild.setActive(false);
            }
            
            String sClassLiChild = "";
            if (menuItemChild.isActive()) {
              sClassLiChild = " class=\"active\"";
            }
            sbc.append("<li" + sClassLiChild + ">");
            sbc.append("<a href=\"" + sLinkChild + "\">" + sTextChild + "</a>");
            sbc.append("</li>");
          }
          
          String sClassLi = " class=\"dropdown\"";
          if (boAtLeastOneActive || menuItem.isActive()) {
            sClassLi = " class=\"dropdown active\"";
          }
          sb.append("<li" + sClassLi + ">");
          sb.append("<a aria-expanded=\"false\" role=\"button\" href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\"><i class=\"fa " + sIcon + "\"></i> <span class=\"nav-label\">" + sText + "</span><span class=\"caret\"></span></a>");
          sb.append("<ul role=\"menu\" class=\"dropdown-menu\">");
          sb.append(sbc.toString());
          sb.append("</ul>");
          sb.append("</li>");
        }
      }
    }
    sb.append("</ul>");
    sb.append("<ul class=\"nav navbar-top-links navbar-right\">");
    sb.append("<li><a href=\"" + contextPath + App.LOGOUT_PAGE + "\"><i class=\"fa fa-sign-out\"></i>" + App.getMessage(locale, "logout") + " </a></li>");
    sb.append("</ul> ");
    
    sb.append("<ul class=\"nav navbar-top-links navbar-right\"><li class=\"dropdown\" >");
    sb.append("<a aria-expanded=\"false\" role=\"button\" href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\"><i class=\"fa fa-user\"></i><span class=\"nav-label\">" + sUserName + "</span><span class=\"caret\"></span></a>");
    sb.append("<ul role=\"menu\" class=\"dropdown-menu\">");
    // See _imp_footer.jsp
    sb.append("<li><a data-target=\"#" + App.ID_DIALOG_CHN_PWD + "\" data-toggle=\"modal\" href=\"#" + App.ID_DIALOG_CHN_PWD + "\">" + App.getMessage(locale, "modpwd") + "</a></li>");
    sb.append("<li><a href=\"" + contextPath + App.LOGOUT_PAGE + "\">" + App.getMessage(locale, "logout") + "</a></li>");
    sb.append("</ul>");
    
    sb.append("</div>");
    sb.append("</nav>");
    sb.append("</div>");
    return sb.toString();
  }
  
  @Override
  public 
  String buildSubMenu(HttpServletRequest request)
  {
    return "";
  }
  
  @Override
  public 
  List<MenuItem> getBreadcrumb(HttpServletRequest request) 
  {
    List<MenuItem> listResult = new ArrayList<MenuItem>(2);
    
    String sRequestURI = request.getRequestURI();
    MenuItem menuItem = getMenuItemByLink(sRequestURI);
    if (menuItem == null) return listResult;
    
    MenuItem menuItemPar = null;
    String sParentId = menuItem.getParent();
    if (sParentId != null && sParentId.length() > 0) {
      menuItemPar = getMenuItemById(sParentId);
    }
    if (menuItemPar != null) {
      listResult.add(menuItemPar);
    }
    listResult.add(menuItem);
    return listResult;
  }
  
  @Override
  public String getBodyClass() {
    return "top-navigation";
  }
}