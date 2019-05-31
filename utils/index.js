import { defineCustomElement } from './esm/es5/corporate-ui.core';
import * as CUI from './esm/es5/corporate-ui.components';
import collections from './collection/collection-manifest.json';

export { defineCustomElements, addTheme };

const CUI_COMPONENTS = CUI.COMPONENTS;
const subComponents = {};
let components = [];

const collection = collections.components;
collection.forEach(obj => {
  if (obj.dependencies.length > 0) {
    subComponents[obj.tag] = obj.dependencies;
  }
});

function defineCustomElements(requests) {
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

function addTheme(theme) {
  document.addEventListener('storeReady', event => {
    const store = event.detail.store;
    const actions = event.detail.actions;
    store.dispatch({ type: actions.ADD_THEME, theme });
  });
}
