import { storiesOf } from '@storybook/html';
import { action } from '@storybook/addon-actions';
import { withLinks } from '@storybook/addon-links';

// import { defineCustomElement } from '../dist/esm/es5/corporate-ui.core';
// import * as CUI from '../dist/esm/es5/corporate-ui.components';

export function renderKinds(category, items, title, content) {
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

export function renderStories(category, item, title, content) {
  storiesOf(title + '/' + category.name, module)
    .add(
      item.name,
      () => `
        <main>
          <header>
            <c-container type="fluid">
              <h4>${item.name}</h4>
            </c-container>
          </header>

          <section>
            <c-container type="fluid">
              <button onclick="(function() { window.history.back() })()">Back to the category page</button>
              ${content(item)}
            </c-container>
          </section>
        </main>
      `
    );
}
