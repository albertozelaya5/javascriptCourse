## Memory Management: Garbage Collection

Veremos como mediante un mecanismo llamado `Garbage Collection`, para tener nuestra memoria limpia

### Review the memory lifecycle

1. Al crear un valor, se le asigna una cantidad de memoria
2. Use memory
3. Release memory (la memoria se libera)

```js
let temp = 23.7;
temp = temp + 5;
Math.round(temp);

//* temp is removed from memory
```

### How is memory freed up(liberado) after we no longer need a value?

Como los valores se almacenan en el `stack` y en el `heap`, debemos analizarlos

- `Call stack` => Variable environment is simply deleted when EC pops off stack, se borra cuando sale del stack
  A menos sea el Global context, ahi los valores están forever
- `Heap` => El engine corre un proceso llamado `Garbage Collection`, cuando considera oportuno
  Es automático, por lo que cada tiempo se borran las cosas que no se usan

Todos los lenguajes modernos usan un proceso llamado `Mark and Sweep algorithm`, recordar que en el heap se pueden almacenar toda clase de objetos complejos como arrays, objetos, functions, set, maps, etc

1. Mark: mark all objects that are `reachable` from a root as "alive"

"Roots": starting point to search for alive objects, como EC(execution context)
Las funciones pueden ser usadas por event listeners, timers, o `closures`

2. Sweep: Delete unmarked (unreachable) objects and reclaim memory for future allocations

Si un objeto esta en el global EC, este se quedara en el heap por siempre

> [!IMPORTANT] Memory leak
> When objects that are no longer needed, are **incorrectly still reachable**, and therefore **not being garbage collected**

Un ejemplo son los timers, estos tienen functions que se guardan hasta que las borramos, por lo que si no lo hacemos, esto sera un memory leak
Por eso, siempre es mejor quitar timers y event listeners cuando ya no son necesarios
O declarar `large objects` as global objects
