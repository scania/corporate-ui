Polymer({
  is: name,
  properties: {
    headline: String,
    /* label for cta */
    cta: String,
    link: String
  },
  /* boolean function. returns value true if attribute link has a value */
  haslink: function() {
    return this.getAttribute('link') != null;
  },
  ready: function(){
    if(window['params'].monitoring){
      ga('send', {
        hitType: 'event',
        eventCategory: 'c-find-a-dealer-teaser', //the object that user interact with on the page
        eventAction: 'loaded', // type of interaction with the object
        eventLabel: 'Find a dealer teaser ' //categorizing events
      });
    }
  },
  attached: function() {
    /*if(this.haslink()) {
      this.getElementsByClassName("btn-container")[0].innerHTML='<button class="btn btn-primary" href=' + this.link + '><i class="icon-map-marker"></i>' + this.cta + '</button>';
    }*/
    $('i', '.btn-container').css('margin-right', '10px');
    $('i', '.btn-container').css('font-size', '18px');
  }
});
