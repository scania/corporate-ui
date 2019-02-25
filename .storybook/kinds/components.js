// import addonAPI from '@storybook/addons';
import marked from 'marked';

import { renderKinds } from '../helpers';

import categories from '../../data/categories.json';
import components from '../../data/components.json';
import contents from '../../data/contents.json';

import '../style/components.scss';

// We skip rendering these components for now due to rendering issues
// let filteredComponents = components.filter(item => ['cui-column', 'cui-container', 'cui-content', 'cui-row'].indexOf(item.name) === -1);

[{ name: 'All' }, ...categories].map(category =>
  renderKinds(category, components, 'Components', renderContent)
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
    ${template ? template : `<${item.name}></${item.name}>`}
    ${docs ? '<div class="technical-docs">' + marked(docs) + '</div>' : ''}
    ${
      content
        ? '<div class="ui-docs">' + marked(content.content) + '</div>'
        : ''
    }
  `;
}
