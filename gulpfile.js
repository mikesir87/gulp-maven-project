var del                    = require('del'),
    gulp                   = require('gulp'),
    angularFilesort        = require('gulp-angular-filesort'),
    angularTemplateCache   = require('gulp-angular-templatecache'),
    concat                 = require('gulp-concat'),
    expect                 = require('gulp-expect-file'),
    gulpIgnore             = require('gulp-ignore'),
    inject                 = require('gulp-inject'),
    karma                  = require('karma').server,
    less                   = require('gulp-less'),
    livereload             = require('gulp-livereload'),
    merge                  = require('gulp-merge'),
    minifyHTML             = require('gulp-minify-html'),
    minifyCSS              = require('gulp-minify-css'),
    ngAnnotate             = require('gulp-ng-annotate'),
    runSequence            = require('run-sequence'),
    uglify                 = require('gulp-uglify'),
    watch                  = require('gulp-watch'),
    webserver              = require('gulp-webserver');


var ENV_PROD = "PROD";
var ENV_DEV = "DEV";
var ENV = ENV_DEV;

var MODULE_NAME = "angularApp";
var SOURCE_BASE_DIR = "src/main/ui";
var BUILD_BASE_DIR = "src/main/webapp";

var WATCH_PROXIES = [
  { source: '/api', target: 'http://localhost:8080/gulp-archetype/api' }
];


var source = {
  app : {
    files : [SOURCE_BASE_DIR + '/index.html'],
    watch : SOURCE_BASE_DIR + "/index.html"
  },
  scripts : {
    vendor : {
      name : "vendor.js",
      files : require('./vendor.json')
    },
    app : {
      files: [SOURCE_BASE_DIR + '/app/app.js', SOURCE_BASE_DIR + '/app/**/*.js'],
      watch: SOURCE_BASE_DIR + "/app/**"
    },
  },
  styles : {
    theme: {
      dir : SOURCE_BASE_DIR + "/less/theme",
      files : [ SOURCE_BASE_DIR + '/less/theme/*.less' ],
      watch : SOURCE_BASE_DIR + "/less/theme/*.less"
    },
    custom: {
      dir : "app/",
      files : [ SOURCE_BASE_DIR + '/less/custom/*.less' ],
      watch : SOURCE_BASE_DIR + '/less/custom/*.less'
    }
  },
  templates : {
    files : [ SOURCE_BASE_DIR + '/templates/*.html', SOURCE_BASE_DIR + '/templates/**/*.html' ],
    watch : SOURCE_BASE_DIR + "/templates/**"
  },
  index : {
    file : SOURCE_BASE_DIR + "/index.html"
  }
};

var build = {
  scripts : {
    dir : BUILD_BASE_DIR + "/js",
    vendor : { name : "vendor.js" },
    app : { name : "app.js" }
  },
  styles : {
    dir : BUILD_BASE_DIR + "/css",
    theme : { name : "theme.css" },
  },
  templates : {
    dir : BUILD_BASE_DIR + "/js",
    name : "templates.js",
    rootPath : "templates/"
  },
  index : {
    file : BUILD_BASE_DIR + "/index.html",
    ignore : "../webapp"
  },
  dir : BUILD_BASE_DIR,
  watch : BUILD_BASE_DIR + "/**"
};


//////////////////////////////////
// Tasks
//////////////////////////////////

/**
 * Clean the webapp folder. Remove all the 
 */
gulp.task('clean', function(callback) {
  return del([ build.scripts.dir, 
               build.styles.dir, 
               build.templates.dir,
               build.index.file], callback);
});


/**
 * Concat all app scripts. Performs minification when running in prod mode
 */
gulp.task('scripts:app', function() {
  var scripts = gulp.src(source.scripts.app.files)
      .pipe(gulpIgnore.exclude("**/*Spec.js"));
  
  if (ENV == ENV_PROD) {
    scripts = scripts.pipe(concat(build.scripts.app.name))
        .pipe(ngAnnotate())
        .pipe(uglify());
  }
  
  return scripts.pipe(gulp.dest(build.scripts.dir));
});


/**
 * Combines all vendor/third-party scripts into a single minified vendor file
 */
gulp.task('scripts:vendor', function() {
  return gulp.src(source.scripts.vendor.files)
      .pipe(expect(source.scripts.vendor.files))
      .pipe(uglify())
      .pipe(concat(build.scripts.vendor.name))
      .pipe(gulp.dest(build.scripts.dir));
});


/**
 * Imports all templates into an angular template cache. If running in prod,
 * the templates are first minified 
 */
gulp.task('templates', function() {
  var templates = gulp.src(source.templates.files);
  
  if (ENV == ENV_PROD)
    templates = templates.pipe(minifyHTML())
  
  return templates
      .pipe(angularTemplateCache(build.templates.name, { 
        module : MODULE_NAME, root : build.templates.rootPath
      }))
      .pipe(gulp.dest(build.templates.dir));
});


/**
 * Compiles theme LESS files. If running in prod mode, files are minified.
 */
gulp.task('styles:theme', function() {
  var styles = gulp.src(source.styles.theme.files)
      .pipe(less({ paths : [source.styles.theme.dir ] }))
      .pipe(concat(build.styles.theme.name));
  
  if (ENV == ENV_PROD)
    styles.pipe(minifyCSS({keepSpecialComments : 1}));
  
  return styles.pipe(gulp.dest(build.styles.dir));
});


/**
 * Compiles app LESS files. If running in prod mode, files are minified.
 */
gulp.task('styles:custom', function() {
  var styles = gulp.src(source.styles.custom.files)
      .pipe(less({paths : [source.styles.custom.dir]}))
  if (ENV == ENV_PROD)
    styles.pipe(minifyCSS({keepSpecialComments : 1}));
  
  return styles.pipe(gulp.dest(build.styles.dir));
});


/**
 * Builds the index.html file. Adds in stylesheets and script tags
 */
gulp.task('app:index', function() {
  // Get all app sources and ensure they are included in the proper order for
  // the app to load (angularFileSor)
  var appScriptSources = gulp.src([build.dir + "/**/*.js"])
                             .pipe(gulpIgnore.exclude("**/" + build.scripts.vendor.name))
                             .pipe(angularFilesort());
  
  // Get the vendor script (which will need to go first) and stylesheets
  var otherSources = gulp.src([build.scripts.dir + "/" + build.scripts.vendor.name,
                               build.styles.dir + "/" + build.styles.theme.name,
                               build.styles.dir + "/*.css"], {read: false});
  
  var sources = merge(otherSources, appScriptSources);

  // Do the actual script/stylesheet injections into the index page
  var index = gulp.src(source.index.file)
      .pipe(inject(sources, { ignorePath: build.index.ignore, relative : true }));
  
  if (ENV == ENV_PROD)
    index = index.pipe(minifyHTML());

  return index.pipe(gulp.dest(build.dir));
});


/**
 * A watch task.  Starts up a livereload webserver
 */
gulp.task('watch', function() {
  
  /*
   * Separate watch globs are needed here because wildcarding such as ** /*.js
   * doesn't work when new files are added (https://github.com/floatdrop/gulp-watch/issues/29)
   */
  watch(source.scripts.app.watch,   function() { gulp.start('scripts:app'); gulp.start('app:index'); });
  watch(source.templates.watch,     function() { gulp.start('templates') });
  watch(source.styles.theme.watch,  function() { gulp.start('styles:theme') });
  watch(source.styles.custom.watch, function() { gulp.start('styles:custom') });
  watch(source.app.watch,           function() { gulp.start('app:index') });
  
  // Using livereload for listening because it's much more responsive than the
  // livereload found in the webserver
  livereload.listen();
  watch(build.watch, function(evt) { 
    livereload.changed(evt);
  });

  return gulp.src(build.dir).pipe(webserver({
    proxies : WATCH_PROXIES
  }));
  
});


/**
 * Execute karma tests
 */
gulp.task('test', function(callback) {
  return karma.start({
    configFile : __dirname + '/karma.conf.js',
    singleRun : true
  }, callback);
});

/**
 * Performs a full build. Processing of all scripts and css is done in parallel,
 * after which the index.html page is built.
 */
gulp.task('build', function(callback) {
  console.log("Build using environment: " + ENV);
  return runSequence('clean', 
      ['styles:theme', 'styles:custom', 'scripts:vendor', 'scripts:app', 'templates'], 
      'app:index',
      'test',
      callback);
});


/**
 * Performs a full build for the production environment
 */
gulp.task('build:prod', function(callback) {
  ENV = ENV_PROD;
  return gulp.start('build', callback);
});


/**
 * The default task.  Performs a dev build and starts watching the files
 */
gulp.task('default', function(callback) {
  return runSequence('build', 'watch', callback);
});


// Error handler
function handleError(err) {
  console.log(err.toString());
  // this.emit('end');
}
