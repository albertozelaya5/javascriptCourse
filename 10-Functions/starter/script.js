'use strict';

// const bookings = [];
// const arrayoso = ['buenos dias', 'buenas noches'];
// const objetivo = { despedida: ' buenas noches' };
// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 999 * numPassengers
// ) {
//   const booking = {
//     flightNum, //*Pone su nombre, y su valor
//     numPassengers,
//     price,
//     [arrayoso[0]]: 'hola',
//     [objetivo.despedida]: "asies"
//   };
//   bookings.push(booking); //*Se va a poner el objeto dentro de un [0]
//   console.log(booking);
//   // console.log(bookings);
// };
// // createBooking('LH123', 2, 800);
// // createBooking('LH123', 2, 800);
// // createBooking('LH123', 5);
// createBooking('LH123', undefined, 5); //*Se puede setear un valor como undefined

// let flight = 'LH234'; //*Se crea una copia por valor, asi que no cambia este valor original
// const jonas = {
//   //*Al ser una referencia, los nuevos valores apuntan a una direccion, por ende si se puede cambiar
//   name: 'Jonas Shmedman',
//   passport: 31415926535,
// };

// const checkIn = function (flightNum, passenger) {
//   passenger.name = 'Juan' + passenger.name;
//   flightNum = 25;
//   console.log(flightNum);
//   if (passenger.passport === 31415926535) {
//     alert('Checked In!');
//   } else {
//     alert('Neles prro');
//   }
// };

// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

// //*Is the same as doing...
// const flightNum = flight;
// const passenger = jonas;

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 100000); //*Round si es redondear, trunc quita decimales en si xd, Number.tofix(2)
//   alert(person.passport);
// };

// newPassport(jonas);
// checkIn(flight, jonas);
// console.log(jonas);
// console.log(flight);
// console.log(typeof jonas.passport);
//
//? Functions Acepting Callback Functions
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' '); //*El ...others devolvera lo demas como un array
  return [first.toUpperCase(), ...others].join(' ');
};

//*Higher order function
// const transformer = function (str, fn) {
//   console.log(`Original string: ${str}`);
//   console.log(`Transformed string: ${fn(str)}`);

//   console.log(`Transformed by: ${fn.name}`); //*Las funciones tmbn pueden tener propiedades y metodos
// };

// transformer('Javascript is the best!', upperFirstWord);
// console.log('-------');
// transformer('Javascript is the best!', oneWord);

// const high5 = function () {
//   console.log('🖖');
// };
// // *JS Uses callbabks all the time
// // Hace las funciones mas fáciles e interconectadas
// document.body.addEventListener('click', high5);

// ['Jonas', 'Martha', 'Adam'].forEach(high5);
// //* La Abstraccion, hace enfocarnos en un nivel mas alto de logica, obviando algunos detalles en como funciona el programa
// //*Parsear es como analizar
// //! La Abstrasccion es una parte VITAL del funcionamiento de JS

// // const sumatoria = a => Math.trunc(Math.random() * 5);
// // const prompteo = prompt('buenos dias: ');
// // prompteo === 'hola' && console.log(sumatoria());

// //?Functions Returning Functions
// const greet = function (greeting) {
//   return function (name) {
//     //* Se usa en programacion funcional
//     console.log(`${greeting} ${name}`);
//   };
// };

// const greetArr = greeting => name => console.log(`${greeting} ${name}`);

// const greeterHey = greet('Hey');
// greeterHey('Jonas');
// greeterHey('Steven');

// greetArr('Hello')('Jonas');

//? The call and apply Methods
const lufthansa = {
  airline: 'lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    //*Si se setea en objeto, pone el valor y el nombre asignado local en la funcion
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};
console.log(lufthansa.bookings);
lufthansa.book(239, 'Jonas Shmedman');
lufthansa.book(635, 'John Smith');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;
//! DOES NOT WORK
//*Call method llama a la funcion d1
// book(12, "JONAS") //*El this keyword debe ser reasignado mediante el metodo call de la funcion
book.call(eurowings, 23, 'Sarah Williams'); //*Cuando una funcion necesita acceder a las props de un objeto
//*Usamos call para establecer a que objeto haremos referencia, para cambiar el this o sea el window
console.log(eurowings);
//*Sino aparecera como undefined
const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');
console.log(swiss);

//* Apply method
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData); //*Traera la info del array de fly data
//*El spread se puede poner en objetos sin [], en arrays copias superficiales con [...], y en metodos de arrays sin []
function funcione(asies) {
  return 'hola' + asies;
}
funcione.name;
/* const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};
 */
//? Bind Method
// book.call(eurowings, 23, 'Sarah Williams');
//* const book = lufthansa.book;
const bookEW = book.bind(eurowings);
bookEW(23, 'Steven Williams');
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
//*Se le llama aplicaciones parciales
const bookEW23 = book.bind(eurowings, 23); //*Se puede preestablecer algun argumento en el bind
bookEW23('Jonas Shmedman');
bookEW23('Martha Cooper');

//With Eevent Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this); //*window Object
  this.planes++;
  console.log(this.planes);
};
//lufthansa.buyPlane.call(lufthansa);
// lufthansa.buyPlane.bind(lufthansa) //*Definir el key, el key SIEMPRE sera dinamico
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
//Se sigue usando para aplicaciones parciales

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));
//!Bind nos da una nueva funcion en forma de expresion, no ejecutandose como call
const addVAT = addTax.bind(null, 0.23); //*El orden importa, si no hay this estatico poner null
//*Es como que queramos tener siempre ese primer valor, por lo que el orden importa
// addVAT = vlaue => value + value*0.23
console.log(addVAT(100));
console.log(addVAT(23));

function newReturnTAX(rate) {
  return function (value) {
    //*Se establece el argumento de forma dinamica
    return value + value * rate; //El this local siempre funciona
  };
}
const addVAT2 = newReturnTAX(0.23);
console.log(`Nuevo metodo ${addVAT2(23)}`);

//TODO Codding Challenge #1 A Closer Look at Functions
/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/
const poll = {
  question: 'What is your favorite programming language?',
  options: ['0: Javascript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0,0,0,0]. More in the next section 😛
  answers: new Array(4).fill(0),
  registerNewAnswer: function () {
    // 1.1
    const selected = prompt(`${this.question}\n${this.options.join('\n')}`);
    // 1.2
    //*Other way
    // const answer = Number(prompt())
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++; //*Si alguna parte es falsa no se ejecutara

    const conversion = Number(selected);
    if (selected) {
      if (conversion < 4 && conversion > -1) {
        this.answers[conversion]++;
      } else {
        alert('Pon un numero que tenga sentido, imbecil');
      }
    } else {
      alert('ponga numero');
    }
    // 4
    this.displayResults('string');
  },
  // 3
  displayResults: function (type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`); //*Esto los unira por coma en un mismo string
    } else if (type.includes('string') && type.includes('array')) {
      console.log('---\tBoth Formats\t---');
      console.log(this.answers);
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};
const registerNewAnswer = poll.registerNewAnswer.bind(poll);
const displayResults = poll.displayResults;
const objeto = {
  question: 'What is your favorite game?',
  options: ['0: GOW', '1: Battlefield ', '2: Forza', 'Doom'],
  answers: [1, 5, 3, 9, 6, 1],
};

document.querySelector('.poll').addEventListener('click', registerNewAnswer);
const respuesta = ['string', 'array'];

// poll.displayResults.call(objeto, respuesta);
poll.displayResults.call({ answers: [5, 2, 3] }, respuesta);

const hola = 'si';
console.log((hola ??= 'siu')); //*Devuelve primer truthy como ||, solo que si sale nully lo preferira, como cadenas vacias, 0, false, NaN

/* let valor = '' || 'Valor por defecto';
console.log(valor); //* Imprime "Valor por defecto", no admite cadenas vacias NI nullys
 */

/* let valor = '' ?? 'Valor por defecto';
console.log(valor); //* Imprime "", parecido pero este si toma en cuenta nullys como existentes
 */
//? Inmediately invoked function expressions (IIFE)

const run0nce = function () {
  console.log('This will never run again');
};
// IIFE
(function () {
  console.log('This will never run again');
  const isPrivate = 23; //*Esta encapsulado dentro del alcance de la funcion
})();
//*Los (dentro de algo) es la forma de decirle a JS que son una expresion, se ejecuta()

(() => console.log('This will ALSO never run again'))();
//* Scope = Alcance
//*Un alcance no tiene acceso a alcances internos, (Variables declaradas dentro de una funcion)
//*Toda la data definida dentro de un alcance es privada, o como se dice ENCAPSULADA
//!Data encapsulation, data privacy
// Ocupamos proteger algunos datos de ser sobre escritos //OOP
//*No es de js, es un patron que fue adaptado eventualmente
{
  const isPrivate = 23; //*para la privacidad, solo se deja la expresion, no una funcion repetible
  let aver = 24;
  var notPrivate = 46; //*Bloque de codigo usado para declarar datos
}
console.log(notPrivate); //*Let y const tienen su propio alcance
// console.log(isPrivate, aver); //*No se podra acceder, solo en var

/* Una **expresión** es cualquier cosa que produce un valor, como `2 + 2` o `"Hello"`. Una **declaración** es una instrucción que realiza una acción, como `let x = 5;` o un `if` que toma decisiones. */
/* si no produce un valor directamente, es una declaracion por el lado logico, mientras si, aunque tenga logica y cierta instruccion, si retorna SI O SI algun valor es una expresion */

const data = {
  demandId: 38,
  demandActions: [
    {
      demandActionId: 85913,
      movementsDetails: [
        {
          movementDetailId: 449,
          movementDetailDescription: 'Descripcion John',
        },
        {
          movementDetailId: 440,
          movementDetailDescription: 'John Titor',
        },
      ],
    },
  ],
};

const {
  demandActions: [{ movementsDetails }],
} = data;
console.log(movementsDetails);

const mapeado = new Map([
  ['primer valor', 'si'],
  ['segundo valor', 586.47],
  [true, 'yes'],
]); //*Se declara como un array dentro de otro, el primer elemento es el key, y el segundo es el valor
mapeado.set('hola', 23);
console.log('🚀 ~ mapeado:', ...mapeado); //*Mientras en map, los arrays dentro del padre
// console.log('🚀 ~ mapeado:', mapeado);
const seteado = new Set(['arreglo', 'segundoValor', 3, 4, 5, 5]); //*Solo acepta un array comun, super eass, el Map solo un array dentro de otro (entries)[[key, valor], [key, valor]]
console.log('🚀 ~ seteado:', ...seteado); //*Si destructoras set, se obtienen ambos valores en texto
// console.log('🚀 ~ seteado:', seteado); //*Devuelve un texto con los valores en spread, es como un objeto sin props, solo los values

const arrayoso = [1, 2, 3, 4];
const pruebaObj = {
  primer: 'primer valor',
  matriz: [3, 1, 5],
};

console.log(...arrayoso.entries()); //*Iterador ...[1,2] [2,3]
console.log(...Object.entries(pruebaObj)); //*Array compuesto [[1,2], [1,2]]
console.log('holao'.replace('o', 'siuuuuu'));
// console.log("holao".replaceAll("o", "siuuuuu"));
console.log('holao'.replace(/o/g, 'siuuuuu'));

function siu() {
  let primero = 1;
  let segundo = second(7, primero);
  primero = primero + segundo;
  return primero;
}
const second = (a, b) => a + b;
console.log(siu()); //*Se puede hacer despues de inicializar la funciones

//? Closures
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

h();
f();
console.dir(f);

// Example 2
const boardPassegners = function (n, wait) {
  const perGroup = n / 3;
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`); //*La unica manera de acceder por el scope es closure
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`); //*Este no lo esperara y se ejecutara d1
};

setTimeout(function () {
  //* Es una funcion que ejecutara otra funcion despues de un tiempo, first Class fun
  console.log('TIMER');
}, 1000);

const perGroup = 1000; //*Si no tuviera dentro de la funcion, usaria este, y como se ejecuta despues, el global se guarda antes
boardPassegners(180, 3);

//? Codding Challenge #2
/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

//*Funcion ejecutada que obtiene el valor de h1, y cuadno se ejecuta y va del call stack
//*Cuando queda la funcion hija, toma del closure el valor declarado en su lugar de nacimiento, para cambiarlo

(function () {
  const header = document.querySelector('h1'); //*Sol seleccionara el primero, el querySelectorAll, todos
  header.style.color = 'red';

  document.body.addEventListener('click', function () {
    //*Document body tambien es un elemento del DOM como los botones, tipo objeto
    const header = document.querySelector('h1'); //*Sol seleccionara el primero, el querySelectorAll, todos
    header.style.color = 'blue'; //* se mantiene en memoria ese header por los closures, pasado por un IFE
  });
})();


document.body.addEventListener('click', () => {
  document.body.style.backgroundImage =
    "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9l9N7Hcx6WABpBpjRtQujNF6VUHvfSV9VWA&s)";
});

