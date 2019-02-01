import { storiesOf } from '@storybook/html';

import { defineCustomElement } from '../dist/esm/es5/corporate-ui.core';
import * as CUI from '../dist/esm/es5/corporate-ui.components';

const components = Object.keys(CUI).map(item => { return CUI[item] } )

/*const withTheme = component => {
  const theme = document.createElement('cui-theme');
  theme.name = 'scania';
  const componentWithTheme = document.createElement('div');
  componentWithTheme.appendChild(theme);
  componentWithTheme.appendChild(component);
  return componentWithTheme;
};*/

components.map(component => {
  const [tagName, bundleIds, , tagAttrsData, encapsulationMeta, listenerMeta] = component;
  const tagAttrs = {};

  if (tagAttrsData) {
    /*tagAttrsData.map(item => {
      tagAttrs = {}
    })*/
    for (let i = 0; i < tagAttrsData.length; i++) {
      const d = tagAttrsData[i];
      tagAttrs[d[0]] = {
        memberType: d[1],
        reflectToAttrib: !!d[2],
        attribName: typeof d[3] === 'string' ? d[3] : d[3] ? d[0] : 0,
        propType: d[4]
      };
    }
  }

  console.log(tagAttrs)

  defineCustomElement(window, [component]);

  if (tagName == 'context-consumer') {
    return;
  }

  storiesOf(tagName, module)
    .add('With items', () => {
      const title = 'Corporate UI';
      const items = [
        { text: 'global', location: 'https://scania.com/ux-library' },
        {
          text: 'about',
          location: 'https://scania.github.io/corporate-ui-docs/developer/'
        }
      ];
      const tag = document.createElement(tagName);
      /*(component[3] || []).map(attr => {
        tag[attr]
      })
      tag.siteName = title;
      tag.items = items;*/
      return tag;
    });

})
