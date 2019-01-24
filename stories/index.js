import { storiesOf } from '@storybook/html';

import { defineCustomElement } from '../dist/esm/es5/corporate-ui.core';
import {
  CuiHeader,
  CuiTheme,
  CuiFooter,
  ContextConsumer
} from '../dist/esm/es5/corporate-ui.components';

defineCustomElement(window, [CuiHeader, CuiTheme, CuiFooter, ContextConsumer]);

const withTheme = component => {
  const theme = document.createElement('cui-theme');
  theme.name = 'scania';
  const componentWithTheme = document.createElement('div');
  componentWithTheme.appendChild(theme);
  componentWithTheme.appendChild(component);
  return componentWithTheme;
};

storiesOf('Header', module).add('With items', () => {
  const title = 'Corporate UI';
  const items = [
    { text: 'global', location: 'https://scania.com/ux-library' },
    {
      text: 'about',
      location: 'https://scania.github.io/corporate-ui-docs/developer/'
    }
  ];
  const header = document.createElement('cui-header');
  header.siteName = title;
  header.items = items;
  return withTheme(header);
});
