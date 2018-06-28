Polymer({
  is: name,
  behaviors: [
    Polymer.IronJsonpLibraryBehavior
  ],
  properties: {
    /** @private */
    mapsUrl: {
      type: String,
      value: 'https://maps.googleapis.com/maps/api/js?callback=%%callback%%'
    },
    /**
     * A Maps API key. To obtain an API key, see developers.google.com/maps/documentation/javascript/tutorial#api_key.
     */
    apiKey: {
      type: String,
      value: ''
    },
    /**
     * A Maps API for Business Client ID. To obtain a Maps API for Business Client ID, see developers.google.com/maps/documentation/business/.
     * If set, a Client ID will take precedence over an API Key.
     */
    clientId: {
      type: String,
      value: ''
    },
    /**
     * Version of the Maps API to use.
     */
    version: {
      type: String,
      value: '3.exp'
    },
    /**
     * The localized language to load the Maps API with. For more information
     * see https://developers.google.com/maps/documentation/javascript/basics#Language
     *
     * Note: the Maps API defaults to the preffered language setting of the browser.
     * Use this parameter to override that behavior.
     */
    language: {
      type: String,
      value: ''
    },
    /**
     * If true, sign-in is enabled.
     * See https://developers.google.com/maps/documentation/javascript/signedin#enable_sign_in
     */
    signedIn: {
      type: Boolean,
      value: false
    },
    /**
     * Fired when the Maps API library is loaded and ready.
     * @event api-load
     */
    /**
     * Name of event fired when library is loaded and available.
     */
    notifyEvent: {
      type: String,
      value: 'api-load'
    },
    /** @private */
    libraryUrl: {
      type: String,
      computed: '_computeUrl(mapsUrl, version, apiKey, clientId, language, signedIn)'
    }
  },
  _computeUrl: function(mapsUrl, version, apiKey, clientId, language, signedIn) {


    var url = mapsUrl + '&v=' + version;
    // Always load all Maps API libraries.
    url += '&libraries=drawing,geometry,places,visualization';
    if (apiKey && !clientId) {
      url += '&key=' + apiKey;
    }
    if (clientId) {
      url += '&client=' + clientId;
    }
    // Log a warning if the user is not using an API Key or Client ID.
    if (!apiKey && !clientId) {
      var warning = 'No Google Maps API Key or Client ID specified. ' +
          'See https://developers.google.com/maps/documentation/javascript/get-api-key ' +
          'for instructions to get started with a key or client id.';
      console.warn(warning);
    }
    if (language) {
      url += '&language=' + language;
    }
    if (signedIn) {
      url += '&signed_in=' + signedIn;
    }
    return url;
  },
  /**
   * Provides the google.maps JS API namespace.
   */
  api: function() {
    return google.maps;
  }
}); 