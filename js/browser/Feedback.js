"use strict";

if (typeof Browser == 'undefined') {
  var Browser = {};
}

Browser.Feedback = {
  warnUserWithHTML: function () {
    document.getElementById('warnMessage').innerHTML = 'Please, properly fill the field. Current time: ' + Date();
  },

  warnUserWithAlert: function (msg) {
    alert(msg);
  },

  warnUserWithConfirmBox: function () {
    if (window.confirm("Choose an option!") == true) {
      writeToConsole("You have pressed Accept");
    } else {
      writeToConsole("You have pressed Cancel");
    }
  },

  warnUserWithPromptBox: function () {
    var person = window.prompt("Please enter your name", "Alex Moros Marco");
    if (person != null) {
      writeToConsole('Written text in the prompt: ' + person);
    }
  },

  writeToConsole: function (tag, msg) {
    if (arguments.length == 2) {
      msg = tag + ': ' + msg;
    } else {
      msg = tag;
    }
    var currentTime = Date();
    console.log(currentTime + " '" + msg + "'");
  }
}