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
  attached: function() {
    /*this.className += ' modal fade';
    this.id = this.id;*/

    $(this)
      .addClass('modal fade in')
      .attr('id', this.id)
      .show();
  }
});