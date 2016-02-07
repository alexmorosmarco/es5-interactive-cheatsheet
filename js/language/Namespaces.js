"use strict";

if (typeof Language == 'undefined') {
  var Language = {};
}

Language.Namespaces = {};
Language.Namespaces.Util = {
  log: function(tag, msg) {
    if (arguments.length == 2) {
      msg = tag + ': ' + msg;
    } else {
      msg = tag;
    }
    var currentTime = Date();
    console.log(currentTime + " '" + msg + "'");
  }
}