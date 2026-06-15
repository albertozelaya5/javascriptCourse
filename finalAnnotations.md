## The Rise of AI Tools (ChatGPT, Copilot, Cursor AI, etc.)

### The workflow of using AI for coding

Chat gpt, github copilot, cursor

- Todas pueden generar código por nosotros, dependiendo de nuestro prompt, usando LLM => `large language models`
- Copilot y cursor nos dan herramientas de auto completado

Sin embargo, al hacer cualquier código, se necesita un workflow definido

### El workflow

- Entender completamente el problema, hacer preguntas para tener un clear picture
- Si el problema es grande, dividirlo en sub problemas
  En lugar de decirme "hazme Instagram", dividirlo en cosas pequeños
- Choose AI and give it a **very specific prompt** and enough context (el lenguaje, el contexto del problema,sobre que trata, que es lo que debería lograr, coding style, etc)
- **Review and test** the output solution. Make sure you introduce no bugs into your app
  Pueden dar una solución mas complicada de la necesaria
  Se le puede pedir que improve the code, diciéndole que esta mal, y que se necesita
- **Integrate** the solution into your app

### Guidelines for safe use of AI

> Before you use AI

1. you need to know **how to code on your own**, fundamental skills are 100% essential
2. You need to be able to **solve problems on your own**
3. You need to have very **critical thinking** (AI code puede contener muchos bugs or bad code)
4. You need to have **curiosity and joy** while coding

> [!IMPORTANT]
> Use AI as an assistant, not a replacement!
> Save time on repetitive and boring tasks, or learning!

### Incorporarte AI code:

1. When you could have **written the code yourself**
   Lo ideal es ya haber pensado en los lineamientos o funciones necesarias para resolver el problema
2. When you **truly understand** the generated code
3. When you have ensured the code is 100% correct => que los errores de la IA no lleguen al código
4. When you're not using the code for **mission critical parts** of your apps

rely on => depender de
mundane => mundane

### Will AI take your JOB?

Software developers do a **lot more than just writing code:** maintain bigger picture of huge projects / think about software/implement complex design principles/ are creative/ they collaborate with other developers and clients

- AI generated code is **still buggy**. and AI is **not very good at debugging**

> [!NOTE]
> Debugging es el proceso de encontrar y corregir errores en un programa, y a estos errores se les conoce como "bugs"
> ![alt text](image.png)

## Solving CHALLENGE #2 With AI

Ver [script.js](../ai-challenge/script.js)

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

## FileReader - Convertir archivos a base 64, texto, binario etc

Se usa cuando subimos un archivo por medio de

```html
<input type="file" /> <input type="file" id="multiFileInput" multiple />
<!-- multiple PARA SELECCIONAR VARIOS ARCHIVOS A LA VEZ -->
```

Para acceder al valor de un input tipo file, se debe leer con

```js
const input = document.querySelector(".fileInput");
input.files; /* QUE NOS DATA LA LISTA DE ARCHIVOS SUBIDOS  */
```

O al trabajar con objetos File o Blob

Es asíncrono, ya que leer un archivo puede tomar tiempo

- Tiene sus propios eventos, como onload, onerror, etc

Tiene estos métodos

- readAsText(file) → lo convierte en texto (ej. .txt, .json).
- readAsArrayBuffer(file) → lo convierte en un buffer binario (útil para imágenes o PDFs).
- readAsDataURL(file) → lo convierte en un Base64 Data URL, que se puede usar en <img src="...">.
- readAsBinaryString(file) → legado (no se recomienda usar).

Por ejemplo

```js
function uwu(file){
  return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // Comienza a leer el archivo como DataURL
      reader.readAsDataURL(file);

      // Cuando termina de leer el archivo
      reader.onload = () => {
        if (reader.result) {
          // `reader.result` contiene algo como: "data:image/png;base64,iVBORw0KGgoAAAANS..."
          const base64 = (reader.result as string).split(",")[1];
          resolve(base64); // devolvemos solo la parte Base64 sin el header
        } else {
          reject(new Error("El resultado es nulo prro"));
        }
      };

      // Si ocurre un error al leer
      reader.onerror = (error) => {
        reject(error);
      };
    });
}
```

## Text area and selects examples

> [!NOTE]
> Todos estos se accede su valor mediante `document.querySelector(".nombre").value`

### Input type text

````html
<label for="nombre">Nombre:</label>
<input type="text" id="nombre" name="nombre" placeholder="Escribe tu nombre completo" />```
````

### Input type file

```html
<label for="curriculum">Sube tu CV:</label> <input type="file" id="curriculum" name="curriculum" />
```

### Input type text area

```html
<label for="mensaje">Mensaje:</label>
<textarea id="mensaje" name="mensaje" rows="4" cols="50" placeholder="Escribe tu mensaje aquí..."></textarea>
```

### Input type select

```html
<label for="pais">Elige tu país:</label>
<select id="pais" name="pais">
  <option value="">--Selecciona un país--</option>
  <option value="espania">España</option>
  <option value="mexico">México</option>
  <option value="argentina">Argentina</option>
</select>
```

## Sort

Por defecto, `sort()` en JavaScript no ordena números correctamente, sino que los trata como **cadenas de texto** basándose en los valores de sus caracteres **Unicode**. Por eso, `"10"` va antes que `"2"`.

Para ordenar números de forma correcta, necesitas proporcionar una **función de comparación** como `(a, b) => a - b`.

[Ver sort.js](./practice-files/sort.js)
