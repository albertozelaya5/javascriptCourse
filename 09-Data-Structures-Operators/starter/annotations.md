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

También tenemos el `union()` method, que como si nombre lo indica, une dos sets, sin valores duplicados

```js
const italianMexicanFusion = italianFoods.union(mexicanFoods);
console.log('union', italianMexicanFusion);
```

- Otro que tenemos es `difference()`, que nos da los valores del primero, que no estén en el segundo

```js
const uniqueItalianFoods = italianFoods.difference(mexicanFoods);
```

En este caos saldrán _pasta, gnocchi, olive oil y basil_

- Luego, tenemos `symmetricDifference()` que nos da los elementos que no tienen en común ambos set

```js
const uniqueItalianAndMexicanFoods =
  italianFoods.symmetricDifference(mexicanFoods);
```

- Por ultimo en este video, tenemos `isDisjointFrom()` que nos dice si dos sets tienen elementos en común, si tienen tira false, sino true

```js
console.log(italianFoods.isDisjointFrom(mexicanFoods));
```

Todos estos nos pueden servir si trabajamos con arrays, o alguna situación donde ocupamos algún booleano

Luego podemos buscar en la documentation sobre

- isSubsetOf()
- isSupersetOf()

Que también nos darán algún booleano
