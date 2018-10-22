Polymer({
  is: name,
  properties: {
    name: String,
    text: String,
    expire: Number,
    lang: String
  },
  attached: function(){
    var Cookie = this,
      CookieMessage = Cookie.text || Cookie.querySelector('.c-cookie-message').innerText,
      CookieElm = document.querySelector("c-cookie-message"),
      CookieClose = CookieElm.querySelector(".close-cookie");

    this._CookieCheckFunction(CookieClose, CookieMessage, Cookie);
  },
  _CookieCheckFunction: function(CookieClose, CookieMessage, Cookie) {

    console.log(Cookies.get("Scania-Cookie"))

    CookieClose.addEventListener('click', function(){
      // Add Cookie
      Cookie._CookieAddFunction(CookieMessage, Cookie);
    });
  },
  _CookieAddFunction: function(CookieMessage, Cookie) {

    // Sets Cookie using https://github.com/js-cookie/js-cookie/tree/v2.2.0
    Cookies.set('Scania-Cookie', CookieMessage, {expires: this.expire || 900, path: ''});
    Cookie.style.display = "none";
  },
  _CookieRemoveFunction: function(){

  }
});