
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
    merge = require('merge-stream'),
    chalk = require('chalk'),
    server = require('./server'),
    inject = require('gulp-inject'),
    replace = require('gulp-replace'),
    postcss = require('postcss'),
    postcssimport = require('postcss-import');

/* Available tasks */
gulp.task('clean', _clean)
gulp.task('symlink', _symlink)
gulp.task('copy', _copy) // Needed for npm packaging which cannot handle symlinks
gulp.task('less', _less)
gulp.task('lessComponent', _lessComponent)
gulp.task('tsComponent', _tsComponent)
gulp.task('jadeComponent', _jadeComponent)
gulp.task('fullComponent', _fullComponent)
gulp.task('fullCorporateUIHtml', _fullCorporateUIHtml)
gulp.task('test', _test)
gulp.task('cssModule', _cssModule)

gulp.task('component', gulp.series(['lessComponent', 'tsComponent', 'jadeComponent', 'fullComponent'], cleanComponent))
gulp.task('build', gulp.series('clean', ['copy', 'less', 'component', 'cssModule'], 'fullCorporateUIHtml', function(done) {
    done();
}))
gulp.task('prepublish', gulp.series('test', 'build',  function(done) {
    done();
    // need this, otherwise the task does not return...!?
    process.exit(0);
}))
gulp.task('default', gulp.series('build', server))

/* File watches */
gulp.watch('src/less/**/*', gulp.series(['less']))
gulp.watch('src/views/component/**/*', gulp.series(['component']))

/* Methods */
function _clean() {
 return gulp.src('{dist,tmp}', {read: false})
    .pipe(clean());
}
function _symlink() {
  var stream1 = gulp.src('src/{images,js,less,starter-kit}')
    .pipe(gulp.symlink('dist'));
  var stream2 = gulp.src('src/views/template')
    .pipe(gulp.symlink('dist/html'))
  return merge(stream1, stream2)
}
function _copy() {
    var stream1 = gulp.src('src/{images,js,less}/**')
        .pipe(gulp.dest('dist'));
    var stream2 = gulp.src('demo/**')
        .pipe(gulp.dest('dist/demo'));
    var stream2 = gulp.src('src/js/corporate-ui.js')
        .pipe(gulp.dest('dist/demo/js'));
    var stream3 = gulp.src('src/views/corporate-ui-base.html')
        .pipe(gulp.dest('dist/html'))
    var stream4 = gulp.src('src/views/corporate-ui-full.html')
        .pipe(gulp.dest('dist/html'));
    var stream5 = gulp.src('demo/template')
        .pipe(gulp.symlink('dist/html'))
    return merge(stream1, stream2, stream3, stream4, stream5)
}
function _less() {
  return gulp.src(['src/less/*.less', 'src/less/corporate-ui/{core,fonts,icons,brands}.less', 'demo/less/*.less'])
    .pipe(sourcemaps.init())
    .pipe(less({
      globalVars: {
        lib_path: 'node_modules'
      }
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(gulp.dest('dist/demo/css'))
}
function cleanComponent() {
  return gulp.src('tmp', {read: false})
    .pipe(clean())
}
function _lessComponent() {
  return gulp.src('src/views/component/**/*.less')
    .pipe(less())
      .on('error', function (error) {
          console.log(error);
      })
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
          name = path.dirname(file.path).substring(index),
          isVariation = !isNaN( parseFloat(name) ),
          isSubComponent = file.path.split('tmp')[1].split(path.sep).length > 5;
          prefix = 'c-';

      if (isVariation) {
        var parentPath = path.dirname(file.path).split(path.sep + 'variations')[0],
            parentindex = parentPath.lastIndexOf(path.sep) + 1,
            parentName = parentPath.substring(parentindex);

        name = parentName + '-variation-' + name;
      } else {

        if (isSubComponent) {
          console.log(name)
          prefix = '';
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
    .pipe(gulp.dest('dist/html'))
    //.pipe(gulp.dest('dist/demo/html'))
}

function _fullCorporateUIHtml() {
    return gulp.src('./dist/html/corporate-ui-full.html')
        .pipe(inject(gulp.src('./dist/html/component/**/*.html', {read: false}), {relative: true}))
        .pipe(gulp.dest('./dist/html'))
}

function _test(done) {
  console.log(chalk.red("Here we should do some testing????"));
  done();
}

function _cssModule(done) {
  var options = {
    from: 'dist/css/corporate-ui.css',
    to: 'tmp/css/corporate-ui.css',
    map: { inline: true }
  };
  
  postcss([postcssimport])
  .process(fs.readFileSync('dist/css/corporate-ui.css', 'utf-8'), options)
  .then(function(result) {
    gulp.src('src/css-modules/corporate-ui.js')
      .pipe(replace(/{%corporate-ui.css%}/ , result))
      .pipe(gulp.dest('dist/css-modules'))
      .on('end', done);
  }, function(error) {
    console.log(error);
    done();
  });
}