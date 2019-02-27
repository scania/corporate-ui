import { configure, addDecorator } from '@storybook/html';
import { withOptions } from '@storybook/addon-options';

import { name } from '../package.json';

import { defineCustomElement } from '../dist/esm/es5/corporate-ui.core';
import * as CUI from '../dist/esm/es5/corporate-ui.components';

// Loads all components
defineCustomElement(window, CUI.COMPONENTS);

addDecorator(
  withOptions({
    name
  })
);

configure(loadStories, module);

function loadStories() {
  require('./kinds/info.js');
  require('./kinds/components.js');
  require('./kinds/templates.js');
}
