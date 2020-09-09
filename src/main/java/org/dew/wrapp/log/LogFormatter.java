package org.dew.wrapp.log;

import java.io.PrintWriter;
import java.io.StringWriter;

import java.util.*;
import java.util.logging.Formatter;
import java.util.logging.LogRecord;

public 
class LogFormatter extends Formatter 
{
  public
  String format(LogRecord record) 
  {
    Calendar calendar = Calendar.getInstance();
    calendar.setTimeInMillis(record.getMillis());
    int iYear    = calendar.get(java.util.Calendar.YEAR);
    int iMonth   = calendar.get(java.util.Calendar.MONTH) + 1;
    int iDay     = calendar.get(java.util.Calendar.DAY_OF_MONTH);
    int iHour    = calendar.get(Calendar.HOUR_OF_DAY);
    int iMinute  = calendar.get(Calendar.MINUTE);
    int iSecond  = calendar.get(Calendar.SECOND);
    String sMonth  = iMonth  < 10 ? "0" + iMonth  : String.valueOf(iMonth);
    String sDay    = iDay    < 10 ? "0" + iDay    : String.valueOf(iDay);
    String sHour   = iHour   < 10 ? "0" + iHour   : String.valueOf(iHour);
    String sMinute = iMinute < 10 ? "0" + iMinute : String.valueOf(iMinute);
    String sSecond = iSecond < 10 ? "0" + iSecond : String.valueOf(iSecond);
    String sCurrentDateTime = iYear + "-" + sMonth + "-" + sDay + " " + sHour + ":" + sMinute + ":" + sSecond;
    
    StringBuilder sb = new StringBuilder();
    String message = formatMessage(record);
    sb.append(sCurrentDateTime);
    sb.append(" ");
    
    String sSourceClassName = record.getSourceClassName();
    if(sSourceClassName != null && sSourceClassName.length() > 0) {
      sb.append(sSourceClassName);
      sb.append(" ");
    }
    
    String sSourceMethodName = record.getSourceMethodName();
    if(sSourceMethodName != null && sSourceMethodName.length() > 0) {
      sb.append(sSourceMethodName);
      sb.append(" ");
    }
    
    sb.append(message);
    sb.append('\n');
    if (record.getThrown() != null) {
      try {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        record.getThrown().printStackTrace(pw);
        pw.close();
        sb.append(sw.toString());
      } 
      catch (Exception ex) {
        ex.printStackTrace();
      }
    }
    return sb.toString();
  }
}
