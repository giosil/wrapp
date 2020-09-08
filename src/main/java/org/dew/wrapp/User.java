package org.dew.wrapp;

import java.io.Serializable;

import java.security.Principal;

import java.util.Date;
import java.util.List;
import java.util.Map;

public 
class User implements Principal, Serializable 
{
  private static final long serialVersionUID = 5951794887807593688L;
  
  private int id;
  private String userName;
  
  private Date   currLogin;
  private String lastName;
  private String firstName;
  private String email;
  private String mobile;
  private String taxCode;
  private String role;
  private String locale;
  
  private List<String> groups;
  private List<String> grants;
  private List<String> structures;
  
  private String tokenId;
  private Date   dateLastAccess;
  private String message;
  
  private Map<String, Object> resources;
  
  public User() {
  }

  public User(String userName) {
    this.userName = userName;
  }

  public User(int id, String userName) {
    this.id = id;
    this.userName = userName;
  }

  @Override
  public String getName() {
    return userName;
  }
  
  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public Date getCurrLogin() {
    return currLogin;
  }

  public void setCurrLogin(Date currLogin) {
    this.currLogin = currLogin;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getMobile() {
    return mobile;
  }

  public void setMobile(String mobile) {
    this.mobile = mobile;
  }

  public String getTaxCode() {
    return taxCode;
  }

  public void setTaxCode(String taxCode) {
    this.taxCode = taxCode;
  }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }

  public String getLocale() {
    return locale;
  }

  public void setLocale(String locale) {
    this.locale = locale;
  }

  public List<String> getGroups() {
    return groups;
  }

  public void setGroups(List<String> groups) {
    this.groups = groups;
  }

  public List<String> getGrants() {
    return grants;
  }

  public void setGrants(List<String> grants) {
    this.grants = grants;
  }

  public List<String> getStructures() {
    return structures;
  }

  public void setStructures(List<String> structures) {
    this.structures = structures;
  }

  public String getTokenId() {
    return tokenId;
  }

  public void setTokenId(String tokenId) {
    this.tokenId = tokenId;
  }

  public Date getDateLastAccess() {
    return dateLastAccess;
  }

  public void setDateLastAccess(Date dateLastAccess) {
    this.dateLastAccess = dateLastAccess;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public Map<String, Object> getResources() {
    return resources;
  }

  public void setResources(Map<String, Object> resources) {
    this.resources = resources;
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
