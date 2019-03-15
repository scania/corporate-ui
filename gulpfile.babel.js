import { series, watch, src, dest, task } from 'gulp';
import { exec } from 'child_process';
import { generateTheme } from './src/themes';

// const pack = require('./gulp/pack');
const del = require('del')

const build = series(themes, components, copy, pack);
const start = series(clean, build, watches, server);

export {
  themes,
  build,
  start as default
}

function themes(cb) {
  generateTheme(cb);
}

function clean() {
  return del(['tmp', 'dist'])
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
    './tmp/esm/es5/**',
    './tmp/collection/collection-manifest.json',
  ])
    .pipe(dest('dist/components'))
  cb()
}

function pack(cb) {
  src('./define.js')
    .pipe(dest('dist'))
  console.log('Project successfully packed.');
  cb();
}

function watches(cb) {
  watch(['themes/**/*','src/components/**/*', '!src/components/components.d.ts'], build);
  // watch('src/**/*', build);
  // reload page here
  cb();
}

function server(cb) {
  exec('start-storybook -p 1337 -c .storybook', { maxBuffer: 1024 * 500 })
    .stdout.on('data', (data) => console.log(data) )
    // .stderr.on('data', (data) => console.log(data) )
    .on('error', (code) => console.log('error: ', code) )
    // .on('exit', (code) => console.log('exit: ', code) )
    // .on('close', (code) => console.log('close: ', code) )
    cb();
    
  /*exec('start-storybook -p 1337 -c .storybook', { maxBuffer: 1024 * 500 }, (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  })*/
}