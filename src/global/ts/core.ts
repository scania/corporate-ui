
import * as helpers from './helpers';

const wv = require('webpackVariables');

export {
  init,
  setGlobals,
  polymerInject,
  applyBrand,
  baseComponents
}

function init() {
  addMetaAndHeaderSpecs();
  setGlobals();
  appendExternals();
}

function done(event) {
  if (window['ready_event']) {
    return;
  }

  window['ready_event'] = event ? 'load' : 'timeout'; // Timeout have no params sent so it will be undefined

  clearTimeout(window['fallback']);

  document.documentElement.className = document.documentElement.className.replace(/\bloading\b/, '');

  document.addEventListener("DOMContentLoaded", applyBrand);

  var newEvent = document.createEvent('Event');
  newEvent.initEvent('CorporateUiLoaded', true, true);
  document.dispatchEvent(newEvent);

  sysMessages();
}

function addMetaAndHeaderSpecs() {
  helpers.generateMeta('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');

  document.documentElement.className += ' loading';
  // We create this dynamically to make sure this style is always rendered before things in body
  var style = document.createElement('style');
  style.appendChild(document.createTextNode('\
    @keyframes show {\
      99% { visibility: hidden; }\
      100% { visibility: visible; }\
    }\
    html.loading { height: 100%; opacity: 0; animation: 2s show; animation-fill-mode: forwards; visibility: hidden; }\
    html.loading:before { background-color: #fff; }\
    c-corporate-header, c-corporate-footer, c-main-navigation, c-main-content { display: none; }\
  '));
  document.head.insertBefore(style, document.head.firstChild);
}

function applyBrand() {

  var brands = ['vw-group', 'audi', 'ducati', 'lamborghini', 'seat', 'volkswagen', 'bentley', 'skoda', 'bugatti', 'porsche', 'scania', 'man', 'vw-truck-bus', 'bad-UX', 'mockup'];
  var subDomain = window['location'].hostname.split('.')[0];
  var brand = brands.indexOf( subDomain ) > -1 ? subDomain : 'scania';

  var classes = document.body.classList;
  for(var index in classes) {
    if(brands.indexOf( classes[index] ) > -1) {
      brand = classes[index];
    }
  }

  var properties = window['location'].search.substring(1).split('&');
  var params:any = {};
  properties.map(function(item) {
    var prop = item.split('=');
    if (prop[0]) {
      params[prop[0]] = prop[1];
    }
  });

  if(params.brand) {
    brand = params.brand;
  }

  var bodyClasses = document.body.className;
  for(index in brands) {
    if(bodyClasses.indexOf( brands[index] ) > -1) {
      bodyClasses = bodyClasses.replace(brands[index], '');
    }
  }

  document.body.className = bodyClasses;

  helpers.importLink('https://static.scania.com/resources/brands/css/' + brand + '.css', 'stylesheet', null, window['corporate_elm']);

  var favicon_root = "https://static.scania.com/resources/logotype/" + brand + "/favicon/";

  helpers.importLink(favicon_root + 'favicon.ico', 'shortcut icon', null, window['corporate_elm'].parentNode);

  helpers.importLink(favicon_root + 'apple-icon-57x57.png', 'apple-touch-icon', null, window['corporate_elm'].parentNode, {sizes:'57x57'});
  helpers.importLink(favicon_root + 'apple-icon-60x60.png', 'apple-touch-icon', null, window['corporate_elm'].parentNode, {sizes:'60x60'});
  helpers.importLink(favicon_root + 'apple-icon-72x72.png', 'apple-touch-icon', null, window['corporate_elm'].parentNode, {sizes:'72x72'});
  helpers.importLink(favicon_root + 'apple-icon-76x76.png', 'apple-touch-icon', null, window['corporate_elm'].parentNode, {sizes:'76x76'});
  helpers.importLink(favicon_root + 'apple-icon-114x114.png', 'apple-touch-icon', null, window['corporate_elm'].parentNode, {sizes:'114x114'});
  helpers.importLink(favicon_root + 'apple-icon-120x120.png', 'apple-touch-icon', null, window['corporate_elm'].parentNode, {sizes:'120x120'});
  helpers.importLink(favicon_root + 'apple-icon-144x144.png', 'apple-touch-icon', null, window['corporate_elm'].parentNode, {sizes:'144x144'});
  helpers.importLink(favicon_root + 'apple-icon-152x152.png', 'apple-touch-icon', null, window['corporate_elm'].parentNode, {sizes:'152x152'});
  helpers.importLink(favicon_root + 'apple-icon-180x180.png', 'apple-touch-icon', null, window['corporate_elm'].parentNode, {sizes:'180x180'});

  helpers.importLink(favicon_root + 'android-icon-192x192.png', 'icon', null, window['corporate_elm'].parentNode, {sizes:'192x192'});

  helpers.importLink(favicon_root + 'favicon-32x32.png', 'icon', null, window['corporate_elm'].parentNode, {sizes:'32x32'});
  helpers.importLink(favicon_root + 'favicon-96x96.png', 'icon', null, window['corporate_elm'].parentNode, {sizes:'96x96'});
  helpers.importLink(favicon_root + 'favicon-16x16.png', 'icon', null, window['corporate_elm'].parentNode, {sizes:'16x16'});

  helpers.importLink(favicon_root + 'manifest.json', 'manifest', null, window['corporate_elm'].parentNode);

  helpers.generateMeta('msapplication-TileColor', '#000');
  helpers.generateMeta('msapplication-TileImage', favicon_root + 'ms-icon-144x144.png');

  document.body.classList.add(brand);
}

function setGlobals() {
  window['AppEventStore'] = new helpers.EventStore();
  window['corporate_elm'] = document.querySelector('[src*="corporate-ui"]');

  var scriptUrl = window['corporate_elm'].src,
      port = helpers.urlInfo(scriptUrl).port ? ':' + helpers.urlInfo(scriptUrl).port : '',
      localhost = helpers.urlInfo(scriptUrl).hostname === 'localhost' || helpers.urlInfo(scriptUrl).hostname.match(/rd[0-9]+/g) !== null;

  window['corporate_ui_params'] = helpers.urlInfo(scriptUrl).search.substring(1);
  window['static_root'] = (localhost ? 'http://' : 'https://') + helpers.urlInfo(scriptUrl).hostname + port;
  window['version_root'] = (window['static_root'] + helpers.urlInfo(scriptUrl).pathname).replace('/js/corporate-ui.js', '');
  window['protocol'] = helpers.urlInfo(scriptUrl).protocol;
  window['environment'] = helpers.urlInfo(scriptUrl).pathname.split('/')[1];
  window['params'] = {};

  var params = decodeURI(window['corporate_ui_params']).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"');
  if (params !== '') {
    window['params'] = JSON.parse('{"' + params + '"}');
  }

  window['less'] = { isFileProtocol: true }; // Is needed for making synchronous imports in less
  window['defaults'] = {
    appName: 'Application name',
    company: 'Scania'
  };

  window['CorporateUi'].version = wv.version;
  document.documentElement.setAttribute('corporate-ui-version', wv.version);

  if (window['CorporateUi'].components) {
    JSON.parse(wv.components).map(function(component) {
      window['CorporateUi'].components[component.name] = {
        ...component,
        path: window['version_root'] + '/components/' + component.name + '/' + component.name + '.html'
      }
    });
  }

  /*window['Polymer'] = {
    dom: 'shadow'
  };*/
}

function polymerInject() {
  if (!(window['Polymer'] && window['Polymer'].StyleUtil)) {
    clearTimeout(window['polymerTimer']);
    window['polymerTimer'] = setTimeout(polymerInject, 10);
    return;
  }

  /* Extending Polymer _ready method */
  /* We extend _ready and not ready because ready will be overridden when used in a component */
  var _orgReady = window['Polymer'].Base._ready;
  window['Polymer'].Base._ready = function() {
    var self = this;

    if(!this.dataHost) {

      if(this.nodeName.indexOf('-VARIATION-') === -1) {

        if (this.properties.variation !== 0) {
          /* Automatically wrapping component variation */
          var variation = (this.attributes.variation ? this.attributes.variation.value : undefined) || (this.properties.variation ? this.properties.variation.value : 1);
          var variation_container = document.createElement(this.localName + '-variation-' + variation);

          // Why does this happen sometimes?
          if (!this.parentNode) {
            return;
          }
          this.parentNode.insertBefore(variation_container, this);
          variation_container.appendChild(this);
        }

        /* Automatically wrapping component inside a container */
        var fullbleed = (this.attributes.fullbleed ? this.attributes.fullbleed.specified : undefined) || (this.properties.fullbleed ? this.properties.fullbleed.value : true);

        if(fullbleed !== true) {
          var container = document.createElement('div'),
              parent = this.properties.variation === 0 ? this.parentNode : this.parentNode.parentNode;

          container.setAttribute('class', 'container');

          parent.insertBefore(container, this.parentNode);
          container.appendChild(this.parentNode);
        }
      }
    }

    /* Execute the origional function and apply current this to it */
    _orgReady.call(this);
  }

  /* Makes Polymer apply component specific style in the end of head element */
  /*window['Polymer'].StyleUtil.orgApplyCss = window['Polymer'].StyleUtil.applyCss;
  window['Polymer'].StyleUtil.applyCss = function(cssText, moniker, target, contextNod) {
    target = target || document.head;
    target.firstChild = target.lastChild;

    var links = target ? target.querySelectorAll('link') : [];

    if (links.length) {
      contextNod = links[ links.length-1 ];
    }

    window['Polymer'].StyleUtil.orgApplyCss.call(this, cssText, moniker, target, contextNod);
  }*/
}

function baseComponents(references) {
  polymerInject();

  // Adds support for Promise if non exist
  if (typeof(window['Promise']) === 'undefined') {
    return helpers.importScript(window['static_root'] + '/vendors/components/pure-js/es6-promise/4.1.0/dist/es6-promise.js', function() {
      window['Promise'] = window['ES6Promise'];
      baseComponents(references);
    }, window['corporate_elm']);
  }

  helpers.importLink(window['CorporateUi'].components['main-content'].path, 'import', null, window['corporate_elm']);

  /*if (window['params'].preload === 'false') {
    window['ready_event'] = undefined;
  }*/

  // Maybe we should change importLink to return a promise instead
  var resources = (references || window['preLoadedComponents']).map(function(resource) {
    return new window['Promise'](function(resolve, reject) {
      helpers.importLink(resource.path, 'import', function(e) { resolve(e.target) }, window['corporate_elm']);
    });
  });

  window['fallback'] = setTimeout(done, 10000);

  window['Promise'].all(resources).then(done);
}

function appendExternals() {
  window['preLoadedComponents'] = [
    window['CorporateUi'].components['corporate-header'],
    window['CorporateUi'].components['corporate-footer'],
    window['CorporateUi'].components['main-navigation']
  ];

  // Adds support for webcomponents if non exist
  if (!('import' in document.createElement('link'))) {
    helpers.importScript(window['static_root'] + '/vendors/frameworks/webcomponents.js/0.7.24/webcomponents-lite.js', null, window['corporate_elm']);
  }

  if (window['params'].css !== 'custom') {
    var bsnUrl = window['static_root'] + '/vendors/frameworks/bootstrap.native/2.0.21/dist/bootstrap-native.js';
    if(window['define']) {
      window['requirejs']([bsnUrl], function(bsn) {
        Object['assign'](window, bsn);
        bsHandler();
      });
    } else {
      helpers.importScript(bsnUrl, bsHandler, window['corporate_elm']);
    }
    helpers.importLink(window['static_root'] + '/vendors/frameworks/bootstrap/3.2.0/dist/css/bootstrap-org.css', 'stylesheet', null, window['corporate_elm']);
    helpers.importLink(window['version_root'] + '/css/corporate-ui.css', 'stylesheet', null, window['corporate_elm']);
  }

  baseComponents(window['params'].preload === 'false' ? [] : undefined);
}

function bsHandler() {
  document.addEventListener('click', function(event:any) {
    var dataToggle = event.target.getAttribute('data-toggle') || '',
        method = dataToggle.charAt(0).toUpperCase() + dataToggle.slice(1),
        elm = event.target.parentNode;
    if(method && window[method]) {
      if (dataToggle === 'tab') {
        elm = elm.parentNode;
      }
      [].slice.call(elm.querySelectorAll('[data-toggle]')).map(function(_elm) {
        if (!_elm[method]) {
          new window[method](_elm);
        }
      });
      event.target.click();
    }
  })
}

function sysMessages() {
  if (window['protocol'] === 'http:') {
    console.warn('You are pointing to corporate-ui using "HTTP" protocol and its not supported please change to "HTTPS".');
  }

  if (window['environment'] === 'development') {
    console.warn('Remeber that you are pointing to our development environment and due to this you might experience some techical difficulties.');
  }

  if (window['ready_event'] === 'timeout') {
    console.warn('"WebComponentsReady" have not yet been triggered (10sec). Fallback has been initialized.');
  }
}
