"use strict";

if (typeof Browser == 'undefined') {
  var Browser = {};
}

Browser.Navigation = {
  gotoOtherSite: function () {
    location.href = "http://www.google.es"
  }
}