import { storiesOf } from '@storybook/html';
import { withLinks } from '@storybook/addon-links';
import { basename } from 'path';
import marked from 'marked';

import {
  renderMain, renderOverview, renderItems, importAll,
} from './helpers';
import readme from '../readme.md';
import docs from '../.data/docs.json';

const elements = {};
importAll(require.context('./elements/', true, /\.js$/), elements);

const components = {};
importAll(require.context('./components/', true, /\.js$/), components);

const templates = {};
importAll(require.context('./templates/', true, /\.js$/), templates);


storiesOf('Info', module)
  .add(
    'Corporate UI',
    () => renderMain({
      title: 'Corporate UI',
      content: `
        <section>
          <div>${marked(readme)}</div>
        </section>
      `,
    }),
  );

// Render component overview
storiesOf('Web Components', module)
  .addDecorator(withLinks)
  .add(
    'Overview',
    () => renderOverview({
      title: 'Overview',
      kind: 'Web Components',
      description: 'Select a component to see examples and get more information.',
      items: Object.keys(components).map(key => components[key].default),
    }),
  );

// Render component stories
Object.entries(components).map(entry => {
  const [file, module] = entry;
  const name = basename(file, '.js');
  const doc = docs.components.find(item => item.tag === name);
  const item = { ...module.default, name, doc };

  storiesOf('Web Components', module)
    .addDecorator(withLinks)
    .add(
      item.title,
      () => (item.method || renderItems)(item),
    );
});
// Render elements overview
storiesOf('UI Elements', module)
  .addDecorator(withLinks)
  .add(
    'Overview',
    () => renderOverview({
      title: 'Overview',
      kind: 'UI Elements',
      description: 'Select a page to see the UI element and get more information.',
      items: Object.keys(elements).map(key => elements[key].default),
    }),
  );

// Render elements stories
Object.entries(elements).map(entry => {
  const [file, module] = entry;
  const name = basename(file, '.js');
  const doc = docs.components.find(item => item.tag === name);
  const item = { ...module.default, name, doc };

  storiesOf('UI Elements', module)
    .addDecorator(withLinks)
    .add(
      item.title,
      () => (item.method || renderItems)(item),
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
      items: Object.keys(templates).map(key => templates[key].default),
    }),
  );

// Render template stories
Object.entries(templates).map(entry => {
  const [file, module] = entry;
  const name = basename(file, '.js');
  const item = { ...module.default, name };

  storiesOf('Templates', module)
    .addDecorator(withLinks)
    .add(
      item.title,
      () => (item.method || renderItems)(item),
    );
});
