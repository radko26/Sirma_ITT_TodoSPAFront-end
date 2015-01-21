var path = require('path'),
gulp = require('gulp'),
uglify = require('gulp-uglify'),
htmlmin = require('gulp-htmlmin'),
webserver = require('gulp-webserver'),
connect = require('gulp-connect'),
karma = require('gulp-karma'),
minifyCSS = require('gulp-minify-css'),
less = require('gulp-less'),
imagemin = require('gulp-imagemin'),
clean = require('gulp-clean'),
jshint = require('gulp-jshint'),
stylish = require('jshint-stylish'),
program = require('commander'),
sonar = require('gulp-sonar'),
debug = false,
WATCH_MODE = 'watch',
RUN_MODE = 'run',
DIST_PATH = 'public/',
mode = RUN_MODE;



program
.version('0.0.1')
.option('-d, --dist <value>', 'Specify the output public path')
.option('-t, --tests [glob]', 'Specify which tests to run')
.parse(process.argv);

if(program.dist){
      DIST_PATH = program.dist + DIST_PATH;
}


gulp.task('lint', function() {
  gulp.src('src/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('clean',function(){
  return gulp.src(DIST_PATH,{read:false}).pipe(clean());
});

gulp.task('js', function() {

  var jsTask = gulp.src('src/js/**/*.js');
  if (!debug) {
    jsTask.pipe(uglify());
  }
  jsTask.pipe(gulp.dest(DIST_PATH +'js'))
  .pipe(connect.reload());

  jsTask = gulp.src('src/theme/js/**/*.js');
  if (!debug) {
    jsTask.pipe(uglify());
  }

  jsTask.pipe(gulp.dest(DIST_PATH +'theme/js'))
  .pipe(connect.reload());

});

gulp.task('lib', function(){
  gulp.src('src/lib/**').pipe(gulp.dest(DIST_PATH + '/lib'));
});

gulp.task('index',function(){
  var indexTask = gulp.src('src/index.html');
  if (!debug) {
    indexTask.pipe(htmlmin({ collapseWhitespace: true }));
  }
  indexTask.pipe(gulp.dest(DIST_PATH)).pipe(connect.reload());
});

gulp.task('template', function() {
  var templateTask = gulp.src('src/template/**/*.html');
  if (!debug) {
    templateTask.pipe(htmlmin({ collapseWhitespace: true }));
  }
  templateTask.pipe(gulp.dest(DIST_PATH +'template'))
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
  var cssTask = gulp.src('src/theme/css/less/*.less')
  .pipe(less(options));
  if (!debug) {
    cssTask.pipe(minifyCSS());
  }
  cssTask.pipe(gulp.dest(DIST_PATH+'theme/css'))
  .pipe(connect.reload());

  cssTask = gulp.src('src/theme/css/**/*.css').pipe(gulp.dest(DIST_PATH+'/theme/css'));
  if (!debug) {
    cssTask.pipe(minifyCSS());
  }

});

gulp.task('image', function () {
  gulp.src('src/theme/image/**.*')
  .pipe(imagemin())
  .pipe(gulp.dest(DIST_PATH+'theme/image'))
  .pipe(connect.reload());
});

gulp.task('karma', function() {
  return gulp.src(['undefined.js'])
  .pipe(karma({
    configFile: 'karma.conf.js',
    action: mode,
    tests: program.tests,
    browsers: ['PhantomJS']
    }))
  .on('error', function() {});
});


gulp.task('connect', function() { 
  gulp.src('.')
    .pipe(webserver({
      port:8081,
      proxies: [
        {
          source: '/tasks', target: 'http://localhost:8080/SirmaTaskManager/rest/tasks'
        }
      ]
    }));

});

gulp.task('debug', function() {
  debug = true;
});



gulp.task('watch-mode', function() {
  mode = WATCH_MODE;
  var jsWatcher = gulp.watch('src/js/**/*.js', ['js']),
  indexWatcher = gulp.watch('src/index.html',['index']),
  cssWatcher = gulp.watch('src/less/**/*.less', ['css']),
  imageWatcher = gulp.watch('src/image/**/*', ['image']),
  testWatcher = gulp.watch('test/**/*.js', ['karma']);
  function changeNotification(event) {
    console.log('File', event.path, 'was', event.type, ', running tasks...');
  }
  indexWatcher.on('change',changeNotification);
  jsWatcher.on('change', changeNotification);
  cssWatcher.on('change', changeNotification);
  imageWatcher.on('change', changeNotification);
  testWatcher.on('change', changeNotification);
});

gulp.task('sonar', function () {
    var options = {
        sonar: {
            host: {
                url: 'http://localhost:9000'
            },
            jdbc: {
                url: 'jdbc:h2:tcp://localhost:9092/sonar',
                username: 'sonar',
                password: 'sonar'
            },
            projectKey: 'sonar:task-ui:1.1.0',
            projectName: 'TaskUI',
            projectVersion: '1.1.0',
            sources: 'src/js',
            language: 'js',
            sourceEncoding: 'UTF-8',
            javascript: {
                lcov: {
                    reportPath: 'test/sonar_report/lcov.info'
                }
            }
        }
    };

    // gulp source doesn't matter, all files are referenced in options object above
    return gulp.src('thisFileDoesNotExist.js', { read: false })
        .pipe(sonar(options))
        .on('error', util.log);
});




gulp.task('build', ['css', 'js','lint','image','template', 'index','lib']);
gulp.task('all', ['build', 'karma']);
gulp.task('default', ['watch-mode', 'all']);
gulp.task('server', ['connect', 'default']);
gulp.task('test', ['debug', 'connect', 'all']);
gulp.task('start', ['debug','watch-mode','build','connect',]);