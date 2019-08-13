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

const utilities = {};
importAll(require.context('./utilities/', true, /\.js$/), utilities);

function generatePage(story) {
  // Render overview
  storiesOf(story.kind, module)
    .addDecorator(withLinks)
    .add(
      'Overview',
      () => renderOverview({
        title: 'Overview',
        kind: story.kind,
        description: 'Select a page to see examples and get more information.',
        items: Object.keys(story.source).map(key => story.source[key].default),
      }),
    );
  // Render stories
  Object.entries(story.source).map(entry => {
    const [file, module] = entry;
    const name = basename(file, '.js');
    const doc = docs.components.find(item => item.tag === name);
    const item = {
      ...module.default,
      name,
      doc,
      kind: story.kind,
    };

    storiesOf(story.kind, module)
      .addDecorator(withLinks)
      .add(
        item.title,
        () => (item.method || renderItems)(item),
      );
  });
}

// Render Info page
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

generatePage({
  source: components,
  kind: 'Web Components',
});

generatePage({
  source: elements,
  kind: 'UI Elements',
});

generatePage({
  source: utilities,
  kind: 'Utilities',
});

generatePage({
  source: templates,
  kind: 'Templates',
});
