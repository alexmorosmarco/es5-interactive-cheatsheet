"use strict";

if (typeof Browser == 'undefined') {
  var Browser = {};
}

Browser.Cookies = {
  readCookie: function () {
    var c = window.document.cookie;
    window.document.getElementById('cookieInfo').innerHTML = c;
  },

  createCookie: function () {
    // Cookie without expire time: it will expire when refreshing/closing the browser
    document.cookie="username=Alex Moros";
    // Cookie with expire time
    //document.cookie="username=Alex Moros; expires=Thu, 1 Dec 2020 12:00:00 UTC";
    // Cookie with expire time and path
    //document.cookie = "username=Alex Moros; expires=Thu, 1 Dec 2020 12:00:00 UTC; path=/";
  },

  createCookie2: function () {
    document.cookie = "phone=976555123; expires=Thu, 1 Dec 2020 12:00:00 UTC; path=/";
  }
}