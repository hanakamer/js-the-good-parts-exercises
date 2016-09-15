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

///////////
//CLOSURE//
///////////

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

var add_the_bad_handlers = function(nodes) {
  var i;
  for (i = 0; i < nodes.length; i += 1) {
    nodes[i].onclick = function(e) {
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
    nodes[i].onclick = function(i) {
      return function (e) {
        alert(i);
      };
    }(i);
  }
};

add_the_good_handlers(document.getElementsByTagName('li'));

/////////////
//CALLBACKS//
/////////////

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

// MODULE
// represents an interface but hides its state and implementation
// with modules we can eliminate the use of global variables

String.method('deentityify', function(){
  var entity = {
    quot: '"',
    lt: '<',
    gt: '>'
  };
  return function(){
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
