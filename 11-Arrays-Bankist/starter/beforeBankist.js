const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
console.log(`Valor de currencies`, [...currencies]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//? Slice Method
let arr = ['a', 'b', 'c', 'd', 'e'];

console.log(arr.slice(2)); //*Va a devolver un nuevo array desde el valor que pusimos
// console.log(arr.slice(-2)); //*Al reves se pone al reves y todos los que cuenta los pone
console.log(arr.slice(2, 4)); //*El final no cuenta el ultimo valor
//*E lenght o largo sera el resultado final menos el inicial

// console.log('Alberto'.slice(-2)); //*Funciona igual que en los strings
console.log(arr.slice(1, -2)); //*Indice negativo
console.log(arr.slice()); //* Sin ningun argumento, se crea copia superficial del array
console.log([...arr]); //*Otra manera con el spread, tambien combinar arrays anidados de objetos [{}]

// const objetoso = [
//   {
//     argumento: 1,
//   },
//   {
//     argumento: 2,
//   },
// ];
// const objetose = [
//   {
//     argumento: 2,
//   },
//   {
//     argumento: 2,
//   },
// ];

// const copia = [...objetoso, ...objetose]; //*[{…}, {…}, {…}, {…}] Copia superficial de arrays anidados
// console.log(copia);

//? Splice Method
// console.log(arr.splice(2)); //!La mayoria de veces, solo se usa para borrar uno o mas elementos de una matriz, eliminar el ultimo
arr.splice(-1); //*-1 Siempre sera el final, 1 eliminara todos los demas menos el primero, -1 todos menos el ultimo
arr.splice(1, 2); //*El primero es desde donde se va a borrar, el segundo cuantos elementos borrara, no cuentan negativos
console.log(arr); //*Este si "edita", la matriz original

//? Reverse
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); //*Reversa los movimientos del array
console.log(arr2); //!Pero al igual que Splice, muta la constante original

//? Concat
const letters = arr.concat(arr2); //*Pone en el arg, el array que se quiere unir
console.log(letters); //!No los muta, bien
console.log([...arr, ...arr2]); //*Es lo mismo

//? Join
console.log(letters.join(' - ')); //*Retorna cadena de texto del array unido mediante " - ", no afecta al original

//*Recorre todo el array, el const es el elemento individual
// for (let i = 0; i < 4; i++) {
//   letters.push("si")
// }
// const lettersCopy = [...letters]; //*Si se quiere pushear mientras se recorre, usar una copia, que no se altera
// //*Cualquier cambio luego de esta linea, no afectara a la copia, porque toma solo lo guardado en memoria dle EC
// for (const letter of lettersCopy) {
//   letters.push(letter);
// }
// console.log(letters);
//? The new at Method
const narr = [23, 11, 64];
console.log(narr[0]);
console.log(narr.at(0));

// getting last array element
console.log(narr[narr.length - 1]); //*Para la ultima posicion, se debe poner el largo -1
console.log(narr.slice(-1)[0]); //*Como retorna texto el [0], usamos eso, y el slice para imprimir el ultimo valor
// console.log(narr[-1]); //! No se puede usar para el ultimo, usar at Method
console.log(narr.at(-1)); //*Lo hace mas facil obtener el ultimo valor

console.log('jonas'.at(0));
console.log('jonas'.at(-1));

//? Looping Arrays: forEach
const moves = [200, 450, -400, 3000, -650, -130, 70, 1300];
const movesCopy = [...movements];
console.log('Copia array values', movesCopy.values());

// const [i, v] = movesCopy.entries()
// console.log(i, v); //*Primer y segundo valor del array destructorado

// for (const movement of movesCopy) {
//   if (movement > 0) {
//     //*Si es mayor a 0, si es positivo esto, si es negativo lo otro
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`); //*Abs quita el signo y da el valor en si
//   }
// }
//*Con entries es como [[indice 0 based, valor]], para destructory const [[si,no]]
for (const [i, movement] of movesCopy.entries()) {
  if (movement > 0) {
    //*Si es mayor a 0, si es positivo esto, si es negativo lo otro
    console.log(`Movement ${i + 1}: You deposited ${movement}`); //*Movimiento 1 etc, 0 se suma 1 por el 0 based
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`); //*Abs quita el signo y da el valor en si
  }
}
//*Tienes el valor individual, has lo que quieras con ello
console.log('\n --- FOREACH ---\n');
// movesCopy.forEach(function (movement) {
//   if (movement > 0) {
//     //*Si es mayor a 0, si es positivo esto, si es negativo lo otro
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`); //*Abs quita el signo y da el valor en si
//   }
// });
movesCopy.forEach(function (move, i, arr) {
  if (move > 0) {
    //*Si es mayor a 0, si es positivo esto, si es negativo lo otro
    console.log(`move ${i + 1}: You deposited ${move}`); //*Movimiento 1 etc, 0 se suma 1 por el 0 based
  } else {
    console.log(`move ${i + 1}: You withdrew ${Math.abs(move)}`); //*Abs quita el signo y da el valor en si
  }
});

// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...
//? forEach With Maps and Sets
const currenciesCopy = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currenciesCopy.forEach((value, key, map) => {
  console.log(`${key}: ${value}`);
});

console.log('---SET---');

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
currenciesUnique.forEach((value, _, set) => {
  console.log(`${value}: ${value}`); //*Los sets no tienen clave porque no la necesitan
});

//*En sets, la clave es el mismo valor

/* 
const array = ['x', 'y', 'z'];
for (let [index, value] of array.entries()) {
  console.log(index, value); //* Output: 0 x, 1 y, 2 z
}
 */
//*En lo mismo que el forEach en los args en orden de (valor, index, valorTotal)
/* 
const array = [1, 2, 3];
for (let value of array.values()) {
  console.log(value); // Output: 1, 2, 3
}
 */
//*En keys es lo mismo, solo que es of map.keys()
// const map = new Map([
//   ['x', 10],
//   ['y', 20],
// ]);
// for (let value of map) {
//   //*Sino es como iterar sobre un array de arrays
//   console.log(value); // Output: 10, 20
// }
// const set = new Set(['Hola', 'bien']);
// for(const valor of set){
//   console.log(valor); //*Es casi como devolver un array
// }

//? The "Bankist" App

//? Coding Challenge #1
/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1 4]

GOOD LUCK 😀
*/
console.log(' hola  ');
//* Strings join, split, replace, padStart(" si"), trim(" remueve espacios "), slice(Devuelve texto desde -4), tolower, replaceAll, /si/g
//* startsWith("si")
//*const boundLog2 = boundLog.bind("new this value", 3, 4); para funciuones, metodos
//* arrays push, unshift, pop, shift, indexof, includes, slice, splice, join, split
//* insertAdjacentHTML

// console.log('hola'.replace('h', ''));
const Julia = [3, 5, 2, 12, 7];
const Kate = [4, 1, 15, 8, 3];
const dogsJulia = [...Julia];
// dogsJulia.shift();
//*Primero el numero de posicion, luego cuantos desea borrar, siempre se exceptua el numero primero
//*Si es negativo borra todos desde el inicial, si se pone segundo, numero de borrados
//*Si es positivo, elimina todos desde izquierda a derecha, si se pone arg, todos desde 0 hasta 1 posicion
dogsJulia.shift();
//*Alternativa splice(0,1)
// dogsJulia.splice(-2, 2);
console.log([...dogsJulia]);
//*Este si lo remueve, retorna uno nuevo pero afecta al creado
const checkDogs = (dogsJulia, dogsKate) => {
  const newArr = [...dogsJulia, ...dogsKate];
  newArr.forEach((mov, i) => {
    const desition = mov >= 3 ? 'an adult' : 'still a puppy 🐶';
    console.log(`Dog number ${i + 1} is ${desition}`);
  });
};
// checkDogs(dogsJulia, Kate);

const object = {
  nombre: 'Alberto',
  apellido: 'Javier',
  calling(valor) {
    console.log(`${this.nombre} ${this.apellido} con el valor: ${valor}`);
  },
};

const metodo = object.calling;

const objectCopy = {
  nombre: 'Brian',
  apellido: 'Mayers',
};
metodo.bind(objectCopy, 'siu')(); //*Para llamar la expresion

// const saludito = document.querySelector('.saludito'); //*Solo con querySelector se puede usar ese metodo
// function insertElements(elements) {
//   for (const element of elements) {
//     const html = `<p class="saludito__p">${element}</p>`; //*por cada elemento dentro, se insertara la etiqueta
//     saludito.insertAdjacentHTML('afterbegin', html);
//   }
// }
// insertElements(array);
//*El forEach si modifica el array
/* const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};



const accounts = [account1, account2, account3, account4]; */
/* const deposites = [];
for (const mov of movements) {
  if (mov > 0) {
    deposites.push(mov);
  }
} */

  /* Dado el array [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], utiliza filter para crear un nuevo array que contenga solo los números impares. */

// const impares = (array)=>{
//   const narray = array.filter((val)=>{
//     return String(val / 2).includes('.') !== false; //*No modifica, solo filtra los que cumplan la condicino
//   })
//   return narray
// }

// console.log(impares([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
//* 4 % 2 es como un resto, si es impar al dividirlo entre 2 queda un resto de 1
/* Dado el array de usuarios:

js
Copiar código
const users = [
  { name: 'Alice', age: 17 },
  { name: 'Bob', age: 22 },
  { name: 'Charlie', age: 15 },
  { name: 'David', age: 25 }
];
Utiliza quedarte solo con los usuarios mayores de 18 años y para obtener un array de sus nombres.

 */

/* const users = [
  { name: 'Alice', age: 17 },
  { name: 'Bob', age: 22 },
  { name: 'Charlie', age: 15 },
  { name: 'David', age: 25 },
];

console.log(
  users
    .filter(user => {
      return user.age > 18;
    })
    .map(user => {
      return user.name;
    })
);

console.log(light[propiedad]);
 */
// //* Redondea
// console.log(Math.round(7.9));
// //* Añade o quita decimales
// //*Math.floor() siempre redondea hacia el entero más bajo (hacia abajo en la línea de números).
// //*Math.trunc() simplemente elimina la parte decimal, ignorando si el número es positivo o negativo.
// console.log(Math.floor(-5.2));

// //*Math celi
// console.log(Math.ceil(5.1)); //*Lo redondea hacia el entero mas alto, lo contrario a floor

// console.log(movements);
// //*Primero el caumulador, luego el valor actual, indice y valor total del array
// const balance = movements.reduce((acum, curr, i, arr) => {
//   console.log(`Iteration ${i}: ${acum}`); //*Para ver como se va sumando
//   return acum + curr;
// }, 100); //*Toma en cuenta cuando son negativos etc
// console.log(balance);
// let balance2 = 100;
// for (const mov of movements) {
//   balance2 += mov;
// }
// console.log(balance2);
// let balance3 = 100;
// // for (let i = 0; i < movements.length; i++) {
// //   balance3 += movements[i]
// // }
// // console.log(balance3);

// const arraysiu = [1, 2, 3, 4];
// arraysiu.splice(1, 1, 'hola');
// console.log(arraysiu);

// const nuevo = arraysiu.map((mov, i, tot) => {
//   return i === 2 ? (mov = 'hola') : mov;
// });

//? Codding Challenge #2
/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// 1
// function calcAverageHumanAge(array) {
//   array.forEach((val, i, tot) => {
//     if (val <= 2) {
//       const humanAge = 2 * val;
//       tot[i] = humanAge;
//     } else if (val > 2) {
//       const humanAge = (16 + val) * 4;
//       tot[i] = humanAge;
//     }
//   });
//   return array;
// }
const prueba = [5, 2, 4, 1, 15, 8, 3];
const prueba2 = [16, 6, 10, 5, 6, 1, 4];
// calcAverageHumanAge(prueba);
// console.log(prueba); //*Si altera el original
//*Se quiere obtener los tres valores sin alterar el array original
function calcAverageHumanAge(array) {
  //* 1
  const narray = array.map(val => (val <= 2 ? 2 * val : 16 + val * 4)).filter(val => val > 18).reduce((acum, val, i, tot) => acum + val, 0) / filtered.length;
  return narray;
}

console.log(calcAverageHumanAge(prueba));


//? Codding Challenge #3
function calcAverageHumanAge(array) {
  //* 1
  const narray = array.map(val => (val <= 2 ? 2 * val : 16 + val * 4));
  //* 2
  const filtered = narray.filter(val => val > 18);
  //* 3
  const reduceado =
    filtered.reduce((acum, val, i, tot) => acum + val, 0) / filtered.length;
  return narray, filtered, reduceado;
}

// const prueba = [5, 2, 4, 1, 15, 8, 3];
function calcAverageHumanAge(array) {
  //* 1
  //* Si se hace encadenado o chaining, para el promedio del largo
  //* Se ocupa el total del arg del reduce
  const narray = array
    .map(val => (val <= 2 ? 2 * val : 16 + val * 4))
    .filter(val => val > 18)
    .reduce((acum, val, i, tot) => (acum + val) / tot.length, 0);
  return narray;
}

console.log(calcAverageHumanAge(prueba));
//? The Find Method
//* Lo mmismo que el filter, condicion booleana y args val, i, tot
//*Solo que este SOLO devuelve EL PRIMER elemento que cumpla con
//*La condicion, devuelve un elemento no un un array
const firstWithDrawal = movements.find(mov => mov < 0);

console.log([...movements]);
console.log(firstWithDrawal);

//const accounts = [account1, account2, account3, account4];
//*El spread solo sirve cuando son valores iterables, no como objetos
//*Puede el buscar un objeto cuando una prop es igual
//*Devolveria el objeto ya que es un elemento dentro del array
const account = accounts.find(mov => mov.owner === 'Jessica Davis');
console.log(account);

/* Sin Spread Operator: El array accounts contiene los elementos exactamente como están.
Con Spread Operator: El array accounts contiene una combinación de los elementos desempaquetados de los arrays account1, account2, account3, y account4. */

//?Mini Challenge equivalente con forOf

const neeacc = () => {
  for (const account of accounts) {
    if (account.owner === 'Jessica Davis') return account;
  }
  //*El return SOLO ES dentro de funciones
};

console.log(neeacc());
//*Bloque son los corchetes para deliminar el alcance, usado en for, if y while
{
  const hola = 'si';
}
({
  hola: 'si',
});

window.addEventListener('load', function () {
  console.log('Página completamente cargada');
});

function saludo() {
  console.log('hola');
}

saludo();


window.addEventListener("load", function(){
  console.log("hola");
})

//? Array methods practice
//*1
const banDepositSum = accounts
  .flatMap(mov => mov.movements)
  .filter(mov => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);

// const numDeposits1000 = accounts.flatMap(mov => mov.movements).filter(mov => mov >= 1000).length;
const numDeposits1000 = accounts
  .flatMap(mov => mov.movements)
  .reduce((count, cur, i) => (cur >= 1000 ? ++count : count), 0); //*ternario de que si solo se cumple la condicion, sumarlo

console.log(numDeposits1000);

// let a = 10
// console.log(++a); //*Este tambien retorna el valor anterior, hasta en la siguiente interaccion lo cambia a++

//* 3 objeto que contenga la suma de los depositos, y de los retiros
const { deposits: newDepo, withdrawals: newWith } = accounts
  .flatMap(mov => mov.movements)
  .reduce(
    (sums, cur) => {
      //*
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  ); //*sums inicia siendo esto

// sums[1] = "siu"
console.log(newDepo, newWith);

//*Recrear cualquiera de los ejercicios con reduce
// this is a nice title => This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = title => title[0].toUpperCase() + title.slice(1);
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'and', 'on', 'in', 'with'];
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(val => (exceptions.includes(val) ? val : capitalize(val)))
    .reduce((acc, val) => acc + ' ' + val, '');
  return capitalize(titleCase); //*Para que la primera letra pase a mayuscula
};
console.log(convertTitleCase('this is a nice title'));

//? Final Section Array codding challenge
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

GOOD LUCK 😀
*/
//* 1
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
//*Math.pow(dog.weight, 0.75) , para redondear sin que se convierta a string, toFixed convierte a String
dogs.forEach(dog => {
  dog.recommendedFood = Math.round(dog.weight ** 0.75 * 28 * 100) / 100;
});
console.log(dogs);
//* 2 find retornas el valor, no un array en si
const dogSarag = dogs.find(val => val.owners.includes('Sarah'));
console.log(
  `Sara's dog is eating too ${
    dogSarag.curFood > dogSarag.recommendedFood ? 'Much' : 'little'
  }`
);
//*3
const recommendedFoodUpper = dogInfo => dogInfo.recommendedFood * 1.1;
const recommendedFoodLower = dogInfo => dogInfo.recommendedFood * 0.9;

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners); //*Encuentra los obj, luego los mepa pa solo tener sus owners en un array
//*Y un flat map para que se baje de nivel
console.log(ownersEatTooMuch);
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch, ownersEatTooLittle);

//*4
console.log(ownersEatTooMuch.join(' and ') + ' eat too much!');
console.log(ownersEatTooLittle.join(' and ') + ' eat too litle!');
//* 5
const exactResult = dogs.some(
  dogInfo => dogInfo.curFood === dogInfo.recommendedFood
);

//* 6 Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
const checkEatingOkay = dog =>
  dog.curFood > dog.recommendedFood * 0.9 &&
  dog.curFood < dog.recommendedFood * 1.1;
console.log(dogs.some(checkEatingOkay));

//* 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
console.log(dogs.filter(checkEatingOkay)); //*Se puede pasar asi, solo la expresion de la funcion
//*O una funcion retorna una declaracion de funcion, o se manda a llamar como expresion

//* 8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)
const dogsSorted = dogs
  .slice()
  .sort((a, b) => a.recrecommendedFood - b.recommendedFood); //*ordena los objetos del array basado en la propiedad
console.log(dogsSorted);
// const resumeInfo = dogs.reduce(
//   (acc, dogInfo) => {
//     acc.curFood.push(dogInfo.curFood);
//     acc.recommendedFood.push(dogInfo.recommendedFood);
//     return acc;
//   },
//   {
//     curFood: [],
//     recommendedFood: [],
//   }
// );

// // console.log(exactResult);
// console.log(resumeInfo);
//* Funciones que retornan otras, de orden superior
/* const suma = (a, b) => a + b;

const calculadora = (operacion, x, y) => operacion(x, y);

console.log(calculadora(suma, 5, 3));  // 8
 */

//? Array Methods practice
//* #1 Cuanto se ha depositado en total en el banco, array of arrays,
const bankDepositSum = accounts
  .flatMap(mov => mov.movements)
  .filter(mov => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);

console.log(bankDepositSum);
//* como poner objeto["nombre"]
/* console.log([1, 2, 3, 4].reduce((acc, mov) => {
  acc[mov] = mov * mov
  return acc
}, {})); */

const arr3 = [1, 2, 3, 4, 5];
const newArr = [];

/* const filtered = arr3.filter(mov => mov > 2);
for (let i = 0; i < arr3.length; i++) {
  if(arr3[i] > 2){
    newArr.push(arr3[i])
  }
} */

console.log('Viejo metodo for', newArr);
// console.log('filtrado moderno', filtered);

