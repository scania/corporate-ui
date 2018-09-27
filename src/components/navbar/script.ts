Polymer({
  is: name,
  properties: {
    fullbleed: {
      type: Boolean,
      value: true
    }
  },
  ready: function(){
    if(window['params'].monitoring){
      ga('send', {
        hitType: 'event',
        eventCategory: 'c-navbar', //the object that user interact with on the page
        eventAction: 'loaded', // type of interaction with the object
        eventLabel: 'Navbar'  //categorizing events
      });
    }
  }
});
