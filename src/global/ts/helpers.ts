
export {
  EventStore,
  getUrlParameter,
  indexOf,
  createCookie,
  readCookie,
  eraseCookie,
  importScript,
  importLink,
  generateMeta,
  urlInfo
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
    let newEvent:any = document.createEvent('Event');
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
  let indexOf;
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
    var date:any = new Date();

    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = '; expires=' + date.toGMTString();
  }
  else var expires = '';
  document.cookie = name + '=' + value + expires + '; path=/';
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

function importLink(href, type, callback, target, attrs=undefined) {
  var link:any = document.createElement('link'),
      target = target || document.head;

  if ( !('onload' in link) ) {
    let imgTag = document.createElement('img');
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
