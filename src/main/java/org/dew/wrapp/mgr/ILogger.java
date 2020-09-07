package org.dew.wrapp.mgr;

public 
interface ILogger 
{
  public static final int DEBUG = 0;
  public static final int INFO  = 1;
  public static final int WARN  = 2;
  public static final int ERROR = 3;
  public static final int FATAL = 4;
  
  public void setLevel(int level);
  
  public void debug(Object message);

  public void debug(Object message, Throwable t);

  public void error(Object message);

  public void error(Object message, Throwable t);

  public void fatal(Object message);

  public void fatal(Object message, Throwable t);

  public void info(Object message);

  public void info(Object message, Throwable t);

  public void warn(Object message);

  public void warn(Object message, Throwable t);
}
