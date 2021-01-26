package org.dew.dossier.ws;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dew.nosql.*;
import org.dew.nosql.util.WUtil;

import org.util.WMap;

import org.dew.dossier.util.ConnectionManager;

public 
class WSPatients 
{
  public static
  List<Map<String, Object>> find(Map<String, Object> filter)
      throws Exception
  {
    System.out.println("WSPatients.find(" + filter + ")...");
    
    List<Map<String, Object>> listResult = null;
    
    try {
      INoSQLDB noSQLDB = ConnectionManager.getDefaultNoSQLDB();
      
      listResult = noSQLDB.find("patients", filter, "");
    }
    catch(Exception ex) {
      System.err.println("WSPatients.find(" + filter + "): " + ex);
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
    System.out.println("WSPatients.read(" + id + ")...");
    
    Map<String, Object> mapResult = null;
    
    try {
      INoSQLDB noSQLDB = ConnectionManager.getDefaultNoSQLDB();
      
      mapResult = noSQLDB.read("patients", id);
    }
    catch(Exception ex) {
      System.err.println("WSPatients.read(" + id + "): " + ex);
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
    System.out.println("WSPatients.exists(" + code + "," + id + ")...");
    
    if(code == null || code.length() == 0) {
      return false;
    }
    
    boolean result = false;
    
    try {
      INoSQLDB noSQLDB = ConnectionManager.getDefaultNoSQLDB();
      
      noSQLDB.createIndex("patients", "code", 1);
      
      Map<String, Object> mapFilter = new HashMap<String, Object>();
      mapFilter.put("code", code);
      
      List<Map<String, Object>> listResult = noSQLDB.find("patients", mapFilter, "");
      
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
      System.err.println("WSPatients.exists(" + code + "," + id + "): " + ex);
      throw ex;
    }
    
    return result;
  }
  
  public static
  Map<String, Object> insert(Map<String, Object> values)
      throws Exception
  {
    System.out.println("WSPatients.insert(" + values + ")...");
    
    if(values == null || values.isEmpty()) {
      throw new Exception("Invalid values");
    }
    
    try {
      INoSQLDB noSQLDB = ConnectionManager.getDefaultNoSQLDB();
      
      String id = noSQLDB.insert("patients", values);
      
      if(id != null && id.length() > 0) {
        values.put("_id", id);
      }
    }
    catch(Exception ex) {
      System.err.println("WSPatients.insert(" + values + "): " + ex);
      throw ex;
    }
    
    return values;
  }
  
  public static
  Map<String, Object> update(Map<String, Object> values)
      throws Exception
  {
    System.out.println("WSPatients.update(" + values + ")...");
    
    if(values == null || values.isEmpty()) {
      throw new Exception("Invalid values");
    }
    
    String id = WUtil.toString(values.get("_id"), null);
    
    if(id == null || id.length() == 0) {
      throw new Exception("Invalid _id");
    }
    
    try {
      INoSQLDB noSQLDB = ConnectionManager.getDefaultNoSQLDB();
      
      noSQLDB.update("patients", values, id);
    }
    catch(Exception ex) {
      System.err.println("WSPatients.insert(" + values + "): " + ex);
      throw ex;
    }
    
    return values;
  }
  
  public static
  Map<String, Object> addEvent(Map<String, Object> values)
      throws Exception
  {
    System.out.println("WSPatients.addEvent(" + values + ")...");
    
    Map<String, Object> mapResult = new HashMap<String, Object>();
    
    if(values == null || values.isEmpty()) {
      return mapResult;
    }
    
    WMap wmValues = new WMap(values);
    
    Date date = wmValues.getDate("date");
    if(date == null) {
      return mapResult;
    }
    String idService = wmValues.getString("serv");
    if(idService == null || idService.length() == 0) {
      return mapResult;
    }
    String idStructure = wmValues.getString("stru");
    if(idStructure == null || idStructure.length() == 0) {
      return mapResult;
    }
    String idPathology = wmValues.getString("path");
    
    try {
      INoSQLDB noSQLDB = ConnectionManager.getDefaultNoSQLDB();
      
      Map<String,Object> mapServices = noSQLDB.read("services", idService);
      if(mapServices == null || mapServices.isEmpty()) {
        return mapResult;
      }
      
      Map<String,Object> mapStructure = noSQLDB.read("structures", idStructure);
      if(mapStructure == null || mapStructure.isEmpty()) {
        return mapResult;
      }
      
      Map<String,Object> mapPathology = null;
      if(idPathology != null && idPathology.length() > 0) {
        mapPathology = noSQLDB.read("pathologies", idPathology);
      }
      
      mapResult.put("date",      date);
      
      mapResult.put("serv",      mapServices.get("desc"));
      mapResult.put("serv_code", mapServices.get("code"));
      mapResult.put("serv_id",   mapServices.get("_id"));
      
      mapResult.put("stru",      mapStructure.get("desc"));
      mapResult.put("stru_code", mapStructure.get("code"));
      mapResult.put("stru_id",   mapStructure.get("_id"));
      
      if(mapPathology != null && !mapPathology.isEmpty()) {
        mapResult.put("path",      mapPathology.get("desc"));
        mapResult.put("path_code", mapPathology.get("code"));
        mapResult.put("path_id",   mapPathology.get("_id"));
      }
      
      mapResult.put("fare",      mapServices.get("fare"));
      
      String _id = noSQLDB.insert("events", mapResult);
      
      if(_id != null && _id.length() > 0) {
        mapResult.put("_id", _id);
      }
    }
    catch(Exception ex) {
      System.err.println("WSPatients.addEvent(" + values + "): " + ex);
      throw ex;
    }
    
    return mapResult;
  }
}
