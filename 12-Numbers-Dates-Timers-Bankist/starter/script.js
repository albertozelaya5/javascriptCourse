'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2024-09-30T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2024-09-30T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPased = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24))); //*El redondeado absoluto de una suma menos otra,numero pequeño, por numeric al reves
  // *1000*60*60*24
  // *Definir fecha 3 dias *24*60*60*1000 normal
  console.log(new Date(3 * 24 * 60 * 60 * 1000));

  const daysPassed = calcDaysPased(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7)
    return `${daysPassed} days ago`; //*Si ha pasado mas de una semana
  else {
    // const day = `${date.getDate()}`.padStart(2, 0); //30
    // const month = `${date.getMonth() + 1}`.padStart(2, 0); //* 0 based 9
    // const year = date.getFullYear(); //2024
    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = ''; //* Reemplaza todo el contenido

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b) //*Sort afecta el array original
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]); //*Por cada movimiento
    //*Manera de recorrer dos arrays, date de las dates array[i]
    const displayDate = formatMovementDate(date, acc.locale);
    console.log(displayDate); //mov.toFixed(2)

    const formattedMov = formatCur(mov.toFixed(2), acc.locale, acc.currency);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
     <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html); //*Crea nuevo contenido
  });
};

const formatCur = (value, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency); //acc.balance.toFixed(2)
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency); //incomes.toFixed(2)

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(out, acc.locale, acc.currency); //Math.abs(out.toFixed(2))

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency); //interest.toFixed(2)
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  let time = 10; //* Conversion segundos a minutos
  const tick = () => {
    // const hour = String(Math.trunc(time / 3600)).padStart(2, 0);
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    // Decrese 1s
    time--;
  };
  // Set time to 5 minutes
  // Call the timer every second
  tick(); //*Se llama antes del segundo de interval, asi se setea el valor
  //*Como no tiene un valor no inicializado, no da error y se puede
  const timer = setInterval(tick, 1000); //*retorna el intervalo
  return timer;
};

///////////////////////////////////////
// Event handlers

// Simular que estamos conectados
let currentAccount, timer;
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;
// padStart(2, *) **hola
const now = new Date(); //*Si tiene lon 2, no se pondra el pad
// const day = `${now.getDate()}`.padStart(2, 0); //30
// const month = `${now.getMonth() + 1}`.padStart(2, 0); //* 0 based 9
// const year = now.getFullYear(); //2024
// const hour = `${now.getHours()}`.padStart(2, 0); //20
// const min = `${now.getMinutes()}`.padStart(2, 0); //43

// labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
// //? Internationalizing Dates (Intl)
// // Experimenting API //*Lenguaje y country, Intl es un constructor

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and time
    const options = {
      day: 'numeric', //*2-digit
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      // weekday: 'long',
    };
    // const locale = navigator.language; //*Acceder al tiempo del usuario, objeto navegador y propiedad lenguaje
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    //* Se pone el namespace intl, se llama a al funcion asignando idioma y pais, y se formatea la fecha

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    if (timer) clearInterval(timer); //*En caso ya exista un intervalo, lo limpia
    timer = startLogOutTimer(); //*Se vuelve a declarar globalmente que es igual al intervalo que retorna

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value); //*Convierte cada deposito en el entero menor

  //* Si es mayor que 0 y es alguno de los movimientos es mayor al 10% de ese monto
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString()); //*Es un deposito hacia nosotros
      console.log(account1);

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
//* Todos los numeros son decimales, por eso 23===23.0
//*Se representan en formato 64 base 2
console.log(23 === 23.0);

// Base 10 - 0 to 9 1/10 0.1
// Binary base 2 - 0 1
console.log(0.1 + 0.2); //*Porque en binario 0.1 es un bucle infinito como 3.3333
console.log(0.1 + 0.2 === 0.3);
//*No se pueden hacer calculos con precision cientifica o financieros en javascript

// Conversion
console.log(Number('23'));
console.log(+'23'); //* cuando ve el mas, automaticamente hace coerción de tipos, conversion
let one = 1;
// console.log(one++);
// console.log(one);

// Parsing
//? Number checking Methods
//* Segundo argumento,
console.log(Number.parseInt('30px', 10)); //*Tiene que comenzar con un numero, averiguara el numero en la cadena y lo extraera a Number
console.log(Number.parseInt('e23', 10));

console.log(Number.parseInt('2.5rem')); //*Tambien son funciones globales
//*Casi siempre mejor usar este
console.log(Number.parseFloat('   2.5rem')); //*Si se usa int, solo extrae la parte entera, convierte con espacios en blanco
//* En js moderno, es mas recomendable llamarles dentro del objeto Number
console.log(parseFloat('   2.5rem   '));

//* El objeto number tiene algo llamado espacio de nombres
// Check if value is NaN
console.log(Number.isNaN(23)); //*Chequea si no es un numero
console.log(Number.isNaN('23'));
console.log(Number.isNaN(+'23x')); //*Si lo convertimos nos dara nan, o sea true
console.log(Number.isNaN(23 / 0)); //*Si dividimos entre 0 nos dara infinito

// Check if value is a number
console.log(Number.isFinite(23)); //*Que si es finito, solo funciona con realmente numeros, funciona mejor que nAn
//* Mejor manera de chequear si un valor es un numero
console.log(Number.isFinite(+'20x'));

const nuevoarr = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(nuevoarr);

console.log(Number.isInteger(23.0)); //*Cuales son enteros, en js por la conversion son lo mismo

//? Math and Rounding
console.log(Math.sqrt(25)); //* Raiz cuadrada
//  O
console.log(25 ** (1 / 2)); //*Es lo mismo, porque es uno al cuadrado
console.log(8 ** (1 / 3));
console.log(Math.max(1, 2, 3, 27)); //*El valor maximo, no acepta string
console.log(Math.min(4, 5, 6, -1));
//? Working with BigInt
//* Los numeros en js son en base 64, 64 0 o 1 para representar un numero
console.log(2 ** 53 - 1); //*Numero maximo que se puede almacenar, debido a que es 53 bits, based 0
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1);
console.log(Math.PI * Number.parseInt('10px') ** 2);
console.log(Math.ceil(Math.random() * 8));
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
console.log(randomInt(10, 20));

// Rounding integers
console.log(Math.trunc(23.3));
console.log(Math.round(23.3));
console.log(Math.round(23.9));
console.log(Math.ceil(23.9)); //*Redondea al entero mas alto
console.log(Math.floor(23.9)); //*Entero mas bajo, tiene coercion de tipos, o sea string works

//Rounding decimals
console.log((2.7).toFixed(3)); //*Siempre nos dara un string, pone o quita decimales, y redondea
console.log(+(2.345).toFixed(2)); //*Si lo queremos como un numero, toFixed siempre nos dara string

//? Remainder operator
//* Nos da el remanente de la operacion dividida
console.log(5 % 2); // 5 = 2*2 +1
console.log(8 % 3); //8 = 2*3 + 2
const isEven = n => n % 2 === 0; //*True o false porque es condicion booleana
console.log(isEven(23));
labelBalance.addEventListener('click', function () {
  //*Selecciona todas las clases, no solo la primera
  [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
    //*Si se deja afuera del listener, se disparara al iniciar la app, y como esta opacity 100 no se mostrara
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    // 0, 2, 4, 6
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
    // 0, 3, 6, 9
  });
});
// Nth
//? Numeric separators
// 287,460,000,000
const diameter = 287_460_000_000;
console.log(diameter);
const price = 345_99;
console.log(price);

const transferFee1 = 15_00;
const transferFee2 = 1_500;
console.log(5 % 3);
// const PI = _3._1415_ //*No se puede ni al lado del punto, ni al inicio, ni al final, ni dos juntos
console.log(Number('230_000')); //*Tampoco en string, se usa en el código
console.log(parseInt('230_000')); //*Ni con parseFloat o int, que quita las letras, solo deja el 230
//* En es2020, se introdujo un nuevo valor primitivo, para guardar estos valores, bigInt
console.log(46513213131356546546231321321n);
console.log(BigInt(46513213131356546546231321321)); //* Lo analiza antes de transformarlo

/* ECMAScript es un estándar que define cómo debe funcionar JavaScript. Es como un conjunto de reglas que todos los navegadores y entornos deben seguir para que el código JavaScript funcione de manera consistente. */

// Operations
console.log(1000n + 1000n);
console.log(123456789n + 100000000n);
console.log(Math.sqrt(9)); //* Raiz cuadrada

//! Mezclar bigints con numeros regulares
const huge = 16568468464565465460n;
const num = 10; //*Para numeros pequeños sirve la funcion global bigInt
console.log(huge * BigInt(num)); //* Nos dara error, y hay que convertirlo al bigint

// Exceptions
console.log(20n > 15);
console.log(20n === 20); //*Porque no hace la coercion de tipos en las tres
console.log(typeof 20n);
console.log(20n == 20);

console.log(huge + 'is REALLY big!!!'); //* Lo convierte a string

// Divisions
console.log(10n / 3n); // Divisiones no se puede //*Nos dara el entero mas cercano
console.log(10 / 3);
//* Constructores conocidos, Array.fill(5, 6,8)
// new Date() new Array(8), Array.from({length: 7}, (mov, i, movs)=>5)
/*   const movementsUI = Array.from(
    //*NodeList
    document.querySelectorAll('.movements__value'), //*Retorna todos los divs de labels, hay que acceder al textContent
    el => Number(el.textContent.replace('€', ''))
  ); */
//? Creating Dates
/* const now = new Date();
console.log(now); //* Nos dara la fecha actual

console.log(new Date(' Sep 27 2024 15:00:50')); //*O pasar la fecha en cadena string
console.log(new Date('December 24, 2015')); //*Aun asi, analiza el string
console.log(new Date(account1.movementsDates[0])); //* '2019-11-18T21:31:17.178Z', la Z, significa UTC, o sea la hora universal, sin timezones, london ni horarios de vernao
console.log(new Date(2002, 10, 33, 18, 45, 26, 22)); //*Trata de corregir las fechas, se setean numericamente en año, mes, dia, hora, minuto y segundo

//* Tiempo unix, 1 de enero de 1970
console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000)); //*Se calcula el tiempo transcurrido desde ahi, en este caso 3 dias desde el tiempo unix
//*Marca de tiempo
console.log(3 * 24 * 60 * 60 * 1000); */

// Working with dates //*Los meses estan en 0 based, o sea que 11 es 10, 0 es 1 etc, y si se pone 33, js lo corrige
// const future = new Date(2002, 10, 33, 18, 45);
// console.log(future);
// console.log(future.getFullYear()); //*Para tener el año
// console.log(future.getMonth());
// console.log(future.getDate()); //*En realidad este es el dia
// console.log(future.getDay()); //*Y aqui da el dia de la semana
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.toISOString()); //*Lo convierte en string a formato internacional
// console.log(future.getTime()); //*Los milisegundos que han pasado desde el tiempo unix

console.log(new Date(1038962700000)); //*Si le ponemos esta marca nos dara el tiempo convertido
//*Y esta marca desde 1970 hasta ahora se puede crear con este metodo que nos dara ese gran numero
console.log(Date.now());

// future.getFullYear(2040); //*En los argumentos se modifica el año etc, siempre con auto correccion
// console.log(future);

// console.log(new Date(2087, 10, 12, 16, 4, 33, 22));
// console.log(new Date('Aug 02, 2048'));
// console.log(new Date('Sep 25 2025 16:04:22'));
// const past = new Date(future.setMonth(future.getMonth() - 1)); //*Se le asigna en el arg el numero unix del set Month, que se le asigna el valor del mes pasado
// console.log(future.setMonth(future.getMonth() - 1));

//? Operation with Dates
const future = new Date(2002, 10, 33, 18, 45);
console.log(+future); //*Nos da numero unix
//console.log(3 * 24 * 60 * 60 * 1000); */
const calcDaysPased = (date1, date2) =>
  Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)); //*Para convertirlo a t unix, se divide entre 1000mx, 60seg, 60min, 24hrs
const days1 = calcDaysPased(new Date(2037, 3, 1), new Date(2037, 3, 4)); //*Nos dara el numero ms de tiempo unix
console.log(days1); //*Da el numero, si pasaron 10 dara 10
//* Si se ocupan casos realmente precisos, ej cambios de hora debido a los cambios de horario de verano o casos extraños, usar librerias como moment.js

//? Ejercicio
//*A la fecha de hoy, restarle tres dias, e imprimir "3 dias ham pasado"

const today = new Date(); //*metodo setDate da el numero unix
const pasado = new Date(new Date().setDate(new Date().getDate() - 3));
const message = `${(today - pasado) / (1000 * 60 * 60 * 24)} dias han pasado`;
console.log(message);

const welcome = document.querySelector('.welcome');

// Permite que el elemento reciba foco //*tabindex es para recibir el foco, 0 es el orden natural, -1 solo con js, y mayor a 1 tiene prioridad
//*keyup, keydown
welcome.setAttribute('tabindex', '0');
//* Setea cualquier atributo, ("name", "hola"), ("id", "siu")

welcome.addEventListener('keydown', function (e) {
  console.log(e);
  const colors = {
    r: 'red',
    b: 'blue',
    v: 'green',
  };
  if (e.key) {
    welcome.style.backgroundColor = colors[e.key];
  }
});
//*Acepta [[],[]]
const mapita = new Map([
  [22, 'si'],
  ['siu', 45],
]);
mapita.set(4, 'hola');
console.log(mapita);
console.log(['hola', 2, 3].entries());

const nuevoA = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(nuevoA);

// const hoy = new Date();
// const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
// const resta = (hoy - yesterday) / (1000 * 60 * 60 * 24); //*No es necesario establecer año
// console.log(resta);

//? Internationalizing Number (Intl)

const number = 3897987245.633347;

const options = {
  style: 'unit', //unit //percent
  unit: 'celsius', //mile-per-hour
  currency: 'EUR', //currency, no definido por el pais
  useGrouping: false, //*Quita o pone las comas
};

console.log('US:  ', new Intl.NumberFormat('en-US', options).format(number));
console.log(
  'Germany:  ',
  new Intl.NumberFormat('de-DE', options).format(number)
);
console.log('Syria:  ', new Intl.NumberFormat('ar-SY', options).format(number));
console.log(
  'Local Navi Languaje:  ',
  new Intl.NumberFormat(navigator.language).format(number)
);

// const sort1 = Array.from({ length: 5 }, (_, i) => i + 1);
// console.log(sort1.sort((a, b) => b - a)); //*Sort afecta al array original
//? Timers: setTimeout and setInterval
//*Se pasan los args como tercer arg de la higher order fun
// setTimeout
const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Heres your pizza with ${ing1} and ${ing2}`),
  3000,
  ...ingredients
);
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);
//TODO Hacer un reloj en la consola que tome horas, minutos y segundos
// setInterval(function () {
//   // const now = new Date();
//   // console.log(now);
//   console.log(
//     new Intl.DateTimeFormat(navigator.language, {
//       hour: 'numeric',
//       minute: 'numeric',
//       second: 'numeric',
//     }).format(new Date())
//   );
// }, 1000);
console.log(4 % 8); //*Si es mayor, sera siempre el numero de la izquierda
console.log(48 % 40);

// const holiwis = setInterval(() => { //*Siempre se ejecuta aunque se elmacena
//   console.log('hola');
// }, 500);
let siu;
const funcionsita = function () {
  console.log('holiwis');
};
