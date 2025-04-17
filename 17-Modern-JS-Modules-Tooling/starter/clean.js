'use-strict';

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

budget[0].value = 10000;
console.log(budget);
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});
// const limit = spendingLimits[user]? spendingLimits[user] : 0
//* Ya no depende de variables externas
const getLimit = (limits, user) => limits?.[user] ?? 0;

// Pure function
//? Immutability
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas',
) {
  const cleanUser = user.toLowerCase(); //* Evitar mutar la data

  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};
const newBuget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBuget2 = addExpense(
  newBuget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda',
);
const newBuget3 = addExpense(newBuget2, spendingLimits, 200, 'Stuff', 'Jay');

console.log(newBuget1, newBuget2, newBuget3);

//? Data transformation
const checkExpenses = function (state, limits) {
  // for (const entry of budget)
  //   if (entry.value < -getLimit(limits, entry.user)) entry.flag = 'limit';
  return state.map(entry => {
    return entry.value < -getLimit(limits, entry?.user)
      ? { ...entry, flag: 'limit' }
      : entry;
  });
};
const finalBudget = checkExpenses(newBuget3, spendingLimits);

console.log(finalBudget);

const logBigExpenses = function (state, bigLimit) {
  // let output = '';

  const bigExpenses = state.filter(entry => {
    return entry.value <= -bigLimit;
  });
  // .map(entry => entry.description.slice(-2)).join(" / ")

  console.log('bigExpenses', bigExpenses);
  const outputClean = state
    .reduce((acc, entry) => {
      acc +=
        entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';
      return acc;
    }, '')
    .slice(0, -2);
  // for (const entry of state)
  //   output +=
  //     entry.value <= -bigLimit ? `${entry.description.slice(-2)} /` : '';

  // output = output.slice(0, -2); // Remove last '/ '
  console.log(outputClean);
};

logBigExpenses(finalBudget, 500);
