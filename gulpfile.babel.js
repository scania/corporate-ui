import {
  series, watch, src, dest,
} from 'gulp';
import { exec } from 'child_process';
import { stripIndents } from 'common-tags';
import { join } from 'path';
import { create } from 'browser-sync';

import del from 'del';
import express from 'express';
import cors from 'cors';
import boxen from 'boxen';
import webpack from 'webpack-stream';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import packageFile from './package.json';
import { getManagerHeadHtml, getPreviewBodyHtml, getPreviewHeadHtml } from './utils/storybook_template';

const browserSync = create();

// TODO: Would be nice to be able to have cleanAll in build but
// then we need to solve cleaning of outputDir when running watches
const build = series(components, copy, pack);
const release = series(cleanAll, build, staticServer);
const start = series(cleanAll, build, managerStream, webpackStream, server, watches, sbWatch);

const serverPath = join(__dirname, '/node_modules/@storybook/core');
const configDir = join(__dirname, '/public'); // storybook config folder;
const outputDir = join(__dirname, '/.storybook'); // folder to serve main storybook server & bundles
const stencilBuild = join(__dirname, '/.build'); // stencil default compiled files
const stencilServer = join(__dirname, '.www');
const dist = join(__dirname, '/dist'); // distribution folder

export {
  build,
  release,
  cleanAll as clean,
  start as default,
};

function reload(done) {
  browserSync.reload();
  done(
    console.log(
      '\x1b[32m%s\x1b[0m',
      boxen(
        stripIndents`Page updated`,
        { padding: 1 },
      ),
    ),
  );
}

// clean all compiled folder
function cleanAll() {
  return del([outputDir, stencilBuild, dist, stencilServer]);
}

function components(cb) {
  exec('stencil build', { maxBuffer: 1024 * 500 }, (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb();
  });
}

function copy() {
  return src(
    [
      `${stencilBuild}/corporate-ui.js`,
      `${stencilBuild}/corporate-ui/*`,
      `${stencilBuild}/esm/es5/**`,
      `${stencilBuild}/collection/collection-manifest.json`,
    ],
    { base: stencilBuild },
  )
    .pipe(dest(dist));
}

function staticServer(cb) {
  exec('build-storybook -c public -o dist/www', { maxBuffer: 1024 * 500 }, (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb();
  });
}

function pack(cb) {
  src('./utils/index.js')
    .pipe(dest(dist));

  console.log('Project successfully packed.');
  cb();
}

// watch stencil
function watches(cb) {
  watch(
    [
      'src/components/**/*',
      '!src/components/components.d.ts',
    ],
    series(build, webpackStream, reload),
  );
  cb();
}

// watch changes in any storybook config (public folder)
// need to run webpackStream as well, if we change content in iframe from the config file
function sbWatch(cb) {
  watch(
    [configDir],
    series(managerStream, webpackStream, reload),
  );
  cb();
}

// webpack task for storybook manager (includes side Pane and whole application settings)
function managerStream() {
  del([`${outputDir}/manager`]);

  return webpack({
    watch: false,
    devtool: 'none',
    entry: [
      `${serverPath}/dist/server/common/polyfills.js`,
      `${configDir}/addons.js`,
      `${serverPath}/dist/client/manager/index.js`,
    ],
    output: {
      path: `${outputDir}/manager`,
      filename: '[name].[chunkhash].bundle.js',
      publicPath: '',
    },
    resolve: {
      extensions: ['.mjs', '.js', '.jsx', '.json'],
      alias: {
        'core-js': 'core-js',
        react: 'react',
        'react-dom': 'react-dom',
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        title: packageFile.name,
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
        template: require.resolve(`${serverPath}/src/server/templates/index.ejs`),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(mjs|jsx|js?)$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/react'],
              },
            },
          ],
        },
      ],
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      runtimeChunk: true,
    },
  })
    .pipe(dest(`${outputDir}/manager`));
}

// webpack task for everything inside storybook iframe
function webpackStream() {
  del([`${outputDir}/**/*`, `!${outputDir}/manager/**`]);

  return webpack({
    watch: false,
    entry: [
      `${serverPath}/dist/server/common/polyfills.js`,
      `${serverPath}/dist/server/preview/globals.js`,
      `${configDir}/config.js`,
    ],
    output: {
      path: `${serverPath}/dist/public`,
      filename: '[name].[hash].bundle.js',
      publicPath: '',
    },
    mode: 'development',
    resolve: {
      extensions: ['.mjs', '.js', '.jsx', '.json'],
      alias: {
        'core-js': 'core-js',
        react: 'react',
        'react-dom': 'react-dom',
      },
    },
    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          loaders: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.md$/,
          use: [
            {
              loader: 'html-loader',
            },
            {
              loader: 'markdown-loader',
            },
          ],
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
            },
          ],
        },
        {
          test: /\.(mjs|jsx|js?)$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/react'],
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'iframe.html',
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
        template: require.resolve(`${serverPath}/src/server/templates/index.ejs`),
      }),
    ],
  })
    .pipe(dest(outputDir));
}

// setup server express and browsersync
function server(done) {
  const app = express();
  const router = express.Router();
  const expressPort = 3000;
  const bsPort = process.env.PORT || 1337;
  const host = process.env.COMPUTERNAME || '0.0.0.0';

  app.use(cors());
  router.get('/', (request, response) => {
    response.set('Content-Type', 'text/html');
    response.sendFile(`${outputDir}/index.html`);
  });
  router.get(/\/sb_dll\/(.+\.js)$/, (request, response) => {
    response.set('Content-Type', 'text/javascript');
    response.sendFile(`${serverPath}/dll/${request.params[0]}`);
  });
  router.get(/\/sb_dll\/(.+\.LICENCE)$/, (request, response) => {
    response.set('Content-Type', 'text/html');
    response.sendFile(`${serverPath}/dll/${request.params[0]}`);
  });
  router.get(/(.+\.js)$/, (request, response) => {
    response.set('Content-Type', 'text/javascript');
    response.sendFile(`${outputDir}/${request.params[0]}`);
  });
  router.get(/(.+\.html)$/, (request, response) => {
    response.set('Content-Type', 'text/html');
    response.sendFile(`${outputDir}/${request.params[0]}`);
  });
  app.use(express.static(`${outputDir}/manager`));
  app.use(express.static('./node_modules/scania-theme/dist'));
  app.use(express.static('./dist'));
  app.use('/', router);
  app.listen(expressPort);

  browserSync.init({
    port: bsPort,
    proxy: `localhost:${expressPort}`,
    logLevel: 'silent',
  });

  done(
    console.log(
      '\x1b[32m%s\x1b[0m',
      boxen(
        stripIndents`Corporate UI is now running ... \n
        Local: http://localhost:${bsPort} \n
        Network: http://${host}:${bsPort}
        `,
        { padding: 1 },
      ),
    ),
  );
}
