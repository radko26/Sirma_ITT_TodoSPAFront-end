var path = require('path'),
gulp = require('gulp'),
uglify = require('gulp-uglify'),
htmlmin = require('gulp-htmlmin'),
connect = require('gulp-connect'),
webserver = require('gulp-webserver'),
karma = require('gulp-karma'),
jshint = require('gulp-jshint'),
minifyCSS = require('gulp-minify-css'),
less = require('gulp-less'),
imagemin = require('gulp-imagemin'),
protractor = require("gulp-protractor").protractor,
program = require('commander'),
stylish = require('jshint-stylish'),
concat = require('gulp-concat'),
ngAnnotate = require('gulp-ng-annotate'),
templateCache  = require('gulp-angular-templateCache'),
debug = false,
WATCH_MODE = 'watch',
RUN_MODE = 'run';

var mode = RUN_MODE;

function list(val) {
  return val.split(',');
}

program
.version('0.0.1')
.option('-t, --tests [glob]', 'Specify which tests to run')
.option('-b, --browsers <items>', 'Specify which browsers to run on', list)
.option('-r, --reporters <items>', 'Specify which reporters to use', list)
.parse(process.argv);

gulp.task('js', function() {
  var jsTask = gulp.src('src/js/**/*.js');
  if (!debug) {
    jsTask.pipe(uglify());
  }
  jsTask.pipe(gulp.dest('public/js'))
  .pipe(connect.reload());
});

gulp.task('index',function(){
  var indexTask = gulp.src('index.html');
  indexTask.pipe(gulp.dest('public/')).pipe(connect.reload());
});

gulp.task('template', function() {
  var templateTask = gulp.src('src/template/**/*.html');
  if (!debug) {
    templateTask.pipe(htmlmin({ collapseWhitespace: true }));
  }
  templateTask.pipe(gulp.dest('public/template'))
  .pipe(connect.reload());
});

gulp.task('css', function() {
  var options = {
    errLogToConsole: true
  };
  if (!debug) {
    options.outputStyle = 'expanded';
    options.sourceComments = 'map';
  }
  var cssTask = gulp.src('src/less/*.less')
  .pipe(less(options));
  if (!debug) {
    cssTask.pipe(minifyCSS());
  }
  cssTask.pipe(gulp.dest('public/css'))
  .pipe(connect.reload());
});

gulp.task('image', function () {
  gulp.src('src/image/**.*')
  .pipe(imagemin())
  .pipe(gulp.dest('public/image'))
  .pipe(connect.reload());
});

gulp.task('lint', function() {
  gulp.src('src/js/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});

gulp.task('karma', function() {
  // undefined.js: unfortunately necessary for now
  return gulp.src(['undefined.js'])
  .pipe(karma({
    configFile: 'karma.conf.js',
    action: mode,
    tests: program.tests,
    reporters: program.reporters || ['progress'],
      browsers: ['PhantomJS']
    }))
  .on('error', function() {});
});


gulp.task('connect', function() {
  if (mode === WATCH_MODE) {
    gulp.watch(['index.html'], function() {
      gulp.src(['index.html'])
      .pipe(connect.reload());
    });
  }

 
  gulp.src('.')
    .pipe(webserver({
      port:8081,
      proxies: [
        {
          source: '/tasks', target: 'http://localhost:8080/SirmaTaskManager/rest/tasks'
        }
      ]
    }));


 /*
  connect.server({
    port: 8081,
    livereload: mode === WATCH_MODE,
  });
  */

});

gulp.task('debug', function() {
  debug = true;
});



gulp.task('watch-mode', function() {
  mode = WATCH_MODE;

  var jsWatcher = gulp.watch('src/js/**/*.js', ['js']),
  cssWatcher = gulp.watch('src/sass/**/*.scss', ['css']),
  imageWatcher = gulp.watch('src/image/**/*', ['image']),
  htmlWatcher = gulp.watch('src/template/**/*.html',
    ['template']),
  testWatcher = gulp.watch('test/**/*.js', ['karma']);

  function changeNotification(event) {
    console.log('File', event.path, 'was', event.type, ', running tasks...');
  }

  jsWatcher.on('change', changeNotification);
  cssWatcher.on('change', changeNotification);
  imageWatcher.on('change', changeNotification);
  htmlWatcher.on('change', changeNotification);
  testWatcher.on('change', changeNotification);
});


gulp.task('templateCache', function () {
  gulp.src('src/template/**/*.html')
   .pipe(templateCache())
   .pipe(gulp.dest('public/template/'));
});

gulp.task('build', ['css', 'js', 'lint', 'image','template']);
gulp.task('all', ['build', 'karma']);
gulp.task('default', ['watch-mode', 'all']);
gulp.task('server', ['connect', 'default']);
gulp.task('test', ['debug', 'connect', 'all']);
gulp.task('start', ['watch-mode','debug','build','connect']);