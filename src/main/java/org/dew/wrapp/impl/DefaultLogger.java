package org.dew.wrapp.impl;

import org.dew.wrapp.mgr.ILogger;

public 
class DefaultLogger implements ILogger 
{
  protected int level = DEBUG;
  
  public DefaultLogger()
  {
  }
  
  public DefaultLogger(Object logLevel)
  {
    this.level = toLogLevel(logLevel);
  }
  
  @Override
  public void setLevel(int level) {
    this.level = level;
  }
  
  @Override
  public void debug(Object message) {
    if(this.level == DEBUG) System.out.println("[DEBUG] " + message);
  }

  @Override
  public void debug(Object message, Throwable t) {
    if(this.level == DEBUG) System.out.println("[DEBUG] " + message + " " + t);
  }

  @Override
  public void error(Object message) {
    if(this.level <= ERROR) System.out.println("[ERROR] " + message);
  }

  @Override
  public void error(Object message, Throwable t) {
    if(this.level <= ERROR) System.out.println("[ERROR] " + message + " " + t);
  }

  @Override
  public void fatal(Object message) {
    if(this.level <= FATAL) System.out.println("[FATAL] " + message);
  }

  @Override
  public void fatal(Object message, Throwable t) {
    if(this.level <= FATAL) System.out.println("[FATAL] " + message + " " + t);
  }

  @Override
  public void info(Object message) {
    if(this.level <= INFO) System.out.println("[INFO] " + message);
  }

  @Override
  public void info(Object message, Throwable t) {
    if(this.level <= INFO) System.out.println("[INFO] " + message + " " + t);
  }

  @Override
  public void warn(Object message) {
    if(this.level <= WARN) System.out.println("[WARN] " + message);
  }

  @Override
  public void warn(Object message, Throwable t) {
    if(this.level <= WARN) System.out.println("[WARN] " + message + " " + t);
  }
  
  public static int toLogLevel(Object logLevel) {
    if(logLevel == null) return DEBUG;
    if(logLevel instanceof Number) {
      int result = ((Number) logLevel).intValue();
      if(result <= DEBUG) return DEBUG;
      if(result >= FATAL) return FATAL;
      return result;
    }
    String value = logLevel.toString();
    if(value == null || value.length() == 0) {
      return DEBUG;
    }
    char c0 = value.charAt(0);
    if(c0 == 'D' || c0 == 'd') return DEBUG;
    if(c0 == 'I' || c0 == 'i') return INFO;
    if(c0 == 'W' || c0 == 'w') return WARN;
    if(c0 == 'E' || c0 == 'e') return ERROR;
    if(c0 == 'F' || c0 == 'f') return FATAL;
    return DEBUG;
  }
}
