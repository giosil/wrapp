package org.dew.wrapp.impl;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

import java.net.URL;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.dew.wrapp.App;
import org.dew.wrapp.MenuItem;
import org.dew.wrapp.Page;
import org.dew.wrapp.json.JSON;
import org.dew.wrapp.mgr.IAppManager;
import org.dew.wrapp.util.WUtil;

public 
class DefaultAppManager implements IAppManager
{
  @Override
  public 
  Map<String, Page> loadPages() 
      throws Exception 
  {
    String json = loadFile("wrapp_pages.json");
    if(json == null || json.length() < 3) {
      return new HashMap<String, Page>();
    }
    
    Map<String, Object> data = JSON.parseObj(json);
    if(data == null || data.isEmpty()) {
      return new HashMap<String, Page>();
    }
    
    Map<String, Page> mapResult = new HashMap<String, Page>(data.size());
    
    Iterator<Map.Entry<String, Object>> iterator = data.entrySet().iterator();
    while(iterator.hasNext()) {
      Map.Entry<String, Object> entry = iterator.next();
      Object value = entry.getValue();
      if(value instanceof Map) {
        Page page = WUtil.populateBean(Page.class, WUtil.toMapObject(value));
        if(page == null) continue;
        page.setId(entry.getKey());
        
        mapResult.put(entry.getKey(), page);
      }
    }
    
    return mapResult;
  }
  
  @Override
  public 
  Map<String, List<MenuItem>> loadMenus() 
      throws Exception 
  {
    String json = loadFile("wrapp_menus.json");
    if(json == null || json.length() < 3) {
      return new HashMap<String, List<MenuItem>>();
    }
    
    Map<String, Object> data = JSON.parseObj(json);
    if(data == null || data.isEmpty()) {
      return new HashMap<String, List<MenuItem>>();
    }
    
    Map<String, List<MenuItem>> mapResult = new HashMap<String, List<MenuItem>>(data.size());
    
    Iterator<Map.Entry<String, Object>> iterator = data.entrySet().iterator();
    while(iterator.hasNext()) {
      Map.Entry<String, Object> entry = iterator.next();
      Object value = entry.getValue();
      if(value instanceof List) {
        List<MenuItem> listOfMenuItem = WUtil.toListOfBean(value, MenuItem.class);
        if(listOfMenuItem == null || listOfMenuItem.size() == 0) {
          continue;
        }
        
        // Normalize menu items
        for(MenuItem menuItem : listOfMenuItem) {
          String link = menuItem.getLink();
          if(link != null && link.length() > 0) {
            String parent = menuItem.getParent();
            if(parent == null || parent.length() == 0) {
              String menuItemId = menuItem.getId();
              if(menuItemId != null) {
                int iLastSep = menuItemId.lastIndexOf('.');
                if(iLastSep > 0) {
                  menuItem.setParent(menuItemId.substring(0, iLastSep));
                }
              }
            }
          }
        }
        
        mapResult.put(entry.getKey(), listOfMenuItem);
      }
    }
    
    return mapResult;
  }
  
  protected static
  String loadFile(String sFile)
      throws Exception
  {
    String sUserHome = System.getProperty("user.home");
    String sFilePath = sUserHome + File.separator + App.CONFIG_FOLDER_NAME + File.separator + sFile;
    
    byte[] content = null;
    
    File file = new File(sFilePath);
    if(file.exists()) {
      content = readFile(sFilePath);
    }
    else {
      content = readFile(sFile);
    }
    
    if(content == null || content.length < 3) {
      return null;
    }
    
    return new String(content);
  }
  
  protected static
  byte[] readFile(String sFile)
      throws Exception
  {
    int iFileSep = sFile.indexOf('/');
    if(iFileSep < 0) iFileSep = sFile.indexOf('\\');
    InputStream is = null;
    if(iFileSep < 0) {
      URL url = Thread.currentThread().getContextClassLoader().getResource(sFile);
      is = url.openStream();
    }
    else {
      is = new FileInputStream(sFile);
    }
    try {
      int n;
      ByteArrayOutputStream baos = new ByteArrayOutputStream();
      byte[] buff = new byte[1024];
      while((n = is.read(buff)) > 0) baos.write(buff, 0, n);
      return baos.toByteArray();
    }
    finally {
      if(is != null) try{ is.close(); } catch(Exception ex) {}
    }
  }
}
