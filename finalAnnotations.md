## FileReader - Convertir archivos a base 64, texto, binario etc

Se usa cuando subimos un archivo por medio de

```html
<input type="file" />
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
new Promise((resolve, reject) => {
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
```
