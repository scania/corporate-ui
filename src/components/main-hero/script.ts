Polymer({
  is: name,
  properties: {
    image: {
      type: String,
      value: '/testing/'
    },
    fullbleed: {
      type: Boolean,
      value: true
    }
  },
  ready: function(){
    if(window['params'].monitoring){
      ga('send', {
        hitType: 'event',
        eventCategory: 'c-main-hero', //the object that user interact with on the page
        eventAction: 'loaded', // type of interaction with the object
        eventLabel: 'Main hero' //categorizing events
      });
    }
    
  }
});
