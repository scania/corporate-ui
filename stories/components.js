import { storiesOf } from '@storybook/html';
import { action } from '@storybook/addon-actions';
import { withLinks } from '@storybook/addon-links';

import { defineCustomElement } from '../dist/esm/es5/corporate-ui.core';
import * as C from '../dist/esm/es5/corporate-ui.components';

import categories from '../data/categories.json';
import components from '../data/components.json';

import '../src/components.scss';

const C_COMPONENTS = C.COMPONENTS;

// We skip rendering these components for now due to rendering issues
let filteredComponents = components.filter(item => ['c-column', 'c-container', 'c-content', 'c-row'].indexOf(item.name) === -1);

Object.keys(C_COMPONENTS)
  .map(item => renderWebComponent(C_COMPONENTS[item]));


[{name: 'All'}, ...categories]
  .map(category => renderKinds(category, filteredComponents, 'Components', renderContent));


function renderWebComponent(component) {
  const [tagName, bundleIds, , tagAttrsData, encapsulationMeta, listenerMeta] = component;
  const tagAttrs = {};

  if (typeof tagAttrsData === 'object') {
    tagAttrsData.map(attributes => {
      const [propName, memberType, reflectToAttr, attrName, propType] = attributes;

      tagAttrs[propName] = {
        attrName,
        memberType,
        propType,
        reflectToAttr
      }
    });
  }

  defineCustomElement(window, [component]);

  /*if (tagName === 'context-consumer') {
    return;
  }

  storiesOf('Components', module)
    .addParameters({ options: { addonPanelInRight: true } })
    .add(tagName, () => `<${tagName} />`);*/
}


function renderContent(name) {
  return `<${name} />`;
}


export function renderKinds(category, items, title, content) {
  let categorisedItems = items.filter(item => item.categories.indexOf(category.id) > -1);
  let storyName = category.name + ' (' + categorisedItems.length + ')';

  if (!category.id) {
    categorisedItems = items;
    storyName = category.name;
  }

  if (!categorisedItems.length) { return; }

  // ToDo: We want to use onclick=${linkTo(title + '/' + category.name, component.name)}
  storiesOf(title, module)
    .addParameters({ options: { addonPanelInRight: true } })
    .addDecorator(withLinks)
    .add(
      storyName,
      () => (`
        <main>
          <section>
            <c-container type="fluid">
              <header>
                <h2>${category.name}</h2>
              </header>
              <p>Elements will follow here.</p>
              <c-row class="row-eq-height">
                ${categorisedItems.map(component => (
                  `<c-column md="3">
                    <!-- <button data-sb-kind="${title}/${category.name}" data-sb-story="${component.name}">${component.name}</button> -->
                    <c-card onclick="(function() { window.location = window.location.origin + window.location.pathname + '?selectedKind=${title}/${category.name}&selectedStory=${component.name}' })()">
                      <strong slot="card-header">${component.name}</strong>
                      <${component.name} slot="card-body" />
                    </c-card>
                  </c-column>`
                )).join('')}
              </c-row>
            </c-container>
          </section>
        </main>
      `)
    )

  categorisedItems.map(item => renderStories(category, item, title, content))
}


export function renderStories(category, item, title, content) {
  storiesOf(title + '/' + category.name, module)
    .addParameters({ options: { addonPanelInRight: true } })
    .add(
      item.name,
      () => (`
        <main>
          <section>
            <c-container type="fluid">
              <header>
                <button onclick="(function() { window.history.back() })()">Back to the category page</button>
                <h2>${item.name}</h2>
              </header>
              <p>Elements will follow here.</p>
              ${content(item.name)}
            </c-container>
          </section>
        </main>
      `)
    )
}