package org.dew.wrapp.log;

import java.io.File;

import java.util.Calendar;

import java.util.logging.FileHandler;
import java.util.logging.Handler;
import java.util.logging.Level;
import java.util.logging.Logger;

public 
class LoggerFactory 
{
  public static String LOGGER_NAME   = "org.dew.wrapp";
  public static String LOGGER_FOLDER = "log";
  public static Level  LOG_LEVEL     = Level.ALL;
  public static String LOG_DATE      = "";
  
  public static boolean firstCheck   = true;
  
  private static
  void checkLoggingConfig()
  {
    // External configuration
    String sLoggingConfigClass = System.getProperty("java.util.logging.config.class");
    if(sLoggingConfigClass != null && sLoggingConfigClass.length() > 0) {
      if(firstCheck) System.out.println("Loggin configured by class: " + sLoggingConfigClass);
      firstCheck = false;
      return;
    }
    String sLoggingConfigFile = System.getProperty("java.util.logging.config.file");
    if(sLoggingConfigFile != null && sLoggingConfigFile.length() > 0) {
      if(firstCheck) System.out.println("Loggin configured by file: " + sLoggingConfigFile);
      firstCheck = false;
      return;
    }
    
    // Default configuration
    Calendar cal = Calendar.getInstance();
    
    int iYear  = cal.get(Calendar.YEAR);
    int iMonth = cal.get(Calendar.MONTH) + 1;
    int iDay   = cal.get(Calendar.DATE);
    String sYear  = String.valueOf(iYear);
    String sMonth = iMonth < 10 ? "0" + iMonth : String.valueOf(iMonth);
    String sDay   = iDay   < 10 ? "0" + iDay   : String.valueOf(iDay);
    
    String sDate  = sYear + "-" + sMonth + "-" + sDay;
    if(sDate.equals(LOG_DATE)) return;
    LOG_DATE = sDate;
    
    try {
      String logFolderPath  = System.getProperty("user.home") + File.separator + LOGGER_FOLDER;
      
      File fileLogFolder = new File(logFolderPath);
      if(!fileLogFolder.exists()) fileLogFolder.mkdirs();
      
      Logger logger = Logger.getLogger(LOGGER_NAME);
      
      // Close and remove previous handler
      Handler[] handlers = logger.getHandlers();
      if(handlers != null && handlers.length > 0) {
        for(int i = 0; i < handlers.length; i++) {
          Handler h = handlers[i];
          if(h instanceof FileHandler) {
            try {
              h.close();
            }
            catch(Exception ex) {
            }
          }
          logger.removeHandler(h);
        }
      }
      
      Handler handler = new FileHandler(logFolderPath + File.separator + "wrapp-" + LOG_DATE + ".log", true);
      handler.setFormatter(new LogFormatter());
      
      logger.addHandler(handler);
      logger.setLevel(LOG_LEVEL);
      logger.setUseParentHandlers(false);
    }
    catch(Exception ex) {
      ex.printStackTrace();
    }
    
    firstCheck = false;
  }
  
  public static
  Logger getLogger(String name)
  {
    checkLoggingConfig();
    
    return Logger.getLogger(name);
  }
  
  public static
  Logger getLogger(Class<?> c)
  {
    checkLoggingConfig();
    
    return Logger.getLogger(c.getName());
  }
}
