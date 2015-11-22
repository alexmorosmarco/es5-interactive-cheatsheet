//Start in strict mode so that non-defined variables give an error.
"use strict";

function warnUserWithHTML() {
  document.getElementById('warnMessage').innerHTML = 'Please, properly fill the field. Current time: ' + Date();
}

function warnUserWithAlert(msg) {
  alert(msg);
}

function warnUserWithConfirmBox() {
  if (window.confirm("Choose an option!") == true) {
    writeToConsole("You have pressed Accept");
  } else {
    writeToConsole("You have pressed Cancel");
  }
}

function warnUserWithPromptBox() {
  var person = window.prompt("Please enter your name", "Alex Moros Marco");
  if (person != null) {
    writeToConsole('Written text in the prompt: ' + person);
  }
}

function writeToConsole(tag, msg) {
  if (arguments.length == 2) {
    msg = tag + ': ' + msg;
  } else {
    msg = tag;
  }
  var currentTime = Date();
  console.log(currentTime + " '" + msg + "'");
}