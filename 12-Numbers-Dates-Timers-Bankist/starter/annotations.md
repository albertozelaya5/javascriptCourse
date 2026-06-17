## Fixing a Sorting Bug

Existía un bug que, al momento de agrupar o darle al botón _sort_, se ordenaban los valores de movements mas no la fecha

Entonces lo que hicimos fue crear un array nuevo que agrupa los movements y las dates de los movements

```js
const displayMovements = function (acc, sort = false) {
  const combinedMovsDates = acc.movements.map((mov, i) => ({
    movement: mov,
    movementDate: acc.movementsDates.at(i),
  }));

  if (sort) combinedMovsDates.sort((a, b) => a.movement - b.movement);

  combinedMovsDates.forEach(function (obj, i) {
    const { movement, movementDate } = obj;
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(movementDate);
    const displayDate = formatMovementDate(date, acc.locale);
  });
};
```

> [!NOTE]
> Como `sort` modifica el array, por eso podemos usar esa condición y no volver a definir nada

Y asi, cada fecha va con su respectivo valor definido al inicio, y al ordenarse se va a ordenar la fecha también

Para mas detalles ver a partir de la linea 106 [script.js](./script.js)
