package org.dew.wrapp;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dew.wrapp.util.WUtil;

public 
class App 
{
  public static long STARTUP_TIME = System.currentTimeMillis();
  
  public static Map<String, Object> config = new HashMap<String, Object>();
  
  public static Map<String, Page> pages = new HashMap<String, Page>();
  
  public static Map<String, List<MenuItem>> menus = new HashMap<String, List<MenuItem>>();
  
  public static final boolean DEBUG = true;
  
  public static void startup() {
    if(DEBUG) System.out.println("App.startup()...");
    
    STARTUP_TIME = System.currentTimeMillis();
    
    reload();
  }
  
  public static void shutdown() {
    if(DEBUG) System.out.println("App.shutdown()...");
    
  }
  
  public static void reload() {
    if(DEBUG) System.out.println("App.reload()...");
    
    IAppLoader appLoader = new JSONAppLoader();
    
    try {
      config = appLoader.loadConfig();
    }
    catch(Exception ex) {
      System.err.println("App.startup() Exception in appLoader.loadConfig(): " + ex);
    }
    if(config == null) {
      config = new HashMap<String, Object>();
    }
    
    try {
      pages = appLoader.loadPages();
    }
    catch(Exception ex) {
      System.err.println("App.startup() Exception in appLoader.loadPages(): " + ex);
    }
    if(pages == null) {
      pages = new HashMap<String, Page>();
    }
    
    try {
      menus = appLoader.loadMenus();
    }
    catch(Exception ex) {
      System.err.println("App.startup() Exception in appLoader.loadMenus(): " + ex);
    }
    if(menus == null) {
      menus = new HashMap<String, List<MenuItem>>();
    }
    
    if(DEBUG) System.out.println("config [" + config.size() + "]");
    if(DEBUG) System.out.println("pages  [" + pages.size()  + "]");
    if(DEBUG) System.out.println("menus  [" + menus.size()  + "]");
  }
  
  public static void clear() {
    if(DEBUG) System.out.println("App.clear()...");
    
    pages.clear();
    menus.clear();
  }
  
  public static void addPage(Page page) {
    if(DEBUG) System.out.println("App.addPage(" + page + ")...");
    
    if(page == null || page.getId() == null) {
      return;
    }
    pages.put(page.getId(), page);
  }
  
  public static void addMenu(String idMenu, List<MenuItem> menuItems) {
    if(DEBUG) System.out.println("App.addMenu(" + idMenu + "," + menuItems + ")...");
    
    if(idMenu == null || idMenu.length() == 0) {
      idMenu = "main";
    }
    if(menuItems == null) {
      menuItems = new ArrayList<MenuItem>();
    }
    menus.put(idMenu, menuItems);
  }
  
  public static void update(String module) {
    if(DEBUG) System.out.println("App.update(" + module + ")...");
    
    if(module == null || module.length() == 0) {
      return;
    }
    
    String newMarker = String.valueOf(System.currentTimeMillis());
    
    for(Page page : pages.values()) {
      String[] asCss = page.getCss();
      if(asCss != null && asCss.length > 0) {
        for(int i = 0; i < asCss.length; i++) {
          if(asCss[i] == null || !asCss[i].startsWith("/" + module + "/")) {
            continue;
          }
          asCss[i] = WebUtil.replaceMarker(asCss[i], newMarker);
        }
      }
      
      String[] asScripts = page.getScripts();
      if(asScripts != null && asScripts.length > 0) {
        for(int i = 0; i < asScripts.length; i++) {
          if(asScripts[i] == null || !asScripts[i].startsWith("/" + module + "/")) {
            continue;
          }
          asScripts[i] = WebUtil.replaceMarker(asScripts[i], newMarker);
        }
      }
    }
  }
  
  public static Page getPage(String id) {
    if(DEBUG) System.out.println("App.getPage(" + id + ")...");
    
    return pages.get(id);
    
  }
  
  public static List<MenuItem> getMenu(String id) {
    if(DEBUG) System.out.println("App.getMenu(" + id + ")...");
    
    return menus.get(id);
    
  }
  
  public static Object getConfig(String key) {
    if(DEBUG) System.out.println("App.getConfig(" + key + ")...");
    
    return config.get(key);
    
  }
  
  public static Object getConfig(String key, Object defaultValue) {
    if(DEBUG) System.out.println("App.getConfig(" + key + "," + defaultValue + ")...");
    
    Object result = config.get(key);
    
    if(result == null) return defaultValue;
    
    return result;
    
  }
  
  public static String getConfigStr(String key) {
    if(DEBUG) System.out.println("App.getConfigStr(" + key + ")...");
    
    return WUtil.toString(config.get(key), null);
    
  }
  
  public static String getConfigStr(String key, String defaultValue) {
    if(DEBUG) System.out.println("App.getConfigStr(" + key + "," + defaultValue + ")...");
    
    return WUtil.toString(config.get(key), defaultValue);
    
  }
  
  public static int getConfigInt(String key) {
    if(DEBUG) System.out.println("App.getConfigInt(" + key + ")...");
    
    return WUtil.toInt(config.get(key), 0);
    
  }
  
  public static int getConfigInt(String key, int defaultValue) {
    if(DEBUG) System.out.println("App.getConfigInt(" + key + "," + defaultValue + ")...");
    
    return WUtil.toInt(config.get(key), defaultValue);
    
  }
  
  public static double getConfigDouble(String key) {
    if(DEBUG) System.out.println("App.getConfigDouble(" + key + ")...");
    
    return WUtil.toDouble(config.get(key), 0);
    
  }
  
  public static double getConfigDouble(String key, int defaultValue) {
    if(DEBUG) System.out.println("App.getConfigDouble(" + key + "," + defaultValue + ")...");
    
    return WUtil.toDouble(config.get(key), defaultValue);
    
  }
  
  public static boolean getConfigBool(String key) {
    if(DEBUG) System.out.println("App.getConfigBool(" + key + ")...");
    
    return WUtil.toBoolean(config.get(key), false);
    
  }
  
  public static boolean getConfigBool(String key, boolean defaultValue) {
    if(DEBUG) System.out.println("App.getConfigBool(" + key + "," + defaultValue + ")...");
    
    return WUtil.toBoolean(config.get(key), defaultValue);
    
  }
  
  public static Calendar getConfigCal(String key) {
    if(DEBUG) System.out.println("App.getConfigCal(" + key + ")...");
    
    return WUtil.toCalendar(config.get(key), false);
    
  }
  
  public static Calendar getConfigCal(String key, Object defaultValue) {
    if(DEBUG) System.out.println("App.getConfigCal(" + key + "," + defaultValue + ")...");
    
    return WUtil.toCalendar(config.get(key), defaultValue);
    
  }
  
  public static AMenuManager getMenuManagerInstance(User user) {
    if(DEBUG) System.out.println("App.getMenuManagerInstance(" + user + ")...");
    
    String menuManagerClass = getConfigStr("menumanager");
    if(menuManagerClass == null || menuManagerClass.length() == 0 || menuManagerClass.equalsIgnoreCase("default")) {
      return new SideMenuManager(user);
    }
    
    try {
      Class<?> clazz = Class.forName(menuManagerClass);
      
      Object object = clazz.getDeclaredConstructor().newInstance();
      
      if(object instanceof AMenuManager) {
        ((AMenuManager) object).setUser(user);
        
        return (AMenuManager) object;
      }
    }
    catch(Exception ex) {
      System.err.println("App.getMenuManagerInstance(" + user + ") Exception: " + ex);
    }
    
    return new SideMenuManager(user);
  }
}
