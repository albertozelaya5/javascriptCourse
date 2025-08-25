// Entrada
// const palabras = ["casa", "perro", "árbol", "zapato", "gato"];

// console.log(palabras.sort((a, b) => a.localeCompare(b))); //* Da un numero poniendo si el elemento especificado va después, antes o en el mismo lugar dependiendo del idioma, aquí llamado "locale"

//? console.log(a.localeCompare(b, "en", { sensitivity: "base" })); // numeric, etc

// Salida esperada
// ["árbol", "casa", "gato", "perro", "zapato"]

// const elementos = [10, "Manzana", 5, "Banana", 2, "Naranja"];

//* Si a es menor que b, el resultado sera negativo, correcto para un orden ascendente
//* 5 - 10
//* a < b return -1

/* function orderNumText(arr) {
  const numbers = arr
    .filter((el) => !isNaN(el))
    .sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
    });
  const texts = arr
    .filter((el) => typeof el === "string")
    .sort((a, b) => {
      if (a.toLowerCase() > b.toLowerCase()) return 1;
      if (a.toLowerCase() < b.toLowerCase()) return -1;
    });

  return { numbers, texts };
} */

// console.log(orderNumText(elementos));

//* Por defecto, `sort()` en JavaScript no ordena números correctamente, sino que los trata como **cadenas de texto** basándose en los valores de sus caracteres **Unicode**. Por eso, `"10"` va antes que `"2"`.

//* Para ordenar números de forma correcta, necesitas proporcionar una **función de comparación** como `(a, b) => a - b`.