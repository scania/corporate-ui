
var fs = require('fs'),
    path = require('path'),
    gulp = require('gulp'),
    del = require('del'),
    child = require('child_process'),
    gulpLess = require('gulp-less'),
    jade = require('gulp-jade'),
    typescript = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    data = require('gulp-data'),
    merge = require('merge-stream'),
    webpack = require('webpack-stream'),
    dirTree = require('directory-tree'),
    express = require('express'),
    package = require('./package.json')

/* Available tasks */
gulp.task(clean)
gulp.task(copy)
gulp.task(less)
gulp.task(ts)
gulp.task(watch)
gulp.task(test)
gulp.task(server)
gulp.task(lessComponent)
gulp.task(tsComponent)
gulp.task(jadeComponent)
gulp.task(fullComponent)
gulp.task(cleanComponent)

gulp.task('components', gulp.series(['lessComponent', 'tsComponent', 'jadeComponent', 'fullComponent', 'cleanComponent']))
gulp.task('build', gulp.series(['clean', 'copy', 'less', 'ts', 'components', 'test']))
gulp.task('default', gulp.series(['build', 'watch', 'server']))

/* Methods */
function watch(done) {
  gulp.watch('src/global/ts/*', gulp.series(['ts']))
  gulp.watch('src/global/less/**/*', gulp.series(['less']))
  gulp.watch('src/components/**/*', gulp.series(['components']))
  gulp.watch('src/global/{images,less}/*', gulp.series(['copy']))

  done()
}
function clean() {
  return del(['tmp', 'dist'])
}
function copy() {
  return gulp.src(['src/global/**'])
    .pipe(gulp.dest('dist'))
}
function less() {
  return gulp.src(['src/global/less/*.less', 'src/global/less/corporate-ui/{core,fonts,icons,brands}.less'])
    .pipe(sourcemaps.init())
    .pipe(gulpLess({
      globalVars: {
        lib_path: 'node_modules'
      }
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
}
function ts() {
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
function cleanComponent() {
  return del('tmp')
}
function lessComponent() {
  return gulp.src('src/components/**/*.less')
    .pipe(gulpLess())
    .pipe(gulp.dest('tmp/components'))
}
function tsComponent() {
  var tsProject = typescript.createProject('tsconfig.json'),
      tsResult = tsProject.src()
        .pipe(tsProject())

  return tsResult.js
    .pipe(gulp.dest('tmp'))
}
function jadeComponent() {
  return gulp.src('src/components/**/*.{jade,html,md}')
    .pipe(gulp.dest('tmp/components'))
}
function fullComponent() {
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
            parentName = parentPath.substring(parentindex)

        name = parentName + '-variation-' + name
      } else {

        if (isSubComponent) {
          // console.log(name)
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
function test(done) {
  /* We will have some tests here later on */
  done()
}
function server() {
  var app = express();

  app.set('port', process.env.PORT || 1337)
  app.set('host', process.env.COMPUTERNAME || '0.0.0.0')

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })

  app.use(express.static(__dirname + '/demo'))
  app.use('/', express.static(__dirname + '/dist'))

  app.use('/vendors/:type/:dependency/:version/*', function(req, res) {
    path = req.params[0].replace('bootstrap-org', 'bootstrap')
    dependency = req.params.dependency
    if (!req.params.version.match(/\d.\d.\d/g)) {
      path = path.substring(path.indexOf("/") + 1)
      dependency = req.params.version
    }
    res.sendFile(__dirname + '/node_modules/' + dependency + '/' + path)
  })

  app.use('/resources/logotype/scania', express.static(__dirname + '/dist/images') )

  app.listen(app.get('port'), function() {
    console.log('UX-library is now running at http://%s:%d.', app.get('host'), app.get('port'))
  })
}
