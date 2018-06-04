Polymer({
  is: name,
  properties: {
    fullbleed: {
      type: Boolean,
      value: true
    },
    variation: 0,
    latitude: {
      type: String,
      value: '52.323902'
    },
    longitude: {
      type: String,
      value: '9.803858'
    },
    zoom: {
      type: Number,
      value: 15
    },
    controls: {
      type: Boolean,
      value: false
    },
    apiKey: {
      type: String,
      value: 'AIzaSyDkg9W3MHVTlAZTrXc-vFK_mR0O-ETZ_bU'
    },
    clientId: String,
    version: {
      type: String,
      value: '3.27'
    },
    _signedIn: {
      type: Boolean,
      value: false
    },
    _mapsUrl: String,
    _map: {
      type: Object,
      notify: true,
      value: null
    },
    _language: String,
    styles: {
      type: Array,
      value: []
    },
    pin: {
      type: String,
      //value: 'https://static.scania.com/resources/icons/scania/SVG_POS/12_Find_a_dealer_CTA-54-72px.svg'
      value: 'https://static.scania.com/resources/icons/scania/PNG_POS/18_Dealer_locator_map_pin_filled-24-48px.png'
      ///value: 'https://static.scania.com/resources/icons/scania/SVG_POS/26_Truck-54-72px.svg'
    }
  },
  attached: function() {
    this._gMapInit();
  },
  _mapApiLoaded: function() {
    this._gMapInit();
  },
  _gMapInit: function() {
    if (this._map) {

      return; // already initialized
    }
    if (this.$.api.libraryLoaded !== true) {

      return; // api not loaded
    }
    if (!this.isAttached) {

      return; // not attached
    }

    var lati = Number(this.latitude);
    var longi = Number(this.longitude);
    var LatLng = new google.maps.LatLng(lati, longi);

    var marker = new google.maps.Marker({
      position: LatLng,
      title: 'Marker'
      icon: new google.maps.MarkerImage(this.pin, null, null, null, new google.maps.Size(75, 75)),
    });

    this._map = new google.maps.Map(this.$.map, this._getMapOptions());
    marker.setMap(this._map);

    if (this.controls) {
      var zoomControlDiv = document.createElement('div');
      var zoomControl = new ZoomControl(zoomControlDiv, this._map);

      this._map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
    }

    // Taken from scania noe
    function ZoomControl(controlDiv, map) {

      // Creating divs & styles for custom zoom control
      controlDiv.style.padding = '5px';

      // Set CSS for the control wrapper
      var controlWrapper = document.createElement('div');
      controlWrapper.style.backgroundColor = 'transparent';
      controlWrapper.style.borderWidth = '0px';
      controlWrapper.style.cursor = 'pointer';
      controlWrapper.style.textAlign = 'center';
      controlWrapper.style.width = '40px';
      controlWrapper.style.height = '100px';
      controlWrapper.style.color = '#fff';
      controlWrapper.style.fontSize = '25px';
      controlWrapper.style.margin = '13px 10px';
      controlWrapper.style.fontFamily = "AkzidenzGroteskRegular";
      controlDiv.appendChild(controlWrapper);

      // Set CSS for the zoomIn
      var zoomInButton = document.createElement('div');
      zoomInButton.innerText = '+';
      zoomInButton.style.width = '40px';
      zoomInButton.style.height = '40px';
      /* Change this to be the .png image you want to use */
      zoomInButton.style.backgroundColor = '#041e42';
      zoomInButton.style.margin = '4px';
      controlWrapper.appendChild(zoomInButton);

      // Set CSS for the zoomOut
      var zoomOutButton = document.createElement('div');
      zoomOutButton.innerText = '-';
      zoomOutButton.style.width = '40px';
      zoomOutButton.style.height = '40px';
      zoomOutButton.style.margin = '4px';
      /* Change this to be the .png image you want to use */
      zoomOutButton.style.backgroundColor = '#041e42';
      controlWrapper.appendChild(zoomOutButton);

      // Setup the click event listener - zoomIn
      google.maps.event.addDomListener(zoomInButton, 'click', function() {
          map.setZoom(map.getZoom() + 1);
      });

      // Setup the click event listener - zoomOut
      google.maps.event.addDomListener(zoomOutButton, 'click', function() {
        map.setZoom(map.getZoom() - 1);
      });
    };

    this._listeners = {};
    this._updateCenter();
    //this._loadKml();
    //this._updateMarkers();
    //this._updateObjects();
    //this._addMapListeners();
    google.maps.event.addListener(this._map, 'center_changed', function() {
      var center = this._map.getCenter();
      this.latitude = center.lat();
      this.longitude = center.lng();
    }.bind(this));
    

    this.fire('google-map-ready');

    var $this = this;
    $(window).on('resize', function() {
      $this._updateCenter();
    });
  },

  _updateCenter: function() {
    if (this._map && this.latitude !== undefined && this.longitude !== undefined) {
    // allow for latitude and longitude to be String-typed, but still Number valued
      var lati = Number(this.latitude);
      if (isNaN(lati)) {
        throw new TypeError('latitude must be a number');
      }
      var longi = Number(this.longitude);
      if (isNaN(longi)) {
        throw new TypeError('longitude must be a number');
      }
      var newCenter = new google.maps.LatLng(lati, longi);
      var oldCenter = this._map.getCenter();
      if (!oldCenter) {
        // If the map does not have a center, set it right away.
        this._map.setCenter(newCenter);

      } else {
        // Using google.maps.LatLng returns corrected lat/lngs.
        oldCenter = new google.maps.LatLng(oldCenter.lat(), oldCenter.lng());
        // If the map currently has a center, slowly pan to the new one.
        if (!oldCenter.equals(newCenter)) {
          this._map.panTo(newCenter);
        }
      }
    }
  },

  _getMapOptions: function() {
    var mapOptions = {
      zoom: this.zoom,
      tilt:  0,
      mapTypeId: 'roadmap',
      disableDefaultUI: true,
      mapTypeControl: false,
      disableDoubleClickZoom: false,
      scrollwheel: true,
      styles: this.styles,
    };

    if (this.getAttribute('draggable') != null) {
      mapOptions.draggable = this.draggable
    }
    
    return mapOptions;
  }
})