
import * as helpers from './helpers';
import { init, baseComponents, store } from './core';

window['CorporateUi'] = (function() {

  /*** Public proporties ***/
  var _public = {
    ...helpers,
    baseComponents,
    store,
    components: {}
  };

  return _public;

}());

/*** This starts everything ***/
init();
