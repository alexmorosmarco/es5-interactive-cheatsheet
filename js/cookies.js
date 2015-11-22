"use strict";

function readCookie() {
  var c = window.document.cookie;
  window.document.getElementById('cookieInfo').innerHTML = c;
}

function createCookie() {
  // Cookie without expire time: it will expire when refreshing/closing the browser
  document.cookie="username=Alex Moros";
  // Cookie with expire time
  //document.cookie="username=Alex Moros; expires=Thu, 1 Dec 2020 12:00:00 UTC";
  // Cookie with expire time and path
  //document.cookie = "username=Alex Moros; expires=Thu, 1 Dec 2020 12:00:00 UTC; path=/";
}

function createCookie2() {
  document.cookie = "phone=976555123; expires=Thu, 1 Dec 2020 12:00:00 UTC; path=/";
}