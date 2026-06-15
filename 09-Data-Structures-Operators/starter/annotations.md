## New Operations to Make Sets Useful!

En si los sets nunca se han usado tanto, pero ahora se le han metido mas métodos y resultado mas útiles, especialmente con arrays

Si queremos saber que valores tienen en común ambos sets o arrays usamos el método `intersection()`

```js
const italianFoods = new Set(['gnocchi', 'tomatoes']);
const mexicanFoods = new Set(['rice', 'tomatoes']);

const commonFoods = italianFoods.intersection(mexicanFoods);
console.log('🚀 ~ commonFoods:', commonFoods);
console.log('🚀 ~ commonFoods:', [...commonFoods]);
```

Podemos poner el orden al revés, no hay problema

El segundo es si lo queremos ver como array
