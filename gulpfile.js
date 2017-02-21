
var gulp = require('gulp'),
    clean = require('gulp-clean'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    symlink = require('gulp-symlink')

/* Available tasks */
gulp.task('default', ['clean'], _default)
gulp.task('start', ['less', 'symlink', 'staticModules'], _start)
gulp.task('clean', _clean)
gulp.task('less', _less)
gulp.task('symlink', _symlink)
gulp.task('staticModules', _staticModules)

gulp.watch('src/less/**/*', ['less'])


/* Private methods */
function _default() {
  gulp.start('start')
}
function _start() {
  require('./server')
}
function _clean() {
  // We use return here to make gulp aware that _clean has actually finnished
  return gulp.src(['dist','static_modules'], {read: false})
    .pipe(clean())
}
function _less() {
  gulp.src(['src/less/corporate-ui.less', 'src/less/ie-media-rules.less', 'src/less/ux-library.less'])
    .pipe(less())
    .pipe(gulp.dest('dist/css'))

  gulp.src('src/less/corporate-ui/corporate-ui-bootstrap.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css/corporate-ui'))
}
function _symlink() {
  return gulp.src('src/{html,images,js,less,starter-kit}')
    .pipe(symlink(function(folder) {
      return folder.path.replace('\\src', '\\dist')
    }))
}
function _staticModules() {
  var package = require('./package.json'),
      dependencies = Object.keys(package.dependencies),
      folders = dependencies.length === 1 ? dependencies[0] : '{' + dependencies.join(',') + '}'

  return gulp.src('node_modules/' + folders)
    .pipe(symlink(function(folder) {
      return folder.path.replace('\\node_modules', '\\static_modules')
    }))
}
