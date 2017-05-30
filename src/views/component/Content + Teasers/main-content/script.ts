Polymer({
  is: name,
  properties: {
    variation: 0,
    fullbleed: {
      type: Boolean,
      value: true
    }
  },
  attached: function() {
    var self = this;

    $('head').append('<style>html,body { height: 100%; }</style>');

    this.setContentHeight(this);

    window.onresize = function() {
      self.setContentHeight(self);
    }
  },
  setContentHeight: function(elm) {
    var header  = document.querySelector('c-corporate-header'),
        main    = document.querySelector('c-main-content'),
        content = main.querySelector('.content'),
        footer  = document.querySelector('c-corporate-footer'),
        pageref = window.location.pathname,
        lastPos = CorporateUi.readCookie(pageref) || '0:0',
        component = elm,
        headerHeight = header.getBoundingClientRect().height || 0.0,
        footerHeight = footer.getBoundingClientRect().height || 0.0;

    /* Wait for everything to be loaded before continuing */
    if (!(header && headerHeight && component && footer)) {
      setTimeout(function() {
        component.setContentHeight(component);
      }, 10);
      return;
    }

    $(component).css({
      'padding-top'     : headerHeight,
      'margin-top'      : headerHeight * -1,
      'padding-bottom'  : footerHeight,
      'margin-bottom'   : footerHeight * -1
    });
  }
});