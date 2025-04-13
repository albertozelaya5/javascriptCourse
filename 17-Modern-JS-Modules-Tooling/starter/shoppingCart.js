// Exporting module
console.log('Exporting module');

const shippingCost = 10; //*scoped en el currentModule
export const cart = [];

// Blocking code
// console.log('Start fetching users');
// await fetch('https://jsonplaceholder.typicode.com/posts');
// console.log("Finish fetching users");

//*Siempre los exports tienen que estar en los niveles mayores
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity }); //* se puede poner asi
  console.log('carrito', cart);
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalQuantity as qt, totalPrice }; //*export e importan como objetos, funciones también como objetos

export default function (product, quantity) {
  cart.push({ product, quantity }); //* se puede poner asi
  console.log('carrito', cart);
  console.log(`${quantity} ${product} added to cart`);
}
