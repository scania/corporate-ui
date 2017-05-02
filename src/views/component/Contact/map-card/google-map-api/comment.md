
Dynamically loads the Google Maps JavaScript API, firing the `api-load` event when ready.
#### Example
    <google-maps-api api-key="abc123" version="3.exp"></google-maps-api>
    <script>
      var mapsAPI = document.querySelector('google-maps-api');
      mapsAPI.addEventListener('api-load', function(e) {
        // this.api === google.maps
      });
    </script>
Any number of components can use `<google-maps-api>` elements, and the library will only be loaded once.
@summary Element wrapper around Google Maps API.
