/* eslint-disable no-unused-vars */
import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
/* eslint-enable no-unused-vars */

export const config: Config = {
  namespace: 'corporate-ui',
  globalScript: 'src/global.ts',
  enableCache: false,
  hashFileNames: false,
  devMode: true,  
  outputTargets: [
    {
      type: 'dist',
      copy: [
        { src: '../.build/index.js', dest: 'index.js' }
      ]
    },
    {
      type: 'www',
      dir: '.www',
      serviceWorker: null, // disable service workers
    },
  ],
  testing: {
    testPathIgnorePatterns: ['/node_modules/', 'global.spec'],
  },
  plugins: [
    sass({
      includePaths: ['node_modules'],
    }),
  ],
};
