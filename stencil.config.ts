import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'corporate-ui',
  hashFileNames: false,
  outputTargets:[
    { type: 'dist' },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  /*bundles: [
    {
      components: ['cui-theme', 'cui-header', 'cui-footer', 'cui-content', 'cui-navigation'],
    },
    {
      components: ['cui-list'],
    },
    {
      components: ['user-tags']
    }
  ],*/
  copy: [
    { src: 'themes' },
    { src: 'demo' }
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
