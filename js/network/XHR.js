"use strict";

if (typeof Network == 'undefined') {
  var Network = {};
}

Network.XHR = {
  /**
   * Will fail cause we are trying to get a resource from a different domain
   * without CORS enabled in the server
   */
  xhrSyncCORSFromDifferentOrigin: function () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://www.gruposcoutokapi.com", false);
    xhr.send();
    writeToConsole(xhr.responseText);
  },

  /**
   * Will succeed cause we are trying to get a resource from a different domain
   * without CORS enabled in the server but via an intermediate reverse proxy
   */
  xhrSyncCORSThroughReverseProxy: function () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://crossorigin.me/http://www.gruposcoutokapi.com", false);
    xhr.send();
    writeToConsole(xhr.responseText);
  },

  xhrSyncCORSThroughReverseProxyWithPreflight: function () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://crossorigin.me/http://www.gruposcoutokapi.com", false);
    // Set a non-simple header to force a preflight CORS request (so using the
    // OPTIONS HTTP Method).
    xhr.setRequestHeader('Content-Type', 'alexxx');
    xhr.send();
    writeToConsole(xhr.responseText);
  },

  xhrAsyncCORSThroughReverseProxyWithPreflight: function () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://crossorigin.me/http://www.gruposcoutokapi.com", true);
    // Set a non-simple header to force a preflight CORS request (so using the
    // OPTIONS HTTP Method).
    xhr.setRequestHeader('Content-Type', 'alexxx');
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        writeToConsole(xhr.responseText);
      }
    }
    xhr.send();
  }
}