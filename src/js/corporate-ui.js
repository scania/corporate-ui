
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

    /* Public constants */
    vendorPaths     : {
      jquery          : 'jquery/dist/jquery.min',
      bootstrap       : 'bootstrap/dist/js/bootstrap.min',

      less            : 'less/dist/less.min',
      hotkeys         : 'jquery.hotkeys/jquery.hotkeys',
      browserReject   : 'components/pure-js/browser-reject/1.0.0/js/browser-reject'
    }
  };

  /*** This starts everything ***/
  init();

  return public;


  function init() {
    setGlobals();

    importLink(window.version_root + 'css/corporate-ui.css', 'stylesheet');

    // Adds support for webcomponents if non exist
    if (!('import' in document.createElement('link'))) {
      importScript(window.vendors_root + 'frameworks/webcomponentsjs/webcomponents-lite.min.js');
    }

    importLink(window.vendors_root + 'polymer/polymer.html', 'import', function(event) {
      polymerInject(event);
      appendExternals(event);
    });

    //importScript(window.vendors_root + public.vendorPaths.less + '.js', appendExternals);

    importScript(window.vendors_root + public.vendorPaths.jquery + '.js', function() {
      importScript(window.vendors_root + public.vendorPaths.hotkeys + '.js');
    });

    // System messages
    sysMessages();

    /*document.documentElement.className += ' polymer-loading';
    document.documentElement.style.opacity = 0;*/

    window.onload = ready;
  }

  function ready() {
    var event = document.createEvent('Event');
    event.initEvent('corporate-ui-loaded', true, true);
    document.dispatchEvent(event);
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

  function appendFavicon() {
    importLink(window.favicon_root + 'favicon.ico', 'shortcut icon');

    importLink(window.favicon_root + 'apple-icon-57x57.png', 'apple-touch-icon', '57x57');
    importLink(window.favicon_root + 'apple-icon-60x60.png', 'apple-touch-icon', '60x60');
    importLink(window.favicon_root + 'apple-icon-72x72.png', 'apple-touch-icon', '72x72');
    importLink(window.favicon_root + 'apple-icon-76x76.png', 'apple-touch-icon', '76x76');
    importLink(window.favicon_root + 'apple-icon-114x114.png', 'apple-touch-icon', '114x114');
    importLink(window.favicon_root + 'apple-icon-120x120.png', 'apple-touch-icon', '120x120');
    importLink(window.favicon_root + 'apple-icon-144x144.png', 'apple-touch-icon', '144x144');
    importLink(window.favicon_root + 'apple-icon-152x152.png', 'apple-touch-icon', '152x152');
    importLink(window.favicon_root + 'apple-icon-180x180.png', 'apple-touch-icon', '180x180');

    importLink(window.favicon_root + 'android-icon-192x192.png', 'icon', '192x192');

    importLink(window.favicon_root + 'favicon-32x32.png', 'icon', '32x32');
    importLink(window.favicon_root + 'favicon-96x96.png', 'icon', '96x96');
    importLink(window.favicon_root + 'favicon-16x16.png', 'icon', '16x16');

    importLink(window.favicon_root + 'manifest.json', 'manifest');

    generateMeta('msapplication-TileColor', '#000');
    generateMeta('msapplication-TileImage', window.favicon_root + 'ms-icon-144x144.png');
  }

  function setGlobals() {
    var scriptUrl = document.querySelector('[src*="corporate-ui.js"]').src,
        port = urlInfo(scriptUrl).port ? ':' + urlInfo(scriptUrl).port : '',
        localhost = urlInfo(scriptUrl).hostname === 'localhost';

    window.static_root = (localhost ? 'http://' : 'https://') + urlInfo(scriptUrl).hostname + port;
    window.version_root = window.static_root + urlInfo(scriptUrl).pathname.replace('js/corporate-ui.js', '');
    window.vendors_root = window.static_root + '/vendors/';
    window.favicon_root = window.static_root + '/resources/logotype/scania/favicon/';
    window.protocol = urlInfo(scriptUrl).protocol;
    window.environment = urlInfo(scriptUrl).pathname.split('/')[1];
    window.less = { isFileProtocol: true }; // Is needed for making synchronous imports in less
    window.defaults = {
      appName: 'Application name',
      company: 'Scania'
    };
    if (localhost) {
      window.vendors_root = window.static_root + '/libs/';
      window.favicon_root = window.vendors_root + '/favicon/';
    }
    window.waitFor = window.waitFor || ['c-corporate-header', 'c-corporate-footer', 'c-main-content'];
  }

  function polymerInject() {
    window.customelements = [];

    function hideUntilDone(customelement) {
      window.customelements.push(customelement);

      var mainElements = window.waitFor,
          elementsLoaded = mainElements.every(function(val) {
            return window.customelements.indexOf(val) !== -1;
          }),
          corporateStyle = document.head.querySelector('link[href$="corporate-ui.css"]');

      if (!mainElements.length || elementsLoaded) {
        document.head.insertBefore(corporateStyle, document.head.childNodes[0]);
        document.documentElement.removeAttribute('style')
        setTimeout(function() {
          document.documentElement.className = document.documentElement.className.replace(' polymer-loading', '');
        }, 100);
      }
    }

    /* Extending Polymer rulesForStyle method */
    // Polymer.StyleUtil.orgRulesForStyle = Polymer.StyleUtil.rulesForStyle;
    // Polymer.StyleUtil.rulesForStyle = function(style, component) {

    //   if(style.rendered) {
    //     return;
    //   }

    //   component = component || this.__lastHeadApplyNode.textContent.trim().split('for ')[1];

    //   style.rendered = true;

    //   var variables = '@import (reference) "' + window.version_root + 'less/corporate-ui/variables.less";';
    //   style.textContent = variables + style.textContent;

    //   /* Adding less support to polymer */
    //   less.render(style.textContent, undefined, function(error, output) {
    //     if (error) {
    //       return console.error(error);
    //     }
    //     style.textContent = output.css;
    //   });

    //   // console.log('Rendering component: ', component, style);

    //   return Polymer.StyleUtil.orgRulesForStyle(style);
    // }

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
            var attributes = this.attributes;

            for (var prop in attributes) {
              // skip loop if the property is from prototype
              if(!attributes.hasOwnProperty(prop) || attributes[prop].name === 'variation') continue;

              variation_container.setAttribute(attributes[prop].name, attributes[prop].value);
            }

            this.parentNode.insertBefore(variation_container, this);
            variation_container.appendChild(this);
          }

          /* Automatically wrapping component inside a container */
          var fullbleed = (this.attributes.fullbleed ? this.attributes.fullbleed.specified : undefined) || (this.properties.fullbleed ? this.properties.fullbleed.value : false);

          if(fullbleed !== true) {
            var container = document.createElement('div'),
                element = this.properties.variation === 0 ? this : this.parentNode;

            container.setAttribute('class', 'container');

            element.parentNode.insertBefore(container, element);
            container.appendChild(element);
          }
        }
      }

      /* Execute the origional function and apply current this to it */
      Polymer.Base._orgReady.call(this);
    }
  }

  function appendExternals() {
    appendFavicon();

    generateMeta('google', 'notranslate');

    window.preLoadedComponents = [
      window.version_root + 'html/component/Bootstrap/bootstrap.html',
      window.version_root + 'html/component/Navigation/corporate-header/corporate-header.html',
      window.version_root + 'html/component/Navigation/corporate-footer/corporate-footer.html',
      window.version_root + 'html/component/Content + Teasers/main-content/main-content.html',
      window.version_root + 'html/component/Navigation/main-navigation/main-navigation.html',
    ];

    for (var i = 0; i < window.preLoadedComponents.length; i++) {
      importLink(window.preLoadedComponents[i], 'import');
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
