// GOOD PARTS

document.writeln('helloow')

// THIS IS USED TO DEFINE METHODS IN THIS BOOK!!!

Function.prototype.method = function (name, func) {
  this.prototype[name]=func;
  return this;
}

console.log('A==="\\u0041"',"A"==="\u0041");
console.log("'c'+'a'+'t' === 'cat'",'c'+'a'+'t' === 'cat');
console.log('false', Boolean(false));
console.log('undefined', Boolean(undefined));
console.log("''", Boolean(''));
console.log(0, Boolean(0));
console.log(NaN, Boolean(NaN));

// OBJECTS

var empty_object = {};
var stooge = {
  "first-name": "Jerome",
  "last-name":" Howard"
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

// CLOSURE
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
fade(document.body)

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

add_the_good_handlers(document.getElementsByTagName('li'))

// CALLBACKS
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
