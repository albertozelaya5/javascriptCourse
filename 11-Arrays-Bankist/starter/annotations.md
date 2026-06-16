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
