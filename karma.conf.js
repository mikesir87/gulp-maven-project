module.exports = function(config) {
  config.set({
    basePath : './',
    files : [
      'target/gulp-webapp/gulp-demo-project/js/vendor.js',
      'target/gulp-webapp/gulp-demo-project/js/app.js',
      'target/gulp-webapp/gulp-demo-project/js/templates.js',
      'target/gulp-webapp/bower_components/angular-mocks/angular-mocks.js',
      'src/main/ui/test/**/*.js'
    ],
    frameworks : ['jasmine'],
    autoWatch : false,
    browsers : ["PhantomJS"],
    reporters : ['progress', 'junit'],
    singleRun : true,
    plugins : [
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-junit-reporter'
    ],
    junitReporter : {
      outputFile : 'test-results.xml',
      suite : 'unit'
    }
  });
};
