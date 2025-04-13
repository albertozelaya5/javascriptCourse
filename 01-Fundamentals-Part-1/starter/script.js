// let js = "amazing";
// if (js === "amazing") alert("JS is Fun");
// console.log(40 + 8 + 32 - 10);
// // console.log("Jonas")
// console.log(23);
// let firstName = "Jonas";
// console.log(firstName);
// let jonas_matilda = "JM";
// let $function = 27;
// /* no se puede definir palabras clave como function, new etc, tampoco signos especiales, solo signo de dolar "$" */
// let Person = "Jonas";
// let PI = 3.1415;

// let myFirstJob = "Programmer";
// let myCurrentJob = "Teacher";

// let job1 = "programmer";
// let job2 = "teacher";
// console.log(myFirstJob);

// let javascriptIsFun = true;
// console.log(javascriptIsFun);
// console.log(typeof javascriptIsFun);
// // console.log(typeof 23);
// // console.log(typeof "Jonas");

// javascriptIsFun = "YES"; /* cuando se redefine un let no escribir el let */
// console.log(typeof javascriptIsFun);

// let year;
// console.log(year);
// console.log(typeof year);

// year = 1991;
// console.log(typeof null);

//let se puede inicializar asi nada mas
// let age = 30;
// age = 31;
//const no
//const siu

//como let, tambien se puede inicialiar sola
// var job = "programmer";
// job = "teacher";

//parecido a const
// lastName = "Albert";
// console.log("🚀 ~ lastName:", lastName);

// const now = 2037;
// const ageJonas = now - 1991;
// const ageSara = now - 2018;
// console.log(ageJonas, ageSara);
// console.log(ageJonas * 2, ageJonas / 10, 2 ** 3);

// const firstName = "Jonas";
// const lastName = "Sasbasnegger";

// console.log(firstName + " " + lastName);

// // let x = 10 + 5;
// // x += 10; //sumatoria
// // x *= 4; //x=x*4
// // x++; //x=x+1
// // x--; //x=x-1
// // console.log(x);

// console.log(ageJonas > ageSara); //retorna un booleano <> >= <= siempre de izquierda a derecha
// console.log(ageSara >= 18);

// const ifFullAge = ageSara >= 18;
// // console.log(now - 1991 > now < 2019); //se pueden hacer infinity conditions
// console.log(now - 1991 > now - 2019);
// let age = 35;
// age = 28;

// console.log(-15 - 5 + 25);
// let x, y; //asignacion de doble variable
// x = y = 25 - 10 - 5;
// console.log(x, y);
// const averageAge = (ageJonas + ageSara) / 2;
// console.log(averageAge);

const massMark = 78;
const heightMark = 1.69;
const massJohn = 92;
const heightJohn = 1.95;
const BMIMark = massMark / (heightMark * heightMark);
const BMIJohn = massJohn / (heightJohn * heightJohn);
// console.log("imc de Mark: " + BMIMark , "imc de Jon: " + BMIJohn);
const markHigherBMI = BMIMark > BMIJohn;
console.log(BMIMark, BMIJohn);
// console.log(BMIJohn > BMIMark  ? "Mark's BMI is higher than John's!" : "John's BMI is higher than Mark's!");
console.log(markHigherBMI);
const firstName = "Jonas";
const job = "teacher";
const birthYear = 1991;
const year = 2037;
const jonas = "I'm" + firstName + ",a" + (year - birthYear) + "years old" + job + "!";
console.log(job);
if (BMIMark > BMIJohn) {
  console.log("Mark's BMI is higher than John's!");
  console.log(`Mark's BMI (${BMIMark}) is higher than John's (${23.9})!`);
} else {
  console.log("John's BMI is higher than Mark's!");
  console.log(`John's BMI (${BMIJohn}) is higher than Mark's (${BMIMark})`);
}

// const jonasNew = `I'm ${firstName}, a ${year - birthYear} year old ${job}!`; //el `${variables de js}`
// console.log(jonasNew);
// console.log("Just a regular string");
// console.log("string with \n multiple \n lines"); //les pone un parrafo
// console.log(`String
//   multiple
//   lines`);

// const age = 15;
// const isOldEnough = age >= 18; //se le puede asignar tanto en la condicion como a una variable

// if (age >= 18) {
//   console.log("Sarah can start driving license 🚗");
// } else {
//   const yearsLeft = 18 - age;
//   console.log(`Sarah is too yound, wait another ${yearsLeft} years :)`);
// }

// console.log(isOldEnough); //retorna booleano
// const birthYear = 2012;
// let century; //los let sirven en condicionales, se inicializan para luego establecer
// //mediante la condicion el valor y luego consolear cual termina siendo ese valor
// if (birthYear <= 2000) {
//   century = 20; //para asignar valor solo poner var=valor
// } else {
//   century = 21; //para valores dinamicos podria ser
// }
// console.log(century);

const bill = 275;
let tip;
//Cuando un valor esta "entre", entre 50 y 300, poner && ya que deben cumplirse ambas conditions
bill >= 50 && bill <= 300 ? (tip = bill * 0.15) : (tip = bill * 0.2);
const x = tip + bill;
console.log(`The bill was ${bill}, the tip was ${tip}, and the total value ${x}`);
