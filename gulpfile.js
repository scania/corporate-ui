
var gulp = require('gulp'),
    clean = require('gulp-clean'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    server = require('./server')

/* Available tasks */
gulp.task('clean', _clean)
gulp.task('symlink', _symlink)
gulp.task('less', _less)
gulp.task('default', gulp.series(['clean', 'symlink', 'less'], server))

/* File watches */
gulp.watch('src/less/**/*', gulp.series(['less']))

/* Methods */
function _clean() {
  return gulp.src('dist', {read: false})
    .pipe(clean())
}
function _symlink() {
  return gulp.src('src/{html,images,js,less,starter-kit}')
    .pipe(gulp.symlink('dist'))
}
function _less() {
  return gulp.src(['src/less/*.less', 'src/less/corporate-ui/{core,fonts,icons,brands}.less'])
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
}
