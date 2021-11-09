package org.dew.wrapp.impl;

import java.util.Date;
import java.util.Map;

import org.dew.wrapp.User;
import org.dew.wrapp.json.JSON;
import org.dew.wrapp.mgr.ConfigManager;
import org.dew.wrapp.mgr.ILoginManager;
import org.dew.wrapp.util.WHttp;

public 
class BasicAuthLoginManager implements ILoginManager
{
  @Override
  public 
  User login(String username, String password) 
    throws Exception 
  {
    System.out.println("BasicAuthLoginManager.login(" + username + ",*)...");
    
    if(username == null || username.length() == 0) {
      System.out.println("BasicAuthLoginManager.login(" + username + ",*) -> null");
      return null;
    }
    if(password == null || password.length() == 0) {
      System.out.println("BasicAuthLoginManager.login(" + username + ",*) -> null (no password)");
      return null;
    }
    String loginURL = ConfigManager.getConfigStr("login_url");
    if(loginURL == null || loginURL.length() < 7) {
      System.out.println("BasicAuthLoginManager.login(" + username + ",*) -> null (Invalid login_url=" + loginURL + ")");
      return null;
    }
    
    WHttp whttp = new WHttp(loginURL);
    whttp.setBasicAuthUsername(username);
    whttp.setBasicAuthPassword(password);
    
    String response = null;
    try {
      response = whttp.get();
    }
    catch(Exception ex) {
      System.out.println("BasicAuthLoginManager.login(" + username + ",*) -> null (" + ex + ")");
      return null;
    }
    
    if(response == null || response.length() == 0) {
      User user = new User(username);
      user.setId(username.hashCode());
      user.setCurrLogin(new java.util.Date());
      return user;
    }
    
    Map<String,Object> mapUser = JSON.parseObj(response);
    
    User user = new User(mapUser);
    
    String name = user.getUserName();
    if(name == null || name.length() == 0) {
      user.setUserName(username);
    }
    user.setCurrLogin(new Date());
    
    System.out.println("BasicAuthLoginManager.login(" + username + ",*) -> " + user);
    return user;
  }
  
  @Override
  public 
  void logout(User user) 
    throws Exception 
  {
    System.out.println("BasicAuthLoginManager.logout(" + user + ")...");
  }
  
  @Override
  public 
  boolean updatePassword(String username, String currentPassword, String newPassword) 
    throws Exception 
  {
    System.out.println("BasicAuthLoginManager.updatePassword(" + username + ",*,*)...");
    return false;
  }
}
