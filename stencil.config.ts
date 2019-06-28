/* eslint-disable no-unused-vars */
import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
/* eslint-enable no-unused-vars */

const sassOpts: object = {
  includePaths: ['node_modules'],
};

export const config: Config = {
  namespace: 'corporate-ui',
  globalScript: 'src/global.ts',
  enableCache: false,
  hashFileNames: false,
  outputTargets: [
    {
      type: 'dist',
      dir: '.build',
    },
    {
      type: 'www',
      dir: '.www',
      serviceWorker: null, // disable service workers
    },
    {
      type: 'docs-json',
      file: '.data/docs.json',
    },
    {
      type: 'stats',
      file: '.data/stats.json',
    },
  ],
  testing: {
    testPathIgnorePatterns: ['/node_modules/'],
  },
  plugins: [
    sass(sassOpts),
  ],
};
