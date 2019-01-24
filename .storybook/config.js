import { configure } from '@storybook/html';

function loadStories() {
  require('../stories/index.js');
}

configure(loadStories, module);
