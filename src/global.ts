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

// When running tests Context is already declared
/* eslint-disable block-scoped-var, vars-on-top, no-var */
if (!Context) {
  var Context: any = {};
}

(<any>window).CorporateUi = { ...(<any>window).CorporateUi, ...detail };

Context.store = store;

document.dispatchEvent(event);
/* eslint-enable block-scoped-var, vars-on-top, no-var */
