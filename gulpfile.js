  
var fs = require('fs'),
    path = require('path'),
    gulp = require('gulp'),
    del = require('del'),
    child = require('child_process'),
    less = require('gulp-less'),
    jade = require('gulp-jade'),
    typescript = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    data = require('gulp-data'),
    merge = require('merge-stream'),
    webpack = require('webpack-stream'),
    dirTree = require('directory-tree'),
    server = require('./server'),
    package = require('./package.json')

/* Available tasks */
gulp.task('clean', _clean)
gulp.task('copy', _copy)
gulp.task('libs', _libs)
gulp.task('less', _less)
gulp.task('ts', _ts)
gulp.task('lessComponent', _lessComponent)
gulp.task('tsComponent', _tsComponent)
gulp.task('jadeComponent', _jadeComponent)
gulp.task('fullComponent', _fullComponent)

gulp.task('test', test)

gulp.task('components', gulp.series(['lessComponent', 'tsComponent', 'jadeComponent', 'fullComponent'], cleanComponent))
gulp.task('build', gulp.series(['clean', 'copy', 'less', 'ts', 'components', 'test'], exit))
gulp.task('buildStatic', gulp.series(['build', 'libs'], exit))
gulp.task('default', gulp.series(['build'], server))

/* File watches */
gulp.watch('src/global/ts/*', gulp.series(['ts']))
gulp.watch('src/global/less/**/*', gulp.series(['less']))
gulp.watch('src/components/**/*', gulp.series(['components']))
gulp.watch('src/global/{images,less}/*', gulp.series(['copy']))

/* Methods */
function _clean() {
  return del(['tmp', 'dist'])
}
function _copy() {
  return gulp.src(['src/global/**'])
    .pipe(gulp.dest('dist'))
}
function _libs() {
  var libs = Object.keys(package.dependencies)

  return gulp.src(['node_modules/{' + libs.join() + '}/**/*'])
    .pipe(gulp.dest('dist/libs'))
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
function _ts() {
  var tree = dirTree('src/components'),
      tree2 = dirTree('demo/examples', { normalizePath: true }),
      _components = [];

  tree.children.map(function(component) {
    var variations = (component.children || []).find(function(sub) { return sub.name === 'variations' })
    if (component.extension) {
      return;
    }

    if (variations) {
      variations = variations.children;
    } else {
      // Temporary until all components have been rewritten to new structure
      variations = component.children.filter(function(file) { return file.name.indexOf('variation-') > -1 })
    }

    _components.push({
      name: component.name,
      variations: variations.length,
    })
  });

  // We pipe webpack instead of typescript to bundle our modules
  var stream1 = webpack({
    watch: false,
    devtool: 'inline-source-map',
    entry: {
      'corporate-ui': './src/global/ts/corporate-ui',
      'corporate-ui-light': './src/global/ts/corporate-ui-light'
    },
    output: {
      filename: '[name].js'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
      loaders: [
        { test: /\.ts$/, loader: 'ts-loader' }
      ]
    },
    externals: {
      // export components array to the view
      'webpackVariables': `{
        'components': '${JSON.stringify(_components)}',
        'version': '${package.version}'
      }`
    }
  })
    .pipe(gulp.dest('dist/js'))

  // We pipe webpack instead of typescript to bundle our modules
  var stream2 = webpack({
    watch: false,
    entry: {
      'ux-library': './src/global/ts/ux-library'
    },
    output: {
      filename: '[name].js'
    },
    resolve: {
      extensions: ['.ts']
    },
    module: {
      loaders: [
        { test: /\.ts$/, loader: 'ts-loader' }
      ]
    },
    externals: {
      // export components array to the view
      'webpackVariables': `{
        'examples': '${JSON.stringify(tree2.children)}'
      }`
    }
  })
    .pipe(gulp.dest('dist/js'))

  return merge(stream1, stream2)
}
function _lessComponent() {
  return gulp.src('src/components/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('tmp/components'))
}
function _tsComponent() {
  var tsProject = typescript.createProject('tsconfig.json'),
      tsResult = tsProject.src()
        .pipe(tsProject())

  return tsResult.js
    .pipe(gulp.dest('tmp'))
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
          isSubComponent = file.path.split('tmp')[1].split(path.sep).length > 4,
          prefix = 'c-',
          rootpath = '../../'

      if (isVariation) {
        var parentPath = path.dirname(file.path).split(path.sep + 'variations')[0],
            parentindex = parentPath.lastIndexOf(path.sep) + 1,
            parentName = parentPath.substring(parentindex)

        name = parentName + '-variation-' + name
      } else {

        if (isSubComponent) {
          // console.log(name)
          prefix = ''
          rootpath += '../'
        }
      }

      return { name: prefix + name || 'test', rootpath: rootpath };
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
function cleanComponent() {
  return del('tmp')
}
function test(done) {
  /* We will have some tests here later on */
  done()
}
function exit(done) {
  done()
  // Running exit to end the gulp process if current task is build
  if (process.argv.indexOf('build') > -1) {
    process.exit(0)
  }
}
