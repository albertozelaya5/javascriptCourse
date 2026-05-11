//* Ejercicio 1 - Debounce que espere un segundo
// function debounceWait(fun, delay) {
//   setTimeout(fun, delay);
// }

// debounceWait(function () {
//   console.log("hola");
// }, 1000);

//* Ejercicio 2 - Simular una búsqueda
// const inputText = document.querySelector(".inputText");

// function search(event) {
//   console.log("Buscando:", event.target.value);
// }

// inputText.addEventListener("change", debounceSearch(search, 700));

// function debounceSearch(fun, delay) {
//   let timer;
//   return function (event) {
//     clearTimeout(timer);
//     timer = setTimeout(function () {
//       fun(event);
//     }, delay);
//   };
// }

//* Ejercicio 3 - Modification del 2
//* Primera vez se ejecuta inmediatamente
//* Luego debounce
// const inputText = document.querySelector(".inputText");

// let counter = 0;
// function search(event) {
//   counter++;
//   console.log("Buscando:", event.target.value);
// }

// console.log(counter);

// inputText.addEventListener("change", debounceSearch(search, 700));

// function debounceSearch(fun, delay) {
//   let timer;
//   return function (event) {
//     clearTimeout(timer);
//     if (counter === 0) return fun(event);
//     timer = setTimeout(function () {
//       fun(event);
//     }, delay);
//   };
// }
