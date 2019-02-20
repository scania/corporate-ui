import { storiesOf } from '@storybook/html';
import { action } from '@storybook/addon-actions';
import { withLinks } from '@storybook/addon-links';

import { defineCustomElement } from '../dist/esm/es5/corporate-ui.core';

export function renderKinds(category, items, title, content) {
  let categorisedItems = items.filter(
    item => item.categories.indexOf(category.id) > -1
  );
  let storyName = category.name + ' (' + categorisedItems.length + ')';

  if (!category.id) {
    categorisedItems = items;
    storyName = category.name;
  }

  if (!categorisedItems.length) {
    return;
  }

  storiesOf(title, module)
    .addParameters({ options: { addonPanelInRight: true } })
    .addDecorator(withLinks)
    .add(
      storyName,
      () => `
        <main>
          <section>
            <c-container type="fluid">
              <header>
                <h2>${category.name}</h2>
              </header>
              <c-row class="row-eq-height">
                ${categorisedItems
                  .map(
                    component =>
                      `<c-column md="3">
                    <c-card data-sb-kind="${title}/${
                        category.name
                      }" data-sb-story="${component.name}">
                      <strong slot="card-header">${component.name}</strong>
                      <${component.name} slot="card-body" />
                    </c-card>
                  </c-column>`
                  )
                  .join('')}
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
    .addParameters({ options: { addonPanelInRight: true } })
    .add(
      item.name,
      () => `
        <main>
          <section>
            <c-container type="fluid">
              <header>
                <button onclick="(function() { window.history.back() })()">Back to the category page</button>
                <h2>${item.name}</h2>
              </header>
              ${content(item)}
            </c-container>
          </section>
        </main>
      `
    );
}

export function renderWebComponent(component) {
  const [
    tagName,
    bundleIds,
    ,
    tagAttrsData,
    encapsulationMeta,
    listenerMeta
  ] = component;
  const tagAttrs = {};

  if (typeof tagAttrsData === 'object') {
    tagAttrsData.map(attributes => {
      const [
        propName,
        memberType,
        reflectToAttr,
        attrName,
        propType
      ] = attributes;

      tagAttrs[propName] = {
        attrName,
        memberType,
        propType,
        reflectToAttr
      };
    });
  }

  defineCustomElement(window, [component]);

  /*if (tagName === 'context-consumer') {
   return;
  }

  
    .addParameters({ options: { addonPanelInRight: true } })
    .add(tagName, () => `<${tagName} />`);*/
}
