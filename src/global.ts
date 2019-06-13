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
let Context: any;

document.dispatchEvent(event);

Context.store = store;
