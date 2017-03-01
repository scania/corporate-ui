
var gulp = require('gulp'),
    clean = require('gulp-clean'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    server = require('./server')

/* Available tasks */
gulp.task('clean', _clean)
gulp.task('less', _less)
gulp.task('symlink', _symlink)
gulp.task('staticModules', _staticModules)
gulp.task('default', gulp.series(['clean', 'less', 'symlink', 'staticModules'], server))

/* File watches */
gulp.watch('src/less/**/*',  gulp.series(['less']))

/* Methods */
function _clean() {
  return gulp.src('{dist,static_modules}', {read: false})
    .pipe(clean())
}
function _less() {
  return gulp.src(['src/less/*.less', 'src/less/corporate-ui/core.less'])
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
}
function _symlink() {
  return gulp.src('src/{html,images,js,less,starter-kit}')
    .pipe(gulp.symlink('dist'))
}
function _staticModules() {
  var package = require('./package.json'),
      dependencies = Object.keys(package.dependencies),
      folders = dependencies.length === 1 ? dependencies[0] : '{' + dependencies.join(',') + '}'

  return gulp.src('node_modules/' + folders)
    .pipe(gulp.symlink('static_modules'))
}
