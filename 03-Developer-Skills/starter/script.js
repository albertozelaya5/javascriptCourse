// Remember, we're gonna use strict mode in all scripts now!
"use strict";

const temperatures = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5]; //array
//?Whats the temp Amplitud = difference between highest and lowest temp
//? how to calculate the min and max value from an array, how to find min and max value
//?how to ifnore errors

//*Es recomendable hacer funciones cuando se repetira valor, para agilizar codigo, hacer calculos etc
//*Las funciones SIEMPRE deben devolver un valor, o sino consolear y mandar a llamar

// const array1 = ["a", "b", "c"];
// const array2 = ["d", "e", "f"];
const calcTempAmplitude = function (t1, t2) {
  // const array3 = array1.concat(array2);
  //TODO una funcion que reciba dos arreglos, los una y calcule la diferencia entre el valor mas grande y el valor mas pequeño
  //   const temps = t1.concat(t2);
  //   console.log(temps);
  //   let max = temps[0];
  //   let min = temps[0];
  //   for (let i = 1; i < temps.length; i++) {
  //     const curTemp = temps[i];
  //     if (typeof curTemp !== "number") continue;
  //     if (curTemp > max) max = curTemp;
  //     if (curTemp < min) min = curTemp;
  //   }
  //   if (temps.includes(17)) {
  //     console.log("esta madre tiene ese elemento");
  //   } else {
  //     console.log("nel prro");
  //   }
  //   console.log(max, min);
  //   return max - min;
  // };
  // const amplitude = calcTempAmplitude([3, 5, 1], [9, 5, "error", 5]);
  // console.log(amplitude);
  // const hola = temperatures.indexOf(7) //si lo incluye 1 sino -1, metodo
  //includes(number) si o no
};

//!Si quiero saber como funciona un metodo o funcion, consultar mdn web docs
//typeof devuelve el tipo de dato, lo retorna, por lo que podemos usarlo en condicionales ya que es una expresion itself
const reverseado = [1, 2, 3, 4, 5];
const almacen = reverseado.reverse();
console.log(`La reversa del array es ${almacen}`); //*Metodo para reversear

const arregloPrueba1 = [6, 9, 3, 4, 5, 20];
const arregloPrueba2 = [28, 5, 4, 3, 5];
const hola = Math.trunc(Math.random() * 5); //valor entre uno y 5, trunc lo redondea
//*como es constante, solo una vez se calcula
let randomsito = [];
console.log("🚀 ~ hola:", hola);
function multiple(arr) {
  for (let i = 0; i < 6; i++) {
    arr.push(Math.trunc(Math.random() * 5) + 1);
  }
  console.log("El nuevo arreglo es" + randomsito);
}

multiple(randomsito);
//!Concat de concatenar o sea sumar
const union = (arr1, arr2, arr3) => {
  const fusion = arr1.concat(arr2, arr3); //para mas de uno poner coma
  let max = fusion[0]; //si se puede guardar todo un arreglo
  let min = fusion[0];
  for (let i = 1; i < fusion.length; i++) {
    if (max < fusion[i]) {
      max = fusion[i];
    }
    if (min > fusion[i]) min = fusion[i];
  }
  const diferencia = max - min;
  return `El mayor es ${max}, el minimo ${min} y la diferencia ${diferencia}`;
};

console.log(union(arregloPrueba1, arregloPrueba2, randomsito));

const measureKelvin = function () {
  const measurement = {
    type: "temp",
    unit: "celsius",

    // C) FIX
    // value: Number(prompt('Degrees celsius:')),
    value: 10,
  };

  // B) FIND
  console.table(measurement);

  // console.log(measurement.value);
  // console.warn(measurement.value);
  // console.error(measurement.value);

  const kelvin = measurement.value + 273; //!Con el punto rojito, se detendra hasta donde pongamos este punto, el "breakpoint"
  return kelvin;
};
// A) IDENTIFY
console.log(measureKelvin());

const calcTempAmplitudeBug = function (t1, t2) {
  // const array3 = array1.concat(array2);
  //TODO una funcion que reciba dos arreglos, los una y calcule la diferencia entre el valor mas grande y el valor mas pequeño
  const temps = t1.concat(t2);
  console.log(temps);
  let max = temps[0];
  let min = temps[0];
  for (let i = 1; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== "number") continue;

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  // debugger
  if (temps.includes(17)) {
    console.log("esta madre tiene ese elemento");
  } else {
    console.log("nel prro");
  }
  console.log(max, min);
  return max - min; //se puede retornaruna expresion, xd
};

const amplitude = calcTempAmplitudeBug([3, 5, 1], [9, 5, "error", 5]);
console.log(amplitude);

/* Given an array of forecasted maximum temperatures, the thermometer displays a string with these temperatures.
Example: [17,21,24] will print "...17C in 1 days ...21C in 2 days... 23C in 3 days"
Create a function "printForecast" wich takes in an array "arr" and logs a string like the above to the console.

Use the problem-solving framework:Understand the problem and break it up into sub-problems!

!TEST DATA 1: [17,21,23]
!TEST DATA 2: [12,5,-5,0,4]
 */
//TODO En resumen, quieren que imprima [17,21,24] will print "...17C in 1 days ...21C in 2 days... 23C in 3 days", de funciones que se me dan, como argumento en una funcion
//todo que se vayan guardando los valores 1,2,3,hasta el largo del array
const printForecast = (arr) => {
  let message = "";
  let destructorizador = "";
  for (let i = 0; i < arr.length; i++) {
    //*Va a dar indefinido porque el sumador i++ se ejecuta luego de haber pasado todo el loop ciclo for
    const convertidor = i + 1; //*Constante para que solo se suma una vez, si pongo convertidor =convertidor +1 se ira sumando ese uno, si solo inicializo se va a concatenar como si fuera indefinido mas valor
    //* si se inicia como 0, cuando se cumple la ultima confdicion se lanza por ultima vez y luego se detiene, pero siempre devuelve el ultimo valor
    //?Para sacar los valores del array, es simple ponerlo en un ciclo
    destructorizador += `${arr[i]} `;
    message += `${arr[i]}C degrees in ${convertidor} days..`;
  }
  console.log(destructorizador);
  return message;
};

const data1 = [17, 21, 23];
// console.log(data1.length);
console.log(printForecast(data1));
