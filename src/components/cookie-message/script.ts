Polymer({
  is: name,
  properties: {
    text: String,
    expire: Number
  },
  ready: function(){
    var Cookie = this;
    var CookieMessage = Cookie.text
    var CookieElm = document.querySelector("c-cookie-message")
    var CookieClose = CookieElm.querySelector(".close-cookie")

    this._CookieCheckFunction(CookieClose, CookieMessage, Cookie);
  },
  _CookieCheckFunction: function(CookieClose, CookieMessage, Cookie) {
    CookieClose.addEventListener('click', function(CookieMessage){
      // Add Cookie
      Cookie._CookieAddFunction(CookieMessage, Cookie);
    });
  },
  _CookieAddFunction: function(CookieMessage, Cookie) {

    // Sets Cookie on click
    Cookies.set('Scania-Cookie', CookieMessage, {expires: this.expire || 900, path: ''});
    Cookie.style.display = "none";
  }
});