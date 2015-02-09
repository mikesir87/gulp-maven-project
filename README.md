# Gulp Maven Project

This project serves as a demo of using Gulp/Bower/Karma in a Maven project.  If you see any areas of improvement, I'd be happy to hear them!  There isn't much out there on how to combine these two development workflows, so this serves to at least be a start.

## Rationale

Building Single-Page Applications (SPA) in war projects can be quite tricky.  Sure, you could include the _bower_components_ in your webapp, include 30+ script tags in your html pages, and not worry about minified JavaScript code.  But, there's a better way (for you and your users)!

But, figuring out how to plug in various Node tools can be tricky in a Java context.  This project serves as an example.  

## Project Structure

The listing below outlines the additions that are made to the normal war file layout.

```
/
  .bowerrc           - bower configuration
  bower.json         - bower dependencies config file 
  gulpfile.js        - gulp task file
  karma.conf.js      - karma testing config file
  package.json       - node dependencies config file
  vendor.json        - an explicit listing of bower sources to include
  src/main/ui/
    index.html
    app/
      controllers/
      directives/ 
      filters/    
      services/
      app.js         - the actual module definition
    less/
      custom/        - custom LESS stylesheets
      theme/         - LESS stylesheets for the overall theme
    templates/       - the Angular partials/templates
    test/            - contains Spec.js files for karma testing
      controllers/
      directives/
      filters/
      services/
```

## Gulp tasks

The default gulp task will do the following:
- Combine all bower dependencies into a vendor.js (managed through /vendor.json)
- Combine all app JavaScript into a single app.js
- Build all LESS stylesheets
- Combine all partials and drop into an Angular templatecache
- Run all tests
- Set up a webserver that:
  - Serves files from src/main/webapp (the built code)
  - Proxies API requests throw the webserver to your underlying Wildfly server
  - Starts a livereload server, watching the src/main/webapp folder

If running using the **build:prod** task, all the above is completed, minus the webserver.  In addition, all stylesheets and JavaScript is minified (uglified).  This is the task that is used during a Maven build.

## Development

What I have found to work best is to do the following:

- Setup a Wildfly server in Eclipse and deploy the application in it (so you have a real backend)
- In a command-line, run gulp from your project root. This'll start the webserver and livereload. Open your browser to this (http://localhost:8000)
- You can then either work in Eclipse or another tool (like Sublime).  As you modify the code in _src/main/ui_, gulp's watch will trigger the necessary tasks.


