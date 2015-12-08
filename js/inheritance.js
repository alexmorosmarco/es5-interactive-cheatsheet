"use strict";
/**
 * IMPORTANT NOTES ABOUT JAVASCRIPT AND INHERITANCE:
 *
 * -Prototype based patterns allow to consume less memory, so that it lets
 *  defining functions and properties in the prototype rather than in each
 *  instance. So they will consume memory only once, in the prototype, and every
 *  instance/object will have access to them so that every instance inherits
 *  from the prototype.
 *
 * -There's no way to implement "protected" attributes (create properties in a
 *  base prototype that inheriting prototypes can use, but the outside world
 *  can't).
 */

/*  "Class" model to be implemented and analyzed using different programming
    patterns.

    Person: parent Class
        //Private attributes
        -name
        -birthDate
        -DNI
        //Public attributes
        //Private methods
        //Public methods
        +getName()
        +getBirthDate()
        +getDNI()
        +getAge()//uses other public function: getBirthDate()
        //Constructor: new Person(name,birthDate,DNI)

    WorkerPerson (extends Person, child class)
        //Public static vars
        RETIREMENT_AGE = 65
        //Private attributes
        //Public attributes
        +profession
        +company
        //Private methods
        //Public methods
        +getYearsToRetirement()//uses a parent public function: getAge()
        //Constructor: call to Person constructor
 */
function testInheritance () {
  // 1-Standard inheritance through prototype and Object.create()
  var TAG = 'SI';
  // Parent class
  function Animal () {}
  Animal.prototype.legs = 4;

  // Child class
  function Human () {
    // Step 4 - Call parent’s constructor if needed
    Animal.call(this);
  }
  // Step 1 - Define the inheritance chain
  Human.prototype = Object.create(Animal.prototype);
  // Step 2 - Define the constructor property of the child class prototype [optional]
  Human.prototype.constructor = Human;
  // Step 3 - Define the properties of the child class
  Human.prototype.legs = 2;
  Human.prototype.arms = 2;

  var alex = new Human();
  writeToConsole(TAG, alex instanceof Human);
  writeToConsole(TAG, alex instanceof Animal);
  writeToConsole(TAG, alex instanceof Object);

  // 2-Setting prototype manually (THE PROTOTYPE PATTERN and inheritance, thus
  // using a constructor function and defining its prototype)
  // Parent class
  var CalculatorTPP = function (n1, n2) {
    // Public properties (unique to an object instance)
    this.init(n1,n2);
  };
  CalculatorTPP.prototype = {
    // Public properties/methods
    tag: 'CalculatorTPP',
    init: function (n1, n2) {
      this.num1 = n1;
      this.num2 = n2;
    },
    sum: function() {
      return this.num1 + this.num2;
    },
    logSum: function () {
      writeToConsole(this.tag, this.sum());
    }
  };
  // Child class
  var CorruptCalculatorTPP = function (n1, n2) {
    CalculatorTPP.call(this,n1,n2);
    this.corruptIncrease = 100;
  };
  // Below code is the manual way of inheriting in JS.
  function extendParentClass0 () {
    CorruptCalculatorTPP.prototype = Object.create(CalculatorTPP.prototype);
    CorruptCalculatorTPP.prototype.constructor = CorruptCalculatorTPP;
    // Override properties that were inherited from CalculatorTPP
    CorruptCalculatorTPP.prototype.tag = 'CorruptCalculatorTPP';
    CorruptCalculatorTPP.prototype.sum = function () {
      return this.num1 + this.num2 + this.corruptIncrease;
    };
  }
  // Below code is a much cleaner solution to extend a parent "Class".
  function extendParentClass1 () {
    function extend (parentClass, newProperties) {
      var newPrototype = new parentClass();
      var p;
      for (p in newProperties) {
        newPrototype[p] = newProperties[p];
      };
      return newPrototype;
    }
    CorruptCalculatorTPP.prototype = extend(CalculatorTPP,{
      tag: 'CorruptCalculatorTPP',
      sum: function () {
        return this.num1 + this.num2 + this.corruptIncrease;
      }
    });
  }
  // Below code is the inverse of previous alternative. In this case the
  // prototype is an Object whose prototype (__proto__) is the parent "Class".
  // This solution is analog to the child "Class" prototype definition. It
  // may give different results from previous solution when using methods like
  // getPrototypeOf().
  function extendParentClass2 () {
    CorruptCalculatorTPP.prototype = {
      tag: 'CorruptCalculatorTPP',
      sum: function () {
        return this.num1 + this.num2 + this.corruptIncrease;
      }
    };
    CorruptCalculatorTPP.prototype.__proto__ = new CalculatorTPP();
  }
  extendParentClass1();
  var corrCalcTPP = new CorruptCalculatorTPP(2,3);
  writeToConsole(corrCalcTPP.tag,corrCalcTPP.num1);
  writeToConsole(corrCalcTPP.tag,corrCalcTPP.corruptIncrease);
  corrCalcTPP.logSum();
  writeToConsole(corrCalcTPP.tag,(CorruptCalculatorTPP.prototype).isPrototypeOf(corrCalcTPP));
  writeToConsole(corrCalcTPP.tag,(CalculatorTPP.prototype).isPrototypeOf(corrCalcTPP));
  writeToConsole(corrCalcTPP.tag,(Object.prototype).isPrototypeOf(corrCalcTPP));
  var calcTPP = new CalculatorTPP(2,3);
  writeToConsole(calcTPP.tag,calcTPP.num1);
  writeToConsole(calcTPP.tag,calcTPP.corruptIncrease);// returns undefined
  calcTPP.logSum();
}


//TODO: pensar si con getter/setters ganamos algo para definir propiedades privadas contra funciones tipo getX()
//TODO: intentar pensar soluciones para definir variables privadas
//TODO: HACER LA HERENCIA PERO CON EL TRPP