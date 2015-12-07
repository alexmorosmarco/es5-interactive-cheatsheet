"use strict";
/*  IMPORTANT NOTES ABOUT JAVASCRIPT AND INHERITANCE:
    -Prototype based patterns allow to consume less memory, so that it lets
    defining functions and properties in the prototype rather than in each
    instance. So they will consume memory only once, in the prototype, and every
    instance/object will have access to them so that every instance inherits
    from the prototype.

    -There's no way to implement "protected" attributes (create properties in a
    base prototype that inheriting prototypes can use, but the outside world
    can't).

    -It is not possible for a child to invoke a parent method if the child
    overrode that method. So there is no way to call something like
    'super.method()'.
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

  console.log(alex instanceof Human);
  console.log(alex instanceof Animal);
  console.log(alex instanceof Object);

  // 1-Using Object.create() allows to define the prototype.
  function Developer(fullName, programmingLanguage, startYear) {
    this.fullName = fullName;
    this.programmingLanguage = programmingLanguage;
    this.startYear = startYear;
  }
  var rafa = Object.create(Developer.prototype); // New object's prototype/
  // parent is Developer.prototype; we did not use the constructor function
  // of Developer so we did not assign those parameters. It is allowed to use
  // new Developer(...), then the constructor properties will be inherited.
  var o1 = {p1:1};
  // create a object o2, with parent o1, with property “p2”, and also set p2's
  // value and attributes
  var o2 = Object.create( o1,
    {"p2":
    { value : 2,
      writable: true,
      enumerable: true,
      configurable: true
    } 
  }
  );
  writeToConsole(Object.getPrototypeOf(o2) === o1);
  writeToConsole('o2.p1:' + o2["p1"]);
  writeToConsole('o2.p2:' + o2["p2"]);

  // 2-Setting prototype manually (THE PROTOTYPE PATTERN and inheritance, thus
  // using a constructor function and defining its prototype)
  // Parent "Class"
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
        writeToConsole(this.tag + ': ' + this.sum());
      }
    };
  // Child "Class"
  var CorruptCalculatorTPP = function (n1, n2) {
    this.init(n1,n2);
    this.corruptIncrease = 100;
  }
  // Below code is the manual way of inheriting in JS.
  function extendParentClass0 () {
      CorruptCalculatorTPP.prototype = new CalculatorTPP();// Assigning
      // 'new CalculatorTPP()' instead of 'CalculatorTPP.prototype' allows us 
      // to inherit, not only the prototype properties but also the
      // CalculatorTPP constructor properties. It is important to do it like
      // this because if we write 'CalculatorTPP.prototype' and then we
      // override a method like below, the CalculatorTPP.prototype method
      // would be changed (this side effect is not a good idea cause
      // CalculatorTPP instances would get a new method implementation without
      // being expected).
      // Override CorruptCalculatorTPP’s properties that were inherited from
      // CalculatorTPP.
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
  writeToConsole(calcTPP.tag,calcTPP.corruptIncrease);// Will fail, not
  // inherited
  calcTPP.logSum();
}


//TODO: pensar si con getter/setters ganamos algo para definir propiedades privadas contra funciones tipo getX()
//TODO: intentar pensar soluciones para definir variables privadas
//TODO: HACER LA HERENCIA PERO CON EL TRPP