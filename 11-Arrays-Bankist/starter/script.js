'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  type: 'premium',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: 'standard',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: 'premium',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: 'basic',
};

const accounts = [account1, account2, account3, account4];
// console.log(accounts);

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in'); //*Fijarse en la clase final, porque al inicio es el padre
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const formLogin = document.querySelector('.from_login');
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
const array = ['buen', 'dia', 'amiguitos'];
//*Mas 1 para el index porque es 0 based
const displayMovements = function (acc, sort = false) {
  //* textContent, es mas o menos lo mismo, solo que innerHTML devuelve todo el elemento
  containerMovements.innerHTML = '';

  //*Copia superficial
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  //*Hacen un forEach que por cada elemento del array[1,2,-3], insertan un html
  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
            i + 1
          } deposit</div>
          <div class="movements__value">${mov}€</div>
        </div>
    `;
    //*No pone beforeend porque los pondria al reves
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// console.log(containerMovements.innerHTML); //*Devolvera todo el elemento

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const deposits = movements.filter(mov => {
  return mov > 0; //*retorna un booleano, y solo los elementos que cumplan la condicion se pondran en el nuevo array
});
//*Los tres, forEach, filter y map tienen valor, i, valorCompleto
const withdrawals = movements.filter(mov => mov < 0); //*Siempre retornar un booleano en filter
// console.log(`The withdrawals are:`, withdrawals);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acum, curr, i) => acum + curr, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, val) => acc + val, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(val => val < 0)
    .reduce((acum, val) => acum + val, 0);
  //*Aunque sean numeros negativos, reduce los acumula y suma de forma negativa
  labelSumOut.textContent = `${Math.abs(out)}€`; //*Math.abs para quitar el negativo

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => {
      return (deposit * acc.interestRate) / 100;
    })
    .filter((int, i, arr) => {
      // // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  // console.log(interest);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};
//*Usar los menos metodos encadenados posibles
//*MENOS si son metodos que alteran el array original

const createUserName = function (accounts) {
  accounts.forEach(val => {
    return (val.userName = val.owner
      .toLowerCase()
      .split(' ')
      .map(val => val[0])
      .join(''));
  });
};
createUserName(accounts);
// // console.log(accounts);
// // console.log('Las acc: ', accounts);

const updateUI = function (currentAccount) {
  // Display movements
  displayMovements(currentAccount);
  // Display balance
  calcDisplayBalance(currentAccount);
  // Display summary
  calcDisplaySummary(currentAccount);
};

//*Ocupamos la info del logueado mas adelante, por ello hacemos un let
let currentAccount;
// Event Handler
btnLogin.addEventListener('click', function (e) {
  // *Prevent from form submiting
  //*Cuando esta dentro de un form, al hacer click, todo se reinicia
  e.preventDefault();
  //*Cuando en el form estan los inputs, si se da enter en ellos
  //*Es como si se hiciera click en el button de Submit
  // // console.log('Evento Login still not yet');

  currentAccount = accounts.find(function (mov) {
    return mov.userName === inputLoginUsername.value; //*Retorna el valor que pase eso, en este caso un objeto
  });

  // console.log(accounts);
  //*El valor de la prop debe ser igual a lo puesto, por eso se convierte a Number
  //* Otra manera con el shortCircuiting, si existe eso, y sino nulo
  // currentAccount && currentAccount?.pin === Number(inputLoginPin.value);, no pasa pq la condicion no se cumple
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // // console.log('LOGUEADO PAPA');
    // Display UI and message
    labelWelcome.textContent = `Wlecome back, ${
      currentAccount.owner.split(' ')[0]
    }!`;

    containerApp.style.opacity = 100;

    // Clear input fields
    //*Se puede asignar doble porque lo lee de derecha a izquierda
    inputLoginUsername.value = inputLoginPin.value = '';
    //*Metodo blur hace que pierda el enfoque el elemento
    inputLoginPin.blur();

    //*Se llaman hasta que ya este logueado, mostrando la info del objeto
    updateUI(currentAccount);
  }
});
//*Y el click seria cuando se de click al form o submit
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); //*Aun con los hijos se debe prevenir el reinicio
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    val => val.userName === inputTransferTo.value,
  );
  // // console.log(amount, receiverAcc);

  inputTransferAmount.value = inputTransferTo.value = '';
  // inputTransferAmount.blur()
  if (
    amount > 0 &&
    receiverAcc && //*Tiene que existir la cuenta que se busca y puso en el input
    currentAccount.balance >= amount &&
    currentAccount?.userName !== receiverAcc.userName
  ) {
    // // console.log('Transfer valid');
    // Doing de transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});
// // console.log('hola siu'.split(' '));

// formLogin.addEventListener('keydown', e => {
//   // // console.log(e.key === "e");
// });

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  //*Si alguno de los movimientos es mayor al 10% del monto solicitado
  if (amount && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //Add the positive balance
    currentAccount.movements.push(amount);
    //Update de UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log('DELETE');

  if (
    currentAccount.userName === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    //*Nos da el indice que pase esta condicion
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName,
    );
    //indexOf(1) //*Solo podemos buscar un elemento existente
    // console.log(index); // Da undefined si no lo encuentra
    //*Posicion que eliminaremos, cuantos eliminaremos
    //* Delete account
    accounts.splice(index, 1);
    // // console.log(accounts);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = ''; // Tiene que pasar luego de la condition
});
//* Para borrar un elemento de un array se usa splice, pero pa eso ocupamos el indice
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
  // console.log(sorted);
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
const euroToUsd = 1.1;

const movementsUSD = movements.map(mov => {
  return (mov * euroToUsd).toFixed(2); //*toFixed la expresion
  // return 23 //*Si se pone asi, se cambia cada uno, porque eso retorna
});
//*acepta una funcion, y en el arg de la funcion posee el valor actual
//*No muta el original, solo devuelve uno nuevo
// console.log(movements);
// console.log(movementsUSD);

const movementsUSDfor = []; //*Si moficia el array
for (const mov of movements) movementsUSDfor.push(mov * euroToUsd);
// console.log(movementsUSDfor);
//*En js moderno, se usa mas la programacion funcional

// movements.forEach(function (mov, i) {
//   return movementsUSDfor.push(mov * 1.5);
// });
//* Con el forEach se ponia cada linea individualmente por cada valor del array, side effect o efectos secundarios, forEach crea eventos secundarios
//* Con el map se retornan los strings y se añaden a esa nueva matriz devuelta
const movementsDescriptions = movements.map((mov, i) => {
  return `Movement ${i + 1}: You ${
    mov > 0 ? 'deposited' : 'withdrew'
  } ${Math.abs(
    //*Movimiento 1 etc, 0 se suma 1 por el 0 based
    //*Si es mayor a 0, si es positivo esto, si es negativo lo otro
    mov,
  )}`;
  // if (mov > 0) {
  //   return `Movement ${i + 1}: You deposited ${mov}`;
  // } else {
  //   return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`; //*Abs quita el signo y da el valor en si
  // } //*Se puede tener mas de un return siempre y cuando solo uno se ejecute
}); //*Se devuelve un arreglo nuevo con esos strings

// movements[1] = 'siu'; //*Altera el valor del arreglo
// console.log(movementsDescriptions);

// // console.log(nuevo);
//* Maximum value of the movements, multiplicacion, string, objeto etc
const max = movements.reduce(
  (acum, curr) => (acum = acum > curr ? acum : curr),
  movements[0],
);
// console.log(max); //*No poner 0, en max y min, sino poner primer valor

// console.log([1, 2, 3, 4, 8].reduce((acum, curr, i, tot) => acum + curr));

/* ------------------ */

//PIPELINE //* Conducto o algo asi xd
const totalDepositsUSD = movements
  .filter(curr => curr > 0)
  // .map(val => val * euroToUsd)
  .map((val, i, arr) => {
    //*Si alguno falla, podemos chequear el valor en un // console
    // // console.log(arr);
    return val * euroToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0)
  .toFixed(2);
// console.log(totalDepositsUSD);

//*No olvidarse que filter y map hacen lo mismo que un forEach, recorrer el array, por eso aparecen en consola varios
/* // console.log("Nuevo mapa");
[1,2,3,4,5].map(val => // console.log(val)) */
// [1,2,3,-130] ===
/*  //*Nos da el index que cumple con la condicion, ideal para el slice (1,2)
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    ); */

//? Some Method
//*Similar, pero aqui funciona por EQUALITY
// console.log(movements.includes(-130));
//*Tambien se puede, pero depende si se ocupa igualdad
// console.log(movements.some(mov => mov === -130));
//* y aqui por CONDITION
const anyDeposits = movements.some(mov => mov > 1500); //*Retorna booleano
// console.log(anyDeposits);

//? Every Method
//*Si todos los elementos pasan la condicion
// console.log(account4.movements.every(mov => mov > 0));

// Separate callback
//* Es lo mismo que: movements.some(mov => deposit(mov));

const deposit = mov => mov > 0;
movements.some(deposit);
movements.every(deposit);
movements.filter(deposit);
//*Demandas por estado
/* {
    "statusId": 1,
    "status": "Activo",
    "cantidad": 5
} */

/* {
    "state": "Totales",
    "description": "Monto Demandado",
    "demandedAmount": 4210703.83,
    "colors": "rgba(186, 12, 47, 0.7)"
} */

const pruebaArr = [
  {
    statusId: 1,
    status: 'Activo',
    cantidad: 5,
    state: 'Totales',
    valueField: 'active',
  },
  {
    statusId: 3,
    status: 'Adjudicado',
    cantidad: 5,
    state: 'Totales',
    valueField: 'adjudicated',
  },
];

//*Añadir un description que sea igual al valor de status, y una cantidad, que dependa, si description es activo o adjudicado, poner esos nombres en el array
const nuevesito = pruebaArr.map(val => {
  const validStatusKey = val.status.toLowerCase().replace(/[^a-z0-9]/g, '_');
  return {
    ...val,
    description: val.status,
    [validStatusKey]: val.cantidad,
    valueField: validStatusKey,
  };
});
// console.log(nuevesito);
//? Computed object ejer 1
const keyName = 'dynamicKey';
const ejer1 = {
  [keyName]: 42,
};
//? Computed object ejer 2
const keys = ['name', 'age', 'city'];
const objKey = {};
keys.forEach(mov => {
  return (objKey[mov] = mov === 'name' ? 'siu' : 0);
});
//? Computed object ejer 3
const items = [
  { type: 'Fruit', value: 10 },
  { type: 'Vegetable', value: 20 },
];
//? Computed object ejer 3
const newItems = items.map(val => {
  const typeName = Object.keys(val).find(val => val === 'type');
  return {
    ...val,
    [typeName[0].toUpperCase() + typeName.slice(1)]: val.value,
  };
});
//? Computed object ejer 4
const createKey = function (string) {
  return string.toLowerCase();
};
const results = {
  [createKey('Lowercase')]: 'si',
};
const numbers = [1, 2, 3, 4, 8];
//? Reduce para crear objetos con propiedades computadas
const sqareNumbers = numbers.reduce((acum, num) => {
  acum[num] = num * num;
  return acum;
}, {});
// console.log(sqareNumbers);

//sin args esta diseñado para strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort()); //*Ordena alfabeticamente, muta la matriz original
//*Numeros en orden ascendente, si el primero es mayor, positivo adelante, sino negativo atras
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });
//o
movements.sort((a, b) => a - b);
movements.sort((a, b) => {
  if (a > b) return -1;
  if (b > a) return 1;
});

// console.log(movements);

//? More ways of creating and filling Arrays
// console.log([1, 2, 3, 4, 5]);
// console.log(new Array(1, 2, 3, 4, 5));
//*Crear un nuevo array con longitud

// Empty arrays + fill Method
const x = new Array(7);
//*No se le pueden aplicar metodos, solo el fill que muta el array
//*Primer el valor, segundo donde empieza, tercero donde termina
//* Si se pone el primer arg, llena toda la matriz con ese valor
// x.fill(1)
x.fill(1, 3, 5);
// console.log(x);
const arr = [1, 2, 3, 4, 5, 6, 7];
// console.log(arr.slice(1, -1)); //*No se incluye el primero ni el ultimo

arr.fill(23, 2, 6); //*Tambien se puede usar en arrays normales
// console.log(arr);

// Array from //*Se envia le propiead de lo largo
const y = Array.from({ length: 7 }, () => 1);
// console.log(y);
//*Retorna el valor del indice mas 1, o sea que se va recorriendo y sumando
const z = Array.from({ length: 7 }, (_, i) => i + 1);
// console.log(z);
/* const hundred = Array.from(
  { length: 100 },
  (mov, i) => `Tirada ${i + 1}: ${Math.trunc(Math.random() * 100)}`
) */ // // console.log(hundred);
//* Strings, maps, sets son iterables
// Suponiendo que no se tienen guardados los valores de la interfaz
//*Selecciona todas las clases
// // console.log(document.querySelectorAll('.movements__value'));
//* En vez de poner obj longitud y el mapeado del i, se define el querySelectorAll, y se hace un map como callbackFun, pq es como un map
labelBalance.addEventListener('click', () => {
  const movementsUI = Array.from(
    //*NodeList
    document.querySelectorAll('.movements__value'), //*Retorna todos los divs de labels, hay que acceder al textContent
    el => Number(el.textContent.replace('€', '')),
  );
  // console.log(movementsUI);
  const movementsUI2 = [...document.querySelectorAll('.movements__value')]; //*Otra manera, pero habria que hacer mapeado
});
//? Cuando usar que metodo, 23 metodos
//*Primero aplica el recorrido del map, y luego un aplanado
const newNumbers = [1, 2, 3, null, 4];
//*Si es vacio lo elimina
// console.log(newNumbers.flatMap(val => (val ? [val * 2] : [])));

const fruits = ['apple', 'banana', 'cantaloupe', 'blueberries', 'grapefruit'];

const index = fruits.findIndex(fruit => fruit === 'blueberries');

// // console.log(index); // 3
// // console.log(fruits[index]); // blueberries

// const keyPressed = document.querySelector('.key__pressed');

// keyPressed.addEventListener('keydown', e => {
//   e.key === '@'
//     ? keyPressed.insertAdjacentElement(
//         'afterbegin',
//         '<ul><li>hola</li><li>siu</li></ul>'
//       )
//     : '';
// });

const newArray = Array.from({ length: 7 }, () => 1);
// // console.log(newArray);

// console.log(movements);
//* Un retiro es cuando el valor del movimiento es menor a 0

const lastWithdrawal = movements.findLast(mov => mov < 0);
// console.log('🚀 ~ lastWithdrawal:', lastWithdrawal);
// console.log(movements.findLastIndex(mov => mov === -650));

//* RETO
//* vamos a usar ese método `findLastIndex()`
//* Your latest large movement was X movements ago
//* large is > 2000

const latestLargeMovementIndex = movements.findLastIndex(
  mov => Math.abs(mov) > 1000,
);

// console.log(
//   `Your latest large movement was ${movements.length - latestLargeMovementIndex} movements ago`,
// );

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

//* RESOLUTION

//* too much = curFood > recommendedFood
//* too little = curFood < recommendedFood
//* okayAmount = curFood > recommendedFood - recommendedFood * 0.1 && curFood < recommendedFood + recommendedFood * 0.1

//* 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

const eatTooMuch = (curFood, recommendedFood) => curFood > recommendedFood;
const eatTooLittle = (curFood, recommendedFood) => curFood < recommendedFood;

const eatOkayAmount = (curFood, recommendedFood) =>
  curFood > recommendedFood * 0.9 && curFood < recommendedFood * 1.1;

//* 1kg = 2.2
const librasToKilos = libra => libra / 2.2;

for (const dog of dogs) {
  // dog.recommendedFood = `${(librasToKilos(dog.weight) ** 0.75 * 28).toFixed(2)} grams`;
  const recFoodFormula = (dog.weight ** 0.75 * 28).toFixed(2);
  dog.recommendedFood = +recFoodFormula;
  dog.weightInKilos = `${dog.weight} kg`;
  dog.recFoodInGrams = `${recFoodFormula} grams`;
}

// console.log('Ej 1:', dogs);

const eatLittleMuch = function (curFood, recommendedFood) {
  const recommendedFoodFixed = recommendedFood;
  if (curFood > recommendedFoodFixed) return 'too much';
  if (curFood < recommendedFoodFixed) return 'too little';
};

//* 2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓

const saraDog = dogs.find(dog => dog.owners.includes('Sarah'));
const result = `Sarah's dog is eating ${eatLittleMuch(saraDog.curFood, saraDog.recommendedFood)}`;

// console.log(result);

//* 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
const ownersEatTooMuch = dogs
  .filter(dog => eatTooMuch(dog.curFood, dog.recommendedFood))
  .map(dog => dog.owners)
  .flat();

const ownersEatTooLittle = dogs
  .filter(dog => eatTooLittle(dog.curFood, dog.recommendedFood))
  .map(dog => dog.owners)
  .flat();

// console.log(ownersEatTooMuch, ownersEatTooLittle);
//* 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

const ownersJoined = owners => {
  if (owners.length === 0) return;
  return owners.slice(0, -1).join(', ') + ` and ${owners.at(-1)}`;
};

const resultSentence = (owners, message) =>
  ownersJoined(owners)
    ? ownersJoined(owners) + message
    : 'There is no dogs or owners';

// console.log(resultSentence(ownersEatTooMuch, ' dogs eat too much!'));
// console.log(resultSentence(ownersEatTooLittle, ' dogs eat too little!'));

//* 5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
const dogEatingExactlyAmountFood = dogs.some(
  dog => dog.curFood === dog.recommendedFood,
);
// console.log(dogEatingExactlyAmountFood);

//* 6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
const dogEatingOkayAmountFood = dogs.some(dog =>
  eatOkayAmount(dog.curFood, dog.recommendedFood),
);
// console.log(dogEatingOkayAmountFood);

//* 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
const dogsEatingOkayFood = dogs.filter(dog =>
  eatOkayAmount(dog.curFood, dog.recommendedFood),
);

//* 8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

//? El sort() solo, modifica el array original
const dogsSorted = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);

//? O también con toSorted(), que crea una copia del array
// const dogsSorted = dogs.toSorted(
//   (a, b) => a.recommendedFood - b.recommendedFood,
// );
// console.log('🚀 ~ dogsSorted:', dogsSorted);

// console.log(movements);

const groupedMovements = Object.groupBy(movements, movement =>
  movement > 0 ? 'deposits' : 'withdrawals',
);

// console.log('🚀 ~ groupedMovements:', groupedMovements);

const groupedByActivity = Object.groupBy(accounts, account => {
  const movementCount = account.movements.length;

  if (movementCount >= 8) return 'very active';
  if (movementCount >= 4) return 'active';
  if (movementCount >= 1) return 'moderate';
  return 'inactive';
});
// console.log('🚀 ~ groupedByActivity:', groupedByActivity);

const groupedAccounts = Object.groupBy(accounts, ({ type }) => type);
// console.log('🚀 ~ groupedAccounts:', groupedAccounts);

// console.log(movements);
const reversedMov = movements.toReversed();
// console.log(reversedMov);

// toSorted (sort), toSpliced (splice)
// movements[1] = 2000;
const newMovements = movements.with(1, 2000);

// console.log(movements, newMovements);
