import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'corporate-ui',
  outputTargets:[
    { type: 'dist' }
  ],
  testing: {
    testPathIgnorePatterns: ['/node_modules/', '/projects/']
  },
  plugins: [
    sass({
      includePaths: ['node_modules']
    })
  ]
};
