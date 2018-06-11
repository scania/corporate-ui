
import * as helpers from './helpers';
import * as core from './core';

window['CorporateUi'] = (function() {

  /*** Public proporties ***/
  var _public = {
    baseComponents  : core.baseComponents,
    components      : {},
    ...helpers
  };

  return _public;

}());

/*** This starts everything ***/
core.init();
