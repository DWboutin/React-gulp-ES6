// kickass article https://community.nitrous.io/tutorials/setting-up-gulp-with-livereload-sass-and-other-tasks

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var tinylr = require('tiny-lr')();
var plumber = require('gulp-plumber');

gulp.task('default', ['scripts', 'express', 'livereload', 'watch']);

gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({port: 35729}));
  app.use(express.static(__dirname));
  app.listen(4000, '0.0.0.0');
});

gulp.task('livereload', function() {
  tinylr.listen(35729);
});

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);

  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('scripts', function(){
  return gulp.src('app/**/*.js')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', function(){
  gulp.watch('app/**/*.js', ['scripts']);
  gulp.watch('**/*.html', notifyLiveReload);
  gulp.watch('*.js', notifyLiveReload);
});