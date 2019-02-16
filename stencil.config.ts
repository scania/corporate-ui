import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import './build';

import data from './package.json';

export const config: Config = {
  namespace: data.name,
  outputTargets: [
    { type: 'dist' },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    },
    {
      type: 'stats',
      file: 'data/stats.json'
    }
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
