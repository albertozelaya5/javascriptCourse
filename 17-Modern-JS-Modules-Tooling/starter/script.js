// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
// import cloneDeep from "./node_modules/lodash-es/"

// Importing module
// console.log('Importing module'); //*Aun cuando lo pongamos antes
// import { addToCart, totalPrice as price, qt } from './shoppingCart.js'; //*ES6 también funcione sin las extensiones
//*Se ejecuta antes SIEMPRE las importaciones
// addToCart('bread', 5);
// console.log(price, qt);

// import * as ShoppingCart from './shoppingCart.js'; //*Public Api

//*Todos estos módulos siempre son ejecutados en strict-mode

// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);
// console.log(price);

// import add from './shoppingCart.js';
// add('pizza', 2);
// add('bread', 5);
// add('apples', 4);

// console.log(cart);
// console.log('Start fetching: ');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();

// .then(res => console.log(res));
// console.log(data);
// console.log('something');

// const getLastPost = async function () {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await res.json();
//   console.log('🚀 ~ getLastPost ~ data:', data);

//   console.log({ title: data.at(-1).title, body: data.at(-1).body });

//   return { title: data.slice(-1).title };
// };
// const lastPost = await getLastPost(); //*Sin await SIEMPRE nos dará una promesa
// console.log(lastPost);

// const ShoppingCart2 = (function () {
//   //*Hacer esto crea que, cuando usamos varios, tenemos que importar archivos uno por uno en el html, tener cuidado con las importaciones, etc
//   //*Solo esta limitado al modulo
//   const cart = [];
//   const shoppingCart = 10;
//   const totalPrice = 237;
//   const totalQuantity = 23;

//   const addToCart = function (product, quantity) {
//     cart.push({ product, quantity }); //* se puede poner asi
//     console.log(
//       `${quantity} ${product} added to cart, shipping cost is ${shoppingCart}`
//     );
//   }; //*Se obtiene acceso a la variable aunque se supone que ya no exista

//   const orderStock = function (product, quantity) {
//     console.log(`${quantity} ${product} ordered from supplier`);
//   };

//   return {
//     //
//     addToCart,
//     cart,
//     totalPrice,
//     totalQuantity,
//   };
// })();

// ShoppingCart2.addToCart('apple', 4);
// ShoppingCart2.addToCart('pizza', 4);

// console.log(ShoppingCart2);

//? CommonJS Modules

// Export
// export.addToCart = function (product, quantity) {
//   cart.push({ product, quantity }); //* se puede poner asi
//   console.log(j
//     `${quantity} ${product} added to cart, shipping cost is ${shoppingCart}`
//   );
// };

// // Import
// const {addToCart} = require("./shoppingCart.js")

import cloneDeep from 'lodash-es';

//? Introduction to Command Line
const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: {
    loggedIn: true,
  },
};
const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false; //*La copia también sera falsa
console.log(stateClone, stateDeepClone);
//*JSON.parse(JSON.stringify(obj))

if (module.hot) module.hot.accept();
