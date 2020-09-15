package org.dew.wrapp.mgr;

import org.dew.wrapp.User;

public 
interface ILoginManager 
{
  public User login(String username, String password) throws Exception;
  
  public void logout(User user) throws Exception;
  
  public boolean updatePassword(String username, String currentPassword, String newPassword) throws Exception;
}
