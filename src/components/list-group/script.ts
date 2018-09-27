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
        eventCategory: 'c-list-group', //the object that user interact with on the page
        eventAction: 'loaded', // type of interaction with the object
        eventLabel: 'List group' //categorizing events
      });
    }

  }
});
