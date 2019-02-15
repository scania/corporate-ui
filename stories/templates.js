import { storiesOf } from '@storybook/html';

import { renderKinds } from './components';

import categories from '../data/categories.json';
import templates from '../data/templates.json';


[{name: 'All'}, ...categories]
  .map(category => renderKinds(category, templates, 'Templates', content));


function content(name) {
  var template = require("../src/templates/" + name + ".html");
  return `<cui-container type="fluid">${template}</cui-container>`;
}
