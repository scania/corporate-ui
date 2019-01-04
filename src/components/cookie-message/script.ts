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
    var Cookie = this,
      CookieElm = document.querySelector("c-cookie-message"),
      CookieData = Cookie.text ? Cookie.querySelector('.c-cookie-message').innerText : 'Cookie message',
      CookieCloseButtons = CookieElm.querySelectorAll('.close-cookie');

    this._CookieCheckFunction(CookieCloseButtons, CookieData, Cookie);
  },
  _CookieCheckFunction: function(CookieCloseButtons, CookieData, Cookie) {
    // If cookie data exist
    if(Cookies.get(Cookie.name) != CookieData) {
      Cookie. _CookieAddEvent(Cookie, CookieCloseButtons, CookieData);
    } else if(Cookie) {
      Cookie._CookieRemove(Cookie);
    }
  },
  _CookieAddFunction: function(CookieData, Cookie) {
    // Sets the cookie => {Key, value, expire, path}
    Cookies.set(Cookie.name, CookieData, {expires: Cookie.expire || 900, path: Cookie.path || '/'});
    Cookie._CookieRemove(Cookie);
  },
  _CookieAddEvent(Cookie, CookieCloseButtons, CookieData) {
    Array.prototype.map.call(CookieCloseButtons, function(CookieButtonsObj) {
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