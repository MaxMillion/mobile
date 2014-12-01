var gulp = require('gulp');


var jade = require('gulp-jade');

gulp.task('html', function() {

  gulp.src('./src/html/**/*.jade')
    .pipe(jade({
    }))
    .pipe(gulp.dest('./build/'))
});


gulp.task('templates', function() {
  gulp.src('./src/js/*.jade')
    .pipe(jade({
      client: true
    }))
    .pipe(gulp.dest('./build/tmp/templates'))
});

var compass = require('gulp-compass');
var path = require('path');

gulp.task('compass', function() {
  gulp.src('./src/sass/*.scss')
    .pipe(compass({
      project: path.join(__dirname, 'src'),
      sass: 'sass',
      css: path.join(__dirname, 'build', 'css')
    }))
    .pipe(gulp.dest('./build/css'));
});

var amdOptimize = require("amd-optimize");

gulp.task("js", function () {

  return gulp.src("src/js/modules/**/*.js")
    // Traces all modules and outputs them in the correct order.
    .pipe(amdOptimize("app"))
    .pipe(gulp.dest("./build/js"));

});

var connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});

gulp.task('copy', function() {
    gulp.src('./src/static/**')
         .pipe(gulp.dest('./build/'))
});

var watcher = gulp.watch('src/**', ['default']);

gulp.task('default', ['compass', 'html', 'templates', 'js', 'copy'], function() {
  // place code for your default task here
});
