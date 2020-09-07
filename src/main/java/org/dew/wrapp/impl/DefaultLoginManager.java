package org.dew.wrapp.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dew.wrapp.App;
import org.dew.wrapp.MenuItem;
import org.dew.wrapp.User;
import org.dew.wrapp.mgr.AMenuManager;
import org.dew.wrapp.mgr.ILoginManager;

public 
class DefaultLoginManager implements ILoginManager
{
  protected static Map<String, User> users = new HashMap<String, User>();
  
  public DefaultLoginManager()
  {
  }
  
  @Override
  public 
  User login(String username, String password) 
    throws Exception 
  {
    return new User(username);
  }
  
  @Override
  public 
  void logout(User user) 
    throws Exception 
  {
  }
  
  @Override
  public 
  AMenuManager createMenuManager(User user) 
    throws Exception 
  {
    if(user == null) return null;
    
    String username = user.getUserName();
    
    // Retrieve menu manager class name from user...
    String menuManagerClassName = "";
    
    // Example...
    if("top".equals(username)) {
      menuManagerClassName = TopMenuManager.class.getName();
    }
    
    AMenuManager menuManager = App.getMenuManagerInstance(user, menuManagerClassName);
    
    // Retrieve menu from user...
    String menu = "main";
    
    List<MenuItem> menuItems = App.getMenu(menu);
    
    menuManager.setMenuItems(menuItems);
    
    return menuManager;
  }
  
  @Override
  public 
  boolean updatePassword(String username, String currentPassword, String newPassword) 
    throws Exception 
  {
    System.out.println("DefaultLoginManager.updatePassword(" + username + "," + currentPassword + "," + newPassword + ")...");
    return true;
  }
}
