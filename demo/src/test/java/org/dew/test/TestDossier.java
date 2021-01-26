package org.dew.test;

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

public class TestDossier extends TestCase {
  
  public TestDossier(String testName) {
    super(testName);
  }
  
  public static Test suite() {
    return new TestSuite(TestDossier.class);
  }
  
  public void testApp() throws Exception {
    
  }
}
