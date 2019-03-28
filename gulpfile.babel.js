import { series, watch, src, dest } from 'gulp';
import { exec } from 'child_process';
import { generateTheme } from './utils/themes';
import { getManagerHeadHtml, getPreviewBodyHtml, getPreviewHeadHtml } from './utils/storybook_template'
import { stripIndents } from 'common-tags';

const path = require('path')
const del = require('del')
const express = require('express')
const boxen = require('boxen')
const webpack = require('webpack-stream');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const browserSync = require('browser-sync').create()

const app = express()

const router = express.Router();
const dllPath = path.join(__dirname,'/node_modules/@storybook/core/dll');
const sb_templates = path.join(__dirname,'/node_modules/@storybook/core/src/server/templates');
const configDir = path.join(__dirname,'/public'); //storybook config folder
const wp_bundles = path.join(__dirname,'/.storybook'); // auto-generated webpack bundles
const outputDir = path.join(__dirname, '/www'); // folder to serve main storybook server
const stencilBuild = path.join(__dirname, '/.build'); // stencil default compiled files
const dist = path.join(__dirname, '/dist'); // distribution folder

const build = series(themes, components, copy, pack);
const start = series(clean, build, managerStream, webpackStream, server, watches, sbWatch);

export {
  themes,
  build,
  start as default
}

function themes(cb) {
  generateTheme(cb);
}

function reload(done){
  browserSync.reload()
  done(
    console.log(
      '\x1b[32m%s\x1b[0m',
      boxen(
        stripIndents`Page updated`,
      { padding: 1 })
    )
  )
}

function clean() {
  return del([outputDir, stencilBuild, dist])
}

function cleanBundles() {
  return del([wp_bundles])
}

function components(cb) {
  exec('stencil build', { maxBuffer: 1024 * 500 }, (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb()
  })
}

function copy(){
  return src([
    path.join(`${stencilBuild}/esm/es5/**`),
    path.join(`${stencilBuild}/collection/collection-manifest.json`),
  ])
    .pipe(dest(path.join(`${dist}/components/`)))
}

function pack(cb) {
  src('./utils/define.js')
    .pipe(dest(dist))
  console.log('Project successfully packed.');
  cb();
}

function watches(cb) {
  watch([
    'src/themes/**/*',
    'src/components/**/*', 
    '!src/components/components.d.ts'], 
    series(build, webpackStream, reload));
  cb()
}

function sbWatch(cb){
  watch([configDir], 
    series(managerStream, webpackStream, reload));
  cb()
}

function managerStream(){
  return webpack({
    watch: false,
    devtool: 'none',
    entry: 
    [
      path.join(__dirname,'node_modules/@storybook/core/dist/server/common/polyfills.js'),
      path.join(`${configDir}/addons.js`),
      path.join(__dirname,'node_modules/@storybook/core/dist/client/manager/index.js')
    ],
    output: {
      path: outputDir,
      filename: '[name].[chunkhash].bundle.js',
      publicPath: '',
    },
    resolve: {
      extensions: [ '.mjs', '.js', '.jsx', '.json' ],
      alias:
      { 'core-js': path.join(__dirname, 'node_modules/core-js'),
        react: path.join(__dirname, 'node_modules/react'),
        'react-dom': path.join(__dirname, 'node_modules/react-dom') } 
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: `index.html`,
        title: 'Corporate UI',
        chunksSortMode: 'none',
        alwaysWriteToDisk: true,
        inject: false,
        templateParameters: (compilation, files, options) => ({
          compilation,
          files,
          options,
          dlls: ['/sb_dll/storybook_ui_dll.js'],
          headHtmlSnippet: getManagerHeadHtml(configDir, process.env),
        }),
        template: require.resolve(path.join(`${sb_templates}/index.ejs`))
      })
    ],
    module : {
      rules: [
        {
          test: /\.(mjs|jsx|js?)$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/react']
              }
            },
          ]
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      runtimeChunk: true,
    }
  })
  .pipe(dest(outputDir))
}

function webpackStream(){
  cleanBundles()
  return webpack({
    watch: false,
    entry: 
    [ path.join(__dirname,'node_modules/@storybook/core/dist/server/common/polyfills.js'),
      path.join(__dirname,'node_modules/@storybook/core/dist/server/preview/globals.js'),
      path.join(`${configDir}/config.js`)
    ],
    output: {
      path: path.join(__dirname,'node_modules/@storybook/core/dist/public'),
      filename: '[name].[hash].bundle.js',
      publicPath: '' 
    },
    mode: 'development',
    resolve: {
      extensions: [ '.mjs', '.js', '.jsx', '.json' ],
      alias:
      { 'core-js': path.join(__dirname, 'node_modules/core-js'),
        react: path.join(__dirname, 'node_modules/react'),
        'react-dom': path.join(__dirname, 'node_modules/react-dom') } 
    },
    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          loaders: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.md$/,
          use: [
            {
              loader: "html-loader"
            },
            {
              loader: "markdown-loader"
            }
          ]
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
            }
          ]
        }
      ]
    },
  plugins: [
    new HtmlWebpackPlugin({
      filename: `iframe.html`,
      chunksSortMode: 'none',
      inject: false,
      templateParameters: (compilation, files, options) => ({
        compilation,
        files,
        options,
        headHtmlSnippet: getPreviewHeadHtml(`${configDir}`, process.env),
        dlls: [],
        bodyHtmlSnippet: getPreviewBodyHtml(),
      }),
      template: require.resolve(path.join(`${sb_templates}/index.ejs`)),
    })
  ]
  }).pipe(dest(wp_bundles))
}


function server(done) {
  const expressPort = 3000
  const bsPort = process.env.PORT || 1337
  const host = process.env.COMPUTERNAME || '0.0.0.0'

  router.get('/', (request, response) => {
    response.set('Content-Type', 'text/html');
    response.sendFile(path.join(`${outputDir}/index.html`));
  });
  router.get(/\/sb_dll\/(.+\.js)$/, (request, response) => {
    response.set('Content-Type', 'text/javascript');
    response.sendFile(path.join(`${dllPath}/${request.params[0]}`));
  });
  router.get(/\/sb_dll\/(.+\.LICENCE)$/, (request, response) => {
    response.set('Content-Type', 'text/html');
    response.sendFile(path.join(`${dllPath}/${request.params[0]}`));
  });
  router.get(/(.+\.js)$/, (request, response) => {
    response.set('Content-Type', 'text/javascript');
    response.sendFile(path.join(`${wp_bundles}/${request.params[0]}`));
  });
  router.get(/(.+\.html)$/, (request, response) => {
    response.set('Content-Type', 'text/html');
    response.sendFile(path.join(`${wp_bundles}/${request.params[0]}`));
  });
  app.use(express.static(outputDir))
  app.use('/', router)
  app.listen(expressPort)

  browserSync.init({
    port:bsPort,
    proxy: `localhost:${expressPort}`,
    logLevel: 'silent'
  })
  done(
    console.log(
      '\x1b[33m%s\x1b[0m',
      boxen(
        stripIndents`Corporate UI is now running ... \n
        Local: http://localhost:${bsPort} \n
        Network: http://${host}:${bsPort}
        `,
      { padding: 1 })
    )
  )
}