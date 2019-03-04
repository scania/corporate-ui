import { configure, addDecorator } from '@storybook/html';
import { withOptions } from '@storybook/addon-options';

import { name } from '../package.json';

require('../build/helpers');

// Loads all components
// this will work too:
// corporateUi.defineCustomElements(['c-header','c-footer','c-navigation','user-repos','c-card','c-theme']);
corporateUi.defineCustomElements('all');


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
