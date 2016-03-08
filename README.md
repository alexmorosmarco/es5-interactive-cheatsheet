# ES5 interactive cheat sheet

<!-- Google Analytics -->
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-73719182-1', 'auto');
  ga('send', 'pageview', '/readme');
</script>

Nowadays there are so many JS frameworks that do the magic for us that finally we get disconnected in some way from what is really happening down there. That and my curiosity made that I didn't find enough just using a framework/technology and that I wanted to understand some of the inner parts of what ES5 provides.

So this project is the result of a big personal research on different **ES5** topics where I wanted to go deeper. Main topic I was interested in at the beginning was the _"class"_ approach (based on the `prototype` property of functions) and _"inheritance"_. My research on both fields took me to some other really interesting topics that I recommend having a look:
* Object constructors: normal ones and the constructor function + `prototype`.
* Object Oriented modeling patterns:
  * The prototype pattern
  * The module pattern
  * The revealing module pattern
  * The revealing prototype pattern
* Inheritance

Besides that, my research also went in other directions like using the native XHR and others. What this project does is giving you just a button to try all of those concepts. The idea is having this "live" examples, instead of documentation, to be able to test them just when we need it.

This project is currently finished according to what I wanted to understand at this point. But I will add new more topics as soon as I go over them.

# How to use it
Just go to http://alexmorosmarco.github.io/es5-interactive-cheatsheet and have fun.

The actions triggered by the buttons are self explanatory, so each button name tells you the general concept of the test.

But you definitely will want to see the code that the button action launches, so just inspect the inline button `onclick` event and you will see the function being executed. I have modularized the code in different files according to the sections names shown on screen, so you will be able to reach the code in seconds.

The decision of using inline declarations for the button events came just to make the tests easier to follow; so please do not blame on me, :wink:.

## Documentation
Most important snippets are documented on code but, as an additional support, you can find below some good documentation of the core concepts I found during my research.

## Advices
Open your browser console before pressing any button in order you to see what's happening, so that every button action is printing out result logs to the console; that will help you follow the code.

Just in some cases I am using `console.table()` to better show the results. If you do not use a [compatible](https://developer.mozilla.org/en-US/docs/Web/API/Console/table#Browser_compatibility) browser, do not worry, the messages will just be logged in the normal way, but that's not fun :stuck_out_tongue_closed_eyes:.

# Core concepts documentation
## The "class" approach
The approach is based on functions `prototype` property and Objects parent/prototype object. These are the clues:
*	Every function F has a property named `prototype`. Its value by default is an object like `{"constructor": F}`, that is an object with one property named `constructor`, with the function itself as value.
*	Every object instance has a property named `__proto__`. Its value is the prototype of the function that was used to construct it. It is also known as the property that informs the object instance “parent” or its “prototype object”. The only object not having parent/`__proto__` is `Object.prototype` cause it is the last one in every prototype chain; so its parent is `null`.
*	An object instance inherits the properties of the prototype contained in its `__proto__` property, what means that when using a property of an object instance, first it is searched in the object instance and if not found it is searched in the `__proto__` of the object instance; so the prototype is the closest concept to the class of an object instance in other programming languages.
*	A literal object instance (`var alex = {firstName: “Alex”, lastName: “Moros”}`) or a `new Object()` instance has `Object.prototype` as `__proto__`. So `alex.__proto__ == Object.prototype`.

Here you can see a descriptive image that may help you to understand it:
![prototype diagram](/res/images/prototype.png)


### The “constructor function” and “new” keyword
We use this two things to use class behaviour.  
_Example:_
```javascript
function Person (p_firstName, p_lastName) {
  this.firstName = p_firstName;
  this.lastName = p_lastName;
}

var alex = new Person(“Alex”, ”Moros”);
```
In the example the `this` keyword is used to create object properties and give them some value.

_Explanation:_
*	A **“constructor function”** is a normal function that is used to create an object instance via the syntax `new ConstructorFunction()`, which object will have the prototype of the constructor function as parent. Some examples are `new Object()` or `new Person()`. The function needs not to have a return statement or return something different than an object; otherwise the object returned by the return statement would be the new object returned and its parent would depend on how it was created inside the function.

*	Steps that the `new` keyword does:
 1.	A new object is created like this:  
`{__proto__: ConstructorFunction.prototype}`
 2.	The `ConstructorFunction` is executed having `this` as the previously new object created.
 3.	The new updated object is returned so its `__proto__` will inform who is its parent (the constructor function prototype).

### How to check the parent/prototype of an object
There are different ways:
*	`<some constructor function prototype>.isPrototypeOf(<object instance>)`: true if that prototype is in the prototype chain of the instance; so it also looks in the parent of the parents.
*	`<object instance> instance of <some constructor function>`: it is equivalent to previous way.
*	`Object.getPrototypeOf(<object instance>)`: returns the prototype/parent object of the instance.
*	`<object instance>.__proto__`: allowed since ES 2015 and supported by all browsers. It contains the prototype of the constructor function. It is equivalent to previous way.

_Example:_
```javascript
function Person () {}
var alex = new Person();

// checks
console.log(Person.prototype.isPrototypeOf(alex)); //returns true
console.log(Object.prototype.isPrototypeOf(alex)); //returns true
console.log(alex instanceof Person); //returns true
console.log(alex instanceof Object); //returns true
console.log(Object.getPrototypeOf(alex) === Person.prototype); //returns true
console.log(Object.getPrototypeOf(alex) === Object.prototype); //returns false
console.log(alex.__proto__ === Person.prototype); //returns true
console.log(alex.__proto__ === Object.prototype); //returns false
```

## Inheritance
Please note that in ES5 we do not have the concept of “class”, everything are objects, but calling it that way helps to understand how ES can emulate classes and inheritance.

Steps to get inheritance:

* **Step 1 - Define the inheritance chain:** cleanest way to get inheritance, so to create a child class inheriting from other parent class, is to use the `prototype` property of a function to link the child class to the “parent” class and to use the constructor `Object.create(<prototype of the parent>)` to create the new object of the parent class that will be the prototype of the child class. The returned object will just be a new object having as parent the given prototype.

 If we see the example, instead of defining the inheritance through above way, we could have done `Human.prototype = new Animal();` but, even though this does not represent a problem for the inheritance, it is not so clean. If we do that the prototype of the child class is an instance of the parent class so then if we add new properties to the child's prototype it is like the parent has the child’s properties. It is better to do it through the `Object.create()` way so that then we have the child’s prototype as a basic object with the parent’s prototype.

 What is never a good idea is to do `Human.prototype = Animal.prototype;` cause any property we later add to the child’s prototype is being added to the parent’s prototype or, what is worse if the property already existed in the parent, it will override the parent’s property.

* **Step 2 - Define the constructor property of the child class prototype [optional]:** the new object created through `Object.create(<prototype of the parent>)` does not have a “constructor” property so it is a good practice to define it to be the constructor function of the child class. This way it contains the true constructor function that is used to create instances of the child class.

* **Step 3 - Define the properties of the child class:** after doing this we can add to the `prototype` of the child’s class any new property that we want in its class. This can also be done through the second parameter of `Object.create(<prototype of the parent>, <property descriptors>)`, which is property descriptors, but the grammar is too big compared to the benefit it can give us (defining the property descriptors: value, writable, enumerable and configurable).

* **Step 4 - Call parent’s constructor if needed:** if needed, call the constructor of the parent class. We do it through the functions `call` or `apply` of every function, which allow setting their internal `this` property to the first argument we give to them. We can also give arguments to that function through `F.call(<new this>, <argument1, argument2, ...>)` or through `F.apply(<new this>, <array with the arguments>)`.

_Example:_

```javascript
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

console.log(alex instanceof Human); //returns true
console.log(alex instanceof Animal); //returns true
console.log(alex instanceof Object); //returns true
```

# Credits
Thanks to all of these guys/teams for their sites and documentation:
* [Douglas Crockford](http://javascript.crockford.com/)
* [Quirks Mode](http://www.quirksmode.org/js/contents.html)
* [Xah Lee](http://xahlee.info/js/js.html)
* [Variable Not Found](http://www.variablenotfound.com/search/label/javascript)
* [Adequately Good](http://www.adequatelygood.com/tag/javascript/)
* [Dan Wahlin](https://weblogs.asp.net/dwahlin)
* [2ality](http://www.2ality.com/)
* [MDN](https://developer.mozilla.org)
