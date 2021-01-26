package org.dew.dossier.ws;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dew.dossier.util.ConnectionManager;
import org.dew.nosql.INoSQLDB;
import org.util.WMap;

public 
class WSStatistics 
{
  public static
  Map<String, Object> load(Map<String, Object> filter)
      throws Exception
  {
    System.out.println("WSStatistics.load(" + filter + ")...");
    
    WMap wmFilter = new WMap(filter);
    
    String code = wmFilter.getString("code");
    if(code == null || code.length() == 0) {
      return new HashMap<String, Object>();
    }
    
    Map<String, Object> mapResult = null;
    
    try {
      INoSQLDB noSQLDB = ConnectionManager.getDefaultNoSQLDB();
      
      noSQLDB.createIndex("statistics", "code", 1);
      
      Map<String, Object> mapFilter = new HashMap<String, Object>();
      // mapFilter.put("code", code);
      
      List<Map<String, Object>> listFind = noSQLDB.find("statistics", mapFilter, "");
      
      if(listFind != null && listFind.size() > 0) {
        mapResult = listFind.get(0);
      }
    }
    catch(Exception ex) {
      System.err.println("WSStatistics.load(" + filter + "): " + ex);
      throw ex;
    }
    
    if(mapResult == null) {
      mapResult = new HashMap<String, Object>();
    }
    
    return mapResult;
  }
}
