Polymer({
  is: name,
  properties: {
    title: String,
    action: String, /* phrase over phone number */
    number: String, /* phone number for contact */
    cta: String, /* label for cta */
    link: String /* link for cta */
  },
  haslink: function() {   
    return this.getAttribute('link') != null;
  },
  attached: function() {
    /*if(this.haslink()) {
      this.getElementsByClassName("btn-container")[0].innerHTML='<button class="btn btn-primary" href=' + this.link + '>' + this.cta + '</button>';
    }*/
  }
});