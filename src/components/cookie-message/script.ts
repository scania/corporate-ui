var Cookies = require('js-cookie');

Polymer({
  is: name,
  properties: {
    name: String,
    text: String,
    expire: Number,
    path: String,
    lang: {
      type: String,
      value: 'en-gb',
      observer: '_langSupport'
    }
  },
  ready: function(){
    /* Sets Cookie using https://github.com/js-cookie/js-cookie/tree/v2.2.0 */
    var Cookie = this;

    Cookie._CookieCheckFunction(Cookie);
  },
  _CookieCheckFunction: function(Cookie) {
    var CookieData = 'Cookie message stored';

    //if is based on the value not the name of the cookie
    if(Cookies.get(Cookie.name) != CookieData) {
      Cookie. _CookieAddEvent(Cookie, CookieData);
    } else if(Cookie) {
      Cookie._CookieRemove(Cookie);
    }
  },
  _CookieAddFunction: function(CookieData, Cookie) {
    // Sets the cookie => {Key, value, expire, path}
    Cookies.set(Cookie.name, CookieData, {expires: Cookie.expire ? Cookie.expire : 365, path: Cookie.path || '/'});
    Cookie._CookieRemove(Cookie);
  },
  _CookieAddEvent(Cookie, CookieData) {
    var CookieCloseButtons = Cookie.querySelectorAll('.close-cookie'),
    CookieMapping = Array.prototype.map;

    //Map buttons with close-cookie class with function addCookie
    CookieMapping.call(CookieCloseButtons, function(CookieButtonsObj) {
      CookieButtonsObj.addEventListener("click", function() {
        Cookie._CookieAddFunction(CookieData, Cookie);
      });
    });
  },
  _CookieRemove(Cookie) {
    Cookie.parentNode.removeChild(Cookie);
  },
  _langSupport: function(lang, string){
    // Sets the cookie to specific language to modal
    return lang == string;
  }
});