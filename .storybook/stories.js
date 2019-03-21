import { storiesOf } from '@storybook/html';
import { withLinks } from '@storybook/addon-links';
import { basename } from 'path';
import marked from 'marked';

import { renderMain, renderOverview, renderItems, importAll } from './helpers';
import docs from '../readme.md';

const components = {};
importAll(require.context('./components/', true, /\.js$/), components);

let templates = {};
importAll(require.context('./templates/', true, /\.js$/), templates);


storiesOf('Info', module)
  .add(
    'Corporate UI',
    () => renderMain({
      title: 'Corporate UI',
      content: `<section>${marked(docs)}</section>`
    })
  );

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
Object.values(components).map(module => {
  const item = module.default;
  storiesOf('Components', module)
    .addDecorator(withLinks)
    .add(
      item.title,
      () => (item.method || renderItems)(item)
    );
});

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
Object.values(templates).map(module => {
  const item = module.default;
  storiesOf('Templates', module)
    .addDecorator(withLinks)
    .add(
      item.title,
      () => (item.method || renderItems)(item)
    );
});
