package io.mikesir87.gulp.ft;

import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.drone.api.annotation.Drone;
import org.jboss.arquillian.graphene.page.InitialPage;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.arquillian.test.api.ArquillianResource;
import org.jboss.shrinkwrap.api.Filters;
import org.jboss.shrinkwrap.api.GenericArchive;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.importer.ExplodedImporter;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.jboss.shrinkwrap.resolver.api.maven.archive.importer.MavenImporter;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.WebDriver;

import java.net.URL;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.not;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

/**
 * A simple functional test, running in Arquillian.
 *
 * @author Michael Irwin
 */
@RunWith(Arquillian.class)
public class ApplicationFT {

  @Deployment(testable = false)
  public static WebArchive generateDeployment() {
    WebArchive archive = ShrinkWrap.create(MavenImporter.class)
        .loadPomFromFile("pom.xml")
        .importBuildOutput()
        .as(WebArchive.class)
        .addAsWebInfResource("test-jboss-web.xml", "jboss-web.xml");
    archive.merge(
        ShrinkWrap.create(GenericArchive.class).as(ExplodedImporter.class)
            .importDirectory("target/gulp-webapp/gulp-demo-project").as(GenericArchive.class),
        "/", Filters.include(".*")
    );
    return archive;
  }

  @Drone
  private WebDriver browser;

  @ArquillianResource
  private URL deploymentUrl;

  @Test
  public void testRefreshButton(@InitialPage IndexPage indexPage) throws Exception {
    String timeDisplay = indexPage.assertOnPage().getTimeDisplay();
    String newDisplay = indexPage.clickRefreshButton().getTimeDisplay();
    assertThat(timeDisplay, is(not(equalTo(newDisplay))));
  }

}
