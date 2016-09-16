//////////////
//GOOD PARTS//
//////////////

document.writeln('helloow');

// THIS IS USED TO DEFINE METHODS IN THIS BOOK!!!

Function.prototype.method = function (name, func) {
  this.prototype[name] = func;
  return this;
};

console.log("A==='\\u0041'", "A"==="\u0041");
console.log("'c' + 'a' + 't' === 'cat'", 'c' + 'a' + 't' === 'cat');
console.log('false', Boolean(false));
console.log('undefined', Boolean(undefined));
console.log("''", Boolean(''));
console.log(0, Boolean(0));
console.log(NaN, Boolean(NaN));

///////////
//OBJECTS//
///////////

var empty_object = {};
var stooge = {
  'first-name': 'Jerome',
  'last-name': 'Howard'
};

// objects can nest

var flight = {
  airline: "Oceanic",
  number: 815,
  departure: {
    IATA : "SYD",
    time: "2004-09-22 14:55",
    city: "Sydney"
  },
  arrival: {
    IATA: "LAX",
    time: "2004-09-23 10:42",
    city: "Los Angles"
  }
};

console.log('stooge["first-name"] ', stooge["first-name"]);
console.log('flight.departure.IATA ',flight.departure.IATA);
console.log('stoge["middle-name"] ', stooge["middle-name"]);
console.log('flight.status ',flight.status);
console.log('stooge["FIRST-NAME"] ', stooge["FIRST-NAME"]);

// fill in default values

var middle =  stooge["middle-name"] || "(none)";
var status =  flight.status || "unkown";

// inorder not to get type error use &&

console.log('flight.equipment ', flight.equipment);
//console.log('flight.equipment.model ', flight.equipment.model);
console.log(flight.equipment && flight.equipment.model); //doesnt throw error but returns undefined

// update
stooge['first-name'] = 'Hana';
stooge['middle-name'] = 'Can';
stooge.nickname = 'watermelon';
flight.equipment = {
  model: 'Boeing 777'
};
flight.status = 'overdue';

// objects are passed around by reference
var x = stooge;
x.nickname = 'watermelon';
var nick = stooge.nickname;
console.log(nick); //watermelon

var a = {}, b = {}, c = {}; //each refer to different empty obj
a = b = c = {}; //each refer to the same empty obj

// prototype

// all objects are linked to Object.prototype
if (typeof Object.create !== 'function'){
  Object.create = function(o){
    var F = function(){};
    F.prototype = o;
    return new F();
  };
}

var another_stooge = Object.create(stooge);

another_stooge['first-name'] = 'Burak';
another_stooge['middle-name'] = 'Can';
another_stooge.nickname = 'melon';

stooge.profession = 'developer';

// reflection
console.log('typeof flight.number ', typeof flight.number);
console.log('typeof flight.status ', typeof flight.status);
console.log('typeof flight.arrival ', typeof flight.arrival);
console.log('typeof flight.manifest', typeof flight.manifest);

console.log('typeof flight.toString', typeof flight.toString);
console.log('typeof flight.constructor', typeof flight.constructor);

console.log('flight.hasOwnProperty("number") ',flight.hasOwnProperty('number'));
console.log('flight.hasOwnProperty("constructor")', flight.hasOwnProperty('constructor'));

// enumeration
var name;
for (name in another_stooge) {
  if(typeof another_stooge[name] !== 'function'){
    document.writeln(name + ': ' + another_stooge[name]);
  }
}
// to assure the order of the names
var i;
var properties = [
  'first-name',
  'middle-name',
  'last-name',
  'profession'
];

for (i = 0; i < properties.length; i += 1){
  document.writeln(properties[i] + ': ' +
          another_stooge[properties[i]]);
}
console.log('before deleting the nickname nickname=',another_stooge.nickname);

delete another_stooge.nickname;

console.log('after deleting the nickname nickname=',another_stooge.nickname);

// global abatement

var MYAPP = {};
MYAPP.stooge = {
  "first-name": 'Joe',
  "last-name": "Howard"
};

MYAPP.flight = {
  airline: "Oceanic",
  number: 815,
  departure: {
    IATA: "SYD",
    time: "2004-09-22 14:55",
    city: "Sydney"
  },
  arrival: {
    IATA: "LAX",
    time: "2004-09-23 10:42",
    city: "Los Angeles"
  }
};

/////////////
//FUNCTIONS//
/////////////

var add = function(a,b) {
  return a + b;
};

// method invocation pattern

var myObject = {
  value: 0,
  increment: function(inc) {
    this.value += typeof inc === 'number' ? inc : 1;
  }
};

myObject.increment();
console.log('myObject.value', myObject.value);

myObject.increment(2);
console.log('myObject.value', myObject.value);

// function invocation pattern

// when not a prop of obj it is invoked as func
// when we invoke a func like this the func is bound to global obj
var sum = add (3, 4);
console.log('sum', sum);

//augment myObject with double method

myObject.double = function(){
  var that = this; //Workaround
  var helper =  function(){
    that.value = add(that.value, that.value);
  };
  helper(); //invoke helper as a function
};
myObject.double();
document.writeln(myObject.value);

// constructor invocation pattern

var Quo = function (string) {
  this.status = string;
};

Quo.prototype.get_status = function () {
  return this.status;
};
//functions that are intende to be used with new prefix are called constructors.
var myQuo = new Quo("confused");

document.writeln(myQuo.get_status());


// apply invocation pattern
// lets you choose the value of this
// the first value is that should be bound to this and the secon is an array of params

var array = [3, 4];
var sum  = add.apply(null, array);

var statusObject = {
  status: 'A-OK'
};
//statusObject does not inherit from Qup.prototype
var status = Quo.prototype.get_status.apply(statusObject);

// arguments

var sum = function () {
  var i, sum = 0;
  for (i = 0; i < arguments.length; i += 1) {
    sum += arguments[i];
  }
  return sum;
};
document.writeln(sum(4, 8, 15, 16, 23, 42));

//exceptions

var add =  function (a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw {
      name: 'TypeError',
      message: 'add nedds numbers'
    };
  }
  return a+b;
};

var try_it =  function () {
  try {
    add("seven");
  } catch (e) {
    document.writeln(e.name + ':' + e.message);
  }
};

try_it();

// augmenting types

Function.prototype.method = function (name, func) {
  this.prototype[name] = func;
  return this;
};

Number.method('integer', function(){
  return Math[this < 0 ? 'ceil' : 'floor'](this);
});

document.writeln((-10/3).integer());

String.method('trim', function(){
  return this.replace(/^\s+|\s+$/g, '');
});

document.writeln('"' + " neat   ".trim()+'"');

//add method conditionally

Function.prototype.method = function (name, func) {
  if(!this.prototype[name]) {
    this.prototype[name] =func;
  }
};

// recursion

var hanoi = function (disc, src, aux, dst) {
  if(disc > 0) {
    hanoi(disc -1, src, dst, aux);
    document.writeln('Move disc ' + disc +
  ' from '  + src + ' to ' + dst);
  hanoi(disc  -1, aux, src, dst);
  }
};

hanoi(3, 'Src', 'Aux', 'Dst');

var walk_the_DOM = function walk(node, func) {
  func(node);
  node = node.firstChild;
  while(node) {
    walk(node, func);
    node = node.nextSibling;
  }
}

var getElemensByAttribute = function (att, value) {
  var results = [];

  walk_the_DOM(document.body, function(node) {
    var actual = node.nodeType === 1 && node.getAttribute(att);
    if(typeof actual === 'string' &&
  (actual === value || typeof value !== 'string')){
    results.push(node);
  }
});
return results;
}
var factorial = function factorial(i, a) {
  a = a || 1;
  if (i < 2) {
    return a;
  }
  return factorial(i - 1, a * i);
};
document.writeln(factorial(4));

// Scope

var foo = function() {
  var a = 3, b = 5;
  var bar = function () {
    var b = 7, c =11;
    // a = 3, b = 7, c = 11
    a += b + c;
    // a = 21, b = 7, c = 11
  };
  // a =3, b = 5, c = undefined
  bar();
  // a = 21, b = 5
};

//Closure

var myObject = function(){
  var value = 0;

  return {
    increment: function(inc) {
      value += typeof inc === 'number' ? inc : 1;
    },
    getValue: function() {
      return value;
    }
  };
}();

// maker function called quo
//it is uzed without new prefix

var quo = function (status){
  return {
    get_status: function(){
      return status;
    }
  };
};

var myQuo = quo('amazed');
document.writeln(myQuo.get_status());

// function that sets DOME node's color

var fade = function(node){
  var level = 1;
  var step = function(){
    var hex = level.toString(16);
    node.style.backgroundColor = '#FFFF' + hex + hex;
    if (level<15){
      level += 1;
      setTimeout(step, 100);
    }
  };
  setTimeout(step, 100);
};
fade(document.body);

// bad example
//on click on li element returns length but not i
//the handler functions are bound to variable i
//not the value of the var i

var add_the_bad_handlers = function (nodes) {
  var i;
  for (i = 0; i < nodes.length; i += 1) {
    nodes[i].onclick = function (e) {
      alert(i);
    };
  }
};
// add_the_bad_handlers(document.getElementsByTagName('li'))


// good example
// here instaed of assignin func to onclick
// we define a func and immediately invoke it
var add_the_good_handlers = function(nodes) {
  var i;
  for (i = 0; i < nodes.length; i += 1) {
    nodes[i].onclick = function (i) {
      return function (e) {
        alert(i);
      };
    }(i);
  }
};

add_the_good_handlers(document.getElementsByTagName('li'));

//Callbacks

// make async req. providing  a callback func.
// the func. will be invoked when the server response is received

//synchronous request

// request = prepare_the_request();
// response = send_request_synchronously(request);
// display(response)

// async request
//display(response) will be called when the response is available

// request = prepare_the_request();
// send_request_asynchronously(request, function(response){
//   display(response);
// });

// Module

// represents an interface but hides its state and implementation
// with modules we can eliminate the use of global variables

String.method('deentityify', function () {
  var entity = {
    quot: '"',
    lt: '<',
    gt: '>'
  };
  return function () {
    return this.replace(/&([^&;]+);/g,
      function(a,b){
        var r = entity[b];
        return typeof r === 'string' ? r : a;
      }
  );
};
}());

document.writeln(
  '&lt;&quot;&gt;'.deentityify());

var serial_maker = function () {
  var prefix = '';
  var seq = 0;
  return {
    set_prefix: function (p) {
      prefix = String(p);
    },
    set_seq: function (s) {
      seq = s;
    },
    gensym: function () {
      var result = prefix + seq;
      seq += 1;
      return result;
    }
  };
};

var seqer = serial_maker();
seqer.set_prefix('Q');
seqer.set_seq(1000);
var unique = seqer.gensym();
console.log(unique);

//Cascade

//call many methods on the same object in seq in a single statement

// getElement('myBoxDiv')
//   .width(100)
//   .height(100)
//   .color('red')
//   .border('10x outset')
//   .padding('4px')
//   .appendText('Please stand by')
//   .on('mousedown', function(m){
//     this.startDrag(m, this.getNinth(m));
//   })
//   .on('mousemove', 'drag')
//   .on('mouseup', 'stopDrag')
//   .later(2000, function(){
//     this
//       .color('yellow')
//       .setHTML('what hat god wraught')
//       .slide(400, 40, 200, 200);
//   })
//   .tip('this box is resizable');

// Curry

// allows us to produce a new function by combining a function and an argument
Function.method('curry', function(){
  var slice = Array.prototype.slice,
      args = slice.apply(arguments),
      that = this;
  return function(){
    return that.apply(null, args.concat(slice.apply(arguments)));
  };
});

var add1 = add.curry(1);
document.writeln(add1(6));

// Memoization

// functions can use objects to remember the result of previous operations

// var fibonacci = function(n) {
//   return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
// };


var fibonacci = function () {
  var memo = [0, 1];
  var fib = function(n) {
    var result = memo[n];
    if(typeof result !== 'number'){
      result = fib(n - 1) + fib(n - 2);
      memo[n] = result;
    }
    return result;
  };
  return fib;
}();

for (var i = 0; i <= 10; i += 1){
  document.writeln('//' + i + ': ' + fibonacci(i));
}

var memorizer = function (memo, fundamental) {
  var shell = function(n){
    var result = memo[n];
    if(typeof result !== 'number'){
      result = fundamental(shell, n);
      memo[n] = result;
    }
    return result;
  };
  return shell;
};

var fibonacci = memorizer([0, 1], function (shell, n){
  return shell(n - 1) + shell(n - 2);
});

var factorial = memorizer([1, 1], function(shell, n) {
  return n * shell(n - 1);
});

console.log(factorial(3));
