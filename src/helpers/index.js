
import { applyPolyfills, defineCustomElements as dce } from '../loader';
export { defineCustomElements, addTheme };

function defineCustomElements(comps=[]){
  return applyPolyfills().then(() => {
    dce(window);
  });
}


function addTheme(_theme) {
  const { store, actions, storeReady } = window.CorporateUi || {};

  if (storeReady) {
    return init(_theme, { detail: { store, actions } });
  }

  // TODO: Maybe this event listener should be accesable from the theme itself?
  document.addEventListener('storeReady', event => init(_theme, event));

  function init(theme, event) {
    const favicons = theme.favicons;
    const icons = theme.icons;
    const colors = theme.colors;
    const name = Object.keys(theme.default)[0];

    theme = document.head.attachShadow ? theme.default : theme.ie;
    theme[name].favicons = favicons;

    [
      { type: 'ADD_THEME', theme },
      { type: 'REMOVE_ICONS' },
      { type: 'ADD_ICONS', items: icons },
      { type: 'ADD_COLORS', items: colors },
    ].map(item => {
      item.type = event.detail.actions[item.type];
      event.detail.store.dispatch(item);
    });
  }
}