import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { store, actions } from './store';


// Polyfill for CustomEvent
(function () {
  if (typeof (<any>window).CustomEvent === 'function') return false;

  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: null };
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = (<any>window).Event.prototype;

  (<any>window).CustomEvent = CustomEvent;
}());


const detail = { store, actions };
const event = new CustomEvent('storeReady', { detail });
const icons = {};

Object.values({ ...fas, ...fab }).map(item => {
  // TODO: Would like to combine these two rows somehow...
  const [width, height, attrs, unicode, definition] = item.icon;
  icons[item.iconName] = {
    width, height, attrs, unicode, definition,
  };
});

// When running tests Context is already declared
/* eslint-disable block-scoped-var, vars-on-top, no-var */
if (!Context) {
  var Context: any = {};
}

(<any>window).CorporateUi = { ...(<any>window).CorporateUi, ...detail };

Context.store = store;

store.dispatch({ type: actions.ADD_ICONS, items: icons });

document.dispatchEvent(event);

(<any>window).CorporateUi.storeReady = true;
/* eslint-enable block-scoped-var, vars-on-top, no-var */
