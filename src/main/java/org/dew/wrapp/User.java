package org.dew.wrapp;

import java.io.Serializable;

import java.security.Principal;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.dew.wrapp.util.WMap;

public 
class User implements Principal, Serializable 
{
  private static final long serialVersionUID = 9624147617711234L;
  
  // User attributes
  private int id;
  private String userName;
  private String lastName;
  private String firstName;
  private String email;
  private String mobile;
  private String taxCode;
  
  // Profile
  private String role;
  private List<String> groups;
  private List<String> grants;
  private List<String> structures;
  private Map<String, Object> resources;
  
  // Configuration
  private String locale;
  private String home;
  private String menu;
  private String menuManager;
  
  // Access attributes
  private Date   currLogin;
  private String tokenId;
  private Date   dateLastAccess;
  private String message;
  
  public User() {
  }

  public User(String userName) {
    this.userName = userName;
  }

  public User(int id, String userName) {
    this.id = id;
    this.userName = userName;
  }
  
  public User(Map<String, Object> mapUserInfo) {
    if(mapUserInfo == null) return;
    WMap wmUser = new WMap(mapUserInfo);
    id = wmUser.getInt("id");
    if(id == 0) id = wmUser.getInt("sub");
    userName = wmUser.getString("userName");
    if(userName == null || userName.length() == 0) {
      userName = wmUser.getString("username");
    }
    if(userName == null || userName.length() == 0) {
      userName = wmUser.getString("name");
    }
    if(userName == null || userName.length() == 0) {
      userName = wmUser.getString("nickname");
    }
    firstName  = wmUser.getString("given_name");
    if(firstName == null || firstName.length() == 0) {
      firstName = wmUser.getString("givenName");
    }
    if(firstName == null || firstName.length() == 0) {
      firstName = wmUser.getString("firstName");
    }
    lastName = wmUser.getString("family_name");
    if(lastName == null || lastName.length() == 0) {
      lastName = wmUser.getString("familyName");
    }
    if(lastName == null || lastName.length() == 0) {
      lastName = wmUser.getString("lastName");
    }
    email   = wmUser.getString("email");
    mobile  = wmUser.getString("mobile");
    role    = wmUser.getString("role");
    locale  = wmUser.getString("locale");
    taxCode = wmUser.getString("tax_code");
    if(taxCode == null || taxCode.length() == 0) {
      taxCode = wmUser.getString("taxCode");
    }
    if(taxCode == null || taxCode.length() == 0) {
      taxCode = wmUser.getString("tin");
    }
  }
  
  // java.security.Principal
  @Override
  public String getName() {
    return userName;
  }

  public int getId() {
    return id;
  }

  public String getUserName() {
    return userName;
  }

  public String getLastName() {
    return lastName;
  }

  public String getFirstName() {
    return firstName;
  }

  public String getEmail() {
    return email;
  }

  public String getMobile() {
    return mobile;
  }

  public String getTaxCode() {
    return taxCode;
  }

  public String getRole() {
    return role;
  }

  public List<String> getGroups() {
    return groups;
  }

  public List<String> getGrants() {
    return grants;
  }

  public List<String> getStructures() {
    return structures;
  }

  public Map<String, Object> getResources() {
    return resources;
  }

  public String getLocale() {
    return locale;
  }

  public String getHome() {
    return home;
  }

  public String getMenu() {
    return menu;
  }

  public String getMenuManager() {
    return menuManager;
  }

  public Date getCurrLogin() {
    return currLogin;
  }

  public String getTokenId() {
    return tokenId;
  }

  public Date getDateLastAccess() {
    return dateLastAccess;
  }

  public String getMessage() {
    return message;
  }

  public void setId(int id) {
    this.id = id;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public void setMobile(String mobile) {
    this.mobile = mobile;
  }

  public void setTaxCode(String taxCode) {
    this.taxCode = taxCode;
  }

  public void setRole(String role) {
    this.role = role;
  }

  public void setGroups(List<String> groups) {
    this.groups = groups;
  }

  public void setGrants(List<String> grants) {
    this.grants = grants;
  }

  public void setStructures(List<String> structures) {
    this.structures = structures;
  }

  public void setResources(Map<String, Object> resources) {
    this.resources = resources;
  }

  public void setLocale(String locale) {
    this.locale = locale;
  }

  public void setHome(String home) {
    this.home = home;
  }

  public void setMenu(String menu) {
    this.menu = menu;
  }

  public void setMenuManager(String menuManager) {
    this.menuManager = menuManager;
  }

  public void setCurrLogin(Date currLogin) {
    this.currLogin = currLogin;
  }

  public void setTokenId(String tokenId) {
    this.tokenId = tokenId;
  }

  public void setDateLastAccess(Date dateLastAccess) {
    this.dateLastAccess = dateLastAccess;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  @Override
  public boolean equals(Object object) {
    if (object instanceof User) {
      int iId = ((User) object).getId();
      return iId == id;
    }
    return false;
  }
  
  @Override
  public int hashCode() {
    if (id == 0) {
      if (userName != null) {
        return userName.hashCode();
      }
    }
    return id;
  }
  
  @Override
  public String toString() {
    return "User(" + id + "," + userName + ")";
  }
}
