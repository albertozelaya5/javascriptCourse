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