package org.dew.dossier.ws;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dew.nosql.*;
import org.dew.nosql.util.WUtil;

import org.dew.dossier.util.ConnectionManager;

public 
class WSStructures 
{
  public static
  List<Map<String, Object>> find(Map<String, Object> filter)
      throws Exception
  {
    System.out.println("WSStructures.find(" + filter + ")...");
    
    if(filter != null) {
      // Remove filter flag if false or null
      boolean agree = WUtil.toBoolean(filter.remove("agre"), false);
      if(agree) filter.put("agre", agree);
    }
    
    List<Map<String, Object>> listResult = null;
    
    try {
      INoSQLDB noSQLDB = ConnectionManager.getDefaultNoSQLDB();
      
      listResult = noSQLDB.find("structures", filter, "");
    }
    catch(Exception ex) {
      System.err.println("WSStructures.find(" + filter + "): " + ex);
      throw ex;
    }
    
    if(listResult == null) {
      listResult = new ArrayList<Map<String,Object>>();
    }
    
    return listResult;
  }
  
  public static
  Map<String, Object> read(String id)
      throws Exception
  {
    System.out.println("WSStructures.read(" + id + ")...");
    
    Map<String, Object> mapResult = null;
    
    try {
      INoSQLDB noSQLDB = ConnectionManager.getDefaultNoSQLDB();
      
      mapResult = noSQLDB.read("structures", id);
    }
    catch(Exception ex) {
      System.err.println("WSStructures.read(" + id + "): " + ex);
      throw ex;
    }
    
    if(mapResult == null) {
      mapResult = new HashMap<String, Object>();
    }
    
    return mapResult;
  }
  
  public static
  boolean exists(String code, String id)
      throws Exception
  {
    System.out.println("WSStructures.exists(" + code + "," + id + ")...");
    
    if(code == null || code.length() == 0) {
      return false;
    }
    
    boolean result = false;
    
    try {
      INoSQLDB noSQLDB = ConnectionManager.getDefaultNoSQLDB();
      
      noSQLDB.createIndex("structures", "code", 1);
      
      Map<String, Object> mapFilter = new HashMap<String, Object>();
      mapFilter.put("code", code);
      
      List<Map<String, Object>> listResult = noSQLDB.find("structures", mapFilter, "");
      
      if(listResult != null && listResult.size() > 0) {
        if(id != null && id.length() > 0) {
          Map<String, Object> firstItem = listResult.get(0);
          String _id = WUtil.toString(firstItem.get("_id"), null);
          if(!id.equals(_id)) {
            result = true;
          }
        }
        else {
          result = true;
        }
      }
    }
    catch(Exception ex) {
      System.err.println("WSStructures.exists(" + code + "," + id + "): " + ex);
      throw ex;
    }
    
    return result;
  }
  
  public static
  Map<String, Object> insert(Map<String, Object> values)
      throws Exception
  {
    System.out.println("WSStructures.insert(" + values + ")...");
    
    if(values == null || values.isEmpty()) {
      throw new Exception("Invalid values");
    }
    
    try {
      INoSQLDB noSQLDB = ConnectionManager.getDefaultNoSQLDB();
      
      String id = noSQLDB.insert("structures", values);
      
      if(id != null && id.length() > 0) {
        values.put("_id", id);
      }
    }
    catch(Exception ex) {
      System.err.println("WSStructures.insert(" + values + "): " + ex);
      throw ex;
    }
    
    return values;
  }
  
  public static
  Map<String, Object> update(Map<String, Object> values)
      throws Exception
  {
    System.out.println("WSStructures.update(" + values + ")...");
    
    if(values == null || values.isEmpty()) {
      throw new Exception("Invalid values");
    }
    
    String id = WUtil.toString(values.get("_id"), null);
    
    if(id == null || id.length() == 0) {
      throw new Exception("Invalid _id");
    }
    
    try {
      INoSQLDB noSQLDB = ConnectionManager.getDefaultNoSQLDB();
      
      noSQLDB.update("structures", values, id);
    }
    catch(Exception ex) {
      System.err.println("WSStructures.insert(" + values + "): " + ex);
      throw ex;
    }
    
    return values;
  }
}
