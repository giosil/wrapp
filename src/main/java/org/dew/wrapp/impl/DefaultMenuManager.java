package org.dew.wrapp.impl;

import java.util.*;

import javax.servlet.http.HttpServletRequest;

import org.dew.wrapp.App;
import org.dew.wrapp.MenuItem;
import org.dew.wrapp.Page;
import org.dew.wrapp.WebUtil;
import org.dew.wrapp.mgr.AMenuManager;

public 
class DefaultMenuManager extends AMenuManager
{
  private static final long serialVersionUID = -2051426599218169825L;
  
  public DefaultMenuManager()
  {
  }
  
  @Override
  public 
  String build(HttpServletRequest request)
  {
    StringBuilder sb = new StringBuilder(770 + 100 * mapItems.size());
    
    Page   page   = WebUtil.getPage(request);
    String pageId = page != null ? page.getId() : null;
    
    String sRequestURI = pageId != null && pageId.length() > 0 ? "/" + pageId : request.getRequestURI();
    String sParamMenu  = request.getParameter("m");
    
    String sUserName = "";
    String sUserRole = "";
    if(user != null) {
      sUserName = user.getUserName();
      sUserRole = user.getRole();
    }
    if(sUserName == null || sUserName.length() == 0) {
      sUserName = "user";
    }
    if(sUserRole == null || sUserRole.length() == 0) {
      sUserRole = "user";
    }
    
    Locale locale = App.getLocale(user);
    
    String contextPath = request.getContextPath();
    if(contextPath == null) contextPath = "";
    if(!contextPath.startsWith("/")) contextPath = "/" + contextPath;
    if(!contextPath.endsWith("/"))   contextPath =  contextPath + "/";
    
    sb.append("<nav class=\"navbar-default navbar-static-side\" role=\"navigation\">");
    sb.append("<div class=\"sidebar-collapse\">");
    sb.append("<ul class=\"nav metismenu\" id=\"" + App.ID_SIDE_MENU + "\">");
    
    sb.append("<li class=\"nav-header\">");
    sb.append("<div class=\"dropdown profile-element\">");
    sb.append("<span><img alt=\"image\" class=\"img-circle\" src=\"" + contextPath + App.IMG_DEFAULT_AVATAR + "\" /></span>");
    sb.append("<a data-toggle=\"dropdown\" class=\"dropdown-toggle\" href=\"#\">");
    sb.append("<span class=\"clear\"> <span class=\"block m-t-xs\"> <strong class=\"font-bold\">" + sUserName + "</strong></span> ");
    sb.append("<span class=\"text-muted text-xs block\">" + sUserRole + "<b class=\"caret\"></b></span> </span> </a>");
    sb.append("<ul class=\"dropdown-menu animated fadeInRight m-t-xs\">");
    sb.append("<li><a href=\"" + contextPath + App.HOME_PAGE + "\">" + App.getMessage(locale, "home") + "</a></li>");
    sb.append("<li class=\"divider\"></li>");
    // See _imp_footer.jsp
    sb.append("<li><a data-target=\"#" + App.ID_DIALOG_CHN_PWD + "\" data-toggle=\"modal\" href=\"#" + App.ID_DIALOG_CHN_PWD + "\">" + App.getMessage(locale, "modpwd") + "</a></li>");
    sb.append("<li><a href=\"" + contextPath + App.LOGOUT_PAGE + "\">" + App.getMessage(locale, "logout") + "</a></li>");
    sb.append("</ul>");
    sb.append("</div>");
    sb.append("<div class=\"logo-element\">" + App.getAppName() + "</div>");
    sb.append("</li>");
    
    List<MenuItem> listMainMenu = getMainMenu();
    if(listMainMenu != null && listMainMenu.size() > 0) {
      for(int i = 0; i < listMainMenu.size(); i++) {
        MenuItem menuItem = listMainMenu.get(i);
        if(menuItem == null) continue;
        
        String sIcon = menuItem.getIcon();
        if(sIcon == null || sIcon.length() == 0) {
          sIcon = "fa-edit";
        }
        String sText = menuItem.getText();
        if(sText == null || sText.length() == 0) {
          sText = menuItem.getId();
        }
        String sLink = menuItem.getLink();
        if(sLink == null || sLink.length() == 0) {
          sLink = "#";
        }
        if(!sLink.startsWith("/") && !sLink.startsWith(contextPath)) {
          sLink = contextPath + sLink;
        }
        
        boolean boAtLeastOneActive = false;
        StringBuilder sbc = null;
        List<MenuItem> listChildren = getChildren(menuItem);
        if(listChildren != null && listChildren.size() > 0) {
          sbc = new StringBuilder(75 * listChildren.size());
          sbc.append("<ul class=\"nav nav-second-level collapse\">");
          for(int j = 0; j < listChildren.size(); j++) {
            MenuItem menuItemChild = listChildren.get(j);
            if(menuItemChild == null) continue;
            
            String sTextChild = menuItemChild.getText();
            if(sTextChild == null || sTextChild.length() == 0) {
              sTextChild = menuItemChild.getId();
            }
            String sLinkChild = menuItemChild.getLink();
            if(sLinkChild == null || sLinkChild.length() == 0) {
              sLinkChild = "#";
            }
            if(!sLinkChild.startsWith("/") && !sLinkChild.startsWith(contextPath)) {
              sLinkChild = contextPath + sLinkChild;
            }
            
            boolean boMatch = menuItemChild.matchLink(sRequestURI, sParamMenu);
            if(boMatch) {
              menuItemChild.setActive(true);
              boAtLeastOneActive = true;
            }
            else {
              menuItemChild.setActive(false);
            }
            
            String sClassLiChild = "";
            if(menuItemChild.isActive()) {
              sClassLiChild = " class=\"active\"";
            }
            sbc.append("<li" + sClassLiChild + ">");
            sbc.append("<a href=\"" + sLinkChild + "\">" + WebUtil.getLocalized(sTextChild, locale) + "</a>");
            sbc.append("</li>");
          }
          sbc.append("</ul>");
        }
        else {
          sbc = new StringBuilder();
        }
        
        String sClassLi = "";
        if(boAtLeastOneActive || menuItem.isActive()) {
          sClassLi = " class=\"active\"";
        }
        sb.append("<li" + sClassLi + ">");
        sb.append("<a href=\"" + sLink + "\" title=\"" + WebUtil.getLocalized(sText, locale) + "\"><i class=\"fa " + sIcon + "\"></i> <span class=\"nav-label\">" + WebUtil.getLocalized(sText, locale) + "</span><span class=\"fa arrow\"></span></a>");
        sb.append(sbc.toString());
        sb.append("</li>");
      }
    }
    sb.append("</ul>");
    sb.append("</div>");
    sb.append("</nav>");
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
    if(menuItem == null) return listResult;
    
    MenuItem menuItemPar = null;
    String sParentId = menuItem.getParent();
    if(sParentId != null && sParentId.length() > 0) {
      menuItemPar = getMenuItemById(sParentId);
    }
    if(menuItemPar != null) {
      listResult.add(menuItemPar);
    }
    listResult.add(menuItem);
    return listResult;
  }
  
  @Override
  public String getBodyClass() {
    return "";
  }
}