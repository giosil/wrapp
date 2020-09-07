package org.dew.wrapp.mgr;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

import java.net.URL;

import java.util.HashMap;
import java.util.Map;

import org.dew.wrapp.json.JSON;

public 
class ConfigManager 
{
  public static final String CONFIG_FILE_NAME   = "wrapp_config.json";
  public static final String CONFIG_FOLDER_NAME = "cfg";
  
  public static
  Map<String, Object> loadConfig() 
  {
    String sUserHome  = System.getProperty("user.home");
    File folder = new File(sUserHome + File.separator + ConfigManager.CONFIG_FOLDER_NAME);
    if(!folder.exists()) {
      return new HashMap<String, Object>();
    }
    
    String json = null;
    try {
      json = loadFile(CONFIG_FILE_NAME);
    }
    catch(Exception ex) {
      ex.printStackTrace();
    }
    
    if(json == null || json.length() < 3) {
      return new HashMap<String, Object>();
    }
    
    Map<String, Object> result = JSON.parseObj(json);
    if(result == null || result.isEmpty()) {
      return new HashMap<String, Object>();
    }
    
    return result;
  }
  
  private static
  String loadFile(String sFile)
    throws Exception
  {
    String sUserHome = System.getProperty("user.home");
    String sFilePath = sUserHome + File.separator + CONFIG_FOLDER_NAME + File.separator + sFile;
    
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
