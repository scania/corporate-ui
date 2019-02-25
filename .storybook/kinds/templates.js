import { storiesOf } from '@storybook/html';

import { renderKinds } from '../helpers';

import categories from '../../data/categories.json';
import templates from '../../data/templates.json';

[{ name: 'All' }, ...categories].map(category =>
  renderKinds(category, templates, 'Templates', content)
);

function content(item) {
  var template = require('../../src/templates/' + item.name + '.html');
  return `<c-container type="fluid">${template}</c-container>`;
}
