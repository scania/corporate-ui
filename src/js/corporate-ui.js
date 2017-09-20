
CorporateUi = (function() {

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
    EventStore      : EventStore
  };

  /*** This starts everything ***/
  init();

  return public;


  function init() {
    AppEventStore = new EventStore();

    setGlobals();

    addMetaAndHeaderSpecs();

    // Add dependencies.
    appendExternals();

    appendFavicon();

    // System messages
    sysMessages();

    ready();
  }

  function ready() {
    document.addEventListener("DOMContentLoaded", function(e) {
      e.target.body.setAttribute('unresolved', ' ');

      setTimeout(function() {
        // We have this just to be sure application is never left in a invisible state
        // If error happens the unresolved state might never be resolved this "solves" that...
        document.body.removeAttribute('unresolved');
      }, 5000);
    }, false);

    window.onload = function(e) {
      AppEventStore.apply({ name: 'corporate-ui', action: 'corporate-ui.loaded' });
    };
  }

  function EventStore() {
    this.store = {};
    this.__proto__.apply = apply;
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

  function importLink(href, type, callback) {
    var head = document.head,
        link = document.createElement('link');

    if ( !('onload' in link) ) {
      imgTag = document.createElement(img);
      imgTag.onerror = link.onload;
      imgTag.src = href;
    }

    link.onload = (callback || function(){});
    link.rel = type || 'stylesheet';
    link.href = href;
    head.appendChild(link);
  }

  function importScript(src, callback) {
    var head = document.head,
        script = document.createElement('script'),
        xhr = new XMLHttpRequest();

    script.onload = function() {
      xhr.open('GET', src);
      xhr.onload = (callback || function(){})();
      xhr.send();
    }
    script.src = src;
    head.appendChild(script);
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

    var style = document.createElement('style')
    style.appendChild(document.createTextNode('body[unresolved] { opacity: 0; } body { transition: none; }'));
    document.head.appendChild(style);
  }

  function appendFavicon() {
    var favicon_root = 'https://static.scania.com/resources/logotype/scania/favicon/';

    importLink(favicon_root + 'favicon.ico', 'shortcut icon');

    importLink(favicon_root + 'apple-icon-57x57.png', 'apple-touch-icon', '57x57');
    importLink(favicon_root + 'apple-icon-60x60.png', 'apple-touch-icon', '60x60');
    importLink(favicon_root + 'apple-icon-72x72.png', 'apple-touch-icon', '72x72');
    importLink(favicon_root + 'apple-icon-76x76.png', 'apple-touch-icon', '76x76');
    importLink(favicon_root + 'apple-icon-114x114.png', 'apple-touch-icon', '114x114');
    importLink(favicon_root + 'apple-icon-120x120.png', 'apple-touch-icon', '120x120');
    importLink(favicon_root + 'apple-icon-144x144.png', 'apple-touch-icon', '144x144');
    importLink(favicon_root + 'apple-icon-152x152.png', 'apple-touch-icon', '152x152');
    importLink(favicon_root + 'apple-icon-180x180.png', 'apple-touch-icon', '180x180');

    importLink(favicon_root + 'android-icon-192x192.png', 'icon', '192x192');

    importLink(favicon_root + 'favicon-32x32.png', 'icon', '32x32');
    importLink(favicon_root + 'favicon-96x96.png', 'icon', '96x96');
    importLink(favicon_root + 'favicon-16x16.png', 'icon', '16x16');

    importLink(favicon_root + 'manifest.json', 'manifest');

    generateMeta('msapplication-TileColor', '#000');
    generateMeta('msapplication-TileImage', window.favicon_root + 'ms-icon-144x144.png');
  }

  function setGlobals() {
    var scriptUrl = document.querySelector('[src*="corporate-ui.js"]').src,
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
          var apa = this.nodeName;

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
  }

  function appendExternals() {

    // Adds support for webcomponents if non exist
    if (!('import' in document.createElement('link'))) {
      importScript(window.static_root + '/vendors/frameworks/webcomponents.js/0.7.22/webcomponents-lite.min.js');
    }

    // Adds support for Promise if non exist
    if (typeof(Promise) === 'undefined') {
      importScript(window.static_root + '/vendors/es6-promise/dist/4.1.0/es6-promise.js');
    }

    if (window.params.polymer !== 'false') {
      //importLink('/vendors/frameworks/@polymer/polymer/2.0.0/polymer.html', 'import');
      importLink(window.static_root + '/vendors/frameworks/polymer/1.4.0/polymer.html', 'import', polymerInject);
    }

    if (window.params.css !== 'custom') {
      importLink(window.static_root + '/vendors/frameworks/bootstrap/3.2.0/dist/css/bootstrap-org.css', 'stylesheet')
    }

    importLink(window.version_root + 'css/corporate-ui.css', 'stylesheet');

    if (window.params.preload !== 'false') {
      window.preLoadedComponents = [
        window.version_root + 'html/component/Navigation/corporate-header/corporate-header.html',
        window.version_root + 'html/component/Navigation/corporate-footer/corporate-footer.html',
        window.version_root + 'html/component/Content + Teasers/main-content/main-content.html',
        window.version_root + 'html/component/Navigation/main-navigation/main-navigation.html'
      ];

      for (var i = 0; i < window.preLoadedComponents.length; i++) {
        importLink(window.preLoadedComponents[i], 'import');
      }
    }
  }

  function sysMessages() {
    if (window.protocol === 'http:') {
      console.warn('You are pointing to corporate-ui using "HTTP" protocol and its not supported please change to "HTTPS".');
    }

    if (window.environment === 'development') {
      console.warn('Remeber that you are pointing to our development environment and due to this you might experience some techical difficulties.');
    }
  }
}());