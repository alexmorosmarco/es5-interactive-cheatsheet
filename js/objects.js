"use strict";
/***********
 ** TYPES **
 ***********/
function testTypes() {
  var array = ["Balay", "Siemens", "Bosch"];
  var object = {
    firstName: "Alex",
    lastName: "Moros"
  };
  var num;
  var f = function() {};
  console.log(array);
  console.log(array[0]);
  console.log(object);
  console.log(object.lastName);
  console.log(object['lastName']);
  console.log(f);
  console.log(num);
  console.log(typeof array);
  console.log(typeof object);
  console.log(typeof object.lastName);
  console.log(typeof f);
  console.log(typeof num);
}
/*************
 ** OBJECTS **
 *************/
function testObjects() {
  //1-Constructor with JavaScript object literal
  var TAG = 'CJSOL';
  var personCJSOL = {
    firstName: 'Alex',
    lastName: 'Moros',
    birthYear: 1984,
    getFullName: function() {
      return this.firstName + ' ' + this.lastName;
    }
  };
  //Log values
  writeToConsole(TAG, personCJSOL.getFullName());
  writeToConsole(TAG, personCJSOL.birthYear);
  writeToConsole(TAG, personCJSOL['birthYear'] + ' (accessed as an array)');

  //2-Constructor with 'new Object()'
  //This constructor is slower than literal one
  TAG = 'CNO';
  var personCNO = new Object();
  personCNO.firstName = 'Alex';
  personCNO.lastName = 'Moros';
  personCNO.birthYear = 1984;
  personCNO.getFullName = function() {
    return this.firstName + ' ' + this.lastName;
  };
  //Log values
  writeToConsole(TAG, personCNO.getFullName());
  writeToConsole(TAG, personCNO.birthYear);

  //3-Constructor with an "object constructor function"="object prototype"
  TAG = 'COCF';
  function PersonCOCF(first, last, bYear) {
    this.firstName = first;
    this.lastName = last;
    this.birthYear = bYear;
    this.getFullName = function() {
      return this.firstName + ' ' + this.lastName;
    };
  }
  PersonCOCF.prototype.family = 'Moros Marco'; // This way we add a public
  // property to the prototype of an Object, so every instance of PersonCOCF
  // will inherit it. It has the same result as defining it in the constructor
  // function, but this alternative is better because the property will consume
  // memory just once, in the prototype, rather than in every instance. This is
  // even better when the property is a method so that it is common that the
  // methods are wanted to be shared among instances. The property is accessed
  // as properties defined in the constructor function: 'this.family'. It is
  // NOT possible to access it via 'PersonCOCF.family'.
  PersonCOCF.TYPE = 'human'; // This way we define a public static property at
  // "Class" level. It can only be accessed via 'PersonCOCF.TYPE'; it is not
  // possible to access it via 'instance.TYPE' because it is not inherited, due
  // to actually it has been added to the function object 'PersonCOCF'. This is
  // also useful when we want to define methods at "Class" level.
  var fatherCOCF = new PersonCOCF('Manuel', 'Moros', 1951);
  writeToConsole(TAG, 'family=' + fatherCOCF.family);
  writeToConsole(TAG, 'constructor=' + fatherCOCF.constructor); // Returns
  // object constructor function
  var motherCOCF = new PersonCOCF('Carmen', 'Marco', 1953);
  motherCOCF.sex = "female";
  var x;
  for (x in motherCOCF) {
    writeToConsole(TAG, 'motherCOCF (accessed by a loop): ' + motherCOCF[x]);
  }

  //3-Constructor: one more example with private attributes and methods
  TAG = 'COCF2';
  function Developer(fullName, programmingLanguage, startYear) {
    //Private properties
    var id = fullName + '_' + startYear;
    //Private methods
    var getCurrentYear = function() {
      return new Date().getFullYear();
    };
    //Public properties
    this.fullName = fullName;
    this.programmingLanguage = programmingLanguage;
    this.startYear = startYear;
    //Public methods
    this.yearsOfExperience = function() {
      return getCurrentYear() - this.startYear; // If we put 'startYear'
      // without the 'this', code will use the value received as param when the
      // object was created cause it will be saved in the closure. TAKE CARE!!!
    };
    this.getId = function() {
      return id;
    };
  }
  Developer.prototype.canDevelop = true;
  Developer.TYPE = "DEV";
  //Use Example
  var alex = new Developer("AlexMoros", "javascript", 2008);
  writeToConsole(TAG, alex.getId());
  writeToConsole(TAG, 'Years of experience: ' + alex.yearsOfExperience());
  writeToConsole(TAG, alex.canDevelop);
  writeToConsole(TAG, Developer.TYPE);
  // Parent check
  writeToConsole(TAG, Developer.prototype.isPrototypeOf(alex)); // Returns
  // true if calling object is parent of alex, or parent of an alex parent.
  writeToConsole(TAG, Object.prototype.isPrototypeOf(alex)); // Returns true
  writeToConsole(TAG, alex instanceof Developer); // It has same behaviour as
  // previos statement.
  writeToConsole(TAG, alex instanceof Object); // Returns true
  writeToConsole(TAG, Object.getPrototypeOf(alex) === Developer.prototype); //The
  // prototype/parent/__proto__ of an object is the prototype of its constructor
  // function. 'alex.prototype' is not grammatically correct, so we need that
  // Object function to get its prototype. TAKE CARE OF THIS.
  writeToConsole(TAG, Object.getPrototypeOf(alex) === Object.prototype); //false
  writeToConsole(TAG, alex.__proto__ === Developer.prototype); // It seems we
  // can access it via this property. WARNING: this property is available only
  // in some browsers. It has firstly been defined in ECMAScript 6.
  writeToConsole(TAG, alex.__proto__ === Object.prototype); // Returns false
}
/**************
 ** CLOSURES **
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
/**************
 *  PATTERNS  *
 **************/
function testPatterns() {
  //THE PROTOTYPE PATTERN
  //-Not allows:
  //  *Private attributes/methods definition
  //-Allows:
  //  *Less memory consumption
  var CalculatorTPP = function(n1, n2) {
    // Public properties (unique to an object instance)
    this.num1 = n1;
    this.num2 = n2;
  };
  CalculatorTPP.prototype = {
    // Public properties/methods
    patternName: 'TPP',
    sum: function() {
      return this.num1 + this.num2;
    },
    logSum: function() {
      writeToConsole(this.patternName + ': ' + this.sum());
    }
  };
  var calcTPP = new CalculatorTPP(2, 3);
  calcTPP.logSum();
  //THE MODULE PATTERN
  //-Not allows:
  //  *Less memory consumption
  //-Allows:
  //  *Private and public attributes/methods definition
  var CalculatorTMP = function(n1, n2) {
      // Private attributes/methods
      var patternName = 'TMP';
      var num1 = n1;
      var num2 = n2;
      var sum = function() {
          return num1 + num2;
        }
        // Public properties/methods are created and returned
      return {
        logSum: function() {
          writeToConsole(patternName + ': ' + sum());
        }
      };
      //} (2,3);//One instance alternative
    } //Multiple instances alternative
  var calcTMP = CalculatorTMP(2, 3);
  calcTMP.logSum();
  //THE REVEALING MODULE PATTERN
  //-Not allows:
  //  *Less memory consumption
  //-Allows:
  //  *Private and public attributes/methods definition
  //  *One fast place to see which ones are public
  var CalculatorTRMP = function(n1, n2) {
      // Private attributes/methods
      var patternName = 'TRMP';
      var num1 = n1;
      var num2 = n2;
      var sum = function() {
        return num1 + num2;
      }
      var logSum = function() {
          writeToConsole(patternName + ': ' + sum());
        }
        // Public properties/methods are just returned
      return {
        logSum: logSum
      };
      //} (2,3);//One instance alternative
    } //Multiple instances alternative
    //CalculatorTRMP.logSum();//"One instance" example
  var calcTRMP = CalculatorTRMP(2, 3);
  calcTRMP.logSum();
  var calcTRMP2 = new CalculatorTRMP(2, 3); //new alternative
  calcTRMP2.logSum();
  //THE REVEALING PROTOTYPE PATTERN
  //-Not allows:
  //  *Private attributes definition
  //-Allows:
  //  *Less memory consumption
  //  *Private and public methods definition
  //  *Public properties definition
  //  *One fast place to see which attributes/methods are public
  //  *Private shared attributes definition: every instance shares this
  //  attributes so that they are in a closure at prototype level. WARNING! Any
  //  instance can read the value, and can modify this shared value. It is
  //  recommended to use this only as readable attributes.
  var CalculatorTRPP = function(n1, n2) {
    // Public properties (unique to an object instance)
    this.num1 = n1;
    this.num2 = n2;
  };
  CalculatorTRPP.prototype = function() {
    // Private shared attributes
    var patternName = 'TRPP';
    // Private methods
    var sum = function() {
      return this.num1 + this.num2;
    }
    var logSum = function() {
        //Use of 'call' to allow using 'this' in the private method.
        writeToConsole(patternName + ': ' + sum.call(this));
      }
      // Public properties/methods are just returned
    return {
      logSum: logSum
    };
  }();
  var calcTRPP = new CalculatorTRPP(2, 3);
  calcTRPP.logSum();
  //THE LAZY FUNCTION DEFINITION
  //-Allows:
  //  *Stuff that should be done once, is indeed only done once.
  var getCalculator = function() {
    var calc = new CalculatorTRPP(2, 3);
    //Redefinition of function to avoid executing previous code after the first
    //call
    getCalculator = function() {
      return calc;
    };
    return getCalculator();
  };
  var anyCalculator = getCalculator();
  var anyCalculator2 = getCalculator();
}