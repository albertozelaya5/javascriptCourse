// "use strict"; //para activar el modo estricto y seguro code, se sigue ejecutando el codigo

// let hasDriversLicense = false;
// const passTest = true;

// if (passTest) hasDriverLicense = true; //no va a funcionar si da error
// if (!hasDriversLicense) console.log("I can drive"); //y no se ejecuta el codigo posterior
// //si se usa una palabra resevada mostrara el error
// // const if = 5

// function logger() {
//   console.log("My name is Jonas");
// }

// // A esto se le llama calling / running/ invoking a function
// logger();
// logger();
// logger();

// //FUNCIONES DECLARATIVAS
// function fruitProcessor(apples, oranges) {
//   console.log(apples, oranges);
//   const juice = `I have ${apples} apples and ${oranges} oranges`;
//   return juice;
// }
//FUNCIONES EXPRESIVAS
// fruitProcessor(4, 6); //asi para solo mandar a llamar en consola
// //para VER el return hay que asignarlo para su uso
// const appleJuice = fruitProcessor(4, 6);
// console.log(appleJuice);
// console.log(fruitProcessor(4, 6));
// const appleOrangeJuice = fruitProcessor(5, 6);
// console.log(appleOrangeJuice);

// const num = Number("23");
// function calcAge(birthYear) {
//   //estas no importa el orden
//   return 2037 - birthYear; //para tener este valor se debe ALMACENAR EN UNA VARIABLE
// }
// const Age1 = calcAge(2002);
// console.log(Age1);
// //Funciones anonimas o de expresion, estas se deben de hacer de arriba a abajo
// const age2 = function (birthYear) {
//   return 2038 - birthYear;
// };
// const Age2 = age2(2008);
// console.log(Age1, Age2);

// const age3 = birthYear =>2037 - birthYear //El return es implicito
// const Age3 = age3(1980);
// console.log(`la edad de la tercera es de ${Age3}`); //las de flecha no se ejecutan si se mandar a llamar antes

// const yearsUntilRetirement = (birthYear, firstName) => {
//   const age = 2038 - birthYear;
//   const retirement = 65 - age;
//   return `${firstName} se retira dentro de ${retirement} years`;
// };
// console.log(yearsUntilRetirement(1997, "Jon"));
// console.log(yearsUntilRetirement(1990, "Bob"));
// //funciones largas recomendable expresiones o declarativas
// //cortas arrow functions

// const cutPieces = function (fruit) {
//   return fruit * 4;
// };
// function fruitProcessor(apples, oranges) {
//   const applePieces = cutPieces(apples);
//   const orangePieces = cutPieces(oranges);
//   const juice = `Juice with ${applePieces} apple pieces and ${orangePieces} orange pieces`;
//   return juice;
// }
// console.log(fruitProcessor(2, 3));

// function hola(){console.log("hola");}
// hola()
//funciones de revision
// console.log(prueba(5)); //las mas basicas no importa el orden
// function prueba(num) {
//   console.log(`El numero es ${num}`);
// }
// const clcAge = function (year) {
//   //no tienen nada que ver una con otra
//   // de arriba a abajo
//   //son completamente diferentes
//   return 2037 - year;
// };

// //place holders that receives input values
// const yearsUntilRetirement = function (birthYear, firstName) {
//   const age = clcAge(birthYear);
//   const retirement = 65 - age;
//   if (retirement > 0) {
//     console.log("esto si se vera aunque se consolee dentro");
//     return retirement;
//   } else {
//     return -1; //una vez se pone el return, las funciones de abajo no se leen
//     console.log("esto no se lee");
//   }
//   // return `${firstName} se retira dentro de ${retirement} years`;
// };

// console.log(yearsUntilRetirement(1991, "Jonas"));
// console.log(yearsUntilRetirement(1970, "Mike"));

// const calcAverage = (score1, score2, score3) => {
//   const avgScore = (score1 + score2 + score3) / 3;
//   return avgScore;
// };

// const scoreDolphins = calcAverage(44, 23, 71);
// const scoreKoalas = calcAverage(65, 54, 49);

// console.log(scoreDolphins, scoreKoalas);

// const checkWinner = (avgDolphins, avgKoalas) => { //espera recibir dos numeros
//   if(avgKoalas >= avgDolphins*2){
//     console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`);
//   } else if(avgDolphins >= avgKoalas*2){
//     console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);
//   } else{
//     console.log("No team wins...");
//   }
// };

// checkWinner(scoreDolphins, scoreKoalas);
// checkWinner(16, 2) //no tienen que ser los score, puedes definir otros aqui o usar la funcion calcAverage para determinar otros 3 y guardarlos en otra var tipo:
// //const scoreDolphinsTest2 = calcAverage(25, 30, 40)
// // const scoreKoalasTest2 = calcAverage(30, 50, 60)
// //y luego solo se manda a llamar con checkWinnere(scoreDolphinsTest2, scoreKoalasTest2)

// const friend1 = "Micahel";
// const friend2 = "Steven";
// const friend3 = "Peter";

// //data structure
// const friends = ["Michael", "Steven", "Peter"];
// console.log(friends);

// // const years = new Array(2021, 2022, 2023, 2024);
// console.log(friends[0]);
// console.log(friends[2]);
// console.log(friends.length); //propiedad para contar los elementos dentro de un array
// //new --keyword hola.si --propiedad
// console.log(friends.length - 1); //se admiten expresiones, que es todo elemento que produce un valor
// //indice del ultimo numero, porque es base a 0, largo menos 1
// //declaracion o statement es un elemento que no produce un valor por si mismo
// friends[2] = "Jay"; //asi se intrrcambia un valor dentro de un array
// console.log(friends); //se puede reemplazar un valor del array tal let
// //se puede volver a declarar porque no es un valor primitivo, const, var etc, por eso podemos mutarlo
//friens = ["hola"]
// //lo que no podemos hacer, es cambiar todo el array, solo cambiar valor
// const firstName = "Jonas";
// const jonas = [firstName, "siu", 2037 - 1991, "teacher", friends]; //siempre se pueden hacer operaciones, tambien se pueden poner arrays dentro de otros y datos primitivos dentro
// // console.log(jonas); //y da todas sus propiedades
// // console.log(jonas.length);

// // const calcAge = function (birthYear) {
// //   //espera argumento, argumento es valor que se va a obtener, o valor que se espera
// //   return 2037 - birthYear; //se puede hacer el calculo sin almacenar
// // };

// // const years = new Array(1991, 1992, 1993, 1994);

// // const age1 = calcAge(years[0]);
// // const age2 = calcAge(years[1]);
// // const age3 = calcAge(years[years.length - 1]); //se puede poner una expresion dentro, espera el numero final
// // console.log(age1, age2, age3);
// // const ages = [calcAge(years[0]), calcAge(years[1]), calcAge(years.length - 1)];
// // console.log(ages);

// //Add elements
// const friends = ["Michael", "Steven", "Peter"];
// // friends[1] = "Cristiano";
// // friends.push("Jay"); //retorna el nuevo largo de la matriz
// const newLenght = friends.push("Jay"); //este lo agrega al final
// console.log(friends);
// console.log(newLenght);

// const unshifted = friends.unshift("Jon"); //tambien guarda la longitud, pero no se ocupa xd
// console.log(friends);

// //Remmove elements
// friends.pop(); //Remueve el ultimo elemento del array
// const popped = friends.pop(); //si se almacena va a retornar el elemento borrado
// console.log(popped);
// console.log(friends);

// friends.shift(); //borra el primero, no se ocupa params pq no se necesita
// console.log(friends);
// console.log(friends.indexOf("Steven")); //dice en que posicion esta, pero esta en 0 based
// //los que anaden devuelven el nuevo largo, los que quitan, el elemento quitado
// console.log(friends.indexOf("Bob")); //si devolvemos uno que no esta, nos dara -1
// //EXPRESIONES TODO ELEMENTO QUE DEVUELVE UN VALOR, DECLARACION NO DEVUELVE UN VALOR

// friends.push(23);
// console.log(friends.includes("Steven")); //includes dice si esta en el array o no
// console.log(friends.includes("Bob"));
// // console.log(friends.includes("23")); //devuelve un booleano estricto, asi que tiene que ser ===
// console.log(friends.includes(23));

// const includes = friends.includes("Steven");
//como retorna un booleano
// switch (includes) {
//   case true:
//     console.log("Si lo incluye a la mother");
//     break;
//   default:
//     console.log("No lo incluye o pasa algo raro");
// }

// if (friends.includes("Carlos")) {
//   console.log("Esta madre incluye a Carlos weon");
// } else {
//   console.log("No incluye a Carlos, valiste queso");
// }

// //CHALLENDE #2
// //Steven wants you to improve his tip calculator
// // tip 15% of the bill if the bill value is between 50 and 300, and if the value is different, the tip is 20%.
// //if(bill>=50 && bill<=300) tip = v*0.15, else tip = v*0.20
// //Write a function calcTip that takes any bill value as an input and returns the corresponding tip, calculated based on the rules above (you can check out the code from the first tip calculator challenge if you need to). Use the function type you like the most. Test the function using a bill value of 100.

// let tip;
// function calcTip(bill) {
//   if (bill >= 50 && bill <= 300) {
//     tip = bill * 0.15;
//     // return `The tip is on 15% for the bill is ${tip}`;
//     return tip;
//   } else {
//     tip = bill * 0.2;
//     // return `The tip is on 20% for the bill is ${tip}`;
//     return tip;
//   }
// } //no se puede consolear sobre el consoleo
// console.log(calcTip(100));
// //LOS VALORES QUE ESPERA UNA FUNCION SE LLAMAN PARAMETERS
// //And now let's use arrays! So, create an array called bills containing the test data below.
// const bills = [125, 555, 44];
// //Create an array called tips containing the tip value for each bill, calculated from the function you created before.
// const tips = [calcTip(125), calcTip(555), calcTip(44)];
// console.log(tips);
// //BONUS: Create an array totals containing the total values, so the bill + tip.
// const test1 = 125;
// const test2 = 555;
// const test3 = 44;
// const totals = new Array(calcTip(test1) + test1, calcTip(test2) + test2, calcTip(test3) + test3);
// console.log(totals);

// const jonasArray = ["Jonas", "Schmedtmann", 2037 - 1991, "teacher", ["Michael", "Peter", "Steven"]]; //importa el orden de la data

// const jonas = { //sintaxis literal solo con las llaves {} simple
//   firstName: "Jonas", //no importa el orden de la data
//   lastName: "Schmedtmann",
//   age: 2037 - 1991, //expresion
//   job: "teacher",
//   friends: ["Michael", "Peter", "Steven"],
// };
//USAMOS ARRAYS PARA DATOS ESTRUCTURADOS
//USAMOS OBJETOS PARA DATOS NO ESTRUCTURADOS
// const jonas = {
//   //sintaxis literal solo con las llaves {} simple
//   firstName: "Jonas", //no importa el orden de la data
//   lastName: "Schmedtmann",
//   age: 2037 - 1991, //expresion
//   job: "teacher", //estas se llaman propiedades
//   friends: ["Michael", "Peter", "Steven"],
// };
// console.log(jonas); //las propiedades se muestran en orden alfabetico
// console.log(jonas.lastName); //notacion de punto para obtener valor
// //el punto es un operador que recupera la data del objeto, depende del valor que nosotros le especifiquemos
// console.log(jonas["lastName"]); //o asi, como en un array, en string
// const nameKey = "Name";
// console.log(jonas["first" + nameKey]); //esa suma en strings concatena o sea que los une como una sola cadena string
// console.log(jonas["last" + nameKey]);
// // console.log(jonas.first+nameKey); no se puede hacer ya que en el operador "." este espera una propiedad completa existente nombre real de la propiedad, no calculado

// const interestedIn = prompt(
//   "What do you want to know about Jonas? Choose between firstName, lastName, age, job and friends"
// );
// // console.log(interestedIn);
// //jonas . "la cadena que recibe el prompt, accediendo a la propiedad en caso exista"
// //COMO ES FALSY, O TRUTHY, SE PUEDE APLICAR IF ==
// if (jonas[interestedIn]) {
//   console.log(jonas[interestedIn]);
// } else {
//   console.log("Choose between firstName, lastName, age, job and friends");
// }

// jonas.location = "Honduras";
// jonas["twiiter"] = "@jonasbrothers";
// console.log(jonas); //all the object se actualiza antes

//Challenge
//"Jonas has 3 friends, and his best friend is called Michael"
// const bestFriend = prompt("Whats the name of the Jonas bestFriend?");
// // console.log(typeof bestFriend); //retorna string el prompt
// jonas["bestFriend"] = bestFriend; //se almacena el string, no more todo
// console.log(jonas);
// console.log(
//   `${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is called ${jonas.friends[0]}`
// );
// const hola = "saludo";
// const jonas = {
//   //sintaxis literal solo con las llaves {} simple
//   firstName: "Jonas", //no importa el orden de la data
//   lastName: "Schmedtmann",
//   birthYear: 1991,
//   // age: 2037 - 1991, //expresion
//   job: "teacher", //estas se llaman propiedades
//   friends: ["Michael", "Peter", "Steven"],
//   hasDriverLicense: true, //SOLO FUNCIONAN EXPRESIONES NO DECLARACIONES
//   // calcAge: function(birthYear){
//   //   return 2037-birthYear
//   // }
//   // calcAge: function () {
//   //   // console.log(this); //se accede solo dentro de objetos
//   //   //cualquier funcion adjunta a un objeto se llama METODO
//   //   return 2037 - this.birthYear; //es una variable, una keyword que hace referencia al objeto
//   // },
//   calcAge: function () {
//     this["age"] = 2037 - this.birthYear;
//     return this["age"];
//   },
//   getSummary: function () {
//     // this.hasDriverLicense = license; //toda la expresion porque no sabes si retorna un valor o si existe
//     return `${this.firstName} has ${this.age} years old ${this.job}, and he ${
//       this.hasDriverLicense ? "has" : "has NO"
//     } drivers license`; //Este ternario al igual que el if, es estricto, vuelve nully a null
//   },
// };
// //SE USA EL PRINCIPIO DE NO REPETICION
// // console.log(jonas.calcAge(jonas.birthYear));
// //prompt, if y alert siempre se ejecutaran, expresiones que devuelven un valor
// console.log(jonas.calcAge()); //PRIMERO SIEPRE SE EJECUTA LA FUNCION
// console.log(jonas.age);
// console.log(jonas.age);
// console.log(jonas.age);
// console.log(jonas.age);
// console.log(jonas.getSummary());
// // console.log(jonas["calcAge"](1991)); //MEDIANTE BRACKETS, ta medio raro xd
// //Los arrays tambien son objetos, por ello tienen metodos predefinidos

// const mark = {
//   fullName: "Mark Miller",
//   mass: 78,
//   height: 1.69,
//   calcBMI: function () { //CUANDO DIGA QUE DEBE ALMACENAR EN UNA PROPIEDAD EL RESULTADO, SE REFIERE A CREAR UNA NUEVA CON EL RESULTADO
//     this.bmi = this.mass / (this.height * this.height);
//     return this.bmi;
//   },
// };
// const john = {
//   fullName: "John Smith",
//   mass: 92,
//   height: 1.95,
//   calcBMI: function () {
//     this.bmi = this.mass / (this.height * this.height);
//     return this.bmi;
//   },
// };
// mark.calcBMI()
// john.calcBMI()
// console.log(mark.bmi, john.bmi); //SE DEFINE HASYA QUE LA FUNCION SE EJECUTA

// //EN EL MOMENTO EN QUE SE MANDAN A LLAMAR, SE EJECUTAN LOS METODOS
// if (john.bmi > mark.bmi) { //IFELSE ES UNA ESTRUCTURA DE CONTROL
//   console.log(`${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s BMI (${mark.bmi})`);
// } else if (mark.bmi > john.bmi) {
//   console.log(`${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s BMI (${john.bmi})`);
// }

// console.log("Lifting weights repetision 1 🏋🏻");
// console.log("Lifting weights repetision 2 🏋🏻");
// console.log("Lifting weights repetision 3 🏋🏻");
// console.log("Lifting weights repetision 4 🏋🏻");
//se separan por punto y coma ";"
//se define la variable que se va a sumar, es cambiante asi que let
//string de plantilla, cadena de texto de plantilla
// //*
// //?
// //!
// //TODO
// //*LOOPS O CICLOS REPETITIVOS
// //*TAL COMO EL IF, O EXPRESIONES PUSH FINAL, UNSHIFT PRINCIPIO, POP FINAL, SHIFT PRINCIPIO, COMO CUALQUIER EXPRESION, ESTE SE EJECUTA SI O SI
// // for (let rep = 1; rep <= 10; rep++) {
// //   //se define la variable que se va a sumar, y que valor inicial quiere tener
// //   console.log(`Lifting weights repetision ${rep} 🏋🏻`);
// // }
// //* indexof, pop, shift, push, unshift son metodos(), includes
// //*index of dice en que posicion esta, includes booleano si o no
// const jonas = ["Jonas", "Schmedtmann", 2037 - 1991, "teacher", ["Michael", "Peter", "Steven"], true]; //importa el orden de la data
// //*La nomenclatura de for, switch, if, funciones de expresion(anonimas) y declarativas es la misma, (){}
// //*Length es una propiedad, por ende no lleva parentesis()
// //*LAS PROPIEDADES COMO DENTRO DE UN objeto.propiedad, NO LLEVAN PARENTESIS
// //? Por que jonas[i] es un booleano?, por que i< al length y no puede ser <=, o ===?
// const types = [];
// for (let i = 0; i < jonas.length; i++) {
//   //Reading from jonas array
//   console.log(jonas[i], typeof jonas[i]);

//   //Filling types array
//   // types[i] = typeof jonas[i];
//   types.push(typeof jonas[i]);
// }
// // console.log("hola");
// // types[2] = "hola" //*tambien es una forma de insertar un valor
// //*tambien se pueden poner los tipos de valor, como un constructor que son funciones
// console.log(types);

// const years = [1991, 2007, 1969, 2020];
// // console.log(typeof years[2]); //*ES TIPO NUMBER, pero cuando lleva la variable es un booleano, ya que no se sabe si contiene info
// console.log(typeof years.length);
// const ages = []; //*expresiones no se pueden declarar asi, statements si en una const, solo valores primitivos, pero un array no es primitivo
// for (let i = 0; i < years.length; i++) {
//   ages.push(2037 - years[i]); //*PROPIEDAD QUE LO EMPUJA AL FINAL
// }
// console.log(ages); //como es una constante, no ocupa parentesis ni corchetes
// console.log("---ONLY STRINGS---");
// for (let i = 0; i < jonas.length; i++) {
//   if (typeof jonas[i] !== "string") continue;
//   //*se tiene que hacer "string, number, etc" ya que sino, se llaman a constructores
//   //*Si no es string el tipo de dato, continuar al siguiente string
//   //Reading from jonas array
//   console.log(jonas[i], typeof jonas[i]);
// }

// console.log("---BREAK WITH NUMBER---");
// for (let i = 0; i < jonas.length; i++) {
//   if (typeof jonas[i] === "number") break;
//   //*Hasta que encuentra un numero, se detiene
//   //Reading from jonas array
//   console.log(jonas[i], typeof jonas[i]);
// }
// //!En resumen, break y continue son keywords tipo filtros que se usan en los Loops

// const jonas = ["Jonas", "Schmedtmann", 2037 - 1991, "teacher", ["Michael", "Peter", "Steven"], true];
// for (let i = jonas.length - 1; i >= 0; i--) {
//   console.log(jonas[i]);
// }
// //*Se puede meter un let dentro del otro
// for (let exercise = 1; exercise < 4; exercise++) {
//   console.log(`---Starting exercise ${exercise}---`);
//   for (let rep = 1; rep <= 5; rep++) {
//     console.log(`Excercise ${exercise}: Lifting weight repetition ${rep} 🏋🏻`);
//   }
// }
//*El buble while
for (let rep = 1; rep <= 10; rep++) {
  //se define la variable que se va a sumar, y que valor inicial quiere tener
  console.log(`Lifting weights repetision ${rep} 🏋🏻`);
}

let rep;
while (rep <= 10) {
  console.log(`Lifting weights repetision ${rep} 🏋🏻`);
  rep++;
}
//*Es mas versatil, ya que solo necesita que el let, sea true para que se ejecute, ayudando en mas situaciones
//*Numero de 1-6 random, trunk redondea, random pos ranomiza el metodo xdd
let dice = Math.trunc(Math.random() * 6) + 1;
console.log(dice);
//* En caso salga 6 d1, no se ejecutara, por eso, el while es util cuando no se sabe cuando inicia un contador o con la cantidad
while (dice !== 6) {
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) {
    //? Si llega hasta que sera igual a 6, pero no avisa del ultimo a menos que consoleemos y pongamos una condicion
    console.log("Loop is about to end...");
  }
}
//TODO CHALLENGE #4
//TODO Create an array called bills containing all 10 test bill values.
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
//TODO Create empty arrays for the tips and the totals (tips and totals)
const tips = [];
const totals = [];
//TODO Use the calcTip function we wrote before (included in the starter code) to calculate tips and total values (bill + tip) for every bill value in the bills array. Use a for loop to perform the 10 calculations!

//*No necesita ejecutarse cada vez, solo se manda a llamar
function calcTip(billAmount) {
  //? El valor que espera se llama propiedades o argumentos
  if (billAmount >= 50 && billAmount <= 300) {
    return billAmount * 0.15;
  } else {
    return billAmount * 0.2;
  }
}
for (let i = 0; i < bills.length; i++) {
  const tip = calcTip(bills[i]);
  tips.push(tip);
  totals.push(tip + bills[i]);
}
console.log(bills, tips, totals);
//**** TODO BONUS ****
//TODO BONUS
//TODO Write a function calcAverage which takes an array called arr as an argument.
const calcAverage = function (arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
};
console.log(calcAverage([2, 3, 7]));
console.log(calcAverage(totals));
