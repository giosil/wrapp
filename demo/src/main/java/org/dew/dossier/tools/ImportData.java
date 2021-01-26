package org.dew.dossier.tools;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;

import java.net.URL;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dew.nosql.INoSQLDB;
import org.dew.nosql.util.WUtil;

import org.json.JSON;

import org.util.WList;

import org.dew.dossier.util.ConnectionManager;

public 
class ImportData 
{
  public static 
  void main(String[] args)
  {
    System.out.println("ImportData...");
    
    importFile("patients.txt");
    
    importFile("services.txt");
    importFile("pathologies.txt");
    importFile("structures.txt");
    
    importFile("statistics.json");
    
    System.out.println("ImportData End.");
  }
  
  public static 
  int importFile(String filePath)
  {
    int result = 0;
    
    System.out.println("[ImportData] importFile(" + filePath + ")...");
    
    if(filePath == null || filePath.length() == 0) {
      System.err.println("[ImportData] Invalid filepath");
      return result;
    }
    int sep = filePath.lastIndexOf('/');
    if(sep < 0) {
      sep = filePath.lastIndexOf('\\');
    }
    String fileNameLC = sep >= 0 ? filePath.substring(sep + 1).toLowerCase() : filePath.toLowerCase();
    String collection = "services";
    if(fileNameLC.indexOf("path") >= 0) {
      collection = "pathologies";
    }
    else if(fileNameLC.indexOf("stru") >= 0) {
      collection = "structures";
    }
    else if(fileNameLC.indexOf("stat") >= 0) {
      collection = "statistics";
    }
    else if(fileNameLC.indexOf("pati") >= 0) {
      collection = "patients";
    }
    
    INoSQLDB noSQLDB = null;
    
    if(fileNameLC.endsWith(".json")) {
      ByteArrayOutputStream baos = new ByteArrayOutputStream();
      InputStream is = null;
      try {
        if(sep < 0) {
          URL url = Thread.currentThread().getContextClassLoader().getResource(filePath);
          is = url.openStream();
        }
        else {
          is = new FileInputStream(filePath);
        }
        int n;
        byte[] buff = new byte[1024];
        while((n = is.read(buff)) > 0) {
          baos.write(buff, 0, n);
        }
        
        String json = new String(baos.toByteArray(), "UTF-8");
        
        Map<String, Object> mapData = JSON.parseObj(json);
        
        if(mapData == null || mapData.isEmpty()) {
          System.err.println("[ImportData] importFile(" + filePath + "): no data");
          return 0;
        }
        
        noSQLDB = ConnectionManager.getDefaultNoSQLDB();
        
        String code = WUtil.toString(mapData.get("code"), null);
        
        if(code != null && code.length() > 0) {
          noSQLDB.createIndex(collection, "code", 1);
          
          Map<String, Object> mapFilter = new HashMap<String, Object>();
          mapFilter.put("code", code);
          
          List<Map<String, Object>> listFind = noSQLDB.find(collection, mapFilter, "");
          
          if(listFind != null && listFind.size() > 0) {
            noSQLDB.update(collection, mapData, mapFilter);
          }
          else {
            noSQLDB.insert(collection, mapData);
            result++;
          }
        }
        else {
          noSQLDB.insert(collection, mapData);
          result++;
        }
      }
      catch(Exception ex) {
        System.err.println("[ImportData] Exception in importFile(" + filePath + "): " + ex);
      }
      finally {
        if(is != null) try { is.close(); } catch(Exception ex) {}
      }
    }
    else if(collection.equalsIgnoreCase("patients")) {
      InputStream is = null;
      BufferedReader br = null;
      try {
        if(sep < 0) {
          URL url = Thread.currentThread().getContextClassLoader().getResource(filePath);
          is = url.openStream();
        }
        else {
          is = new FileInputStream(filePath);
        }
        br = new BufferedReader(new InputStreamReader(is));
        
        noSQLDB = ConnectionManager.getDefaultNoSQLDB();
        
        noSQLDB.createIndex(collection, "code", 1);
        
        String sLine = null;
        while((sLine = br.readLine()) != null) {
          if(sLine.trim().length() == 0) continue;
          
          WList wlist = new WList(sLine, ';');
          
          String code   = normalize(wlist.getString(0, ""));
          String family = normalize(wlist.getString(1, ""));
          String name   = normalize(wlist.getString(2, ""));
          String gend   = normalize(wlist.getString(3, ""));
          Date   birth  = wlist.getDate(4, null);
          String email  = normalize(wlist.getString(5, ""));
          String phone  = normalize(wlist.getString(6, ""));
          
          if(code == null || code.length() == 0) {
            continue;
          }
          if(family == null || family.length() == 0) {
            continue;
          }
          
          Map<String, Object> mapData = new HashMap<String, Object>();
          mapData.put("code",      code);
          mapData.put("family",    family);
          mapData.put("name",      name);
          mapData.put("birthDate", birth);
          mapData.put("email",     email);
          mapData.put("phone",     phone);
          mapData.put("gender",    gend);
          
          Map<String, Object> mapFilter = new HashMap<String, Object>();
          mapFilter.put("code", code);
          
          List<Map<String, Object>> listFind = noSQLDB.find(collection, mapFilter, "");
          
          if(listFind != null && listFind.size() > 0) {
            noSQLDB.update(collection, mapData, mapFilter);
          }
          else {
            noSQLDB.insert(collection, mapData);
            result++;
          }
        }
      }
      catch(Exception ex) {
        System.err.println("[ImportData] Exception in importFile(" + filePath + "): " + ex);
      }
      finally {
        if(br != null) try { br.close(); } catch(Exception ex) {}
        if(is != null) try { is.close(); } catch(Exception ex) {}
      }
    }
    else {
      InputStream is = null;
      BufferedReader br = null;
      try {
        if(sep < 0) {
          URL url = Thread.currentThread().getContextClassLoader().getResource(filePath);
          is = url.openStream();
        }
        else {
          is = new FileInputStream(filePath);
        }
        br = new BufferedReader(new InputStreamReader(is));
        
        noSQLDB = ConnectionManager.getDefaultNoSQLDB();
        
        noSQLDB.createIndex(collection, "code", 1);
        
        String sLine = null;
        int count = 0;
        while((sLine = br.readLine()) != null) {
          if(sLine.trim().length() == 0) continue;
          
          WList wlist = new WList(sLine, ';');
          
          String code  = normalize(wlist.getString(0, ""));
          String desc  = normalize(wlist.getString(1, ""));
          String type  = normalize(wlist.getString(2, ""));
          String tdes  = normalize(wlist.getString(3, ""));
          double fare  = wlist.getDouble(4, -0.1d);
          Boolean agre = wlist.getBooleanObj(5, null);
          
          if(code == null || code.length() == 0) {
            continue;
          }
          if(desc == null || desc.length() == 0) {
            continue;
          }
          
          count++;
          
          Map<String, Object> mapData = new HashMap<String, Object>();
          mapData.put("code", code);
          mapData.put("desc", desc);
          if(type != null && type.length() > 0) {
            mapData.put("type", type);
            if(tdes != null && tdes.length() > 0) {
              mapData.put("typeDesc", tdes);
            }
          }
          if(fare >= 0.0d) {
            mapData.put("fare", fare);
          }
          if(agre != null) {
            mapData.put("agre", agre);
          }
          else if(collection.equals("structures")) {
            mapData.put("agre", count % 2 == 0);
          }
          
          Map<String, Object> mapFilter = new HashMap<String, Object>();
          mapFilter.put("code", code);
          
          List<Map<String, Object>> listFind = noSQLDB.find(collection, mapFilter, "");
          
          if(listFind != null && listFind.size() > 0) {
            noSQLDB.update(collection, mapData, mapFilter);
          }
          else {
            noSQLDB.insert(collection, mapData);
            result++;
          }
        }
      }
      catch(Exception ex) {
        System.err.println("[ImportData] Exception in importFile(" + filePath + "): " + ex);
      }
      finally {
        if(br != null) try { br.close(); } catch(Exception ex) {}
        if(is != null) try { is.close(); } catch(Exception ex) {}
      }
    }
    
    try {
      noSQLDB.save(new HashMap<String, Object>());
    }
    catch(Exception ex) {
      System.err.println("[ImportData] Exception in importFile(" + filePath + ")[save]: " + ex);
    }
    
    System.out.println("[ImportData] importFile(" + filePath + ") -> " + result);
    
    return result;
  }
  
  public static 
  String normalize(String text)
  {
    if(text == null) return "";
    if(text.startsWith("\"") && text.endsWith("\"")) {
      return text.substring(1, text.length()-1);
    }
    return text;
  }
}
