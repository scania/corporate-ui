
import * as helpers from './helpers';
import { init, baseComponents } from './core';

window['CorporateUi'] = (function() {

  /*** Public proporties ***/
  var _public = {
    ...helpers,
    baseComponents,
    components: {}
  };

  return _public;

}());

/*** This starts everything ***/
init();
