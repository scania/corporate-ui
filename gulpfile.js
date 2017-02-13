var gulp = require('gulp'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps');

/* Available tasks */
gulp.task('default', ['less'], _default)
gulp.task('less', _less)

gulp.watch('less/**/*', ['less']);


/* Private methods */
function _default() {
  require('./server')
}
function _less() {
  gulp.src(['less/corporate-ui.less', 'less/ie-media-rules.less'])
    .pipe(less())
    .pipe(gulp.dest('css'))

  gulp.src('less/corporate-ui/corporate-ui-bootstrap.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css/corporate-ui'))
}
