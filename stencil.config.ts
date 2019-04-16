import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'corporate-ui',
  hashFileNames: false,
  outputTargets: [
    {
      type: 'dist',
      dir: '.build'
    },
    {
      type: 'www',
      dir: '.www',
      serviceWorker: null // disable service workers
    },
    {
      type: 'docs-json',
      file: '.data/docs.json'
    },
    {
      type: 'stats',
      file: '.data/stats.json'
    }
  ],
  testing: {
    testPathIgnorePatterns: ['/node_modules/']
  },
  plugins: [
    sass({
      includePaths: ['node_modules']
    })
  ]
}
