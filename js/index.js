//Start in strict mode so that non-defined variables give an error.
"use strict";
/*****************
 ** APP STARTUP **
 *****************/
(function() {
  function onLoaded() {
    writeToConsole('Loaded!!!');
    // Register events
    window.document.getElementById('btUseNamespace').onclick = function() {
      Language.Namespaces.Util.log('Namespace', 'using a custom namespace...');
    };
  }
  document.addEventListener('DOMContentLoaded', function(event) {
    onLoaded();
  }, false);
  // Worse alternative cause it replaces any previously registered listener
  //window.onload = onLoaded;
}());

/****************
 ** NAVIGATION **
 ****************/
function gotoOtherSite() {
  location.href = "http://www.google.es"
}