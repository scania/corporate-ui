import { series, watch, src, dest } from 'gulp';
import { exec } from 'child_process';
import { generateTheme } from './src/themes';
import { stripIndents } from 'common-tags';
import fs from 'fs';
import opn from 'opn';

const path = require('path')
const del = require('del')
const express = require('express')
const app = express()
const boxen = require('boxen')

const webpack = require('webpack-stream');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const router = express.Router();
const outputDir = path.join(__dirname, '/node_modules/@storybook/core/dist/public');
const dllPath = path.join(__dirname,'/node_modules/@storybook/core/dll');
const configDir = path.join(__dirname,'/.storybook');
const wp_bundles = path.join(__dirname,'/bundles');
const sb_templates = path.join(__dirname,'/node_modules/@storybook/core/src/server/templates');

const build = series(themes, components, copy, pack);
const start = series(clean, build, stream, server, watches);

export {
  themes,
  build,
  start as default
}

const interpolate = (string, data = {}) =>
  Object.entries(data).reduce((acc, [k, v]) => acc.replace(new RegExp(`%${k}%`, 'g'), v), string);
function getPreviewBodyHtml() {
  return fs.readFileSync(
    path.resolve(path.join(`${sb_templates}/base-preview-body.html`)),
    'utf8')
}
function getPreviewHeadHtml(configDirPath, interpolations) {
  const base = fs.readFileSync(
    path.resolve(path.join(`${sb_templates}/base-preview-head.html`)),
    'utf8'
  );
  const headHtmlPath = path.resolve(configDirPath, 'preview-head.html');
  let result = base;
  if (fs.existsSync(headHtmlPath)) {
    result += fs.readFileSync(headHtmlPath, 'utf8');
  }
  return interpolate(result, interpolations);
}
function openInBrowser(address) {
  opn(address).catch(() => {
    logger.error(stripIndents`
          Could not open ${address} inside a browser. If you're running this command inside a
          docker container or on a CI, you need to pass the '--ci' flag to prevent opening a
          browser by default.
        `);
  });
}

function themes(cb) {
  generateTheme(cb);
}

function clean() {
  return del(['.build', 'dist'])
}

function cleanBundles() {
  return del(['bundles'])
}

function components(cb) {
  exec('stencil build', { maxBuffer: 1024 * 500 }, (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb()
  })
}

function copy(cb){
  src([
    './.build/esm/es5/**',
    './.build/collection/collection-manifest.json',
  ])
    .pipe(dest('dist/components/'))
  cb()
}

function pack(cb) {
  src('./define.js')
    .pipe(dest('dist'))
  console.log('Project successfully packed.');
  cb();
}

function watches(cb) {
  watch(['themes/**/*','src/components/**/*', '!src/components/components.d.ts'], series(build, stream));
  // watch('src/**/*', build);
  // reload page here
  cb();
}

function stream(cb){
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
  }).pipe(dest(`${wp_bundles}`))
}

function server(cb) {
  const port = process.env.PORT || 1337
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
    response.sendFile(path.join(`${wp_bundles}`, `/${request.params[0]}`));
  });
  router.get(/(.+\.html)$/, (request, response) => {
    response.set('Content-Type', 'text/html');
    response.sendFile(path.join(`${wp_bundles}`, `/${request.params[0]}`));
  });
  app.use(express.static(`${outputDir}`))
  app.use('/', router)
  app.listen(port, () => {
    console.log(
      '\x1b[33m%s\x1b[0m',
      boxen(
        stripIndents`Corporate UI is now running ... \n
        Local: http://localhost:${port} \n
        Network: http://${host}:${port}
        `,
      { padding: 1 })
    )
  })
  openInBrowser(`http://localhost:${port}`)
  cb()
}