## How JavaScript Works Behind the Scenes

Javascript no es un compiled language, se ejecuta linea por linea por un programa como el navegador o Node.js, mediante el motor V8, que es el que lo vuelve en algo que las pc puedan entender

## How JavaScript executes code in a single thread

Js se ejecuta en un solo hilo o "thread", el motor V8 posee dos partes principales

- Heap: Es donde se almacenan los tipos de referencia (objetos, arrays, functions)
- Call Stack: Es quien maneja la ejecución de nuestro programa

Para cada función, se crea un contexto de ejecución, se inserta en el `call stack`, se ejecuta y luego de extrae de ahi, una tarea a la vez
Y para cada function, se crea su propia "cajita", en donde se guardan sus dependencias

Asi que si bien Js solo corre en un solo hilo, mediante las `WEB APIS`, se nos provee de funciones que interactúan con el navegador (fetch, setTimeout, console, Geolocation, HTMLElement, URL ...)

Y algunas de estas `WEB APIS`, nos permiten descargar tareas en el navegador.

Por ejemplo en el `navigator.Geolocation.getCurrentPosition`, al registrar la function en el callStack, esta se sale del call stack, e internamente el browser ejecuta esa función sin detener los procesos de las demás, porque ya salio del callStack y es el navegador quien se encarga

- `Task Queue` o `Callback queue`: que es donde se sostienen las api callbacks y event handlers, para ser ejecutados en algún punto en el futuro, o sea cuando el call stack este disponible

Ahora, como sabemos cuando el call stack esta disponible? ahi es donde viene el `Event Loop`, que recorre continuamente el call stack hasta ver un espacio disponible y depositar las tareas ahi

```
setTimeout(() => {
  console.log("1000ms");
}, 1000);

console.log("DeepIntoDev");
```

Asi que, primero pasa por el task queue, que sostiene la función hasta que mediante el event loop mira cuando el call stack esta libre, se registra la función en el call stack(con su delay), y una vez registrada sale de ahi, pasa a manos de las WEB APIs donde se almacena, y deja a las tareas síncronas, ejecutarse sin ese delay

Ahora, habiendo pasado los 1000ms, se repite el proceso, moviendo la función al task queue, y cuando este libre al call stack para ser ejecutada, en si es hasta que pase cierto tiempo o en caso de las asíncronas, hasta que ya tenga una respuesta

> [!IMPORTANT]
> Esos 1000ms, son los que tarda en pasar de las WEB APIS al task queue, no el tiempo total, por lo que si el call stack esta muy cargado tocara esperar a que este libre

Ahora, hay una diferencia cuando se trata de tareas asíncronas como promesas, fetching

```
function fetchData(url) {
  return new Promise((resolve, reject) => {
    // Simulating network request
    setTimeout(() => {
      if (url === "invalid") {
        reject(new Error("Failed to fetch data"));
      } else {
        resolve({ data: "Success" });
      }
    }, 1000);
  });
}

// Then/catch approach
fetchData("example.com")
  .then((result) => console.log("Result:", result))
  .catch((error) => console.error("Error:", error));

// Async/await approach
async function getData() {
  try {
    const result = await fetchData("example.com");
    console.log("Result:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}
```

Y con ellas, nosotros trabajamos en el `Microtask queue`

Microtask queue is a special queue that is dedicated to; .then, .catch, .finally callbacks and for async-await. Only these will get pushed into microtask queue. (There are also some other functions like queueMicrotask, new mutationObserver.)

There is something really important that you should know here. Event loop prioritizes Microtask Queue! So event loop will first look at the Microtask queue, if call stack is available, it will take those functions into the call stack. Only after when Microtask queue is empty, it will go and check the task queue.

Por cada evento que pasa en el task queue, inmediatamente luego se corren todos los procesos del Microtask queue, y hasta con cada uno hasta que ambos queden vacíos

After we run the code above, fetch() function will be added to the callstack. But this is just to create the Promise Object. So function won't be executed but just registered to WEB APIs part, just like we saw at the callback-based apis. After, .then function will be added to the callstack, but this is just to register too. We will register a record so that we know what we do after our promise is resolved. (PromiseReaction)

Hasta que la promesa se ejecute en el navegador mediante las WEB APIS, se complete siendo fullField o resolved, se devolverá a las microTask queue, para luego pasar al call stack y ser ejecutada

```
Promise.resolve().then(() => console.log(32)); //! AQUÍ COMO YA ESTA RESOLVED TARDARA MENOS

setTimeout(() => console.log(9), 5);

queueMicrotask(() => {
  console.log(11);
  queueMicrotask(() => console.log(4));
});

console.log(3);
```

Al definir primero Promise.resolve(), sera la primera tarea en el microtask queue, seguido de las queueMicrotask, que están dentro de su propio box, cuando el microtask ya este vació se ejecutara el task queue con el timeout 9

```
3, 32, 11, 4, 9
```
