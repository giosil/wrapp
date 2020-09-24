package org.dew.wrapp.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.dew.wrapp.User;

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
    System.out.println("DefaultLoginManager.login(" + username + ",*)...");
    
    if(username == null || username.length() == 0) {
      System.out.println("DefaultLoginManager.login(" + username + ",*) -> null");
      return null;
    }
    if(password == null || password.length() == 0) {
      System.out.println("DefaultLoginManager.login(" + username + ",*) -> null");
      return null;
    }
    
    User user = new User(username);
    user.setId(username.hashCode());
    user.setRole("oper");
    user.setCurrLogin(new Date());
    user.setTokenId(UUID.randomUUID().toString());
    
    if(username.equalsIgnoreCase("it") || username.endsWith("-it")) {
      user.setLocale("it");
    }
    if(username.equalsIgnoreCase("top") || username.startsWith("top-")) {
      user.setMenuManager(TopMenuManager.class.getName());
    }
    
    System.out.println("DefaultLoginManager.login(" + username + ",*) -> " + user);
    return user;
  }
  
  @Override
  public 
  void logout(User user) 
    throws Exception 
  {
    System.out.println("DefaultLoginManager.logout(" + user + ")...");
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
