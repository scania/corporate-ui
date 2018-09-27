Polymer({
  is: name,
  properties: {
    title: {
      type: String
    },
    footer: {
      type: Boolean,
      value: function(params) {
        return this.querySelectorAll('footer').length;
      }
    },
    id: String
  },
  class: 'test',
  ready: function(){
    if(window['params'].monitoring){
      ga('send', {
        hitType: 'event',
        eventCategory: 'c-modal', //the object that user interact with on the page
        eventAction: 'loaded', // type of interaction with the object
        eventLabel: 'Modal ' //categorizing events
      });
    }

  },
  attached: function() {
    /*this.className += ' modal fade';
    this.id = this.id;*/

    $(this)
      .addClass('modal fade in')
      .attr('id', this.id)
      .show();
  }
});
