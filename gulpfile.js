
var fs = require('fs'),
    path = require('path'),
    gulp = require('gulp'),
    clean = require('gulp-clean'),
    less = require('gulp-less'),
    jade = require('gulp-jade'),
    typescript = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    data = require('gulp-data'),
    server = require('./server')

/* Available tasks */
gulp.task('clean', _clean)
gulp.task('symlink', _symlink)
gulp.task('less', _less)
gulp.task('lessComponent', _lessComponent)
gulp.task('tsComponent', _tsComponent)
gulp.task('jadeComponent', _jadeComponent)
gulp.task('fullComponent', _fullComponent)

gulp.task('component', gulp.series(['lessComponent', 'tsComponent', 'jadeComponent', 'fullComponent'], cleanComponent))
gulp.task('default', gulp.series(['clean', 'symlink', 'less', 'component'], server))

/* File watches */
gulp.watch('src/less/**/*', gulp.series(['less']))
gulp.watch('src/views/component/**/*', gulp.series(['component']))

/* Methods */
function _clean() {
  return gulp.src('dist', {read: false})
    .pipe(clean())
}
function _symlink() {
  return gulp.src('src/{images,js,less,starter-kit}')
    .pipe(gulp.symlink('dist'))
}
function _less() {
  return gulp.src(['src/less/*.less', 'src/less/corporate-ui/{core,fonts,icons,brands}.less'])
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
}
function cleanComponent() {
  return gulp.src('tmp', {read: false})
    .pipe(clean())
}
function _lessComponent() {
  return gulp.src('src/views/component/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('tmp/component'))
}
function _tsComponent() {
  return gulp.src('src/views/component/**/*.ts')
    .pipe(typescript())
    .pipe(gulp.dest('tmp/component'))
}
function _jadeComponent() {
  return gulp.src('src/views/component/**/*.{jade,html,md}')
    .pipe(gulp.dest('tmp/component'))
}
function _fullComponent() {
  return gulp.src('tmp/**/**/index.jade')
    .pipe(data(function(file) {
      var index = path.dirname(file.path).lastIndexOf(path.sep) + 1,
          name = path.dirname(file.path).substring(index);

      if ( !isNaN( parseFloat(name) ) ) {
        var parentPath = path.dirname(file.path).split('\\variations')[0],
            parentindex = parentPath.lastIndexOf(path.sep) + 1,
            parentName = parentPath.substring(parentindex);

        name = parentName + '-variation-' + name;
      }

      return { name: 'c-' + name || 'test' };
    }))
    .pipe(jade({ pretty: true }))
    .pipe(rename(function(path) {
      var index = path.dirname.lastIndexOf('\\') + 1;
      path.basename = path.dirname.substring(index);
      if ( !isNaN( parseFloat(path.basename) ) ) {
        path.basename = '..\\..\\variation-' + path.basename;
      }
    }))
    .pipe(gulp.dest('dist/html'))
}
