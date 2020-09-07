package org.dew.wrapp.mgr;

import java.util.List;
import java.util.Map;

import org.dew.wrapp.MenuItem;
import org.dew.wrapp.Page;

public 
interface IAppManager 
{
  public Map<String, Page> loadPages() throws Exception;
  
  public Map<String, List<MenuItem>> loadMenus() throws Exception;
}
