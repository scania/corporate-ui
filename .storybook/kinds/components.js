// import addonAPI from '@storybook/addons';
import marked from 'marked';

import { renderKinds } from '../helpers';

import categories from '../../data/categories.json';
import components from '../../data/components.json';
import contents from '../../data/contents.json';

import '../../src/components.scss';

// We skip rendering these components for now due to rendering issues
let filteredComponents = components.filter(item => ['cui-column', 'cui-container', 'cui-content', 'cui-row'].indexOf(item.name) === -1);


[{name: 'All'}, ...categories]
  .map(category => renderKinds(category, filteredComponents, 'Components', renderContent));


// storybookAPI.selectStory('heading', 'with text');

/*const MyPanel = () => `<div>This is a panel.</div>`;

// give a unique name for the panel
addonAPI.addPanel('Components/panel', {
  title: 'My Addon',
  render: () => `<MyPanel />`,
});*/

function renderContent(item) {
  let content = contents.find(doc => doc.id === item.content);
  let docs = require('../../src/components/' + item.name + '/readme.md');
  return `
    <${item.name}></${item.name}>
    ${'<div>' + marked(docs) + '</div>'}
    ${content ? '<div>' + marked(content.content) + '</div>' : ''}
  `;
}
