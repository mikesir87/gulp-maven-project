/*
 * File created on Feb 5, 2015 
 *
 * Copyright 2008-2015 Michael Irwin
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
package io.mikesir87.gulp.web;

import java.util.Date;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlValue;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.mikesir87.gulp.service.TimeService;

/**
 * A simple resource that returns the current time
 *
 * @author Michael Irwin
 */
@Path("/currentTime")
public class TimeResource {

  @Inject
  protected TimeService timeService;

  @GET
  public Response getCurrentTime() {
    TimeModel model = new TimeModel(timeService.getCurrentTime());
    return Response.ok(model).build();
  }
  
  @XmlRootElement(name = "time")
  public static class TimeModel {
    
    @XmlValue
    @JsonProperty("time")
    public Date time;

    public TimeModel(Date date) {
      this.time = date;
    }
  }
}
