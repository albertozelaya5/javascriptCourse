# Optimizations for Javascript

## 1. Using optimized Loops

En lugar de usar un for normal

```js
const numbers = [1, 2, 3, 4, 5];
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
```

Usar un for of o un forEach

```js
for (const num of numbers) {
  console.log(num);
}
```

Ambos están **optimizados** para iterar arrays

## Usar muchos event Listeners

En lugar de

```js
document.getElementById("btn").addEventListener("click", () => console.log("Clicked!"));
document.getElementById("link").addEventListener("click", () => console.log("Clicked link!"));
```

Hacer event delegation

```js
document.addEventListener("click", (event) => {
  if (event.target.matches("#btn")) {
    console.log("Clicked!");
  }
  if (event.target.matches("#link")) {
    console.log("Clicked link!");
  }
});
```

Why? Reducing the number of event listeners improves memory efficiency.

## Evitar memory Leaks o filtraciones de memoria

```js
let arr = [];
document.getElementById("btn").addEventListener("click", function () {
  arr.push(new Array(1000000).fill("data")); // Large objects stay in memory
});
```

Mejor

```js
document.getElementById("btn").addEventListener("click", function () {
  arr = []; // Reset the reference
});
```

Remover referencias innecesarias despeja la memoria

## Optimize API Calls & Use Caching

```js
fetch("https://api.example.com/data")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

Mejor cachear las respuestas, para prevenir llamadas innecesarias repetidas

```js
let cache = {};
async function fetchData(url) {
  if (cache[url]) {
    return cache[url]; // Return cached data
  }
  const response = await fetch(url);
  const data = await response.json();
  cache[url] = data; // Store response in cache
  return data;
}
fetchData("https://api.example.com/data").then((data) => console.log(data));
```

## Debounce => Anti rebote

Evitar correr funciones muy frecuentemente, especialmente `scroll` or `resize` events

```js
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}
window.addEventListener(
  "resize",
  debounce(() => console.log("Resized!"), 300)
);
```
