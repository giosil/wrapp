package org.dew.wrapp;

import java.io.Serializable;
import java.util.Locale;
import java.util.Map;

public 
class Page implements Serializable
{
  private static final long serialVersionUID = -3555533098451072747L;
  
  private String id;
  private String title;
  private String description;
  private String layout;
  private String modifier;
  private String header;
  private String content;
  private String footer;
  private String script;
  
  private String[] css;
  private String[] scripts;
  
  private Map<String, Object> attributes;
  
  public Page()
  {
  }
  
  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getLayout() {
    return layout;
  }

  public void setLayout(String layout) {
    this.layout = layout;
  }

  public String getModifier() {
    return modifier;
  }

  public void setModifier(String modifier) {
    this.modifier = modifier;
  }

  public String getHeader() {
    return header;
  }

  public void setHeader(String header) {
    this.header = header;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public String getFooter() {
    return footer;
  }

  public void setFooter(String footer) {
    this.footer = footer;
  }

  public String getScript() {
    return script;
  }

  public void setScript(String script) {
    this.script = script;
  }

  public String[] getCss() {
    return css;
  }

  public void setCss(String[] css) {
    this.css = css;
  }

  public String[] getScripts() {
    return scripts;
  }

  public void setScripts(String[] scripts) {
    this.scripts = scripts;
  }

  public Map<String, Object> getAttributes() {
    return attributes;
  }

  public void setAttributes(Map<String, Object> attributes) {
    this.attributes = attributes;
  }
  
  // Localized fields
  
  public String getTitle(Locale locale) {
    return WebUtil.getLocalized(title, locale);
  }
  
  public String getDescription(Locale locale) {
    return WebUtil.getLocalized(description, locale);
  }
  
  public String getHeader(Locale locale) {
    return WebUtil.getLocalized(header, locale);
  }
  
  public String getContent(Locale locale) {
    return WebUtil.getLocalized(content, locale);
  }
  
  public String getFooter(Locale locale) {
    return WebUtil.getLocalized(footer, locale);
  }
  
  @Override
  public boolean equals(Object object) {
    if(object instanceof Page) {
      String sId = ((Page) object).getId();
      if(sId == null && id == null) return true;
      return sId != null && sId.equals(id);
    }
    return false;
  }
  
  @Override
  public int hashCode() {
    if(id == null) return 0;
    return id.hashCode();
  }
  
  @Override
  public String toString() {
    return id;
  }
}
