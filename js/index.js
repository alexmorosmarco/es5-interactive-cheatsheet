// Start in strict mode so that non-defined variables give an error.
"use strict";

// "alias" for the namespace function
var writeToConsole;

/*****************
 ** APP STARTUP **
 *****************/
(function() {
  function onLoaded() {
    writeToConsole = Browser.Feedback.writeToConsole;
    writeToConsole("timestamp=" + Date.now() + " - Loaded!!!");
    // Register events
    // Track user actions
    var buttons = document.getElementsByTagName('button');
    var i;
    for (i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function(event) {
        var buttonText = this.textContent;
        var section = this.parentElement;
        var sectionText = section.getElementsByTagName('h4')[0].textContent;
        var article = section.parentElement;
        var articleText = article.getElementsByTagName('h3')[0].textContent;

        ga('send', {
          hitType: 'event',
          eventCategory: articleText,
          eventAction: sectionText,
          eventLabel: buttonText
        });
      }, false);
    }
    // Register a click event dynamically
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