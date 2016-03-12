package io.mikesir87.gulp.ft;

import com.google.common.base.Predicate;
import org.jboss.arquillian.drone.api.annotation.Drone;
import org.jboss.arquillian.graphene.page.Location;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import java.util.concurrent.TimeUnit;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.jboss.arquillian.graphene.Graphene.waitGui;

/**
 * A page fragment that represents the initial landing page
 *
 * @author Michael Irwin
 */
@Location("index.html")
public class IndexPage {

  @Drone
  private WebDriver browser;

  @FindBy(id = "current-time-display")
  private WebElement timeDisplay;

  @FindBy(id = "refresh-button")
  private WebElement refreshButton;

  public IndexPage assertOnPage() throws Exception {
    assertThat(browser.getTitle(), containsString("Sample Gulp Application"));
    waitGui().withTimeout(5, TimeUnit.SECONDS).until()
        .element(timeDisplay).is().present();
    return this;
  }

  public String getTimeDisplay() {
    return timeDisplay.getText();
  }

  public IndexPage clickRefreshButton() {
    refreshButton.click();
    waitGui().withTimeout(2, TimeUnit.SECONDS).until()
        .element(refreshButton).is().visible();
    return this;
  }
}
