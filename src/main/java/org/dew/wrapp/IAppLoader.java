package org.dew.wrapp;

import java.util.List;
import java.util.Map;

public 
interface IAppLoader 
{
  public Map<String, Object> loadConfig() throws Exception;
  
  public Map<String, Page> loadPages()  throws Exception;
  
  public Map<String, List<MenuItem>> loadMenus()   throws Exception;
}
