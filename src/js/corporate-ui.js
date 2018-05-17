
window.CorporateUi = (function() {

  /*** Public proporties ***/
  var public = {

    /* Public methods */
    getUrlParameter : getUrlParameter,
    indexOf         : indexOf,
    createCookie    : createCookie,
    readCookie      : readCookie,
    eraseCookie     : eraseCookie,
    importScript    : importScript,
    importLink      : importLink,
    generateMeta    : generateMeta,
    urlInfo         : urlInfo,
    baseComponents  : baseComponents,
    EventStore      : EventStore,
    components      : {},
  };

  /*** This starts everything ***/
  init();

  return public;
  
  function init() {

    addMetaAndHeaderSpecs();

    AppEventStore = new EventStore();

    setGlobals();

    appendExternals();
  }
  
  function done(event) {
    if (window.ready_event) {
      return;
    }

    window.ready_event = event ? 'load' : 'timeout'; // Timeout have no params sent so it will be undefined

    clearTimeout(window.fallback);

    document.documentElement.className = document.documentElement.className.replace(/\bloading\b/, '');

    document.addEventListener("DOMContentLoaded", applyBrand);

    var newEvent = document.createEvent('Event');
    newEvent.initEvent('CorporateUiLoaded', true, true);
    document.dispatchEvent(newEvent);

    sysMessages();
  }

  function EventStore() {
    this.store = {};
    this.apply = apply;
    //this.__proto__.revert = revert;

    function apply(event) {
      this.store[event.name] = this.store[event.name] || [];
      event.id = this.store[event.name].length + 1; // Just for testing
      this.store[event.name].push(event);
      dispatch(event);
    }
    /*function revert(event) {
      var prevEvent = this.store[event.name].filter(function(item) { return item.id === event.id })[0];
      this.apply(prevEvent);
    }*/
    function dispatch(event) {
      var newEvent = document.createEvent('Event');
      newEvent.initEvent(event.action, true, true);
      newEvent.data = event.data;
      document.dispatchEvent(newEvent);
    }
  }

  // Taken from: http://stackoverflow.com/a/979997
  function getUrlParameter(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");

    var regexS = "[\\?&]" + name + "=([^&#]*)",
        regex = new RegExp(regexS),
        results = regex.exec(window.location.href);

    if (results == null) {
      return results;
    } else {
      return results[1];
    }
  }

  // Taken from: http://stackoverflow.com/a/1181586
  function indexOf(needle) {
    if(typeof Array.prototype.indexOf === 'function') {
      indexOf = Array.prototype.indexOf;
    } else {
      indexOf = function(needle) {
        var i = -1, index = -1;

        for(i = 0; i < this.length; i++) {
          if(this[i] === needle) {
            index = i;
            break;
          }
        }
        return index;
      };
    }
    return indexOf.call(this, needle);
  }

  // Cookie related functions taken from: http://stackoverflow.com/a/24103596
  function createCookie(name, value, days) {
    if (days) {
      var date = new Date();

      date.setTime(date.getTime()+(days*24*60*60*1000));
      var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
  }

  function readCookie(name) {
    var nameEQ = name + "=",
        ca = document.cookie.split(';');

    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  function eraseCookie(name) {
    this.createCookie(name, "", -1);
  }

  function generateMeta(name, content) {
    var head = document.head,
        meta = document.createElement('meta');

    meta.name = name;
    meta.content = content;
    head.appendChild(meta);
  }

  function importLink(href, type, callback, target, attrs) {
    var link = document.createElement('link'),
        target = target || document.head;

    if ( !('onload' in link) ) {
      imgTag = document.createElement(img);
      imgTag.onerror = link.onload;
      imgTag.src = href;
    }

    link.onload = (callback || function(){});
    link.rel = type || 'stylesheet';
    link.href = href;

    if (typeof attrs === 'object') {
      Object.keys(attrs).map(function(key) {
        link.setAttribute(key, attrs[key]);
      });
    }

    target.appendChild(link);
  }

  function importScript(src, callback, target) {
    var script = document.createElement('script'),
        xhr = new XMLHttpRequest(),
        target = target || document.head;

    script.onload = function() {
      xhr.open('GET', src);
      xhr.onload = callback || function(){};
      xhr.send();
    }
    script.src = src;
    target.appendChild(script);
  }

  function urlInfo(url) {
    var ph = document.createElement("a");
    ph.href = url;
    return {
      protocol  : ph.protocol, // => "http:"
      host      : ph.host,     // => "example.com:3000"
      hostname  : ph.hostname, // => "example.com"
      port      : ph.port,     // => "3000"
      pathname  : ph.pathname, // => "/pathname/"
      hash      : ph.hash,     // => "#hash"
      search    : ph.search    // => "?search=test"
    };
  }

  function addMetaAndHeaderSpecs() {
    generateMeta('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');

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
    var subDomain = window.location.hostname.split('.')[0];
    var brand = brands.indexOf( subDomain ) > -1 ? subDomain : 'scania';

    var classes = document.body.classList;
    for(index in classes) {
      if(brands.indexOf( classes[index] ) > -1) {
        brand = classes[index];
      }
    }

    var properties = window.location.search.substring(1).split('&');
    var params = {};
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

    importLink('https://static.scania.com/resources/brands/css/' + brand + '.css', 'stylesheet', null, window.corporate_elm);

    var favicon_root = "https://static.scania.com/resources/logotype/" + brand + "/favicon/";

    importLink(favicon_root + 'favicon.ico', 'shortcut icon', null, window.corporate_elm.parentNode);

    importLink(favicon_root + 'apple-icon-57x57.png', 'apple-touch-icon', null, window.corporate_elm.parentNode, {sizes:'57x57'});
    importLink(favicon_root + 'apple-icon-60x60.png', 'apple-touch-icon', null, window.corporate_elm.parentNode, {sizes:'60x60'});
    importLink(favicon_root + 'apple-icon-72x72.png', 'apple-touch-icon', null, window.corporate_elm.parentNode, {sizes:'72x72'});
    importLink(favicon_root + 'apple-icon-76x76.png', 'apple-touch-icon', null, window.corporate_elm.parentNode, {sizes:'76x76'});
    importLink(favicon_root + 'apple-icon-114x114.png', 'apple-touch-icon', null, window.corporate_elm.parentNode, {sizes:'114x114'});
    importLink(favicon_root + 'apple-icon-120x120.png', 'apple-touch-icon', null, window.corporate_elm.parentNode, {sizes:'120x120'});
    importLink(favicon_root + 'apple-icon-144x144.png', 'apple-touch-icon', null, window.corporate_elm.parentNode, {sizes:'144x144'});
    importLink(favicon_root + 'apple-icon-152x152.png', 'apple-touch-icon', null, window.corporate_elm.parentNode, {sizes:'152x152'});
    importLink(favicon_root + 'apple-icon-180x180.png', 'apple-touch-icon', null, window.corporate_elm.parentNode, {sizes:'180x180'});

    importLink(favicon_root + 'android-icon-192x192.png', 'icon', null, window.corporate_elm.parentNode, {sizes:'192x192'});

    importLink(favicon_root + 'favicon-32x32.png', 'icon', null, window.corporate_elm.parentNode, {sizes:'32x32'});
    importLink(favicon_root + 'favicon-96x96.png', 'icon', null, window.corporate_elm.parentNode, {sizes:'96x96'});
    importLink(favicon_root + 'favicon-16x16.png', 'icon', null, window.corporate_elm.parentNode, {sizes:'16x16'});

    importLink(favicon_root + 'manifest.json', 'manifest', null, window.corporate_elm.parentNode);

    generateMeta('msapplication-TileColor', '#000');
    generateMeta('msapplication-TileImage', favicon_root + 'ms-icon-144x144.png');

    document.body.classList.add(brand);
  }

  function setGlobals() {
    window.corporate_elm = document.querySelector('[src*="corporate-ui.js"]');

    var scriptUrl = window.corporate_elm.src,
        port = urlInfo(scriptUrl).port ? ':' + urlInfo(scriptUrl).port : '',
        localhost = urlInfo(scriptUrl).hostname === 'localhost' || urlInfo(scriptUrl).hostname.match(/rd[0-9]+/g) !== null;

    window.corporate_ui_params = urlInfo(scriptUrl).search.substring(1);
    window.static_root = (localhost ? 'http://' : 'https://') + urlInfo(scriptUrl).hostname + port;
    window.version_root = window.static_root + '/' + urlInfo(scriptUrl).pathname.replace('js/corporate-ui.js', '');
    window.protocol = urlInfo(scriptUrl).protocol;
    window.environment = urlInfo(scriptUrl).pathname.split('/')[1];
    window.params = {};

    var params = decodeURI(window.corporate_ui_params).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"');
    if (params !== '') {
      window.params = JSON.parse('{"' + params + '"}');
    }

    window.less = { isFileProtocol: true }; // Is needed for making synchronous imports in less
    window.defaults = {
      appName: 'Application name',
      company: 'Scania'
    };
    public.components = {
      'corporate-header': window.version_root + 'html/component/Navigation/corporate-header/corporate-header.html',
      'corporate-footer': window.version_root + 'html/component/Navigation/corporate-footer/corporate-footer.html',
      'main-content': window.version_root + 'html/component/ContentAndTeasers/main-content/main-content.html',
      'main-navigation': window.version_root + 'html/component/Navigation/main-navigation/main-navigation.html'
    };

    /*window.Polymer = {
      dom: 'shadow'
    };*/
  }

  function polymerInject() {
    /* Extending Polymer _ready method */
    /* We extend _ready and not ready because ready will be overridden when used in a component */
    Polymer.Base._orgReady = Polymer.Base._ready;
    Polymer.Base._ready = function() {
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
          var fullbleed = (this.attributes.fullbleed ? this.attributes.fullbleed.specified : undefined) || (this.properties.fullbleed ? this.properties.fullbleed.value : false);

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
      Polymer.Base._orgReady.call(this);
    }

    /* Makes Polymer apply component specific style in the end of head element */
    Polymer.StyleUtil.orgApplyCss = Polymer.StyleUtil.applyCss;
    Polymer.StyleUtil.applyCss = function(cssText, moniker, target, contextNod) {
      target = target || document.head;
      target.firstChild = target.lastChild;

      var links = target ? target.querySelectorAll('link') : [];

      if (links.length) {
        contextNod = links[ links.length-1 ];
      }

      Polymer.StyleUtil.orgApplyCss.call(this, cssText, moniker, target, contextNod);
    }
  }

  function baseComponents(references) {
    // Adds support for Promise if non exist
    if (typeof(Promise) === 'undefined') {
      return importScript(window.static_root + '/vendors/components/pure-js/es6-promise/4.1.0/dist/es6-promise.js', function() {
        Promise = ES6Promise;
        baseComponents(references);
      }, window.corporate_elm);
    }

    importLink(public.components['main-content'], 'import', null, window.corporate_elm);

    /*if (window.params.preload === 'false') {
      window.ready_event = undefined;
    }*/

    // Maybe we should change importLink to return a promise instead
    var resources = (references || window.preLoadedComponents).map(function(resource) {
      var url = public.components[resource] || resource;
      return new Promise(function(resolve, reject) {
        importLink(url, 'import', function(e) { resolve(e.target) }, window.corporate_elm);
      });
    });

    window.fallback = setTimeout(done, 10000);

    Promise.all(resources).then(done);
  }

  function appendExternals() {
    window.preLoadedComponents = [
      public.components['corporate-header'],
      public.components['corporate-footer'],
      public.components['main-navigation']
    ];

    // Adds support for webcomponents if non exist
    if (!('import' in document.createElement('link'))) {
      importScript(window.static_root + '/vendors/frameworks/webcomponents.js/0.7.24/webcomponents-lite.min.js', null, window.corporate_elm);
    }

    if (window.params.polymer !== 'false') {
      //importLink('/vendors/frameworks/@polymer/polymer/2.0.0/polymer.html', 'import');
      importLink(window.static_root + '/vendors/frameworks/polymer/1.4.0/polymer.html', 'import', polymerInject, window.corporate_elm);
    }

    if (window.params.css !== 'custom') {
      importLink(window.static_root + '/vendors/frameworks/bootstrap/3.2.0/dist/css/bootstrap-org.css', 'stylesheet', null, window.corporate_elm);
      importLink(window.version_root + 'css/corporate-ui.css', 'stylesheet', null, window.corporate_elm);
    }

    baseComponents(window.params.preload === 'false' ? [] : undefined);
  }

  function sysMessages() {
    if (window.protocol === 'http:') {
      console.warn('You are pointing to corporate-ui using "HTTP" protocol and its not supported please change to "HTTPS".');
    }

    if (window.environment === 'development') {
      console.warn('Remeber that you are pointing to our development environment and due to this you might experience some techical difficulties.');
    }

    if (window.ready_event === 'timeout') {
      console.warn('"WebComponentsReady" have not yet been triggered (10sec). Fallback has been initialized.');
    }
  }
}());