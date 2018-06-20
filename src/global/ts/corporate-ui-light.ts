
import { importScript, importLink, generateMeta, urlInfo } from './helpers';
import { setGlobals, polymerInject, applyBrand } from './core';

window['CorporateUi'] = (function() {

  /*** Public proporties ***/
  var _public = {
    importScript,
    importLink,
    generateMeta,
    urlInfo
  };

  return _public;

}());

/*** This starts everything ***/
setGlobals();
polymerInject();
document.addEventListener("DOMContentLoaded", applyBrand);
