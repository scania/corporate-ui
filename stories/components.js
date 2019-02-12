import { storiesOf } from '@storybook/html';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import { defineCustomElement } from '../dist/esm/es5/corporate-ui.core';
import * as CUI from '../dist/esm/es5/corporate-ui.components';
import types from '../src/types.json';
import components from '../src/components.json';

import '../src/components.scss';


Object.keys(CUI)
  .map(item => renderWebComponent(CUI[item]));


[{name: 'All'}, ...types]
  .map(type => renderNavigation(type));


function renderWebComponent(component) {
  const [tagName, bundleIds, , tagAttrsData, encapsulationMeta, listenerMeta] = component;
  const tagAttrs = {};

  if (typeof tagAttrsData === 'object') {
    tagAttrsData.map(attributes => {
      const [propName, memberType, reflectToAttr, attrName, propType] = attributes;

      tagAttrs[propName] = {
        memberType,
        reflectToAttr,
        attrName,
        propType
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

function renderNavigation(type) {
  // We skip rendering these components for now due to rendering issues
  let _components = components.filter(item => ['cui-column', 'cui-container', 'cui-content', 'cui-row'].indexOf(item.name) === -1);
  let typeComponents = _components.filter(item => item.types.indexOf(type.id) > -1);
  let title = type.name + ' (' + typeComponents.length + ')';

  if (!type.id) {
    typeComponents = _components;
    title = type.name;
  }

  if (!typeComponents.length) return;

  // ToDo: We want to use onclick=${linkTo('Templates', 'Mail')}
  storiesOf('Components', module)
    .addParameters({ options: { addonPanelInRight: true } })
    .add(
      title,
      () => (`
        <main>
          <section>
            <cui-container type="fluid">
              <header>
                <h2>${type.name}</h2>
              </header>
              <p>Elements will follow here.</p>
              <cui-row class="row-eq-height">
                ${typeComponents.map(component => (
                  `<cui-column md="3">
                    <cui-card onclick="(function() { window.location = window.location.origin + window.location.pathname + '?selectedKind=Components/${type.name}&selectedStory=${component.name}' })()">
                      <strong slot="card-header">${component.name}</strong>
                      <${component.name} slot="card-body" />
                    </cui-card>
                  </cui-column>`
                )).join('')}
              </cui-row>
            </cui-container>
          </section>
        </main>
      `)
    )

  typeComponents.map(component => {
    storiesOf('Components/' + type.name, module)
      .addParameters({ options: { addonPanelInRight: true } })
      .add(
        component.name,
        () => (`
          <main>
            <section>
              <cui-container type="fluid">
                <header>
                  <button onclick="(function() { window.history.back() })()">Back to the category page</button>
                  <h2>${component.name}</h2>
                </header>
                <p>Elements will follow here.</p>
                <${component.name} />
              </cui-container>
            </section>
          </main>
        `)
      )
  })
}