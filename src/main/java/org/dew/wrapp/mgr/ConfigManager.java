package org.dew.wrapp.mgr;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

import java.net.URL;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import org.dew.wrapp.App;
import org.dew.wrapp.json.JSON;
import org.dew.wrapp.util.WUtil;

public 
class ConfigManager 
{
  private static Map<String, Object> _public  = new HashMap<String, Object>();
  private static Map<String, Object> _private = new HashMap<String, Object>();
  private static Map<String, Object> _config  = new HashMap<String, Object>();
  
  public static
  Map<String, Object> getPublicConfig() 
  {
    return _public;
  }
  
  public static
  Map<String, Object> getPrivateConfig() 
  {
    return _private;
  }
  
  public static
  Map<String, Object> getConfig() 
  {
    return _config;
  }
  
  public static
  Map<String, Object> checkConfig() 
  {
    if(_config == null || _config.isEmpty()) {
      return loadConfig();
    }
    return _config;
  }
  
  public static
  Map<String, Object> loadConfig() 
  {
    String sUserHome  = System.getProperty("user.home");
    File folder = new File(sUserHome + File.separator + App.CONFIG_FOLDER_NAME);
    if(!folder.exists()) {
      return _config;
    }
    
    String json = null;
    try {
      json = loadFile(App.CONFIG_FILE_NAME);
    }
    catch(Exception ex) {
      ex.printStackTrace();
    }
    
    if(json == null || json.length() < 3) {
      return _config;
    }
    
    Map<String, Object> result = JSON.parseObj(json);
    if(result == null || result.isEmpty()) {
      return _config;
    }
    
    _public.clear();
    _private.clear();
    _config.clear();
    
    Map<String, Object> pubConfig = WUtil.toMapObject(result.remove("public"));
    if(pubConfig != null && !pubConfig.isEmpty()) {
      _public.putAll(pubConfig);
    }
    
    Map<String, Object> priConfig = WUtil.toMapObject(result.remove("private"));
    if(priConfig != null && !priConfig.isEmpty()) {
      _private.putAll(priConfig);
    }
    
    _public.putAll(result);
    
    _config.putAll(_public);
    _config.putAll(_private);
    
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
  
  private static
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
  
  private static
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
