import { configure, addDecorator } from '@storybook/html';
import { withOptions } from '@storybook/addon-options';

import { name } from '../package.json';

function loadStories() {
  require('../stories/info.js');
  require('../stories/components.js');
  require('../stories/templates.js');
}

addDecorator(
  withOptions({
    name
  })
)

configure(loadStories, module);
