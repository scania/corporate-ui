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

function addTheme(theme) {
  // TODO: Maybe this event listener should be accesable from the theme itself?
  document.addEventListener('storeReady', event => {
    const store = event.detail.store;
    const actions = event.detail.actions;
    const favicons = theme.favicons;
    const name = Object.keys(theme.default)[0];

    theme = document.head.attachShadow ? theme.default : theme.ie;
    theme[name].favicons = favicons;

    store.dispatch({ type: actions.ADD_THEME, theme });
  });
}
