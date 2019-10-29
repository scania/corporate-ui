import { defineCustomElement } from './esm/es5/corporate-ui.core';
import * as CUI from './esm/es5/corporate-ui.components';
import collections from './collection/collection-manifest.json';

export { defineCustomElements, addTheme };

const CUI_COMPONENTS = CUI.COMPONENTS;
const subComponents = {};

const collection = collections.components;
collection.forEach(obj => {
  if (obj.dependencies.length > 0) {
    subComponents[obj.tag] = obj.dependencies;
  }
});

function defineCustomElements(requests) {
  let components = [];

  if (requests === 'all') {
    components = [...CUI_COMPONENTS];
  } else {
    requests.forEach(projectComp => {
      components.push(findComponent(projectComp));
      for (const tag in subComponents) {
        if (projectComp === tag) {
          subComponents[tag].forEach(tagDep => {
            components.push(findComponent(tagDep));
          });
        }
      }
    });
  }
  defineCustomElement(window, components);
}

function findComponent(name) {
  let val;
  CUI_COMPONENTS.forEach(comp => {
    if (comp[0] === name) val = comp;
  });
  return val;
}

function addTheme(_theme) {
  const { store, actions, storeReady } = window.CorporateUi || {};

  if (storeReady) {
    return init(_theme, { detail: { store, actions } });
  }

  // TODO: Maybe this event listener should be accesable from the theme itself?
  document.addEventListener('storeReady', event => init(_theme, event));

  function init(theme, event) {
    const name = Object.keys(theme)[0];
    theme[name].components = document.head.attachShadow ? theme[name].components.default : theme[name].components.ie;

    [
      { type: 'ADD_THEME', theme },
    ].map(item => {
      item.type = event.detail.actions[item.type];
      event.detail.store.dispatch(item);
    });
  }
}
