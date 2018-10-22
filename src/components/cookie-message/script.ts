Polymer({
  is: name,
  properties: {
    name: String,
    text: String,
    expire: Number
  },
  attached: function(){
    /* Sets Cookie using https://github.com/js-cookie/js-cookie/tree/v2.2.0 */
    var Cookie = this,
      CookieMessage = Cookie.text || Cookie.querySelector('.c-cookie-message').innerText,
      CookieElm = document.querySelector("c-cookie-message"),
      CookieClose = CookieElm.querySelector(".close-cookie");

      this._CookieCheckFunction(CookieClose, CookieMessage, Cookie);
  },
  _CookieCheckFunction: function(CookieClose, CookieMessage, Cookie) {
    var oldCookie = Cookies.get(Cookie.name);

    // If cookie exist
    if(CookieMessage != oldCookie) {
      CookieClose.addEventListener('click', function(){
        Cookie._CookieAddFunction(CookieMessage, Cookie);
      });
    } else {
      Cookie.style.display = "none";
    }
  },
  _CookieAddFunction: function(CookieMessage, Cookie) {
    Cookies.set(Cookie.name , CookieMessage, {expires: this.expire || 900, path: ''});
    Cookie.style.display = "none";
  }
});