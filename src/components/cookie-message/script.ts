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
      CookieMessage = Cookie.text || Cookie.querySelector('.c-cookie-message').innerText,
      CookieElm = document.querySelector("c-cookie-message"),
      CookieClose = CookieElm.querySelector(".close-cookie"),
      CookieClose2 = CookieElm.querySelector(".modal .close-cookie");
      this._CookieCheckFunction(CookieClose, CookieClose2, CookieMessage, Cookie);
  },
  _CookieCheckFunction: function(CookieClose, CookieClose2, CookieMessage, Cookie) {
    var oldCookie = Cookies.get(Cookie.name);

    // If cookie exist
    if(CookieMessage != oldCookie) {
      CookieClose.addEventListener('click', function(){
        Cookie._CookieAddFunction(CookieMessage, Cookie);
      });
      CookieClose2.addEventListener('click', function(){
        Cookie._CookieAddFunction(CookieMessage, Cookie);
      });
    } else if(this) {
      Cookie.parentNode.removeChild(Cookie)
    }
  },
  _CookieAddFunction: function(CookieMessage, Cookie) {
    Cookies.set(Cookie.name , CookieMessage, {expires: Cookie.expire || 900, path: Cookie.path || '.scania.com'});
    Cookie.parentNode.removeChild(Cookie)
  },
  _langSupport: function(lang, string){
    // Sets the cookie to specific language to modal
    return lang == string;
  }
});