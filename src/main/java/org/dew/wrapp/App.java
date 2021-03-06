package org.dew.wrapp;

import java.text.MessageFormat;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.ResourceBundle;

import java.util.logging.Logger;

import org.dew.wrapp.impl.DefaultLoginManager;
import org.dew.wrapp.impl.DefaultMenuManager;
import org.dew.wrapp.impl.DefaultAppManager;

import org.dew.wrapp.log.LoggerFactory;

import org.dew.wrapp.mgr.AMenuManager;
import org.dew.wrapp.mgr.ConfigManager;
import org.dew.wrapp.mgr.IAppManager;
import org.dew.wrapp.mgr.ILoginManager;

public 
class App 
{
  public static long   STARTUP_TIME       = System.currentTimeMillis();
  public static String CONFIG_FILE_NAME   = "wrapp_config.json";
  public static String CONFIG_FOLDER_NAME = "cfg";
  public static String DEFAULT_LOCALE     = "en";
  public static String DEFAULT_MENU       = "main";
  
  public static String INDEX_PAGE         = "index.jsp";
  public static String HOME_PAGE          = "home"; // see WebHome
  public static String LOGOUT_PAGE        = "logout.jsp";
  public static String HELP_PAGE          = "help.jsp";
  public static String SEARCH_PAGE        = "search.jsp";
  public static String DEFAULT_HOME_PAGE  = "home.jsp";
  
  public static String ID_DIALOG_CHN_PWD  = "dlg-cp"; // See webapp/js/main-$language.js
  public static String ID_PAGE_TOP        = "ptop";
  public static String ID_PAGE_TITLE      = "ptitle";
  public static String ID_PAGE_BREADCRUMP = "pbreadcrumb";
  public static String ID_PAGE_WRAPPER    = "page-wrapper"; 
  public static String ID_PAGE_HEADER     = "pheader";
  public static String ID_PAGE_FOOTER     = "pfooter";
  public static String ID_SIDE_MENU       = "side-menu";
  
  public static String IMG_DEFAULT_AVATAR = "img/profile_small.jpg";
  
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
      ConfigManager.loadConfig();
    }
    else {
      ConfigManager.checkConfig();
    }
    _loginManager = null;
    _appManager   = null;
    _locale       = null;
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
  
  public static int reload() {
    _logger.fine("App.reload()...");
    
    init(true);
    
    int result = 0;
    
    IAppManager appLoader = getAppManagerInstance();
    
    try {
      Map<String, Page> pages = appLoader.loadPages();
      if(pages != null && !pages.isEmpty()) {
        _pages = pages;
      }
    }
    catch(Exception ex) {
      System.err.println("App.reload() Exception in appLoader.loadPages(): " + ex);
    }
    
    try {
      Map<String, List<MenuItem>> menus = appLoader.loadMenus();
      if(menus != null && !menus.isEmpty()) {
        _menus = menus;
      }
    }
    catch(Exception ex) {
      System.err.println("App.reload() Exception in appLoader.loadMenus(): " + ex);
    }
    
    _logger.fine("pages [" + _pages.size()  + "]");
    _logger.fine("menus [" + _menus.size()  + "]");
     
    result = _pages.size();
    return result;
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
  
  public static int refresh(String module) {
    _logger.fine("App.refresh(" + module + ")...");
    
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
    if(id == null || id.length() == 0) {
      id = App.DEFAULT_MENU;
    }
    return _menus.get(id);
  }
  
  public static Map<String,Object> getConfig() {
    return ConfigManager.getConfig();
  }
  
  public static Map<String,Object> getPublicConfig() {
    return ConfigManager.getPublicConfig();
  }
  
  public static Map<String,Object> getPrivateConfig() {
    return ConfigManager.getPrivateConfig();
  }
  
  public static String getAppName() {
    return ConfigManager.getConfigStr("name", "Wrapp");
  }
  
  public static String getAppVersion() {
    return ConfigManager.getConfigStr("versione", "1.0.0");
  }
  
  public static String getAppTheme() {
    return ConfigManager.getConfigStr("theme", "");
  }
  
  public static String getAppTheme(String prefix) {
    if(prefix == null) prefix = "";
    String result = ConfigManager.getConfigStr("theme", "");
    if(result == null || result.length() == 0) return "";
    return prefix + result;
  }
  
  public static String getAppLogo() {
    String result = ConfigManager.getConfigStr("logo", "$app.name");
    if(result == null || result.length() == 0) {
      return "";
    }
    result = result.replace("$app.name", getAppName());
    result = result.replace("$app.ver",  getAppVersion());
    return result;
  }
  
  public static Locale getLocale() {
    if(_locale != null) return _locale;
    String locale = ConfigManager.getConfigStr("locale", DEFAULT_LOCALE);
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
  
  public static String getLanguage(User user, String defaultLanguage) {
    Locale locale = getLocale(user);
    if(locale == null) {
      return defaultLanguage;
    }
    String result = locale.getLanguage();
    if(result == null || result.length() == 0) {
      return defaultLanguage;
    }
    return result.toLowerCase();
  }
  
  public static Locale toLocale(String locale) {
    if(locale == null) return null;
    locale = locale.trim();
    if(locale.length() == 0) return null;
    int sep = locale.indexOf('-');
    if(sep < 0) {
      sep = locale.indexOf('_');
    }
    if(sep < 0) {
      return new Locale(locale);
    }
    String language = locale.substring(0,sep).trim().toLowerCase();
    String country  = locale.substring(sep+1).trim();
    sep = country.indexOf('-');
    if(sep < 0) {
      sep = country.indexOf('_');
    }
    if(sep < 0) {
      return new Locale(language, country);
    }
    String variant  = country.substring(sep+1).trim();
    country = country.substring(0,sep).trim();
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
    
    String className = ConfigManager.getConfigStr("login");
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
    
    String className = ConfigManager.getConfigStr("app");
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
  
  public static AMenuManager getMenuManagerInstance(User user) {
    String className = user != null ? user.getMenuManager() : null;
    if(className == null || className.length() == 0) {
      className = ConfigManager.getConfigStr("menu");
    }
    AMenuManager menuManager = null;
    if(className == null || className.length() == 0 || className.equalsIgnoreCase("default")) {
      menuManager =  new DefaultMenuManager();
    }
    else {
      try {
        Object object = Class.forName(className).getDeclaredConstructor().newInstance();
        if(object instanceof AMenuManager) {
          menuManager = ((AMenuManager) object);
        }
      }
      catch(Exception ex) {
        System.err.println("App.getMenuManagerInstance(" + user + ") Exception: " + ex);
      }
    }
    if(menuManager == null) {
      menuManager = new DefaultMenuManager();
    }
    if(user != null) {
      menuManager.setUser(user);
      menuManager.setMenuItems(App.getMenu(user.getMenu()));
    }
    return menuManager;
  }
}
