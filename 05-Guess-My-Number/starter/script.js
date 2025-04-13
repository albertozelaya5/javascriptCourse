'use strict';

// console.log(document.querySelector(".message").textContent);
// document.textt;

// console.log(
//   (document.querySelector(".message").textContent = "Correct number 🥳")
// );

// console.log(document.querySelector(".message").textContent);

// document.querySelector(".number").textContent = 30;
// document.querySelector(".score").textContent = 20;

// document.querySelector(".guess").value = 20; //*Para el imput se usa el value


let secretNumber = Math.trunc(Math.random() * 20 + 1);
console.log("🚀 ~ secretNumber:", secretNumber)
//!Se puede poner un eventListener dentro de otra funcion y luego solo mandarla a llamar
const ejecutor  = ()=>{
  document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value); //*una vez lo retorna no lo vuelve a dar, es algo repetitivo
  console.log(guess);
  // document.querySelector(".guess").value = 314; //*ver que nos retorna, que tipo de valor, aqui es string
  console.log(typeof guess);

  // console.log("automaticamente retorna madres?");

  if (!guess) {
    //*Si retorna nully o undefined, en los if se convierten a strict verdadero y falso
    document.querySelector('.message').textContent =
      'No brinda o retorna nada ⛔';
    //when guess is win
  } else if (guess === secretNumber) {
    document.querySelector(".number").textContent = secretNumber

    //*Estariamos haciendo triple trabajo si ponemos un for, es mejor optimizar para que solo se haga uso cuadno sea necesario
    document.querySelector('.message').textContent = 'Correct numbersoi 🥳';
    //when guess too high
    document.querySelector("body").style.backgroundColor = "#60b347"
    //*Siempre tenemos que especificar en string, y width la unidad
    document.querySelector(".number").style.width = "30rem" //se aplica directamente al html

  } else if (guess > secretNumber) {
    if (score > 1) {
      //?Tiene que ejecutarse cuadno pase, no todo el tiempo
      document.querySelector('.message').textContent = 'Too high bro 📈';
      score--;
      document.querySelector('.score').textContent = String(score);
    } else {
      document.querySelector('.message').textContent = 'You lost the game 😞';
    }
    //when guess too low

  } else if (guess < secretNumber) {
    if(score<0){
      document.querySelector(".message") = "You lost the game 😞"
    }else{

      document.querySelector('.message').textContent = 'Too low bro 📉';
      score--;
      document.querySelector('.score').textContent = String(score);
    }
  }

  // while(guess !== secretNumber){ Este es para ejecutarse si o si
  //   score--;
  //   document.querySelector('.score').textContent = String(score);

  // }
});

}
ejecutor()
//*Cuando no se ejecuta en un eventListener o alguna funcion, se ejecuta si o si al comenzar la pagina, inicial el DOM
let score = 20; //*Se hace local porque queremos que la data este en el codigo, no estar accediendo a cada momento
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value); //*una vez lo retorna no lo vuelve a dar, es algo repetitivo
  console.log(guess);
  // document.querySelector(".guess").value = 314; //*ver que nos retorna, que tipo de valor, aqui es string
  console.log(typeof guess);

  // console.log("automaticamente retorna madres?");

  if (!guess) {
    //*Si retorna nully o undefined, en los if se convierten a strict verdadero y falso
    document.querySelector('.message').textContent =
      'No brinda o retorna nada ⛔';
    //when guess is win
  } else if (guess === secretNumber) {
    document.querySelector(".number").textContent = secretNumber

    //*Estariamos haciendo triple trabajo si ponemos un for, es mejor optimizar para que solo se haga uso cuadno sea necesario
    document.querySelector('.message').textContent = 'Correct numbersoi 🥳';
    //when guess too high
    document.querySelector("body").style.backgroundColor = "#60b347"
    //*Siempre tenemos que especificar en string, y width la unidad
    document.querySelector(".number").style.width = "30rem" //se aplica directamente al html

  } else if (guess > secretNumber) {
    if (score > 1) {
      //?Tiene que ejecutarse cuadno pase, no todo el tiempo
      document.querySelector('.message').textContent = 'Too high bro 📈';
      score--;
      document.querySelector('.score').textContent = String(score);
    } else {
      document.querySelector('.message').textContent = 'You lost the game 😞';
    }
    //when guess too low

  } else if (guess < secretNumber) {
    if(score<0){
      document.querySelector(".message") = "You lost the game 😞"
    }else{

      document.querySelector('.message').textContent = 'Too low bro 📉';
      score--;
      document.querySelector('.score').textContent = String(score);
    }
  }

  // while(guess !== secretNumber){ Este es para ejecutarse si o si
  //   score--;
  //   document.querySelector('.score').textContent = String(score);

  // }
});

// const numero = Number(prompt("Dame un numero del 1-9"))
// switch (numero) { //*Usar cuando es solo una condicion
//   case 1:
//     console.log('Joer tio, la has liado bien');
//     break;

//   default:
//     console.log("A la mother, al menos lo comprobaste");
//     break;
// }

//*Se pueden hacer funciones que actuen en diferentes formar y diferentes objetos, recuerda que es una instruccion

// const hola = {
//   hola: "hola",
//   funcionsita: () => {
//     return 1 + 2;
//   }, //acepta funciones de expresion o anonimas
// };

// console.log(hola.funcionsita()); //*Si accedemos como expresion nos devuelve la expreison de la funcion, lo que dice, pero si queremos acceder al contenido, usamos la prop como una funcion normal()

// document.querySelector('.check').addEventListener('click', () => {
//   console.log(document.querySelector('.guess').value);
//   // document.querySelector('.guess').value = 23;
// });


const hola= [ 1,2,3,4,5,6]
let vacio = []
function contador(arr){
  for(let i= 0; i<arr.length; i++){
  vacio.push(arr[i]) //*Si les pones += se iran concatenando
  typeof arr[i]
  }
  return vacio
}

console.log(contador(hola));


//TODO Coding Challenge #1
/* Implement a game rest funcionality, so that player can make a new guess! Here is how:
1. Select the element with the "again" class and attach a click event handler
2. In the handler function, restore initial values of the score and number variables
3. Restore de initial conditions of the message, number, score and guess input field
4. Also restore the original background color (#222) and the number width (15rem)

Good luck 🥴
 */

document.querySelector(".again").addEventListener("click", ()=>{
  score = 20
  secretNumber = Math.trunc(Math.random() * 20 + 1);
  console.log("🚀 ~ document.querySelector ~ secretNumber:", secretNumber)
  
  
  document.querySelector(".guess").value = ""
  document.querySelector(".number").textContent = "?"
  document.querySelector("body").style.backgroundColor = "rgb(34, 34, 34)"
  document.querySelector(".number").style.width = "15rem"
  document.querySelector(".message").textContent = "Start guessing..."
  document.querySelector(".score").textContent = score    
})

  