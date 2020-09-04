package org.dew.wrapp;

import java.util.List;

public 
class UserMenuManager implements IUserMenuManager
{
  public
  AMenuManager createMenuManager(User user) 
  {
    if(user == null) return null;
    
    AMenuManager menuManager = App.getMenuManagerInstance(user);
    
    List<MenuItem> menuItems = App.getMenu("main");
    
    menuManager.setMenuItems(menuItems);
    
    return menuManager;
  }
}