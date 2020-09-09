package org.dew.wrapp;

import java.text.MessageFormat;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.ResourceBundle;

import java.util.logging.Logger;

import org.dew.wrapp.impl.DefaultLoginManager;
import org.dew.wrapp.impl.DefaultMenuManager;
import org.dew.wrapp.log.LoggerFactory;
import org.dew.wrapp.impl.DefaultAppManager;

import org.dew.wrapp.mgr.AMenuManager;
import org.dew.wrapp.mgr.ConfigManager;
import org.dew.wrapp.mgr.IAppManager;
import org.dew.wrapp.mgr.ILoginManager;

import org.dew.wrapp.util.WUtil;

public 
class App 
{
  public static long   STARTUP_TIME       = System.currentTimeMillis();
  public static String CONFIG_FILE_NAME   = "wrapp_config.json";
  public static String CONFIG_FOLDER_NAME = "cfg";
  public static String DEFAULT_LOCALE     = "en-US";
  
  protected static Map<String, Object>         _config  = new HashMap<String, Object>();
  protected static Map<String, ResourceBundle> _bundles = new HashMap<String, ResourceBundle>();
  protected static Map<String, Page>           _pages   = new HashMap<String, Page>();
  protected static Map<String, List<MenuItem>> _menus   = new HashMap<String, List<MenuItem>>();
  
  protected static ILoginManager _loginManager;
  protected static IAppManager   _appManager;
  protected static Locale        _locale;
  
  protected static Logger _logger = LoggerFactory.getLogger(App.class);
  
  static {
    init(true);
  }
  
  protected static void init(boolean reloadConfig) {
    if(reloadConfig) {
      _config = ConfigManager.loadConfig();
    }
    else if(_config == null || _config.isEmpty()) {
      _config = ConfigManager.loadConfig();
    }
    _loginManager = null;
    _appManager   = null;
  }
  
  public static void startup() {
     _logger.fine("App.startup()...");
    
    STARTUP_TIME = System.currentTimeMillis();
    
    IAppManager appLoader = getAppManagerInstance();
    
    try {
      Map<String, Page> pages = appLoader.loadPages();
      if(pages != null && !pages.isEmpty()) {
        _pages = pages;
      }
    }
    catch(Exception ex) {
      System.err.println("App.startup() Exception in appLoader.loadPages(): " + ex);
    }
    
    try {
      Map<String, List<MenuItem>> menus = appLoader.loadMenus();
      if(menus != null && !menus.isEmpty()) {
        _menus = menus;
      }
    }
    catch(Exception ex) {
      System.err.println("App.startup() Exception in appLoader.loadMenus(): " + ex);
    }
    
     _logger.fine("pages [" + _pages.size()  + "]");
     _logger.fine("menus [" + _menus.size()  + "]");
  }
  
  public static void destroy() {
     _logger.fine("App.destroy()...");
  }
  
  public static void reload() {
     _logger.fine("App.reload()...");
    
    init(true);
    
    IAppManager appLoader = getAppManagerInstance();
    
    try {
      Map<String, Page> pages = appLoader.loadPages();
      if(pages != null && !pages.isEmpty()) {
        _pages = pages;
      }
    }
    catch(Exception ex) {
      System.err.println("App.startup() Exception in appLoader.loadPages(): " + ex);
    }
    
    try {
      Map<String, List<MenuItem>> menus = appLoader.loadMenus();
      if(menus != null && !menus.isEmpty()) {
        _menus = menus;
      }
    }
    catch(Exception ex) {
      System.err.println("App.startup() Exception in appLoader.loadMenus(): " + ex);
    }
    
     _logger.fine("pages [" + _pages.size()  + "]");
     _logger.fine("menus [" + _menus.size()  + "]");
  }
  
  public static void addPage(Page page) {
     _logger.fine("App.addPage(" + page + ")...");
    if(page == null || page.getId() == null) {
      return;
    }
    _pages.put(page.getId(), page);
  }
  
  public static void addMenu(String idMenu, List<MenuItem> menuItems) {
     _logger.fine("App.addMenu(" + idMenu + "," + menuItems + ")...");
    if(idMenu == null || idMenu.length() == 0) {
      idMenu = "main";
    }
    if(menuItems == null) {
      menuItems = new ArrayList<MenuItem>();
    }
    _menus.put(idMenu, menuItems);
  }
  
  public static int update(String module) {
     _logger.fine("App.update(" + module + ")...");
    
    if(module == null || module.length() == 0) {
      return 0;
    }
    
    int result = 0;
    
    String newMarker = String.valueOf(System.currentTimeMillis());
    for(Page page : _pages.values()) {
      boolean found = false;
      
      String[] asCss = page.getCss();
      if(asCss != null && asCss.length > 0) {
        for(int i = 0; i < asCss.length; i++) {
          if(asCss[i] == null || !asCss[i].startsWith("/" + module + "/")) {
            continue;
          }
          asCss[i] = WebUtil.replaceMarker(asCss[i], newMarker);
          found = true;
        }
      }
      
      String[] asScripts = page.getScripts();
      if(asScripts != null && asScripts.length > 0) {
        for(int i = 0; i < asScripts.length; i++) {
          if(asScripts[i] == null || !asScripts[i].startsWith("/" + module + "/")) {
            continue;
          }
          asScripts[i] = WebUtil.replaceMarker(asScripts[i], newMarker);
          found = true;
        }
      }
      
      if(found) result++;
    }
    
    return result;
  }
  
  public static boolean updatePassword(String username, String currentPassword, String newPassword) {
     _logger.fine("App.updatePassword(" + username + ",*,*)...");
    
    ILoginManager loginManager = getLoginManagerInstance();
    
    try {
      return loginManager.updatePassword(username, currentPassword, newPassword);
    }
    catch(Exception ex) {
       _logger.severe("Exception in loginManager.updatePassword(" + username + ",*,*)" +  ex);
    }
    
    return false;
  }
  
  public static Page getPage(String id) {
     _logger.fine("App.getPage(" + id + ")...");
    return _pages.get(id);
  }
  
  public static List<MenuItem> getMenu(String id) {
     _logger.fine("App.getMenu(" + id + ")...");
    return _menus.get(id);
  }
  
  public static Map<String,Object> getConfig() {
    return _config;
  }
  
  public static Object getConfig(String key) {
    return _config.get(key);
  }
  
  public static Object getConfig(String key, Object defaultValue) {
    Object result = _config.get(key);
    if(result == null) return defaultValue;
    return result;
  }
  
  public static String getConfigStr(String key) {
    return WUtil.toString(_config.get(key), null);
  }
  
  public static String getConfigStr(String key, String defaultValue) {
    return WUtil.toString(_config.get(key), defaultValue);
  }
  
  public static int getConfigInt(String key) {
    return WUtil.toInt(_config.get(key), 0);
  }
  
  public static int getConfigInt(String key, int defaultValue) {
    return WUtil.toInt(_config.get(key), defaultValue);
  }
  
  public static double getConfigDouble(String key) {
    return WUtil.toDouble(_config.get(key), 0);
  }
  
  public static double getConfigDouble(String key, int defaultValue) {
    return WUtil.toDouble(_config.get(key), defaultValue);
  }
  
  public static boolean getConfigBool(String key) {
    return WUtil.toBoolean(_config.get(key), false);
  }
  
  public static boolean getConfigBool(String key, boolean defaultValue) {
    return WUtil.toBoolean(_config.get(key), defaultValue);
  }
  
  public static Calendar getConfigCal(String key) {
    return WUtil.toCalendar(_config.get(key), false);
  }
  
  public static Calendar getConfigCal(String key, Object defaultValue) {
    return WUtil.toCalendar(_config.get(key), defaultValue);
  }
  
  public static String getAppName() {
    return getConfigStr("name", "Wrapp");
  }
  
  public static String getAppVersion() {
    return getConfigStr("versione", "1.0.0");
  }
  
  public static Locale getLocale() {
    if(_locale != null) return _locale;
    String locale = getConfigStr("locale", "en-US");
    if(locale == null || locale.length() < 2) {
      _locale = Locale.getDefault();
      return _locale;
    }
    _locale = toLocale(locale);
    return _locale;
  }
  
  public static Locale getLocale(User user) {
    if(user == null) return getLocale();
    String locale = user.getLocale();
    if(locale == null || locale.length() < 2) {
      return getLocale();
    }
    return toLocale(locale);
  }
  
  public static Locale toLocale(String locale) {
    if(locale == null || locale.length() == 0) {
      return null;
    }
    int sep = locale.indexOf('-');
    if(sep < 0) {
      return new Locale(locale);
    }
    String language = locale.substring(0,sep);
    String country  = locale.substring(sep+1);
    sep = country.indexOf('-');
    if(sep < 0) {
      return new Locale(language, country);
    }
    String variant  = country.substring(sep+1);
    country = country.substring(0,sep);
    return new Locale(language, country, variant);
  }
  
  public static ResourceBundle getBoundle(Locale locale) {
    if(locale == null) locale = getLocale();
    ResourceBundle bundle = _bundles.get(locale.toString());
    if(bundle == null) {
      bundle = ResourceBundle.getBundle("content/Language", locale);
      _bundles.put(locale.toString(), bundle);
    }
    return bundle;
  }
  
  public static String getMessage(String key, Object... params) {
    Locale locale = getLocale();
    ResourceBundle bundle = getBoundle(locale);
    String sMessage = bundle.getString(key);
    return MessageFormat.format(sMessage, params);
  }
  
  public static String getMessage(Locale locale, String key, Object... params) {
    if(locale == null) locale = getLocale();
    ResourceBundle bundle = getBoundle(locale);
    String sMessage = bundle.getString(key);
    return MessageFormat.format(sMessage, params);
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
