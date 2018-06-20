
 Loads specified jsonp library.
  Example:
      <iron-jsonp-library
        library-url="https://apis.google.com/js/plusone.js?onload=%%callback%%"
        notify-event="api-load"
        library-loaded="{{loaded}}"></iron-jsonp-library>
  Will emit 'api-load' event when loaded, and set 'loaded' to true
  Implemented by  Polymer.IronJsonpLibraryBehavior. Use it
  to create specific library loader elements.
  @demo