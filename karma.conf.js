module.exports = function(config) {
  config.set({
    basePath : './',
    files : [
      'target/gulp-webapp/bower_components/angular/angular.js',
      'target/gulp-webapp/bower_components/angular-ui-router/release/angular-ui-router.js',
      'target/gulp-webapp/bower_components/angular-mocks/angular-mocks.js',
      'src/main/ui/app/**/*.js',
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
