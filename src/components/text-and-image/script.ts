Polymer({
  is: name,
  properties: {
    image: String
  },
  ready: function(){
    if(window['params'].monitoring){
      ga('send', {
        hitType: 'event',
        eventCategory: 'c-text-and-image', //the object that user interact with on the page
        eventAction: 'loaded', // type of interaction with the object
        eventLabel: 'Text and image'  //categorizing events
      });
    }

  }
});
