import { configure, addDecorator } from '@storybook/html';
import { withOptions } from '@storybook/addon-options';

import { defineCustomElements } from '../dist/define';
import { name } from '../package.json';
import './style/global.scss';

// Loads all components
defineCustomElements('all');
// Load individual components:
// defineCustomElements(['c-header','c-footer','c-navigation','user-repos','c-card','c-theme']);

// TODO: We would like to have a way to dynamically add themes
// to corporate-ui, something like this. But maybe from define.
// const theme = { 'scania': scaniaTheme };
// store.dispatch({ type: actions.ADD_THEME, theme });

addDecorator(
  withOptions({
    name,
    showAddonPanel: false,
  }),
);

configure(() => require('./stories'), module);
