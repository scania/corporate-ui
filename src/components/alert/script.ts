Polymer({
  is: name,
  properties: {
    fullbleed: true,
    type: {
      type: String,
      value: "info"
    }
  },
  ready: function(){
    if(window['params'].monitoring){
      ga('send', {
        hitType: 'event',
        eventCategory: 'c-alert', //the object that user interact with on the page
        eventAction: 'loaded', // type of interaction with the object
        eventLabel: 'Alert '+this.type  //categorizing events
      });
    }

  }
});
