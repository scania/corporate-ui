import fs from 'fs';
import { series, watch } from 'gulp';
import { exec } from 'child_process';
import { generateTheme } from './src/themes';
// const pack = require('./gulp/pack');

const build = series(themes, components, pack);
const start = series(build, watches, server);


export {
  themes,
  build,
  start as default
}


function themes(cb) {
  generateTheme(cb);
}

function components(cb) {
  /*exec('stencil build')
    .stdout.on('data', (data) => console.log(data) )
    // .stderr.on('data', (data) => console.log(data) )
    .on('error', (code) => console.log('error: ', code) )
    // .on('exit', (code) => console.log('exit: ', code) )
    .on('close', (code) => { console.log('close: ', code); cb() } )*/

  exec('stencil build', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb()
  })
}

function pack(cb) {
  console.log('Project successfully packed.');
  cb();
}

function watches(cb) {
  // watch('themes/**/*', themes);
  watch(['themes/**/*', 'src/components/**/*', '!src/components/components.d.ts'], build);
  // watch('src/**/*', build);
  cb();
}

function server(cb) {
  exec('start-storybook -p 1337 -c .storybook', { maxBuffer: 1024 * 500 })
    .stdout.on('data', (data) => console.log(data) )
    // .stderr.on('data', (data) => console.log(data) )
    .on('error', (code) => console.log('error: ', code) )
    // .on('exit', (code) => console.log('exit: ', code) )
    // .on('close', (code) => console.log('close: ', code) )

  /*exec('start-storybook -p 1337 -c .storybook', { maxBuffer: 1024 * 500 }, (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  })*/
}
