
window.CorporateUi = (function() {

  /*** Public proporties ***/
  var public = {
    /* Public methods */
    importScript    : importScript,
    importLink      : importLink,
    generateMeta    : generateMeta,
    urlInfo         : urlInfo
  };

  /*** This starts everything ***/
  init();

  return public;

  function init() {
    setGlobals();
    polymerInject();
    document.addEventListener("DOMContentLoaded", applyBrand);
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

  function applyBrand() {

    //Should not be hardcoded here
    var brands = ['vw-group', 'audi', 'ducati', 'lamborghini', 'seat', 'volkswagen', 'bentley', 'skoda', 'bugatti', 'porsche', 'scania', 'man', 'vw-truck-bus'];
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
    for(index in properties) {
      var item = properties[index].split('=')
      params[item[0]] = item[1]
    }

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

    importLink(favicon_root + 'favicon.ico', 'shortcut icon', null, window.corporate_elm);

    importLink(favicon_root + 'apple-icon-57x57.png', 'apple-touch-icon', null, window.corporate_elm, {sizes:'57x57'});
    importLink(favicon_root + 'apple-icon-60x60.png', 'apple-touch-icon', null, window.corporate_elm, {sizes:'60x60'});
    importLink(favicon_root + 'apple-icon-72x72.png', 'apple-touch-icon', null, window.corporate_elm, {sizes:'72x72'});
    importLink(favicon_root + 'apple-icon-76x76.png', 'apple-touch-icon', null, window.corporate_elm, {sizes:'76x76'});
    importLink(favicon_root + 'apple-icon-114x114.png', 'apple-touch-icon', null, window.corporate_elm, {sizes:'114x114'});
    importLink(favicon_root + 'apple-icon-120x120.png', 'apple-touch-icon', null, window.corporate_elm, {sizes:'120x120'});
    importLink(favicon_root + 'apple-icon-144x144.png', 'apple-touch-icon', null, window.corporate_elm, {sizes:'144x144'});
    importLink(favicon_root + 'apple-icon-152x152.png', 'apple-touch-icon', null, window.corporate_elm, {sizes:'152x152'});
    importLink(favicon_root + 'apple-icon-180x180.png', 'apple-touch-icon', null, window.corporate_elm, {sizes:'180x180'});

    importLink(favicon_root + 'android-icon-192x192.png', 'icon', null, window.corporate_elm, {sizes:'192x192'});

    importLink(favicon_root + 'favicon-32x32.png', 'icon', null, window.corporate_elm, {sizes:'32x32'});
    importLink(favicon_root + 'favicon-96x96.png', 'icon', null, window.corporate_elm, {sizes:'96x96'});
    importLink(favicon_root + 'favicon-16x16.png', 'icon', null, window.corporate_elm, {sizes:'16x16'});

    //importLink(favicon_root + 'manifest.json', 'manifest', null, window.corporate_elm);

    generateMeta('msapplication-TileColor', '#000');
    generateMeta('msapplication-TileImage', favicon_root + 'ms-icon-144x144.png');

    document.body.classList.add(brand);
  }

  function setGlobals() {
    window.corporate_elm = document.querySelector('[src*="corporate-ui-light.js"]');
    var scriptUrl = window.corporate_elm.src;
    window.params = {};
    window.corporate_ui_params = urlInfo(scriptUrl).search.substring(1);
    var params = decodeURI(window.corporate_ui_params).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"');
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

}());