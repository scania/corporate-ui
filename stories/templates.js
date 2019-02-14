import { storiesOf } from '@storybook/html';

import { renderStories } from './components';

import categories from '../src/templates/categories.json';
import templates from '../src/templates/data.json';


[{name: 'All'}, ...categories]
  .map(category => renderStories(category, templates, 'Templates'));
