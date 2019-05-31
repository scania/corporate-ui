import { configure, addDecorator } from '@storybook/html';
import { withOptions } from '@storybook/addon-options';
import { theme, favicons } from 'scania-theme';

import { defineCustomElements, addTheme } from '../dist/index';
import { name } from '../package.json';
import './style/global.scss';

// Loads all components
defineCustomElements('all');
// Load individual components:
// defineCustomElements(['c-header','c-footer','c-navigation','user-repos','c-card','c-theme']);

// TODO: We would like to have a way to dynamically add themes
// to corporate-ui, something like this. But maybe from define.

addTheme({ scania: theme, favicons });

addDecorator(
  withOptions({
    name,
    showAddonPanel: false,
  }),
);

configure(() => require('./stories'), module);
