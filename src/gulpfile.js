var gulp = require('gulp');
var less = require('gulp-less');
var vueify = require('gulp-vueify');

gulp.task('compile-less', function () {
  gulp.src('./less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./style/'));
});

gulp.task('watch-less', function() {
  gulp.watch('./less/*.less', ['compile-less']);
});
