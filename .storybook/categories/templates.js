import { storiesOf } from '@storybook/html';
import { withLinks } from '@storybook/addon-links';
import { action } from '@storybook/addon-actions';

import { renderStories } from './components';

import categories from '../../data/categories.json';
import templates from '../../data/templates.json';

[{ name: 'All' }, ...categories].map(category =>
  renderKinds(category, templates, 'Templates', content)
);

function renderKinds(category, items, title, content) {
  let categorisedItems = items.filter(
    item => item.categories.indexOf(category.id) > -1
  );
  let storyName = category.name + ' (' + categorisedItems.length + ')'

  if (!category.id) {
    categorisedItems = items
    storyName = category.name
  }

  if (!categorisedItems.length) {
    return;
  }

  storiesOf(title, module)
    .addDecorator(withLinks)
    .add(
      storyName,
      () => `
        <main>
          <header>
            <c-container type="fluid">
              <h4>${category.name}</h4>
            </c-container>
          </header>

          <section>
            <c-container type="fluid">
              <c-row class="row-eq-height">
                ${categorisedItems.map(component => `
                  <c-column md="3">
                    <c-card
                      data-sb-kind="${title}/${category.name}"
                      data-sb-story="${component.name}">
                      <strong slot="card-header">${component.name}</strong>
                      <${component.name} slot="card-body" />
                    </c-card>
                  </c-column>
                `).join('')}
              </c-row>
            </c-container>
          </section>
        </main>
      `
    );

  categorisedItems.map(item => renderStories(category, item, title, content));
}

// This should wrap the template file when download action is triggered
// <!DOCTYPE html>
// <html dir="ltr" lang="en">
//   <head>
//     <meta http-equiv="X-UA-Compatible" content="IE=edge" /> 
//     <meta charset="utf-8" />
//     <meta
//       name="viewport"
//       content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0"
//     />
//     <noscript>
//       <meta http-equiv="refresh" content="0;url=https://static.scania.com/vendors/components/pure-js/nonJS-browsers/1.0.0/nonJS-browsers.html">
//     </noscript>
//     <script src="https://static.scania.com/vendors/components/pure-js/browser-reject/1.0.0/js/browser-reject.js"></script>
//     <title>Stencil Component Starter</title>
//     <script src="/build/corporate-ui.js"></script>
//     <base href="/" />
//   </head>
//   <body>
//     <c-theme name="scania"></c-theme>
// </body>
// </html>

function content(item) {
  var template = require('..//templates/' + item.name + '.html');
  return `
    <button>Download theme</button>
    <c-container type="fluid">${template}</c-container>
  `;
}
