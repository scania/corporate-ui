import { configure, addDecorator } from '@storybook/html';
import { withOptions } from '@storybook/addon-options';

import { renderWebComponent } from './helpers';
import { name } from '../package.json';

import * as CUI from '../dist/esm/es5/corporate-ui.components';

const CUI_COMPONENTS = CUI.COMPONENTS;

Object.keys(CUI_COMPONENTS)
  .map(item => renderWebComponent(CUI_COMPONENTS[item]));

addDecorator(
  withOptions({
    name
  })
)

configure(loadStories, module);

function loadStories() {
  require('./kinds/info.js');
  require('./kinds/components.js');
  require('./kinds/templates.js');
}
