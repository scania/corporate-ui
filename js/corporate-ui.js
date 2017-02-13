
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
      jquery          : 'frameworks/jQuery/2.2.2/jquery.min',
      bootstrap       : 'frameworks/bootstrap/3.2.0/js/bootstrap.min',

      less            : 'components/pure-js/less.js/2.5.1/dist/less.min',
      hotkeys         : 'components/jQuery/hotkeys/0.1.0/js/jquery.hotkeys',
      browserReject   : 'components/pure-js/browser-reject/1.0.0/js/browser-reject'
    }
  };

  /*** This starts everything ***/
  init();

  return public;


  function init() {
    setGlobals();

    // Special handling for page containing only script element (no html, head, body).
    initMiniHtml();

    document.documentElement.className += ' polymer-loading';
    document.documentElement.style.opacity = 0;

    importLink(window.version_root + 'css/corporate-ui.css', 'stylesheet');

    // Adds support for webcomponents if non exist
    if (!('import' in document.createElement('link'))) {
      importScript(window.vendors_root + 'frameworks/webcomponentsjs/webcomponents-lite.min.js');
    }

    // Add and configure requireJs as well as adding all other dependencies.
    importScript(window.vendors_root + 'frameworks/require/2.3.2/require.js', appendExternals);

    importLink(window.vendors_root + 'frameworks/polymer/latest/polymer.html', 'import', polymerInject);

    // Preload jquery
    importScript(window.vendors_root + public.vendorPaths.jquery + '.js');

    // System messages
    sysMessages();

    window.onload = ready;
  }

  function ready() {
    document.body.className += ' done-loading';
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
    var scriptUrl = document.querySelector('[src*="corporate-ui.js"]').src;
    window.static_root = 'https://' + urlInfo(scriptUrl).hostname;
    window.version_root = window.static_root + '/' + urlInfo(scriptUrl).pathname.replace('js/corporate-ui.js', '');
    window.vendors_root = window.static_root + '/vendors/';
    window.favicon_root = window.static_root + '/resources/logotype/scania/favicon/';
    window.protocol = urlInfo(scriptUrl).protocol;
    window.environment = urlInfo(scriptUrl).pathname.split('/')[1];
    window.less = { isFileProtocol: true }; // Is needed for making synchronous imports in less
    window.defaults = {
      appName: 'Application name',
      company: 'Scania'
    };
    window.waitFor = window.waitFor || ['c-corporate-header', 'c-corporate-footer', 'c-main-content'];
  }

  function polymerInject() {

    PolymerOrg = Polymer;
    window.Polymer = function(prototype) {
      var dependencies = (prototype.dependencies || []).concat(['less']);

      hideUntilDone(prototype.is);

      //console.log(prototype);
      requirejs(dependencies, function() {
        return PolymerOrg(prototype);
      })
    }
    PolymerOrg.Base.chainObject(Polymer, PolymerOrg);

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
    Polymer.StyleUtil.orgRulesForStyle = Polymer.StyleUtil.rulesForStyle;
    Polymer.StyleUtil.rulesForStyle = function(style, component) {

      if(style.rendered) {
        return;
      }

      component = component || this.__lastHeadApplyNode.textContent.trim().split('for ')[1];

      /*if(!less.render) {
        style.timeout = setTimeout(function() {
          return Polymer.StyleUtil.rulesForStyle(style, component);
        }, 500);
        return style.timeout;
      }

      clearTimeout(style.timeout);*/

      style.rendered = true;

      var variables = '@import (reference) "' + window.version_root + 'less/corporate-ui/variables.less";';
      style.textContent = variables + style.textContent;

      /* Adding less support to polymer */
      less.render(style.textContent, undefined, function(error, output) {
        if (error) {
          return console.error(error);
        }
        style.textContent = output.css;
      });

      // console.log('Rendering component: ', component, style);

      return Polymer.StyleUtil.orgRulesForStyle(style);
    }

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

      //  /* Automatically unwrapping container if component should be fullbleed */
      //  if(this.properties.fullbleed || this.attributes.fullbleed) {
      //    //var fullbleed = (this.properties.fullbleed || this.attributes.fullbleed).name;
      //    var container = $(this).closest('.container');
      //    $('> *', container).first().unwrap('<div class="container" />');
      //  }
      }

      /* Execute the origional function and apply current this to it */
      Polymer.Base._orgReady.call(this);
    }

    // Fix for url pointing relative to component instead of current page url
    /*Polymer.ResolveUrl.orgResolveAttrs = Polymer.ResolveUrl.resolveAttrs;
    Polymer.ResolveUrl.resolveAttrs = function(element, ownerDocument) {
      Polymer.ResolveUrl.orgResolveAttrs(element, document);
    }*/

    /*window.PolymerOrg = Polymer;
    Polymer = function(prototype) {
      require([vendors_root + 'components/pure-js/less.js/2.5.1/dist/less.js'], function() {
        PolymerOrg(PolymerOrg.prototype);
      });
    };*/
  }

  function initMiniHtml() {
    if (document.head.children.length === 1) {

      if (navigator.userAgent.indexOf('MSIE') > -1) {
        document.onreadystatechange = isMiniHtmlReady;
      } else {
        document.addEventListener('DOMContentLoaded', isMiniHtmlReady, false);
      }

      window.onload = isMiniHtmlRender;
    }
  }

  function isMiniHtmlReady() {
    var html = document.documentElement,
        body = document.body,
        // Used to make sure we handle the content as UTF-8 even if the file is any other encodeing
        // Used instead of adding charset meta element
        //innerHtml = document.charset === 'UTF-8' ? body.innerHTML : decodeURIComponent(escape( body.innerHTML ));
        innerHtml = body.innerHTML;

    window.bodyContainer = document.createElement('div');
    window.bodyContainer.innerHTML = innerHtml;

    html.className = 'corporate-ui';
    body.innerHTML = '';
  }

  function isMiniHtmlRender() {
    var head    = document.head,
        body    = document.body,
        doctype = document.implementation.createDocumentType('html', '', ''),
        script  = document.querySelector('[src*="corporate-ui.js"]'),
        title   = document.createElement('title'),
        header  = window.bodyContainer.querySelector('c-corporate-header')    || document.createElement('c-corporate-header'),
        main    = window.bodyContainer.querySelector('c-main-content')        || document.createElement('c-main-content'),
        footer  = window.bodyContainer.querySelector('c-corporate-footer')    || document.createElement('c-corporate-footer'),
        company = script.getAttribute('company') || window.defaults.company;

    header.siteName = header.siteName || script.getAttribute('name') || window.defaults.appName;
    title.innerHTML = script.getAttribute('title') || header.siteName + ' | ' + company;
    body.className = body.className.replace(' polymer-loading', '');
    body.className += ' ' + company.toLowerCase();

    // Add elements to the page
    document.insertBefore(doctype, document.childNodes[0]);
    head.appendChild(title);
    body.appendChild(header);
    body.appendChild(main);
    body.appendChild(footer);
  }

  function appendExternals() {
    CorporateUi.require = (function () { return require; }());

    CorporateUi.require.config({
      baseUrl     : window.vendors_root,
      paths: {
        requireLib: 'require'
      },
      namespace   : 'CorporateUi',
      modules: [
        {
          name: 'CorporateUi',
          include: ['requireLib'],
          create: true
        }
      ],
      waitSeconds : 500,
      paths       : public.vendorPaths,
      shim        : {
        bootstrap       : ['jquery'],
        hotkeys         : ['jquery']
      }
    });

    CorporateUi.require(['bootstrap', 'hotkeys'], function() {

      appendFavicon();

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
    });

    /*importScript(PATH.jQuery, function() {
      $.getScript(PATH.bootstrap);
      $.getScript(PATH.hotkeys);
      $.getScript(window.version_root + "js/bootstrap/scania-bootstrap-addons.js");

      if (!('import' in document.createElement('link'))) {
        $.getScript(PATH.webcomponents);
      }

      $.getScript(PATH.browserReject);

      appendFavicon();

      importLink(PATH.polymer, 'import', function() {

        window.preLoadedComponents = [
          window.version_root + 'html/component/Bootstrap/bootstrap.html',
          window.version_root + 'html/component/Navigation/corporate-header/corporate-header.html',
          window.version_root + 'html/component/Navigation/corporate-footer/corporate-footer.html',
          window.version_root + 'html/component/Content + Teasers/main-content/main-content.html',
          window.version_root + 'html/component/Navigation/main-navigation/main-navigation.html',
        ];

        $.getScript(PATH.less, function(data, textStatus, jqxhr) {
          for (var i = 0; i < window.preLoadedComponents.length; i++) {
            importLink(window.preLoadedComponents[i], 'import' );
          }

          polymerInject();
        });
      });
   
      importLink(window.version_root + 'css/corporate-ui.css', 'stylesheet', function() {
        // This is a test for moving corporate-ui.css infront of polymer shady dom style nodes
        document.documentElement.insertBefore(this, this.parentNode);
      });
    });*/
  }

  function sysMessages() {
    if (window.protocol === 'http:') {
      console.warn('You are pointing to corporate-ui using "HTTP" protocol and its not supported please change to "HTTPS".');
    }

    if (window.environment === 'development') {
      console.warn('Remeber that you are pointing to our development environment and due to this you might experience some techical difficulties.');
    }
  }

  // TODO - This shoudld be move to a more slick specific place, its kept here for now...
  // It needs to be run durring polymer event atached and the slick init needs be 
  // executed durring create for it to work as intended...
  /*function preSlick(elm) {
    elm.before_transformed = [];

    $('> *', elm).each(function(key, value) {
      elm.before_transformed.push( elm.children[key] );
    })

    $(elm).on('init', function(event, slick) {
      if(slick.options.infinite) {
        $('.slick-cloned', event.target).each(function() {
          var node = this.nodeName.replace(/-VARIATION-\d+/g, ''),
              elm = $(node, this).length ? $(node, this) : $(this),
              html = $(node, this).length ? elm.attr('outerhtml'): elm.attr('innerhtml');

          //$(this).html(html);
          //elm.unwrap();
        });
      }
    });
  }*/
}());
