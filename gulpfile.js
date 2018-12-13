
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
    package = require('./package.json'),

    tree = dirTree('src/components', { normalizePath: true, extensions: /\.ts/ }),
    tree2 = dirTree('demo/examples', { normalizePath: true }),
    commands = {};

process.argv.slice(2).map(function(item) {
  var command = item.split('=')
  commands[command[0].slice(2)] = command[1]
})

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
gulp.task(packComponents)
gulp.task(cleanComponent)

gulp.task('components', gulp.series(['lessComponent', 'tsComponent', 'jadeComponent', 'fullComponent', 'packComponents', 'cleanComponent']))
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
        rootPath: '"../../../"'
      }
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
}
function ts() {
  return webpack({
    watch: false,
    devtool: 'inline-source-map',
    entry: {
      'corporate-ui': './src/global/ts/corporate-ui',
      'corporate-ui-light': './src/global/ts/corporate-ui-light',
      'ux-library': './src/global/ts/ux-library'
    },
    output: {
      filename: '[name].js'
    },
    mode: 'production',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
      rules: [
        { test: /\.ts$/, loader: 'ts-loader' }
      ]
    },
    externals: {
      // export components array to the view
      webpackVariables: `{
        'env': '${commands.env}',
        'version': '${package.version}',
        'dependencies': '${JSON.stringify(package.dependencies)}',
        'components': '${JSON.stringify(tree.children)}',
        'examples': '${JSON.stringify(tree2.children)}'
      }`
    }
  })
    .pipe(gulp.dest('dist/js'))
}
function lessComponent() {
  return gulp.src('src/components/**/*.less')
    .pipe(gulpLess())
    .pipe(gulp.dest('tmp/components'))
}
function tsComponent() {
  var entries = {}

  // We go throught all components manually to make it possible for webpack to 
  // generate separate script files for our webcomponents
  tree.children.map(function(component) {
    if (component.children.find(component => component.name === 'script.ts')) {
      Object.assign(entries, renderEntries(component, entries))
    }
  })

  function renderEntries(item, obj) {
    entries[item.path.replace('src/', '') + '/script'] = './' + item.path + '/script'

    item.children.find(function(file) {
      if (file.type === 'directory') {
        if (file.name === 'variations') {
          file.children.map(function(variation) {
            entries[variation.path.replace('src/', '') + '/script'] = './' + variation.path + '/script'
          })
        } else {
          Object.assign(obj, renderEntries(file, obj))
        }
      }
    })
    return obj
  }

  return webpack({
    entry: entries,
    output: {
      path: __dirname + '/tmp/',
      filename: '[name].js'
    },
    mode: 'production',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
      rules: [
        { test: /\.ts$/, loader: 'ts-loader', sideEffects: false }
      ]
    },
    externals: {
      // export components array to the view
      webpackVariables: `{
        'examples': '${JSON.stringify(tree2.children)}'
      }`
    }
  })
    .pipe(gulp.dest('tmp/'));
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
          isSubComponent = file.path.split('tmp')[1].split(path.sep).length > 4,
          prefix = 'c-',
          rootPath = '../../../../polymer';

      if (isVariation) {
        var parentPath = path.dirname(file.path).split(path.sep + 'variations')[0],
            parentindex = parentPath.lastIndexOf(path.sep) + 1,
            parentName = parentPath.substring(parentindex)

        name = parentName + '-variation-' + name
      } else {

        if (isSubComponent) {
          prefix = '';
          rootPath = '../../../../../polymer';
        }
      }

      if (commands.env == 'aws') {
        rootPath = 'https://static.scania.com/vendors/frameworks/polymer/1.4.0'
      }

      return { name: prefix + name || 'test', rootPath: rootPath };
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
function packComponents() {
  var stream1 = gulp.src('tmp/components/components.jade')
    .pipe(data(function() {
      return { components: tree.children };
    }))
    .pipe(jade({ pretty: true }))
    .pipe(rename({ basename: 'full' }))
    .pipe(gulp.dest('dist/components'))

  var stream2 = gulp.src('tmp/components/components.jade')
    .pipe(data(function() {
      return { components: [{name:'corporate-header'}, {name:'corporate-footer'}, {name:'main-navigation'}, {name:'main-content'}] };
    }))
    .pipe(jade({ pretty: true }))
    .pipe(rename({ basename: 'base' }))
    .pipe(gulp.dest('dist/components'))

  return merge(stream1, stream2)
}
function cleanComponent() {
  return del('tmp')
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
  app.use('/dist', express.static(__dirname + '/dist'))
  app.use('/', express.static(__dirname + '/node_modules'))

  app.use('/vendors/:type/:dependency/:version/*', function(req, res) {
    var url = req.params[0]

    dependency = req.params.dependency
    if (!req.params.version.match(/\d.\d.\d/g)) {
      url = url.substring(url.indexOf('/') + 1)
      dependency = req.params.version
    }
    res.sendFile(__dirname + '/node_modules/' + dependency + '/' + url)
  })

  // app.use('/resources/logotype/scania', express.static(__dirname + '/dist/images') )

  app.listen(app.get('port'), function() {
    console.log('UX-library is now running at http://%s:%d.', app.get('host'), app.get('port'))
  })
}
