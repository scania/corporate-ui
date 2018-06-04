  
var fs = require('fs'),
    path = require('path'),
    gulp = require('gulp'),
    del = require('del'),
    less = require('gulp-less'),
    jade = require('gulp-jade'),
    typescript = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    data = require('gulp-data'),
    merge = require('merge-stream'),
    publish = require('npm-publish-release'),
    server = require('./server')

/* Available tasks */
gulp.task('clean', _clean)
// gulp.task('symlink', _symlink)
gulp.task('copy', _copy)
gulp.task('less', _less)
gulp.task('lessComponent', _lessComponent)
gulp.task('tsComponent', _tsComponent)
gulp.task('jadeComponent', _jadeComponent)
gulp.task('fullComponent', _fullComponent)

gulp.task('components', gulp.series(['lessComponent', 'tsComponent', 'jadeComponent', 'fullComponent'], cleanComponent))
gulp.task('build', gulp.series(['clean', 'copy', 'less', 'components'], server))
gulp.task('release', release)
gulp.task('default', gulp.series(['build'], server))

/* File watches */
gulp.watch('src/global/less/**/*', gulp.series(['less']))
gulp.watch('src/components/**/*', gulp.series(['components']))
gulp.watch('src/global/**/*', gulp.series(['copy']))

/* Methods */
function _clean() {
  return del(['tmp', 'dist'])
}
/*function _symlink() {
  return gulp.src('src/global/{images,js,less}')
    .pipe(gulp.symlink('dist'))
}*/
function _copy() {
  return gulp.src('src/global/**')
    .pipe(gulp.dest('dist'))
}
function _less() {
  return gulp.src(['src/global/less/*.less', 'src/global/less/corporate-ui/{core,fonts,icons,brands}.less'])
    .pipe(sourcemaps.init())
    .pipe(less({
      globalVars: {
        lib_path: 'node_modules'
      }
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
}
function cleanComponent() {
  return del('tmp')
}
function _lessComponent() {
  return gulp.src('src/components/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('tmp/components'))
}
function _tsComponent() {
  return gulp.src('src/components/**/*.ts')
    .pipe(typescript())
    .pipe(gulp.dest('tmp/components'))
}
function _jadeComponent() {
  return gulp.src('src/components/**/*.{jade,html,md}')
    .pipe(gulp.dest('tmp/components'))
}
function _fullComponent() {
  return gulp.src('tmp/**/**/index.jade')
    .pipe(data(function(file) {
      var index = path.dirname(file.path).lastIndexOf(path.sep) + 1,
          name = path.dirname(file.path).substring(index),
          isVariation = !isNaN( parseFloat(name) ),
          isSubComponent = file.path.split('tmp')[1].split(path.sep).length > 4;
          prefix = 'c-';

      if (isVariation) {
        var parentPath = path.dirname(file.path).split(path.sep + 'variations')[0],
            parentindex = parentPath.lastIndexOf(path.sep) + 1,
            parentName = parentPath.substring(parentindex);

        name = parentName + '-variation-' + name;
      } else {

        if (isSubComponent) {
          console.log(name)
          prefix = ''
        }
      }

      return { name: prefix + name || 'test' };
    }))
    .pipe(jade({ pretty: true }))
    .pipe(rename(function(_path) {
      var index = _path.dirname.lastIndexOf(path.sep) + 1;
      _path.basename = _path.dirname.substring(index);
      if ( !isNaN( parseFloat(_path.basename) ) ) {
        _path.basename = '..' + path.sep + '..' + path.sep + 'variation-' + _path.basename;
      }
    }))
    .pipe(gulp.dest('dist'))
}
function release() {
  // npm run release -- --env=prod
  console.log(process.argv)
  return
  /*publish()
    .then(function() {
      console.log('success!');
    })
    .catch(function(err) {
      console.error('Something went wrong:', err);
    })
    .done();*/
}
