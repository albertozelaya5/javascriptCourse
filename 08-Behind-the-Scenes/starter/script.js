'use strict';

// Data needed for first part of the section
const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const objetito = { si: 'no' };
const openingHours = {
  [weekDays[3]]: {
    //*Se pueden pasar los nombres a traves de arrays
    open: 9,
    close: 21,
  },
  fri: {
    open: 11,
    close: 23,
  },
  [`day-${2 + 4}`]: {
    open: 8,
    close: 24,
  },
  [weekDays[6]]: {
    open: 8,
    close: 24,
  },
  [objetito['si']]: {
    open: 7,
    close: 14,
  },
};
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours, //*Otra forma de ponerlo, solo el nombre, ES6

  order(starterIndex, mainIndex) {
    //*Otra manera de poner una funcion MAS SENCILLA
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]; //*Se puede retorar un arreglo asi
  },
  orderPasta: function (ing1, ing2, ing3 = 1) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}`
    );
  },
};
//* Destructoring objects
// const { name, openingHours, categories } = restaurant;

// // restaurant.numGuests = 0;
// const guests = restaurant.numGuests || 10;
// console.log(guests);

// // NullishL: null and undefined (NOT 0 or "")
// const guestCorrect = restaurant.numGuests ?? 10;
// console.log(guestCorrect);
// console.log(name, openingHours, categories);
// const {
//   name: restaurantName, //*Para llamarlos de diferente modo el object de los destructor
//   openingHours: hours,
//   categories: tags,
// } = restaurant;
// console.log(restaurantName, hours, tags);
//* menu= en caso de que no exista, y menu: para renombrar
// const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);
//* Destructiring arrays
// const arr = [2, 3, 4]; //*No afecta el arreglo original, solo se extraen los datos
// const [x, y, z] = arr;
// console.log(x, y, z);

// let [main, , second] = restaurant.categories; //*Al poner una coma, hace como si el segundo valor no exista, ponemos ", ,"
// console.log(main, second);

// [main, second] = [second, main]; //*Si se quiere poner al reves los valores
// console.log(main, second);

// console.log(restaurant.order(2, 0));

// 1) Destructoring

// //*Rest Pattern
// const arr = [1, 2, ...[3, 4]]; //*Agarras los otros elementos ABAJO , toma el orden de los arrays y los une en otras props
// //! El order siempre importa
// const [pizza, , risotto, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ]; //*unir dos menus
// console.log(pizza, risotto, otherFood);

// // REST
// const [a, b, ...others] = [1, 2, 3, 4, 5]; // Los une

// console.log(a, b, others);

// // Objects
// const { sat, ...weekDays } = restaurant.openingHours; //*queremos el valor original, no una copia, o pasar valores
// console.log(weekDays);

// // 2) Functions
// const add = function (...numbers) {
//   console.log(numbers); //* Siempre devuelve tipo arrays
//   let i; // Siempre recomendable definir afuera de
//   let suma = 0;
//   for (i = 0; i < numbers.length; i++) {
//     if (typeof numbers[i] === 'number') {
//       suma += numbers[i]; //*Cada valor es un numero
//     }
//   }
//   console.log(suma);
// };
// add(1, 2, 3, 4, 5, 6, 7, 'hola');
// const dice = Math.trunc(Math.random() * 6) + 1;

// console.log('---------OR--------');
// console.log(3 || 'Jonas');
// console.log('' || 'Jonas');
// console.log(undefined || null);
// console.log(undefined || 0 || '' || 'Hello' || 23 || null);

// restaurant.numGuests = 23;
// const gests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log('🚀 ~ gests1:', gests1);

// const gests2 = restaurant.numGuests || 10; //* Evalua
// console.log('🚀 ~ gests2:', gests2);
// console.log('---------AND--------');
// console.log(0 && 'Jonas');
// console.log(7 && 'Jonas');
// console.log('Hello' && 23 && null && 'Jonas'); //* Va a tomar el primer falsy
// if (restaurant.orderPasta) {
//   restaurant.orderPasta('mushrooms', 'spinach');
// }
// restaurant.orderPasta && restaurant.orderPasta('hongos', 'espinaca');

//*Logical Assignement
const rest1 = {
  name: 'Capri',
  numGuests: 20,
};

const rest2 = {
  name: 'Capri',
  owner: 'Giovanni Rossi',
};

// console.log(0??10);

// rest1.numGuests = rest1.numGuests || 10; //*Si el valor es truthy, lo devolvera, sino devolvera 10
rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;
rest2.numGuests ??= 10;
// rest2.owner =rest2.owner && "ANONYMOUS"
rest2.owner &&= 'ANONYMOUS';
// rest2.numGuests = rest2.numGuests || 10;
// console.log(10 ??= 11);
console.log(rest1);
console.log(rest2);
// // 2. Display dice
//? diceEl.classList.remove('hidden');
//? diceEl.src = `dice-${dice}.png`;
//? const objetito = {
//   constante: 'constante',
//   variable: 'variable',
//   otroObj: {
//     patron: 1,
//     segundo: 'primero',
//   },
// };
// const arraysito = ['unoi', 2, 3, 4];
// const nuevoObjeto = { saludo: 'beunas noches', ...objetito, ...arraysito };
// nuevoObjeto.despedida = 'si'; //*Es de referencia pa
// console.log(nuevoObjeto);
// add(1, 2, 3, 4);
// console.log('🚀 ~ nuevoObjeto:', nuevoObjeto);

// hola.mon.open = 8;
// console.log("🚀 ~ hola:", hola); //* mostrará el nuevo horario, se pueden añadir otros valores
// console.log(restaurant.openingHours); //* mostrará el horario original, sin cambios

// // let vaya = document.querySelector(".hola").className //*Si se puede conversion triple
// // vaya += " asies"
// // console.log(vaya);

// // Receive 2 retunr values from a functions
// const [starter, master] = restaurant.order(2, 0); //*Se hace destructory a una funcion que retorna un arreglo
// console.log(starter, `and also ${master}`);

// // Nested destructoryx
// const nested = [2, 4, [5, 6]]; //*Cuenta como un solo valor del array
// // const [i, , j] = nested;
// // console.log(i, j);
// const [i, , [j, k]] = nested;
// console.log(i, j, k);

// // Default values
// const [p = 1, q = 1, r = 1] = [8, 9]; //* En caso no se sepa su longitud, se puede definir valor por defecto, y asi se sabra si no tiene
// console.log(p, q, r);

// // const objeto = {
// //   arreglo1: ['Pasta', 'Sabores', 'Tacos'],
// //   arreglo2: ['Hamburguesosa'],
// //   funcionAsa: function (firstValue, secondValue) {
// //     return [this.arreglo1[firstValue], this.arreglo2[secondValue]];
// //   },
// // };

// // const objecionAsa = objeto.funcionAsa(2, 0);
// // const [rompe, bocinas, g = 1] = objecionAsa;

// // console.log(objecionAsa, `Tambien irian las ${rompe}, y ${bocinas}, ${g}`);

const books = [
  {
    title: 'Algorithms',
    author: ['Robert Sedgewick', 'Kevin Wayne'],
    publisher: 'Addison-Wesley Professional',
    publicationDate: '2011-03-24',
    edition: 4,
    keywords: [
      'computer science',
      'programming',
      'algorithms',
      'data structures',
      'java',
      'math',
      'software',
      'engineering',
    ],
    pages: 976,
    format: 'hardcover',
    ISBN: '9780321573513',
    language: 'English',
    programmingLanguage: 'Java',
    onlineContent: true,
    thirdParty: {
      goodreads: {
        rating: 4.41,
        ratingsCount: 1733,
        reviewsCount: 63,
        fiveStarRatingCount: 976,
        oneStarRatingCount: 13,
      },
    },
    highlighted: true,
  },
  {
    title: 'Structure and Interpretation of Computer Programs',
    author: [
      'Harold Abelson',
      'Gerald Jay Sussman',
      'Julie Sussman (Contributor)',
    ],
    publisher: 'The MIT Press',
    publicationDate: '2022-04-12',
    edition: 2,
    keywords: [
      'computer science',
      'programming',
      'javascript',
      'software',
      'engineering',
    ],
    pages: 640,
    format: 'paperback',
    ISBN: '9780262543231',
    language: 'English',
    programmingLanguage: 'JavaScript',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 4.36,
        ratingsCount: 14,
        reviewsCount: 3,
        fiveStarRatingCount: 8,
        oneStarRatingCount: 0,
      },
    },
    highlighted: true,
  },
  {
    title: "Computer Systems: A Programmer's Perspective",
    author: ['Randal E. Bryant', "David Richard O'Hallaron"],
    publisher: 'Prentice Hall',
    publicationDate: '2002-01-01',
    edition: 1,
    keywords: [
      'computer science',
      'computer systems',
      'programming',
      'software',
      'C',
      'engineering',
    ],
    pages: 978,
    format: 'hardcover',
    ISBN: '9780130340740',
    language: 'English',
    programmingLanguage: 'C',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 1010,
        reviewsCount: 57,
        fiveStarRatingCount: 638,
        oneStarRatingCount: 16,
      },
    },
    highlighted: true,
  },
  {
    title: 'Operating System Concepts',
    author: ['Abraham Silberschatz', 'Peter B. Galvin', 'Greg Gagne'],
    publisher: 'John Wiley & Sons',
    publicationDate: '2004-12-14',
    edition: 10,
    keywords: [
      'computer science',
      'operating systems',
      'programming',
      'software',
      'C',
      'Java',
      'engineering',
    ],
    pages: 921,
    format: 'hardcover',
    ISBN: '9780471694663',
    language: 'English',
    programmingLanguage: 'C, Java',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 3.9,
        ratingsCount: 2131,
        reviewsCount: 114,
        fiveStarRatingCount: 728,
        oneStarRatingCount: 65,
      },
    },
  },
  {
    title: 'Engineering Mathematics',
    author: ['K.A. Stroud', 'Dexter J. Booth'],
    publisher: 'Palgrave',
    publicationDate: '2007-01-01',
    edition: 14,
    keywords: ['mathematics', 'engineering'],
    pages: 1288,
    format: 'paperback',
    ISBN: '9781403942463',
    language: 'English',
    programmingLanguage: null,
    onlineContent: true,
    thirdParty: {
      goodreads: {
        rating: 4.35,
        ratingsCount: 370,
        reviewsCount: 18,
        fiveStarRatingCount: 211,
        oneStarRatingCount: 6,
      },
    },
    highlighted: true,
  },
  {
    title: 'The Personal MBA: Master the Art of Business',
    author: 'Josh Kaufman',
    publisher: 'Portfolio',
    publicationDate: '2010-12-30',
    keywords: ['business'],
    pages: 416,
    format: 'hardcover',
    ISBN: '9781591843528',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.11,
        ratingsCount: 40119,
        reviewsCount: 1351,
        fiveStarRatingCount: 18033,
        oneStarRatingCount: 1090,
      },
    },
  },
  {
    title: 'Crafting Interpreters',
    author: 'Robert Nystrom',
    publisher: 'Genever Benning',
    publicationDate: '2021-07-28',
    keywords: [
      'computer science',
      'compilers',
      'engineering',
      'interpreters',
      'software',
      'engineering',
    ],
    pages: 865,
    format: 'paperback',
    ISBN: '9780990582939',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.7,
        ratingsCount: 253,
        reviewsCount: 23,
        fiveStarRatingCount: 193,
        oneStarRatingCount: 0,
      },
    },
  },
  {
    title: 'Deep Work: Rules for Focused Success in a Distracted World',
    author: 'Cal Newport',
    publisher: 'Grand Central Publishing',
    publicationDate: '2016-01-05',
    edition: 1,
    keywords: ['work', 'focus', 'personal development', 'business'],
    pages: 296,
    format: 'hardcover',
    ISBN: '9781455586691',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.19,
        ratingsCount: 144584,
        reviewsCount: 11598,
        fiveStarRatingCount: 63405,
        oneStarRatingCount: 1808,
      },
    },
    highlighted: true,
  },
  function printBookInfo({ title, author, year = 'unknown' }) {
    //*Como es funcion en array, poner valor d1
    console.log(`${title} by ${author}, ${year}`);
  },
];
//TODO Nullish coaliscing
for (let i = 0; i < books.length; i++) {
  books[i].onlineContent ??
    console.log(
      `"${books[i].title} provides no data about its online content"`
    );
}
//TODO Logical Assignments Operators
for (let i = 0; i < books.length; i++) {
  books[i].edition ||= 1;
}

// books[i].thirdParty.goodreads.rating = books[i].thirdParty.goodreads.rating < 4.2 ? false : books[i].thirdParty.goodreads.rating;

// for (let i = 0; i < books.length; i++) {
//   books[i].highlighted &&= books[i].thirdParty.goodreads.rating =
//     books[i].thirdParty.goodreads.rating < 4.2
//       ? false
//       : books[i].thirdParty.goodreads.rating;
//   console.log(books[i]);
// }

// for (let i = 0; i < books.length; i++) {
//   books[i].highlighted &&= !(books[i].thirdParty.goodreads.rating < 4.2);
// }

// for (let i = 0; i < books.length; i++) {
//   books[i].highlighted &&= !(thirdParty.goodreads.rating < 4.2); //*verdadero o falso
// }

//TODO
// const hasExamplesInJava = objectBook => {
//   const condicion = objectBook.programmingLanguage === 'Java';
//   console.log('La condicional es:');
//   console.log(condicion || 'no data available');
// };
// hasExamplesInJava(books[0]);
// for (let i = 0; i < books.length; i++) {
//   //*for SI O SI se ejecuta, igual que circuitos || y &&
//   //*Cuando dicen recorrer o loop, SI O SI es for, recorrer arreglo etc
//   books[i].onlineContent &&
//     console.log(`${books[i].title} provides online content`); //*No devuelve nada si es null
// }

// let titulos = [];
// for (let i = 0; i < books.length; i++) {
//   if (books[i].title) {
//     titulos.unshift(...books[i].title);
//   }
// }
// console.log(titulos);

// const libros = [{ title: ['hola', 'springs'] }, { title: ['hola', 'springs'] }];
// let arrayoso = [];
// for (let i = 0; i < libros.length; i++) {
//   arrayoso.push(...libros[i].title, 'si'); //*une ambos valores del array en uno, si lo pongo sin spread, me retorna arrays separados
// } //*un array anidado
// console.log('🚀 ~ arrayoso:', arrayoso);
// // let nuevoArray = [];
// // for (let i = 0; i < books.length; i++) {
// //   nuevoArray += [...books[i].title];
// // }
// // console.log(nuevoArray);
// console.log(typeof libros[0]);

// hasExamplesInJava(books[1]);
// books[8]({ title: 'Algorithms ', author: 'Robert Sedgewick', year: 2011 }); //*Llamar a una funcion dentro de un array
// function printBookInfo({ title, author, year = 'year unknown' }) {
//   console.log(`${title} by ${author}, ${year}`);
// }
// printBookInfo({ title: 'Algorithms', author: 'Robert Sedgewick' });
// // const printBookInfo = books[8];
// // console.log("🚀 ~ printBookInfo:", printBookInfo)
// //*TODO
// const { title, author, ISBN } = books[0];
// console.log(title, author, ISBN);
// const { keywords: tags } = books[0];
// // const [{keywords: tags}] = books
// console.log('🚀 ~ tags:', tags);
// const { language, programmingLanguage = 'unknown' } = books[6];
// console.log(language, programmingLanguage);
// let bookTitle = 'unknown';
// let bookAuthor = 'unknown';
// ({ title: bookTitle, author: bookAuthor } = books[0]);
// console.log(bookTitle, bookAuthor);
// const {
//   thirdParty: {
//     goodreads: { rating: bookRating = 0 },
//   },
// } = books[0];

// //? Spread operator
// const arr = [5, 6, 7];
// const newArr = [, 2, ...arr];

// console.log(newArr);
// console.log(...newArr); //*Separa cada palabra, valor
// const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu);

// //Copy Array
// const mainMenuCopy = [...restaurant.mainMenu]; //!Copia superficial si cambia valor original cambia variable
// // Join 2 arrays
// const joinedArrays = [...restaurant.starterMenu, ...restaurant.mainMenu];

// //? Iterables are arrays, strings, maps, sets, NOT objects
// const str = 'Jonas';
// const letters = [...str, '', 's.'];
// console.log('🚀 ~ letters:', letters);
// const ingredients = [
//   // prompt("Let's make pasta! Ingredient 1?"),
//   // prompt("Let's make pasta! Ingredient 2?"),
//   // prompt("Let's make pasta! Ingredient 3?"),
// ];
// // restaurant.orderPasta(...ingredients); //*Es como cuando se pasa un argumento normal, solo que aca son los valores separados por el spread

// // Objects
// const newERestaurant = { year: 1558, ...restaurant, founder: 'Guiseppe' }; //*Tambien se puede hacer en objetos
// const newERestaurantCopy = { ...restaurant };
// newERestaurantCopy.name = 'Restaurante roma'; //*se puede adicionar, ahi si se diferenciarian
// console.log(newERestaurant);
// // console.log(`${...str}`); //*Solo se usan cuando pasamos argumentos a una funcion, o construimos una nueva matriz
//TODO pruebas Spread
// const bookAuthors = [...books[0].author, ...books[1].author];
// console.log(`Estos serian los autores de libros ${bookAuthors}`);

// function spellWord(string) {
//   console.log(...string);
// }

// spellWord('JavaScript');

// const hola = books[0]
// console.log('🚀 ~ bookRating:', bookRating, hola);
// const [firstBook, secondBook] = books;
// const [, , thirdBook] = books; //*Una coma por cada uno
// console.log(firstBook, secondBook);
// console.log(thirdBook);

// const ratings = [
//   ['rating', 4.19],
//   ['ratingsCount', 144584],
// ];

// const [[, rating], [, ratingsCount]] = ratings;

// console.log(rating, ratingsCount);

// const ratingStars = [63405, 1808];
// const [fiveStarRatings, oneStarRatings, threeStarRatings = 0] = ratingStars;
// console.log(fiveStarRatings, oneStarRatings, thre);

// const derecho = ['primero', 'segundo', 'tercero'];
// let [primero, , tercero] = derecho;
// [primero, tercero] = [tercero, primero];
// console.log(primero, tercero);

// const saludo = ['hola', 1, 'como estas'];
// const [saludation] = saludo
// console.log("🚀 ~ saludation:", saludation)

//TODO Codding Challenge #1 Football game
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandoski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandoski', 'Gnarby', 'Lewandoski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
//? 1. Create one player array for each team (variables 'players1' and 'players2')
//? 2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
//? 3. Create an array 'allPlayers' containing all players of both teams (22 players)
//? 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
//? 5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
//? 6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
//? 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

// 1.
const [players1, players2] = game.players;
// 2.
const [gk, ...fieldPlayers] = players1;
// 3.
const allPlayers = [...players1, ...players2]; //*Si fuera destructory a solo uno seria const [], como es array es const normal
console.log(allPlayers);
// 4.
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// 5.
const {
  odds: { team1, x: draw, team2 },
} = game;
// 6.
console.log('--------------OR---------------');
const printGoals = function (...namePlayers) {
  //*Lo une como array y ya tiene las propiedades de uno []
  console.log(`${namePlayers.length} goals were scored`);
};
// const printGoals = function (...namePlayers) {
//   //*Lo une como array y ya tiene las propiedades de uno []
//   for (let i = 1; i < namePlayers.length + 1; i++) {
//     console.log(`${namePlayers[i]} make ${i} goals`);
//   }
// };
printGoals('Davies', 'Muller', 'Lewandoski', 'Kimmich');
// 7.
team1 < team2 && console.log('Team 2 is more likely to win'); //*En caso de ser falso no retorna nada
team2 < team1 && console.log('Team 1 is more likely to win');

//*Short circuiting, ANY data type
console.log(3 || 'Jonas'); //*Escoge el primer truthy
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null); //*como es falsy, retorna el ultimo valor

console.log(undefined || 0 || '' || 'Hello' || 23 || null);
// restaurant.numGuests = 23; //*Si es 0 va a tronar porque es nully
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = (restaurant.numGuests ||= 10); //*Retorna el primer truthy
// const guests2 = restaurant.numGuests || 10; //*Retorna el primer truthy
console.log(guests2);

//*Si el ||= no existe retorna el otro valor condicion, mientras que si &&= no existe retorna undefined
console.log('--------AND----------'); //*Es lo contrario, retorna el primer falsy
console.log(0 && 'Jonas');
console.log(7 && 'Jonas');
console.log('Hello' && 23 && null && 'Jonas');

restaurant.orderPizza && restaurant.orderPizza('Mushrooms', 'Spinach'); //*Si existe darnos esto, sino nada ya sea asi o =, COMO UN TOGGLE
//* || Siempre tiene que tener un verdadero o un falso

restaurant.numGuests = 0;
//*Nullish Coalescing
const guestCorrect = restaurant.numGuests ?? 10; //* No existe y es null o undefined?, entonces esto
console.log(guestCorrect);

//* New form of looping arrays ----The For-of Loop----
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
for (const item of menu) console.log(item); //* Abstraccion // Diseñado para dar el elemento actual
// for(const item of menu) console.log(item);
for (const item of menu.entries()) {
  console.log(item); //* Para tener el indice de cada uno Devuelve un iterable de pares clave-valor para cada entrada en la matriz
}
console.log([...menu.entries()]); //*Iterador //...para tener el valor de cada array, esto tambien devuelve valores pue
for (const [i, el] of menu.entries()) {
  //*Se toman los dos valores porque es un array compuesto
  //*Destructor para esto, primer y segundo valor del array
  console.log(`${i + 1}: ${el}`); //*+1 para que no comience en 0, no pasa nada si se  suma
}

// console.log(...menu.entries());
// while (condition) {

// }
// switch (key) {
//   case value:

//     break;

//   default:
//     break;
// }

//* Entries = entradas
//TODO The For of loop
let pageSum = 0;

for (let book of books) {
  book.pages &&= pageSum += book.pages;
}
console.log(pageSum);

// console.log(undefined ?? '' ?? 11); //*retorna el primer valor truthy contando 0 y ""
// let eleccion = undefined; //*no existe siendo null o undefined, entonces has esto, pero si solo no existe es mejor &&=
// eleccion = eleccion ??= 10;
// console.log(eleccion);
const allAuthors = [];
for (const book of books) {
  if (book.author) {
    if (typeof book.author === 'string') {
      allAuthors.push(book.author);
    } else {
      for (const author of book.author) {
        allAuthors.push(author);
      }
    }
  }
}
console.log(allAuthors);
// for (const [i, author] of allAuthors.entries()) {
//   console.log(`${i + 1}. ${author}`);
// }
//*PARA SUMAR ARRAYS, NUNA USAR +=, SIEMPRE PUSH, porque trabaja como una concatenacion de strings
// Arreglo se convierte en una cadena de texto y se le agrega la conversión en string del array
let arreglo = [];
const array = [1, 2, 3, 4, 'hola', [1, 2, 3, 4, 'si']];
for (const arr of array) {
  if (typeof arr === 'string' || typeof arr === 'number') {
    arreglo.push(arr);
  } else {
    arreglo.push(...array[5]);
  }
}
// arreglo = [...array];
console.log(arreglo);
//TODO Literally enhanced objects
const bookData = [
  ['title', 'Computer Networking: A Top-Down Approach'],
  ['author', ['James F. Kurose', 'Keith W. Ross']],
  ['publisher', 'Addison Wesley'],
];

// Do the rest
const newBook = {
  [bookData[0][0]]: bookData[0][1], //*Se pueden añadir valores
  [bookData[1][0]]: bookData[1][1],
  [bookData[2][0]]: bookData[2][1],
};

console.log(newBook);
const pages = 880;

const newBook2 = {
  title: 'The C Programming Language',
  author: ['Brian W. Kernighan', 'Dennis M. Ritchie'],
  pages,
  // ...
};
console.log(newBook2);

console.log(0 ?? undefined); //*sino retorna el ultimo valor

if (restaurant.openingHours.mon) {
  console.log(restaurant.openingHours); //*Si no existe no retorna nada
}

if (restaurant.openingHours && restaurant.openingHours.fri)
  console.log(restaurant.openingHours);
// WITH optional chaining
console.log(restaurant.openingHours?.mon?.open); //* Si no existe retorna undefined

// Example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  //*Si sale 0 o "", mejor usar ??
  const open = restaurant.openingHours[day]?.open ?? 'closed'; //*se puede usar como prop individual
  console.log(`on ${day}, we open at ${open}`);
}

console.log(openingHours); //*es como hacer esto, SINO existe mandara undefined

// Methods
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist'); //* Retorna primer truthy excepto si es 0 o ""

// Arrays
const users = ['si', { name: 'Jonas', email: 'hello@jonas.com' }];
// const users = []
console.log(users[0]?.name ?? 'User array empty'); //*Si existe el primer valor, si es un obj y tiene prop llamada name
// if (users.length > 0) console.log(users[0].name);
// else console.log('user array empty');

const getFirstKeyword = function (bookObject) {
  console.log(bookObject.keywords?.[0]); //*Evalua si contiene la prop, como si fuera un objeto
  //*Esa es la estructura del Optional Chaining
};

// for (const book of books) {
//   getFirstKeyword(book);
// }
//? Object Keys, Values, and Entries
// //* Se considera iterable si puede ser recorrido
const properties = Object.keys(openingHours); //*retorna un array compuesto por los keys o props del objeto
console.log(properties); //*Retorna array con el nombre de las propiedades o "keys"
// // console.log(`We are open on ${properties.length} days`); //*length retorna un numero, o sea el largo del array u objeto
// for (const day of Object.keys(openingHours)) {
//   console.log(day);
// }
let openStr = `We are open on ${properties.length} days: `;
for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr); //*se tiene que mandar a llamar xd
// Property VALUES
const values = Object.values(openingHours); //*Para tener los valores de las keys
console.log('🚀 ~ values:', values); //*acceso a todos los valores del objeto, no necesidad de recorrerlo
// const ejemObjet = {
//   hola: 'si',
//   adios: 'no',
//   objeto: {
//     valor: 'si',
//   },
// };
// console.log(Object.values(ejemObjet));

// Entire object
// const entries = Object.entries(openingHours);
// console.log(entries); //*Es un array que retorna el nombre de la key o propiedad, junto con su valor

// [key, value]
// for (const [key, { open, close }] of entries) {
//   console.log(`On ${key}, we open at ${open}, and close at ${close}`);
// }
// console.log(books[0].thirdParty?.goodreads);
// TODO Looping Objects: Object Keys, Values and Entries
// const entries = [];
// const goodReads = books[0].thirdParty?.goodreads; //*Variable que accede al objeto
// // console.log('🚀 ~ goodReads:', goodReads);
// const keys = Object.keys(goodReads); //*se obtiene array con el valor de las keys

// for (const read of keys) {
//   // console.log(read);
//   entries.push([read]); //*se setea el valor de las keys a dentro de un array
// }
// console.log(entries);
// //[['rating'], ['ratingsCount'], ['reviewsCount'], ['fiveStartRatingCount'], ['oneStartRatingCount']]
// 11.1
let entries = [];
const keys = Object.keys(books[0].thirdParty?.goodreads); //*se obtiene array con el valor de las keys
for (const key of keys) {
  entries.push([key]); //*se setea el valor de las keys a dentro de un array
}
console.log(entries);
/* [

const books = [
  {
    title: 'Algorithms',
    author: ['Robert Sedgewick', 'Kevin Wayne'],
    publisher: 'Addison-Wesley Professional',
    publicationDate: '2011-03-24',
    edition: 4,
    keywords: [
      'computer science',
      'programming',
      'algorithms',
      'data structures',
      'java',
      'math',
      'software',
      'engineering',
    ],
    pages: 976,
    format: 'hardcover',
    ISBN: '9780321573513',
    language: 'English',
    programmingLanguage: 'Java',
    onlineContent: true,
    thirdParty: {
      goodreads: {
        rating: 4.41,
        ratingsCount: 1733,
        reviewsCount: 63,
        fiveStarRatingCount: 976,
        oneStarRatingCount: 13,
      },
    },
]; */
// 11.2
const goodReads = books[0].thirdParty.goodreads;
for (const [index, value] of Object.values(
  books[0].thirdParty.goodreads
).entries()) {
  entries[index].push(value);
  console.log(`El indexado es ${index}`);
  console.log(`Los valores son ${index} y ${value}`);
}
console.log(entries);
// 11.3
console.log(Object.entries(goodReads));
// [
//   ['rating', 4.41],
//   ['ratingsCount', 1733],
//   ['reviewsCount', 63],
//   ['fiveStarRatingCount', 976],
//   ['oneStarRatingCount', 13],
// ];
// let entries = [];

const entries2 = Object.entries(books[0].thirdParty.goodreads); //*para insertar el array d1, JS yua te hace el tipo de dato
//*Inserta todos los valores del array de un solo [nombre, valor]
console.log('🚀 ~ entries2:', entries2);
// 11.4
console.log(entries, entries2);

// Lets continue with our football betting app!
//TODO
// 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandoski")
for (const [index, value] of game.scored.entries()) {
  console.log(`Goal ${index + 1}: ${value}`);
}
// 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go back if you dont remember)
let avg = 0;
for (const value of Object.values(game.odds)) {
  avg += value;
}
const odds = avg / Object.values(game.odds).length;
console.log(`The avg odd is: ${odds.toFixed(2)}`);
// 3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
//     Odd of victory Bayern Munich: 1.33
//     Odd of draw: 3.25
//     Odd of victory Borussia Dortmund: 6.5
// Get the team names directly from the game object, dont hardcore them (except for "draw"). HINT: Note how to the odds and the game obects have the same property names
// for (const [index, value] of Object.entries(game.odds)) {
//   console.log(`Odd of victory ${game?.[index] ?? 'draw'}: ${value}`);
// }
const objs = {
  valor1: 1,
  valor2: 2,
  valor3: 'valor tercero',
};
const matriz = [1, 2, 3, 'cuatro', { cinco: 'cinco' }];
console.log(Object.values(objs));
const matrizEntries = [...matriz.keys()];
console.log(matrizEntries);
// for (const obj of Object.entries(objs)) {
//   console.log(obj);
// }

// BONUS: Create an object called "scores" wich contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
console.log(`----- Diferencia de objeto -----`);
console.log(Object.entries(objs));
console.log(`----- Diferencia de matriz -----`);
// const llaves = [...matriz.keys()];
// console.log(llaves[0]);
// console.log(...matriz.values());
// console.log(...matriz.entries());

//? Sets

const orderSet = new Set([
  'pasta',
  'pizza',
  'risotto',
  'pasta',
  'pizza',
  'risotto',
]);
console.log(orderSet);
console.log(new Set('Jonas'));
console.log(orderSet.size); //*retorna numero de elementos en el set
console.log(orderSet.has('Pizza')); //* Retorna true o false
console.log(orderSet.has('Bread'));
orderSet.add('Garlic Bread');
orderSet.add('Garlic Bread');
console.log(orderSet);
orderSet.delete('Garlic Bread');
console.log(orderSet);
// orderSet.clear()
console.log(orderSet);
for (const order of orderSet) console.log(order);

const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
console.log(new Set(staff).size);
console.log(new Set('JonasSchmedtmann').size);

//TODO Set
// 1.
const allKeywords = [];
for (const book of books) {
  allKeywords.push(...(book.keywords ??= '')); // Usamos ... porque queremos su valor, no matrices anidadas
}
// console.log("si");
// console.log(`${allKeywords}`); //*si las pones asi se convierten a texto
console.log(allKeywords);
// 2.
const uniqueKeywords = new Set(allKeywords); // {"hola","si"}
// 3.
uniqueKeywords.add('coding'); //*No se pueden añadir varios a la vez o arrays
uniqueKeywords.add('science');
// 4.
uniqueKeywords.delete('business');
// 5.
const uniqueKeywordsArr = [...uniqueKeywords];
console.log(uniqueKeywordsArr);
// 6.
uniqueKeywords.clear();
console.log(uniqueKeywords);

// const botonsito = document.querySelector('.botonsito');

// botonsito.addEventListener("keydown", ()=>{
//   event.key === "s"? console.log("has presionado la tecla s") : "neles"
// })

//? Maps: Fundamentals
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal')); //*Ademas de adicionar, retorna el valor
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');

console.log(rest.get('name'));
console.log(rest.get(true)); //*Si no se encuentra, retorna undefined
const time = 21;
rest.set(document.querySelector('h1'));
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));
console.log(rest.has('categories'));
rest.delete(2);
// rest.clear()
rest.set([1, 2], 'Test');
console.log(rest);
console.log(rest.size);
const arr = [1, 3];
rest.set(arr, 'prueba');
console.log(rest.get(arr));
rest.set([1, 2], 'Hola');
console.log(rest);
//TODO Maps
// 1.
// const initialArray = [
//   [
//     ['title', 'Clean Code'],
//     ['author', 'Robert C. Martin'],
//   ],
// ];
// const bookMap = new Map();
// for (const innerValue of initialArray) {
//   for (const value of innerValue) {
//     bookMap.set(value[0], value[1]).set(value[1], value[1]);
//   }
// }
// console.log(bookMap);
const bookMap = new Map([
  //*se pueden mandar de un array dentro de otro, y automaticamente se hace la conversion
  ['title', 'Clean Code'],
  ['author', 'Robert C. Martin'],
]);
console.log(bookMap);
// 2.
bookMap.set('pages', 464);
// 3.
console.log(`${bookMap.get('title')} by ${bookMap.get('author')}`);
// 4.
console.log(bookMap.size);
// 5.
bookMap.has('author')
  ? console.log('The author of the book is known')
  : console.log('neles prro');

const question = new Map([
  //*Cuando se inicia, puede ser con un array dentro de otro
  ['question', 'what is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'Javascript'],
  ['correct', 3],
  [true, 'correct 🥳'],
  [false, 'try again!'],
]);
console.log(question);
// Convert object to a map
console.log(Object.entries(openingHours)); //*Por ende, como el entries es un array de arrays [[], [], []], se puede inicializar con el
const hoursMap = new Map(Object.entries(openingHours));
// Quiz app
console.log(question.get('question'));
for (const [key, value] of question)
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
// const answer = Number(prompt('Your answer'));
const answer = 3;
// console.log(answer);
console.log(question.get(answer === question.get('correct'))); //*Se lanza siempre
// console.log([...question]); //*Saca el valor con spread
console.log(question.keys());
console.log(question.values());

//TODO Maps iteration
// 1.
const firstBookMap = new Map(Object.entries(books[0])); //* "titulo", "valor" || [["titulo", "valor"], ["titulo", "valor"]]
console.log("🚀 ~ firstBookMap:", firstBookMap)
// 2.
for(const [index, value] of firstBookMap){ //*tambien se puede recorrer e iterar
  if(typeof value === "number") console.log(index);
}