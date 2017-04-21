Polymer({
      is: 'c-main-content',
      properties: {
        variation: 0,
        fullbleed: {
          type: Boolean,
          value: true
        }
      },
      attached: function(elm) {
        var header  = document.querySelector('c-corporate-header'),
            main    = document.querySelector('c-main-content'),
            content = main.querySelector('.content'),
            footer  = document.querySelector('c-corporate-footer'),
            pageref = window.location.pathname,
            lastPos = CorporateUi.readCookie(pageref) || '0:0',
            component = elm || this,
            headerHeight = header.getBoundingClientRect().height,
            footerHeight = footer.getBoundingClientRect().height;

        if (!window.onresize) {
          window.onresize = function() {
            component.attached(component);
          }
        }

        /* Wait for everything to be loaded before continuing */
        if (!(header && headerHeight && component && footer)) {
          setTimeout(function() {
            component.attached(component);
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