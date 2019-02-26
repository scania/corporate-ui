// import addonAPI from '@storybook/addons';
import marked from 'marked';

import { renderKinds } from '../helpers';

import categories from '../../data/categories.json';
import components from '../../data/components.json';
import contents from '../../data/contents.json';

import '../style/components.scss';

// Here we filer out components that might cause rendering issues or are unnessesary at this time around
let filteredComponents = components.filter(item => ['c-column', 'c-container', 'c-content', 'c-row', 'c-field', 'c-list', 'user-repos'].indexOf(item.name) === -1);

[{ name: 'All' }, ...categories].map(category =>
  renderKinds(category, filteredComponents, 'Components', renderContent)
);

// storybookAPI.selectStory('heading', 'with text');

/*const MyPanel = () => `<div>This is a panel.</div>`;

// give a unique name for the panel
addonAPI.addPanel('Components/panel', {
  title: 'My Addon',
  render: () => `<MyPanel />`,
});*/

function renderContent(item) {
  let content = contents.find(doc => doc.id === item.content);
  let name = item.name.replace(/^c-/, '');
  let template;
  let docs;

  try {
    template = require('../stories/' + item.name + '.html');
  } catch (err) {
    template = `<${item.name}></${item.name}>`;
  }

  try {
    docs = require('../../src/components/' + name + '/readme.md')
  } catch (err) {
    docs = '';
  }

  return `
    ${template}
    ${docs ? '<div class="technical-docs">' + marked(docs) + '</div>' : ''}
    ${
      content
        ? '<div class="ui-docs">' + marked(content.content) + '</div>'
        : ''
    }
  `;
}
