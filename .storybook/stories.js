import { storiesOf } from '@storybook/html';
import { withLinks } from '@storybook/addon-links';
import { basename } from 'path';
import marked from 'marked';

import { renderMain, renderOverview } from './helpers';
import docs from '../readme.md';


const components = require.context('./components/', true, /\.js$/);
const templates = require.context('./templates/', true, /\.js$/);


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
      items: components.keys().map(item => {
        let name = basename(item, '.js');
        let string = name.replace('c-', '').replace(/-/g, ' ');
        let title = string.charAt(0).toUpperCase() + string.slice(1);
        return { name, title }
      })
    })
  );

// Render component stories
components.keys().forEach(components);


storiesOf('Templates', module)
  .addDecorator(withLinks)
  .add(
    'Overview',
    () => renderOverview({
      title: 'Overview',
      kind: 'Templates',
      description: 'Select a template to see the example and get more information.',
      items: templates.keys().map(item => {
        let name = basename(item, '.js');
        let string = name.replace(/-/g, ' ');
        let title = string.charAt(0).toUpperCase() + string.slice(1);
        return { name, title }
      })
    })
  );

// Render component stories
templates.keys().forEach(templates);
