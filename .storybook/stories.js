import { storiesOf } from '@storybook/html';
import { withLinks } from '@storybook/addon-links';
import { basename } from 'path';
import marked from 'marked';

import { renderMain, renderOverview, renderItems, importAll } from './helpers';
import readme from '../readme.md';
import docs from '../data/docs.json';

const components = {};
importAll(require.context('./components/', true, /\.js$/), components);

let templates = {};
importAll(require.context('./templates/', true, /\.js$/), templates);


storiesOf('Info', module)
  .add(
    'Corporate UI',
    () => renderMain({
      title: 'Corporate UI',
      content: `<section>${marked(readme)}</section>`
    })
  );

// Render component overview
storiesOf('Components', module)
  .addDecorator(withLinks)
  .add(
    'Overview',
    () => renderOverview({
      title: 'Overview',
      kind: 'Components',
      description: 'Select a component to see examples and get more information.',
      items: Object.keys(components).map(key => components[key].default)
    })
  );

// Render component stories
Object.entries(components).map(entry => {
  const [ file, module ] = entry;
  const name = basename(file, '.js');
  const doc = docs.components.find(doc => doc.tag === name);
  const item = { ...module.default, name, doc };

  storiesOf('Components', module)
    .addDecorator(withLinks)
    .add(
      item.title,
      () => (item.method || renderItems)(item)
    );
});

// Render template overview
storiesOf('Templates', module)
  .addDecorator(withLinks)
  .add(
    'Overview',
    () => renderOverview({
      title: 'Overview',
      kind: 'Templates',
      description: 'Select a template to see the example and get more information.',
      items: Object.keys(templates).map(key => templates[key].default)
    })
  );

// Render template stories
Object.entries(templates).map(entry => {
  const [ file, module ] = entry;
  const name = basename(file, '.js');
  const item = { ...module.default, name };

  storiesOf('Templates', module)
    .addDecorator(withLinks)
    .add(
      item.title,
      () => (item.method || renderItems)(item)
    );
});
