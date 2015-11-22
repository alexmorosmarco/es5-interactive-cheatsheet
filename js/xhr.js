"use strict";

/**
 * Will fail cause we are trying to get a resource from a different domain
 * without CORS enabled in the server
 */
function xhrSyncCORSFromDifferentOrigin() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://www.gruposcoutokapi.com", false);
  xhr.send();
  writeToConsole(xhr.responseText);
}

/**
 * Will succeed cause we are trying to get a resource from a different domain
 * without CORS enabled in the server but via an intermediate reverse proxy
 */
function xhrSyncCORSThroughReverseProxy() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://crossorigin.me/http://www.gruposcoutokapi.com", false);
  xhr.send();
  writeToConsole(xhr.responseText);
}

function xhrSyncCORSThroughReverseProxyWithPreflight() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://crossorigin.me/http://www.gruposcoutokapi.com", false);
  // Set a non-simple header to force a preflight CORS request (so using the
  // OPTIONS HTTP Method).
  xhr.setRequestHeader('Content-Type', 'alexxx');
  xhr.send();
  writeToConsole(xhr.responseText);
}

function xhrAsyncCORSThroughReverseProxyWithPreflight() {
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