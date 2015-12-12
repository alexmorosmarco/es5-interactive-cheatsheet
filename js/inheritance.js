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
  // Class definition using an "object constructor function" and defining public
  // properties in its prototype
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

  // 2-Standard inheritance through a function that does the "dirty work"
  // Parent class
  var CalculatorTPP = function (n1, n2) {
    // Public properties unique to an object instance
    this.init(n1,n2);
  };
  // Public properties
  CalculatorTPP.prototype.tag = 'CalculatorTPP';
  CalculatorTPP.prototype.init = function (n1, n2) {
    this.num1 = n1;
    this.num2 = n2;
  };
  CalculatorTPP.prototype.sum = function() {
    return this.num1 + this.num2;
  };
  CalculatorTPP.prototype.logSum = function () {
    writeToConsole(this.tag, this.sum());
  };

  // Child class
  var CorruptCalculatorTPP = function (n1, n2) {
    this.super.constructor.call(this,n1,n2);
    // Alternative without the 'super' property
    //CalculatorTPP.call(this,n1,n2);
    this.corruptIncrease = 100;
  };
  /**
   * Extends from a parent class manually. The child class will have a "super"
   * property with the parent class prototype as value so that we can call the
   * "super" methods when we want.
   */
  function extendParentClass0 () {
    CorruptCalculatorTPP.prototype = Object.create(CalculatorTPP.prototype);
    CorruptCalculatorTPP.prototype.constructor = CorruptCalculatorTPP;
    CorruptCalculatorTPP.prototype.super = CalculatorTPP.prototype;
    // Override properties that were inherited from CalculatorTPP
    CorruptCalculatorTPP.prototype.tag = 'CorruptCalculatorTPP';
    CorruptCalculatorTPP.prototype.sum = function () {
      return this.super.sum.call(this) + this.corruptIncrease;
      // Alternative without the 'super' property
      //return CalculatorTPP.prototype.sum.call(this) + this.corruptIncrease;
    };
  }
  /**
   * Extends from a parent class through a function that does the dirty work
   */
  function extendParentClass1 () {
    /**
     * Extends a childClass from a parentClass automatically setting the child
     * prototype and its constructor. The newProperties are defined in the new
     * prototype of the child class. The child class will have a "super"
     * property with the parent class prototype as value so that we can call the
     * "super" methods when we want.
     *
     * -childClass: object constructor function of the child
     * -parentClass: object constructor function of the parent
     * -newProperties: object with the properties to be added to the prototype
     * of the child
     */
    function extend (childClass, parentClass, newProperties) {
      var newPrototype = Object.create(parentClass.prototype);
      newPrototype.constructor = childClass;
      newPrototype.super = parentClass.prototype;

      var p;
      for (p in newProperties) {
        newPrototype[p] = newProperties[p];
      };
      childClass.prototype = newPrototype;
    }
    extend(CorruptCalculatorTPP, CalculatorTPP, {
      tag: 'CorruptCalculatorTPP',
      sum: function () {
        return this.super.sum.call(this) + this.corruptIncrease;
        // Alternative without the 'super' property
        //return CalculatorTPP.prototype.sum.call(this) + this.corruptIncrease;
      }
    });
  }

  // Tests
  var testFunctions = [extendParentClass0, extendParentClass1];
  var testFunction;
  var i;
  var testEvaluations = {};
  var testEvaluation;
  for (i in testFunctions) {
    testFunction = testFunctions[i];
    // Execute test
    testFunction();
    // Evaluate test
    testEvaluation = {};
    TAG = testFunction.name;
    var corrCalcTPP = new CorruptCalculatorTPP(2,3);
    testEvaluation['prototype > child'] = (CorruptCalculatorTPP.prototype).isPrototypeOf(corrCalcTPP);// true
    testEvaluation['parent > child'] = (CalculatorTPP.prototype).isPrototypeOf(corrCalcTPP);// true
    testEvaluation['Object > child'] = (Object.prototype).isPrototypeOf(corrCalcTPP);// true
    testEvaluation['child num1 === 2'] = (corrCalcTPP.num1===2);// true
    testEvaluation['child num2 === 3'] = (corrCalcTPP.num2===3);// true
    testEvaluation['child sum === 105'] = (corrCalcTPP.sum()===105);// true
    corrCalcTPP.logSum();// logs 105
    var calcTPP = new CalculatorTPP(2,3);
    testEvaluation['parent num1 === 2'] = (calcTPP.num1===2);// true
    testEvaluation['parent num2 === 3'] = (calcTPP.num2===3);// true
    testEvaluation['parent sum === 5'] = (calcTPP.sum()===5);// true
    calcTPP.logSum();// logs 5
    // Append test evaluation
    testEvaluations[testFunction.name] = testEvaluation;
  }
  console.table(testEvaluations);
}


//TODO: pensar si con getter/setters ganamos algo para definir propiedades privadas contra funciones tipo getX()
//TODO: intentar pensar soluciones para definir variables privadas
//TODO: HACER LA HERENCIA PERO CON EL TRPP