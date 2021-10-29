package org.dew.wrapp.web;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.dew.wrapp.App;
import org.dew.wrapp.User;
import org.dew.wrapp.mgr.ILoginManager;

public
class SessionListener implements HttpSessionListener, HttpSessionAttributeListener
{
  public
  void sessionCreated(HttpSessionEvent httpSessionEvent)
  {
  }
  
  public
  void sessionDestroyed(HttpSessionEvent httpSessionEvent)
  {
    HttpSession httpSession = httpSessionEvent.getSession();
    if(httpSession == null) return;
    
    Object user = httpSession.getAttribute("user");
    if(user instanceof User) {
      
      App.removeUser((User) user);
      
      ILoginManager loginManager = App.getLoginManagerInstance();
      if(loginManager != null) {
        try {
          loginManager.logout((User) user);
        }
        catch(Exception ex) {
          ex.printStackTrace();
        }
      }
    }
  }
  
  public
  void attributeAdded(HttpSessionBindingEvent httpSessionBindingEvent)
  {
  }
  
  public
  void attributeRemoved(HttpSessionBindingEvent httpSessionBindingEvent)
  {
  }
  
  public
  void attributeReplaced(HttpSessionBindingEvent httpSessionBindingEvent)
  {
  }
}
