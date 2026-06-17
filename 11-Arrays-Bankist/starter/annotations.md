## The New findLast and findLastIndex Methods

- Primero tenemos el `findLast()`, que hace lo contrario que el find

O sea, nos da el ultimo resultado que cumpla la condición

```js
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const lastWithdrawal = movements.findLast(mov => mov < 0);
```

Y nos da => -130

- Luego tenemos `findLastIndex()` que es lo mismo que `findIndex()` pero con el ultimo elemento

```js
movements.findIndex(450);
```

Y me dará 1

> [!NOTE]
> Siempre lo dará en 0 based

## Array Grouping

Tenemos otro método interesante, que es como un filter pero con esteroides

```js
const groupedMovements = Object.groupBy(movements, movement =>
  movement > 0 ? 'deposits' : 'withdrawals',
);
```

Este recibe dos argumentos, el array inicial, y la callback function igual a map, filter, forEach, etc

Donde dependiendo de la condición, debemos retornar el nombre de las propiedades que tendrá el objeto que de como resultado

```json
{
  "deposits": [3000, 1300, 450, 200, 70],
  "withdrawals": [-130, -400, -650]
}
```

Ahora, esta agrupación tiene aun mas sentido cuando se usa con objetos. y luego agruparlos por una propiedad de ese objeto

por ejemplo

```js
const account1 = {
  type: 'premium',
};

const account2 = {
  type: 'standard',
};

const account3 = {
  type: 'premium',
};

const account4 = {
  type: 'basic',
};

const accounts = [account1, account2, account3, account4];

const groupedAccounts = Object.groupBy(accounts, account => account.type);
```

Nos dará

```json
{
  "premium": [
    {
      "type": "premium",
      "userName": "js"
    },
    {
      "type": "premium",
      "userName": "stw"
    }
  ],
  "standard": [
    {
      "type": "standard",
      "userName": "jd"
    }
  ],
  "basic": [
    {
      "type": "basic",
      "userName": "ss"
    }
  ]
}
```

> [!IMPORTANT]
> Este es el caso mas usado, ya que es agrupar por una propiedad, y la function necesita retornar strings que sean las nuevas propiedades

## Non-Destructive Alternatives: toReversed, toSorted, toSpliced, with

Elementos que mutan el array:

- reverse()
- sorted()
- splice()

Elementos que NO mutan el array:

- toReversed()
- toSorted()
- toSpliced()

Ahora bien, si queremos modificar un valor del array, pero sin destruirlo, usamos esto

```js
//* EN LUGAR DE
movements[1] = 2000/

//* USAR
const newMovements = movements.with(1, 2000);
```

Recibe dos argumentos, el primero es la posición que queremos modificar, el segundo es el valor

# Guía de Métodos de Arrays en JavaScript (¿Cuál método usar?)

| Acción / Objetivo ("I WANT...")                                               | Caso de Uso Específico                   | Método             | Comportamiento / Notas                                                                                          |
| :---------------------------------------------------------------------------- | :--------------------------------------- | :----------------- | :-------------------------------------------------------------------------------------------------------------- |
| **To mutate original**<br>_(Mutar el original)_                               | Añadir al final                          | `.push()`          | **¡Evitar por lo general!** Modifica el array original.                                                         |
|                                                                               | Añadir al inicio                         | `.unshift()`       | **¡Evitar por lo general!** Modifica el array original.                                                         |
|                                                                               | Eliminar del final                       | `.pop()`           | **¡Evitar por lo general!** Modifica el array original.                                                         |
|                                                                               | Eliminar del inicio                      | `.shift()`         | **¡Evitar por lo general!** Modifica el array original.                                                         |
|                                                                               | Eliminar/añadir en cualquier posición    | `.splice()`        | **¡Evitar por lo general!** Modifica el array original.                                                         |
|                                                                               | Invertir el orden                        | `.reverse()`       | **¡Evitar por lo general!** Modifica el array original.                                                         |
|                                                                               | Ordenar elementos                        | `.sort()`          | **¡Evitar por lo general!** Modifica el array original.                                                         |
|                                                                               | Llenar con un valor                      | `.fill()`          | **¡Evitar por lo general!** Modifica el array original.                                                         |
| **A new array based on original**<br>_(Un nuevo array basado en el original)_ | Misma longitud que el original           | `.map()`           | Crea un nuevo array transformando cada elemento (bucle).                                                        |
|                                                                               | Filtrado mediante una condición          | `.filter()`        | Crea un nuevo array con los elementos que cumplen la condición.                                                 |
|                                                                               | Obtener una porción del original         | `.slice()`         | Extrae una parte sin modificar el original.                                                                     |
|                                                                               | Con un elemento reemplazado              | `.with()`          | Devuelve un nuevo array modificando el índice indicado.                                                         |
|                                                                               | Aplanar (quitar niveles de profundidad)  | `.flat()`          | Desestructura sub-arrays internos.                                                                              |
|                                                                               | Aplanar y mapear                         | `.flatMap()`       | Mapea y aplana en un solo paso.                                                                                 |
|                                                                               | Invertir el orden (sin mutar)            | `.toReversed()`    | Versión segura de `.reverse()`.                                                                                 |
|                                                                               | Ordenar elementos (sin mutar)            | `.toSorted()`      | Versión segura de `.sort()`.                                                                                    |
|                                                                               | Con elementos eliminados/reemplazados    | `.toSpliced()`     | Versión segura de `.splice()`.                                                                                  |
|                                                                               | Unir dos arrays                          | `.concat()`        | Combina dos o más arrays en uno nuevo.                                                                          |
| **An array index**<br>_(Obtener un índice del array)_                         | Basado en un valor específico            | `.indexOf()`       | Devuelve el primer índice donde se encuentra el valor.                                                          |
|                                                                               | Basado en una condición de prueba        | `.findIndex()`     | Devuelve el índice del primer elemento que cumple la condición.                                                 |
|                                                                               | Basado en una condición (desde el final) | `.findLastIndex()` | Devuelve el índice del último elemento que cumple la condición.                                                 |
| **An array element**<br>_(Obtener un elemento del array)_                     | Basado en una condición de prueba        | `.find()`          | Devuelve el primer elemento que cumple la condición.                                                            |
|                                                                               | Basado en una condición (desde el final) | `.findLast()`      | Devuelve el último elemento que cumple la condición.                                                            |
|                                                                               | Basado en su posición                    | `.at()`            | Soporta índices negativos (ej. `-1` para el último).                                                            |
| **Know if array includes**<br>_(Saber si el array incluye)_                   | Basado en un valor específico            | `.includes()`      | Devuelve `true` o `false`.                                                                                      |
|                                                                               | Basado en una condición (¿al menos uno?) | `.some()`          | Devuelve `true` si al menos un elemento cumple la condición.                                                    |
|                                                                               | Basado en una condición (¿todos?)        | `.every()`         | Devuelve `true` si todos los elementos cumplen la condición.                                                    |
| **A new string**<br>_(Convertir a una nueva cadena)_                          | Basado en un separador                   | `.join()`          | Une todos los elementos en un string.                                                                           |
| **To transform to value**<br>_(Transformar a un único valor)_                 | Basado en un acumulador                  | `.reduce()`        | Reduce el array a un solo valor de cualquier tipo: número, string, booleano, o incluso un nuevo array u objeto. |
| **To just loop array**<br>_(Solo recorrer el array)_                          | Basado en un callback                    | `.forEach()`       | No crea un nuevo array, simplemente itera sobre los elementos.                                                  |
