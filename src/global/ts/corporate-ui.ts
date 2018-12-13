
import * as helpers from './helpers';
import { store, storeInit } from './store';
import { addMetaAndHeaderSpecs, setGlobals, done, baseComponents, appendGa } from './core';

window['CorporateUi'] = (function() {

  /*** Public proporties ***/
  var _public = {
    ...helpers,
    store
  };

  return _public;

}());

/*** This starts everything ***/
addMetaAndHeaderSpecs();
setGlobals();
storeInit();
appendGa();
baseComponents();
done();
