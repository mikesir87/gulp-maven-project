/*
 * File created on Feb 5, 2015 
 *
 * Copyright 2008-2013 Virginia Polytechnic Institute and State University
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
package io.mikesir87.gulp.web.resource;

import java.util.Date;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlValue;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * A simple resource that returns the current time
 *
 * @author Michael Irwin
 */
@Path("/currentTime")
public class TimeResource {

  @GET
  public Response getCurrentTime() {
    return Response.ok(new TimeModel()).build();
  }
  
  @XmlRootElement(name = "time")
  public static class TimeModel {
    
    @XmlValue
    @JsonProperty("time")
    public Date time = new Date();
  }
}
