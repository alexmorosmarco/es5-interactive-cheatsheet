# ES5 interactive cheat sheet

## Introduction
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

## How to use it
Just go to http://alexmorosmarco.github.io/es5-interactive-cheatsheet and have fun.

The actions triggered by the buttons are self explanatory, so each button name tells you the general concept of the test.

But you definitely will want to see the code that the button action launches, so just inspect the inline button `onclick` event and you will see the function being executed. I have modularized the code in different files according to the sections names shown on screen, so you will be able to reach the code in seconds.

The decision of using inline declarations for the button events came just to make the tests easier to follow; so please do not blame on me, :wink:.

### Documentation
Most important snippets are documented on code but, as an additional support, you can find below some good documentation of the core concepts I found during my research.

### Advices
Open your browser console before pressing any button in order you to see what's happening, so that every button action is printing out result logs to the console; that will help you follow the code.

Just in some cases I am using `console.table()` to better show the results. If you do not use a [compatible](https://developer.mozilla.org/en-US/docs/Web/API/Console/table#Browser_compatibility) browser, do not worry, the messages will just be logged in the normal way, but that's not fun :stuck_out_tongue_closed_eyes:.

## Credits
Thanks to all of these guys/teams for their sites and documentation:
* [Douglas Crockford](http://javascript.crockford.com/)
* [Quirks Mode](http://www.quirksmode.org/js/contents.html)
* [Xah Lee](http://xahlee.info/js/js.html)
* [Variable Not Found](http://www.variablenotfound.com/search/label/javascript)
* [Adequately Good](http://www.adequatelygood.com/tag/javascript/)
* [Dan Wahlin](https://weblogs.asp.net/dwahlin)
* [2ality](http://www.2ality.com/)
* [MDN](https://developer.mozilla.org)
