package org.dew.dossier.ws;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dew.nosql.*;

import org.util.WMap;
import org.dew.dossier.util.ConnectionManager;

public 
class WSEvents 
{
  public static
  List<Map<String, Object>> find(Map<String, Object> filter)
      throws Exception
  {
    System.out.println("WSEvents.find(" + filter + ")...");
    
    List<Map<String, Object>> listResult = null;
    
    try {
      INoSQLDB noSQLDB = ConnectionManager.getDefaultNoSQLDB();
      
      listResult = noSQLDB.find("events", filter, "", "date DESC", 2000);
    }
    catch(Exception ex) {
      System.err.println("WSEvents.find(" + filter + "): " + ex);
      throw ex;
    }
    
    if(listResult == null) {
      listResult = new ArrayList<Map<String,Object>>();
    }
    
    return listResult;
  }
  
  public static
  Map<String, Object> insert(Map<String, Object> values)
      throws Exception
  {
    System.out.println("WSEvents.insert(" + values + ")...");
    
    Map<String, Object> mapResult = new HashMap<String, Object>();
    
    if(values == null || values.isEmpty()) {
      return mapResult;
    }
    
    WMap wmValues = new WMap(values);
    
    Date date = wmValues.getDate("date");
    if(date == null) {
      return mapResult;
    }
    String idPatient = wmValues.getString("patient");
    if(idPatient == null || idPatient.length() == 0) {
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
    double fare = wmValues.getDouble("fare");
    
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
      mapResult.put("patient",   idPatient);
      
      mapResult.put("serv",      mapServices.get("desc"));
      mapResult.put("serv_code", mapServices.get("code"));
      mapResult.put("serv_id",   mapServices.get("_id"));
      
      mapResult.put("stru",      mapStructure.get("desc"));
      mapResult.put("stru_code", mapStructure.get("code"));
      mapResult.put("stru_id",   mapStructure.get("_id"));
      mapResult.put("agre",      mapStructure.get("agre"));
      
      if(mapPathology != null && !mapPathology.isEmpty()) {
        mapResult.put("path",      mapPathology.get("desc"));
        mapResult.put("path_code", mapPathology.get("code"));
        mapResult.put("path_id",   mapPathology.get("_id"));
      }
      
      if(fare > 0.0d) {
        mapResult.put("fare",  fare);
      }
      else {
        mapResult.put("fare",  mapServices.get("fare"));
      }
      
      String _id = noSQLDB.insert("events", mapResult);
      
      if(_id != null && _id.length() > 0) {
        mapResult.put("_id", _id);
      }
      
      noSQLDB.createIndex("events", "patient", 1);
    }
    catch(Exception ex) {
      System.err.println("WSEvents.insert(" + values + "): " + ex);
      throw ex;
    }
    
    return mapResult;
  }
  
  public static
  boolean delete(String id)
      throws Exception
  {
    if(id == null || id.length() == 0) {
      return false;
    }
    
    boolean result = false;
    
    try {
      INoSQLDB noSQLDB = ConnectionManager.getDefaultNoSQLDB();
      
      int delResult = noSQLDB.delete("events", id);
      
      result = delResult > 0;
    }
    catch(Exception ex) {
      System.err.println("WSEvents.delete(" + id + "): " + ex);
      throw ex;
    }
    
    return result;
  }
}
