package io.mikesir87.gulp.service;

import org.jmock.integration.junit4.JUnitRuleMockery;
import org.junit.Rule;
import org.junit.Test;

import java.util.Date;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

/**
 * Test case for the {@link TimeServiceBean} class.
 */
public class TimeServiceBeanTest {

  @Rule
  public JUnitRuleMockery context = new JUnitRuleMockery();

  private TimeServiceBean service = new TimeServiceBean();

  @Test
  public void testService() throws Exception {
    Date date = service.getCurrentTime();
    assertThat(date, is(not(nullValue())));

    // Validate that getting again after a short time returns a new date
    Thread.sleep(50);
    assertThat(date, is(not(equalTo(service.getCurrentTime()))));
  }

}
