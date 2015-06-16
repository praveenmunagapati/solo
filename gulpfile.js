var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minify = require('gulp-minify-css');

gulp.task('scripts', function() {
  return gulp.src('./static/main.js')
    .pipe(uglify())
    .pipe(rename(function(path){
      path.basename += ".min";
    }))
    .pipe(gulp.dest('./static/'));
});

gulp.task('styles', function() {
  return gulp.src('./static/style.css')
    .pipe(minify())
    .pipe(rename(function(path){
      path.basename += '.min';
    }))
    .pipe(gulp.dest('./static/'));
});

gulp.task('default', ['scripts', 'styles']);