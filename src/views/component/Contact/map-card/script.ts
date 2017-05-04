  Polymer({
      is: 'c-map-card',
      properties: {
        latitude: {
          type: String,
          value: '52.323902'
        },
        longitude: {
          type: String,
          value: '9.803858'
        },
        apiKey: {
          type: String,
          value: 'AIzaSyDkg9W3MHVTlAZTrXc-vFK_mR0O-ETZ_bU'
        },
        clientId: String,
        version: {
          type: String,
          value: '3.24'
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
        zoom: {
          type: Number,
          value: 15
        },
        _language: String,
        _style: {
          type: Array,
          value: [{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#d3d3d3"}]},{"featureType":"transit","stylers":[{"color":"#808080"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#b3b3b3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"weight":1.8}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#d7d7d7"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ebebeb"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#a7a7a7"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#efefef"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#696969"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#737373"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#d6d6d6"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#dadada"}]}]
        },
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
          title: 'Marker',
          icon: 'https://static.scania.com/development/global/html/component/Contact/map-card/extras/map-pin.png'
        });

        this._map = new google.maps.Map(this.$.map, this._getMapOptions());
        marker.setMap(this._map);

        var zoomControlDiv = document.createElement('div');
              var zoomControl = new ZoomControl(zoomControlDiv, this._map);

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
                  zoomInButton.style.width = '40px';
                  zoomInButton.style.height = '40px';
                  /* Change this to be the .png image you want to use */
                  zoomInButton.style.backgroundImage = 'url("https://static.scania.com/development/global/html/component/Contact/map-card/extras/map-button-zoom-in.png")';
                  zoomInButton.style.margin = '4px';
                  controlWrapper.appendChild(zoomInButton);

                  // Set CSS for the zoomOut
                  var zoomOutButton = document.createElement('div');
                  zoomOutButton.style.width = '40px';
                  zoomOutButton.style.height = '40px';
                  zoomOutButton.style.margin = '4px';
                  /* Change this to be the .png image you want to use */
                  zoomOutButton.style.backgroundImage = 'url("https://static.scania.com/development/global/html/component/Contact/map-card/extras/map-button-zoom-out.png")';
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

              this._map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);

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
          styles: this._style,
        };

        if (this.getAttribute('draggable') != null) {
          mapOptions.draggable = this.draggable
        }
        
        return mapOptions;
      }
    })