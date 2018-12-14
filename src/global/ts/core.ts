
import * as helpers from './helpers';

const wv = require('webpackVariables');

export {
  done,
  addMetaAndHeaderSpecs,
  applyBrand,
  setGlobals,
  baseComponents,
  appendGa
}

function done() {
  document.documentElement.classList.remove('loading');

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyBrand);
  } else {
    applyBrand();
  }

  var newEvent = document.createEvent('Event');
  newEvent.initEvent('CorporateUiLoaded', true, true);
  document.dispatchEvent(newEvent);

  sysMessages();
}

function addMetaAndHeaderSpecs() {
  helpers.generateMeta('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');

  document.documentElement.classList.add('loading');
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

  var brands = ['vw-group', 'audi', 'ducati', 'lamborghini', 'seat', 'volkswagen', 'bentley', 'skoda', 'bugatti', 'porsche', 'scania', 'man', 'vw-truck-bus', 'traton', 'bad-UX', 'mockup'];
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

  window['cui_path'] = helpers.urlInfo(scriptUrl).href.substring(0, helpers.urlInfo(scriptUrl).href.lastIndexOf('/')+1);

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

  CorporateUi.version = wv.version;
  document.documentElement.setAttribute('corporate-ui-version', wv.version);

  /*store.subscribe(() =>
    console.log(store.getState())
  );*/

  /*window['Polymer'] = {
    dom: 'shadow'
  };*/
}

function polymerInject(cb=function(){}) {
  if (!(window['Polymer'] && window['Polymer'].StyleUtil)) {
    clearTimeout(window['polymerTimer']);
    window['polymerTimer'] = setTimeout(polymerInject.bind(cb), 10);
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
          var variation = (this.attributes.variation ? this.attributes.variation.value : undefined) || (this.properties.variation ? this.properties.variation.value || this.properties.variation : 1);
          var variation_container = document.createElement(this.localName + '-variation-' + variation);

          // Why does this happen sometimes?
          if (!this.parentNode) {
            return;
          }
          this.parentNode.insertBefore(variation_container, this);
          variation_container.appendChild(this);
        }

        /* Automatically wrapping component inside a container */
        var fullbleed = (this.attributes.fullbleed ? this.attributes.fullbleed.specified : undefined) || (this.properties.fullbleed ? this.properties.fullbleed.value || this.properties.fullbleed : true);

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

  cb();

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

function renderPath(dependency) {
  var path = window['cui_path'] + '../../../' + dependency,
      dependencies = JSON.parse(wv.dependencies),
      version = dependencies[dependency].split('#')[1] || dependencies[dependency];

  version = version.replace('v', '');

  if (wv.env == 'aws') {
    path = 'https://static.scania.com/vendors/frameworks/' + dependency + '/' + version;
  }

  return path;
}

function baseComponents() {
  // Adds support for webcomponents if non exist
  if (!('import' in document.createElement('link') || window['webcomponents.js'])) {
    window['webcomponents.js'] = true;
    return helpers.importScript(renderPath('webcomponents.js') + '/webcomponents-lite.js', baseComponents, window['corporate_elm']);
  }

  helpers.importLink(renderPath('polymer') + '/polymer.html', 'import', function() {
    polymerInject(function() {
      helpers.importLink(window['cui_path'] + '../components/base.html', 'import', undefined, window['corporate_elm']);
    });
  },
  window['corporate_elm']);

  if (window['params'].css !== 'custom') {
    var bsnUrl = renderPath('bootstrap.native') + '/dist/bootstrap-native.js';
    if(window['define']) {
      window['requirejs']([bsnUrl], function(bsn) {
        Object['assign'](window, bsn);
        bsHandler();
      });
    } else {
      helpers.importScript(bsnUrl, bsHandler, window['corporate_elm']);
    }

    helpers.importLink(window['cui_path'] + '../css/corporate-ui.css', 'stylesheet', null, window['corporate_elm']);
  }
}

function bsHandler() {
  document.addEventListener('click', function(event:any) {
    bsAutoHandler(event, function() {
      setTimeout(function() {
        event.target.click();
      }, 100)
    });
  });
  document.addEventListener('mouseover', bsAutoHandler);

  function bsAutoHandler(event, cb=function(){}) {
    var dataToggle = event.target.getAttribute('data-toggle') || '',
        method = dataToggle.charAt(0).toUpperCase() + dataToggle.slice(1),
        options = event.target.dataset;

    if(method && window[method] && !event.target[method]) {
      event.preventDefault();

      if (dataToggle === 'tab') {
        [].slice.call(event.target.parentNode.parentNode.children).map(function(item) {
          new window[method](item.children[0], options);
        });
      } else {
        new window[method](event.target, options);
      }

      cb();
    }
  }
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

function appendGa(){
  if(window['params'].monitoring){
    var trackID = (window['params'].monitoring=='true') ? 'UA-125640614-1' : window['params'].monitoring;
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
         (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date().getTime();a=s.createElement(o),
         m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
         })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
         ga('create', trackID, 'auto');
         ga('send', 'pageview');
  }
}
