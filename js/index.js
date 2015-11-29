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
      useNamespace();
    };
  }
  document.addEventListener('DOMContentLoaded', function(event) {
    onLoaded();
  }, false);
  // Worse alternative cause it replaces any previously registered listener
  //window.onload = onLoaded;
}());
/**************
 * STATEMENTS *
 **************/
function testClosure() {
  /**
   * Good closure example. It allows access to private properties from public
   * ones and the other way around.
   */
  function Constructor (privateMessage, publicMessage) {
    var me = this; // The variable "me" is declared to save the "this" value in
    // the closure, so that private methods can access public properties and
    // methods. By default private methods cannot access them cause in that
    // case "this" would mean the owner of the private method called.

    // Properties   
    var privateProperty = privateMessage;
    this.publicProperty = publicMessage;
    // Methods
    var privateMethod = function () {
      writeToConsole('CLOSURE', privateProperty);
      writeToConsole('CLOSURE', me.publicProperty);
    };
    this.publicMethod = function() {
      privateMethod();
    };
  }
  var obj = new Constructor("private message", "public message");
  obj.publicMethod();
}
function testExceptions() {
  try {
    // Exception: there are some extra 'd's
    //adddlert("Welcome guest!");
    // How to throw an exception. It allows String, Number, Boolean or Object
    // and what is thrown is what is caught in the "exception" parameter.
    //throw "Too big"; // Throws a text
    //throw 500; // Throws a number
    //throw {firstName: "Alex", secondName: "Moros"}; // Throws an object
    throw new Error('Some error happened!');
    //throw new SyntaxError('Some error happened!');
    //throw new DOMException('DOM exception!!!');
  } catch (exception) {
    if (exception instanceof SyntaxError) {
      writeToConsole('SyntaxError caught with name "' + exception.name + '" and message "' + exception.message + '"');
    } else if (exception instanceof Error) {
      writeToConsole('Error caught with name "' + exception.name + '" and message "' + exception.message + '"');
    } else {
      writeToConsole('Exception caught with following message: ' + exception);
    }
  } finally {
    writeToConsole('End of try-catch (allways executes)');
  }
}
/****************
 ** NAMESPACES **
 ****************/
function useNamespace() {
  Amm.Util.log('Namespace', 'using a custom namespace...');
}
/****************
 ** NAVIGATION **
 ****************/
function gotoOtherSite() {
  location.href = "http://www.google.es"
}