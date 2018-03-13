Polymer({
  is: name,
  properties: {
    variation: 0,
    fullbleed: {
      value: true
    },
    columns: {
      type: Number,
      value: 3
    }
  },
  created: function() {
    var items = this.children;
    for(var index in items) {
      var item = items[index],
          type;

      if (typeof item !== 'object') continue;

      type = item.getAttribute('type');

      item.outerHTML = '<figure class="panel panel-default"><header class="panel-heading">' + type + '</header><div class="panel-body">' + item.innerHTML + '</div></figure>';
    }
  },
  ready: function() {
    var self = this;
    var temp = $('<figure class="lobipanel-placeholder"></figure>');
    /*$(this)
      .on('sortstart', function(event) {
        self.columns = self.columns + 1;
        $('figure:nth-child(' + self.columns + 'n)', self).after(temp);
        console.log('start')
      })
      .on('sortupdate', function(event) {
        console.log('update')
      })
      .on('sortstop', function(event) {
        temp.remove();
        self.columns = self.columns - 1;
        console.log('stop')
      });*/
    document.addEventListener('toolbox.sortstart', function(e) {
      $('figure:nth-child(' + self.columns + 'n)', self).after(temp);
      self.columns = self.columns + 1;
      console.log('start')
    }, false);

    document.addEventListener('toolbox.sortstop', function(e) {
      temp.remove();
      self.columns = self.columns - 1;
      console.log('stop')
    }, false);

    $('.panel', this)
      .lobiPanel({
        sortable: true,
        reload: false,
        editTitle: false,
        unpin: false,
        expand: false,
        minimize: false
      });
  },
  attached: function() {
    window.$ = window.jQuery = window.preJQuery;
  }
});
