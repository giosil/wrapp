package org.dew.test;

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

public class TestHello extends TestCase {
  
  public TestHello(String testName) {
    super(testName);
  }
  
  public static Test suite() {
    return new TestSuite(TestHello.class);
  }
  
  public void testApp() throws Exception {
    
  }
}
