package org.dew.wrapp;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.ResourceBundle;

import org.dew.wrapp.impl.DefaultLogger;
import org.dew.wrapp.impl.DefaultLoginManager;
import org.dew.wrapp.impl.DefaultMenuManager;
import org.dew.wrapp.impl.DefaultAppManager;
import org.dew.wrapp.mgr.AMenuManager;
import org.dew.wrapp.mgr.ConfigManager;
import org.dew.wrapp.mgr.IAppManager;
import org.dew.wrapp.mgr.ILogger;
import org.dew.wrapp.mgr.ILoginManager;
import org.dew.wrapp.util.WUtil;

public 
class App 
{
  public static long STARTUP_TIME = System.currentTimeMillis();
  
  public static Map<String, Object> config = ConfigManager.loadConfig();
  
  public static Map<String, ResourceBundle> resourceBundles = new HashMap<String, ResourceBundle>();
  
  public static Map<String, Page> pages = new HashMap<String, Page>();
  
  public static Map<String, List<MenuItem>> menus = new HashMap<String, List<MenuItem>>();
  
  protected static ILogger       _logger;
  
  protected static ILoginManager _loginManager;
  
  protected static IAppManager   _appManager;
  
  static {
    getLoggerInstance();
  }
  
  public static void startup() {
    _logger.debug("App.startup()...");
    
    STARTUP_TIME = System.currentTimeMillis();
    
    IAppManager appLoader = getAppManagerInstance();
    
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
    
    _logger.debug("pages [" + pages.size()  + "]");
    _logger.debug("menus [" + menus.size()  + "]");
  }
  
  public static void destroy() {
    _logger.debug("App.destroy()...");
    
    clear();
  }
  
  public static void reload() {
    _logger.debug("App.reload()...");
    
    try {
      config = ConfigManager.loadConfig();
    }
    catch(Exception ex) {
      System.err.println("App.reload() Exception in ConfigManager.loadConfig(): " + ex);
    }
    if(config == null) {
      config = new HashMap<String, Object>();
    }
    
    getLoggerInstance();
    _loginManager = null;
    _appManager   = null;
    
    IAppManager appLoader = getAppManagerInstance();
    
    try {
      pages = appLoader.loadPages();
    }
    catch(Exception ex) {
      System.err.println("App.reload() Exception in appLoader.loadPages(): " + ex);
    }
    if(pages == null) {
      pages = new HashMap<String, Page>();
    }
    
    try {
      menus = appLoader.loadMenus();
    }
    catch(Exception ex) {
      System.err.println("App.reload() Exception in appLoader.loadMenus(): " + ex);
    }
    if(menus == null) {
      menus = new HashMap<String, List<MenuItem>>();
    }
    
    _logger.debug("pages [" + pages.size()  + "]");
    _logger.debug("menus [" + menus.size()  + "]");
  }
  
  public static void clear() {
    _logger.debug("App.clear()...");
    
    pages.clear();
    menus.clear();
  }
  
  public static void addPage(Page page) {
    _logger.debug("App.addPage(" + page + ")...");
    
    if(page == null || page.getId() == null) {
      return;
    }
    pages.put(page.getId(), page);
  }
  
  public static void addMenu(String idMenu, List<MenuItem> menuItems) {
    _logger.debug("App.addMenu(" + idMenu + "," + menuItems + ")...");
    
    if(idMenu == null || idMenu.length() == 0) {
      idMenu = "main";
    }
    if(menuItems == null) {
      menuItems = new ArrayList<MenuItem>();
    }
    menus.put(idMenu, menuItems);
  }
  
  public static void update(String module) {
    _logger.debug("App.update(" + module + ")...");
    
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
  
  public static boolean updatePassword(String username, String currentPassword, String newPassword) {
    _logger.debug("App.updatePassword(" + username + ",*,*)...");
    
    ILoginManager loginManager = getLoginManagerInstance();
    
    try {
      return loginManager.updatePassword(username, currentPassword, newPassword);
    }
    catch(Exception ex) {
      _logger.error("Exception in loginManager.updatePassword(" + username + ",*,*)", ex);
    }
    
    return false;
  }
  
  public static Page getPage(String id) {
    _logger.debug("App.getPage(" + id + ")...");
    
    return pages.get(id);
  }
  
  public static List<MenuItem> getMenu(String id) {
    _logger.debug("App.getMenu(" + id + ")...");
    
    return menus.get(id);
  }
  
  public static Object getConfig(String key) {
    return config.get(key);
  }
  
  public static Object getConfig(String key, Object defaultValue) {
    Object result = config.get(key);
    if(result == null) return defaultValue;
    return result;
  }
  
  public static String getConfigStr(String key) {
    return WUtil.toString(config.get(key), null);
  }
  
  public static String getConfigStr(String key, String defaultValue) {
    return WUtil.toString(config.get(key), defaultValue);
  }
  
  public static int getConfigInt(String key) {
    return WUtil.toInt(config.get(key), 0);
  }
  
  public static int getConfigInt(String key, int defaultValue) {
    return WUtil.toInt(config.get(key), defaultValue);
  }
  
  public static double getConfigDouble(String key) {
    return WUtil.toDouble(config.get(key), 0);
  }
  
  public static double getConfigDouble(String key, int defaultValue) {
    return WUtil.toDouble(config.get(key), defaultValue);
  }
  
  public static boolean getConfigBool(String key) {
    return WUtil.toBoolean(config.get(key), false);
  }
  
  public static boolean getConfigBool(String key, boolean defaultValue) {
    return WUtil.toBoolean(config.get(key), defaultValue);
  }
  
  public static Calendar getConfigCal(String key) {
    return WUtil.toCalendar(config.get(key), false);
  }
  
  public static Calendar getConfigCal(String key, Object defaultValue) {
    return WUtil.toCalendar(config.get(key), defaultValue);
  }
  
  public static String getAppName() {
    return getConfigStr("name", "Wrapp");
  }
  
  public static String getAppVersion() {
    return getConfigStr("versione", "1.0.0");
  }
  
  public static Locale getLocale() {
    String locale = getConfigStr("locale", "en-US");
    if(locale == null || locale.length() == 0) {
      return Locale.getDefault();
    }
    int sep = locale.indexOf('-');
    if(sep < 0) {
      return new Locale(locale);
    }
    String language = locale.substring(0,sep);
    String country  = locale.substring(sep+1);
    return new Locale(language, country);
  }
  
  public static ResourceBundle getBoundle(Locale locale) {
    if(locale == null) {
      locale = getLocale();
    }
    ResourceBundle bundle = resourceBundles.get(locale.toString());
    if(bundle == null) {
      bundle = ResourceBundle.getBundle("content/Language", locale);
      resourceBundles.put(locale.toString(), bundle);
    }
    return bundle;
  }
  
  public static String getMessage(String sKey, Object... aoParams) {
    Locale locale = getLocale();
    ResourceBundle bundle = getBoundle(locale);
    String sMessage = bundle.getString(sKey);
    return MessageFormat.format(sMessage, aoParams);
  }
  
  public static String getMessage(Locale locale, String sKey, Object... aoParams) {
    ResourceBundle bundle = getBoundle(locale);
    String sMessage = bundle.getString(sKey);
    return MessageFormat.format(sMessage, aoParams);
  }
  
  public static ILogger getLoggerInstance() {
    if(_logger != null) return _logger;
    
    String logLevel  = getConfigStr("loglevel");
    String className = getConfigStr("log");
    if(className == null || className.length() == 0 || className.equalsIgnoreCase("default")) {
      _logger = new DefaultLogger(logLevel);
      return _logger;
    }
    
    try {
      Object object = Class.forName(className).getDeclaredConstructor().newInstance();
      if(object instanceof ILogger) {
        ((ILogger) object).setLevel(DefaultLogger.toLogLevel(logLevel));
        _logger = ((ILogger) object);
        return _logger;
      }
    }
    catch(Exception ex) {
      System.err.println("App.getLoginManagerInstance() Exception: " + ex);
    }
    
    _logger = new DefaultLogger(logLevel);
    return _logger;
  }
  
  public static ILoginManager getLoginManagerInstance() {
    if(_loginManager != null) return _loginManager;
    
    String className = getConfigStr("login");
    if(className == null || className.length() == 0 || className.equalsIgnoreCase("default")) {
      _loginManager = new DefaultLoginManager();
      return _loginManager;
    }
    
    try {
      Object object = Class.forName(className).getDeclaredConstructor().newInstance();
      if(object instanceof ILoginManager) {
        _loginManager = (ILoginManager) object;
        return _loginManager;
      }
    }
    catch(Exception ex) {
      System.err.println("App.getLoginManagerInstance() Exception: " + ex);
    }
    
    _loginManager = new DefaultLoginManager();
    return _loginManager;
  }
  
  public static IAppManager getAppManagerInstance() {
    if(_appManager != null) return _appManager;
    
    String className = getConfigStr("menu");
    if(className == null || className.length() == 0 || className.equalsIgnoreCase("default")) {
      _appManager = new DefaultAppManager();
      return _appManager;
    }
    try {
      Object object = Class.forName(className).getDeclaredConstructor().newInstance();
      if(object instanceof IAppManager) {
        _appManager = (IAppManager) object;
        return _appManager;
      }
    }
    catch(Exception ex) {
      System.err.println("App.getAppManagerInstance() Exception: " + ex);
    }
    _appManager = new DefaultAppManager();
    return _appManager;
  }
  
  public static AMenuManager getMenuManagerInstance(User user, String className) {
    if(className == null || className.length() == 0) {
      className = getConfigStr("menu");
    }
    if(className == null || className.length() == 0 || className.equalsIgnoreCase("default")) {
      return new DefaultMenuManager(user);
    }
    try {
      Object object = Class.forName(className).getDeclaredConstructor().newInstance();
      if(object instanceof AMenuManager) {
        ((AMenuManager) object).setUser(user);
        return ((AMenuManager) object);
      }
    }
    catch(Exception ex) {
      System.err.println("App.getMenuManagerInstance() Exception: " + ex);
    }
    return new DefaultMenuManager(user);
  }
}
