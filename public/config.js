import { configure, addDecorator } from '@storybook/html';
import { withOptions } from '@storybook/addon-options';
import { theme as scania } from 'scania-theme';

import { defineCustomElements, addTheme } from '../dist/index';
import { name } from '../package.json';
import './style/global.scss';

// Loads all components
defineCustomElements('all');
// Load individual components:
// defineCustomElements(['c-header','c-footer','c-navigation','user-repos','c-card','c-theme']);

addTheme(scania);

addDecorator(
  withOptions({
    name,
    showAddonPanel: false,
  }),
);

configure(() => require('./stories'), module);
