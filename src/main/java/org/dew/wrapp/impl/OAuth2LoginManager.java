package org.dew.wrapp.impl;

import java.util.HashMap;
import java.util.Map;

import org.dew.wrapp.App;
import org.dew.wrapp.User;
import org.dew.wrapp.json.JSON;
import org.dew.wrapp.mgr.ConfigManager;
import org.dew.wrapp.mgr.ILoginManager;
import org.dew.wrapp.util.WHttp;
import org.dew.wrapp.util.WMap;
import org.dew.wrapp.util.WUtil;

public 
class OAuth2LoginManager implements ILoginManager
{
  @Override
  public 
  User login(String username, String password) 
    throws Exception 
  {
    System.out.println("OAuth2LoginManager.login(" + username + ",*)...");
    
    if(username == null || username.length() == 0) {
      System.out.println("OAuth2LoginManager.login(" + username + ",*) -> null");
      return null;
    }
    if(password == null || password.length() == 0) {
      System.out.println("OAuth2LoginManager.login(" + username + ",*) -> null (no password)");
      return null;
    }
    String loginURL = ConfigManager.getConfigStr("login_url");
    if(loginURL == null || loginURL.length() < 7) {
      System.out.println("OAuth2LoginManager.login(" + username + ",*) -> null (Invalid login_url=" + loginURL + ")");
      return null;
    }
    
    Map<String, Object> data = new HashMap<String, Object>();
    data.put("grant_type", "password");
    data.put("username",   username);
    data.put("password",   password);
    data.put("client_id",  App.getAppName());
    
    WHttp whttp = new WHttp(loginURL);
    
    String response = null;
    try {
      // Access Token Request
      response = whttp.post(data);
    }
    catch(Exception ex) {
      System.out.println("OAuth2LoginManager.login(" + username + ",*) -> null (access token request: " + ex + ")");
      return null;
    }
    
    if(response == null || response.length() == 0) {
      System.out.println("OAuth2LoginManager.login(" + username + ",*) -> null (Invalid access token response=" + response + ")");
      return null;
    }
    
    Map<String,Object> mapReponse = JSON.parseObj(response);
    
    if(containsUserInfo(mapReponse)) {
      User user = new User(mapReponse);
      user.setCurrLogin(new java.util.Date());
      
      System.out.println("OAuth2LoginManager.login(" + username + ",*) -> " + user);
      return user;
    }
    
    String accessToken = WUtil.toString(mapReponse.get("access_token"), null);
    if(accessToken == null || accessToken.length() == 0) {
      System.out.println("OAuth2LoginManager.login(" + username + ",*) -> null (accessToken=" + accessToken + ")");
      return null;
    }
    
    String loginURLInfo = ConfigManager.getConfigStr("login_info");
    if(loginURLInfo == null || loginURLInfo.length() < 7) {
      loginURLInfo = loginURL;
      int lastSep = loginURLInfo.lastIndexOf('/');
      if(lastSep > 0) {
        loginURLInfo = loginURLInfo.substring(0, lastSep) + "/userinfo";
      }
      else {
        loginURLInfo += "/userinfo"; 
      }
    }
    
    whttp.setUrlBase(loginURLInfo);
    whttp.setBasicAuthUsername(null);
    whttp.setBasicAuthPassword(null);
    whttp.setBearer(accessToken);
    
    try {
      // User info
      response = whttp.get();
    }
    catch(Exception ex) {
      System.out.println("OAuth2LoginManager.login(" + username + ",*) -> null (get user info: " + ex + ")");
      return null;
    }
    
    if(response == null || response.length() == 0) {
      System.out.println("OAuth2LoginManager.login(" + username + ",*) -> null (Invalid get user info response=" + response + ")");
      return null;
    }
    
    mapReponse = JSON.parseObj(response);
    
    User user = new User(mapReponse);
    
    String name = user.getUserName();
    if(name == null || name.length() == 0) {
      user.setUserName(username);
    }
    user.setCurrLogin(new java.util.Date());
    
    System.out.println("OAuth2LoginManager.login(" + username + ",*) -> " + user);
    return user;
  }
  
  @Override
  public 
  void logout(User user) 
    throws Exception 
  {
    System.out.println("OAuth2LoginManager.logout(" + user + ")...");
  }
  
  @Override
  public 
  boolean updatePassword(String username, String currentPassword, String newPassword) 
    throws Exception 
  {
    System.out.println("OAuth2LoginManager.updatePassword(" + username + ",*,*)...");
    return false;
  }
  
  public
  boolean containsUserInfo(Map<String, Object> mapReponse)
  {
    WMap wmResponse = new WMap(mapReponse);
    
    String userName = wmResponse.getString("userName");
    if(userName == null || userName.length() == 0) {
      userName = wmResponse.getString("username");
    }
    if(userName == null || userName.length() == 0) {
      userName = wmResponse.getString("name");
    }
    if(userName == null || userName.length() == 0) {
      userName = wmResponse.getString("nickname");
    }
    
    return userName != null && userName.length() > 0;
  }
}
