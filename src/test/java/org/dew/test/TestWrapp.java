package org.dew.test;

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

public class TestWrapp extends TestCase {
  
  public TestWrapp(String testName) {
    super(testName);
  }
  
  public static Test suite() {
    return new TestSuite(TestWrapp.class);
  }
  
  public void testApp() throws Exception {
    
  }
}
