var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('scripts', function() {
  return gulp.src([''])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./static/'));
});

gulp.task('styles', function() {

});

gulp.task('default', ['scripts', 'styles']);