import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'

import data from './package.json'

export const config: Config = {
  namespace: data.name,
  copy: [{ src: 'helpers.js' }],
  outputTargets: [
    { type: 'dist' },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    },
    {
      type: 'docs'
    },
    {
      type: 'docs-json',
      file: 'data/docs.json'
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
      includePaths: ['node_modules'],
    }),
  ],
}
