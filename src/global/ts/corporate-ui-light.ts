
import * as helpers from './helpers';
import { addMetaAndHeaderSpecs, setGlobals, appendGa, done } from './core';

window['CorporateUi'] = (function() {

  /*** Public proporties ***/
  var _public = {
    ...helpers
  };

  return _public;

}());

/*** This starts everything ***/
addMetaAndHeaderSpecs();
setGlobals();
appendGa();
done();
