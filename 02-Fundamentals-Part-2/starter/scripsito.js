bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
let tips = [];
let totals = [];

function calcTip(billAmount) {
  //? El valor que espera se llama propiedades o argumentos
  if (billAmount >= 50 && billAmount <= 300) {
    return billAmount * 0.15;
  } else {
    return billAmount * 0.2;
  }
}

for (let i = 0; i < bills.length; i++) {
  //*Antes que alacance el valor detenerlo, no igual, esta en 0 based
  const tip = tips.push(calcTip(bills[i]));
  totals.push(tip + bills[i]); //!NO HAY QUE RETORNAR NADA EN UN LOOP FOR
}
console.log(tips, totals);

const arr = [22, 46, 87]; //*Para referirse a todo el array, usalo como constante arr
const calcAverage = (arr) => {
  let sum = 0;
  for (let i = 0; i <= arr.length - 1; i++) {
    // sum = sum + arr[i]
    sum += arr[i];
  }
  const avg = sum / arr.length;
  return `${avg} ${sum}`; //!Debe haber una separacion al haber varios valores en un return
};

console.log(calcAverage(arr));
//*El "use-strict" nos hace mas facil escribr un codigo seguro
//*En algunos errores sera especifico, mientras que js no nos dira exactamente que pasa