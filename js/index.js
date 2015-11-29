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
  //Ejemplo practico de Closure: Acceso desde miembros privados a miembros publicos
  function Constructor(msjPrivado, msjPublico) {
    var propiedadPrivada = msjPrivado;
    this.propiedadPublica = msjPublico;
    var that = this;
    /* La variable 'that' sera guardada en el closure para ser 
       utilizada en su momento por la funcion metodoPrivado() 
       ya que los metodos privados no pueden acceder a metodos
       publicos porque en ese caso 'this' representa a 'Window'*/
    var metodoPrivado = function() {
      writeToConsole('CLOSURE', propiedadPrivada);
      writeToConsole('CLOSURE', that.propiedadPublica);
    };
    this.metodoPublico = function() {
      metodoPrivado();
    };
  }
  var obj = new Constructor("mensaje privado", "mensaje publico");
  obj.metodoPublico();
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