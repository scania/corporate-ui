import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import builtins from 'rollup-plugin-node-builtins';
import './build';

export const config: Config = {
  namespace: 'corporate-ui',
  outputTargets:[
    { type: 'dist' }
  ],
  testing: {
    testPathIgnorePatterns: ['/node_modules/', '/projects/']
  },
  plugins: [
    builtins({fs: true}),
    sass({
      includePaths: ['node_modules']
    })
  ]
};
