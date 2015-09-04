package io.mikesir87.gulp.web;

import io.mikesir87.gulp.service.TimeService;
import org.jmock.Expectations;
import org.jmock.auto.Mock;
import org.jmock.integration.junit4.JUnitRuleMockery;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;

import javax.ws.rs.core.Response;
import java.util.Date;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

/**
 * Test case for the {@link TimeResource} class.
 *
 * @author Michael Irwin
 */
public class TimeResourceTest {

  @Rule
  public JUnitRuleMockery context = new JUnitRuleMockery();

  @Mock
  private TimeService timeService;

  private TimeResource resource = new TimeResource();

  @Before
  public void setUp() {
    resource.timeService = timeService;
  }

  @Test
  public void testGettingTime() {
    final Date date = new Date();
    context.checking(new Expectations() {
      {
        oneOf(timeService).getCurrentTime();
        will(returnValue(date));
      }
    });

    Response response = resource.getCurrentTime();
    assertThat(response.getStatus(), is(equalTo(Response.Status.OK.getStatusCode())));
    
    assertThat(response.getEntity(), is(instanceOf(TimeResource.TimeModel.class)));
    TimeResource.TimeModel model = (TimeResource.TimeModel) response.getEntity();
    assertThat(model.time, is(sameInstance(date)));
  }
}
