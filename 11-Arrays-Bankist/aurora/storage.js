const grossProductData = [
  {
    state: "Totales",
    demandedAmount: 989865,
    description: "Demandado",
    colors: "rgb(186, 12, 47)",
  },
  {
    state: "Totales",
    recoveredAmount: 4210703.83,
    colors: "rgb(0,97,0)",
    description: "Recuperado",
  },
];

const series = grossProductData.map((val) => {
  const guardado = Object.keys(val)
    .filter((val) => val === "recoveredAmount" || val === "demandedAmount")
    .join("");
  return {
    ...val,
    valueField: guardado,
  };
});

console.log(series);

//  const series = [
//   { valueField: "demandedAmount", name: "Demandado", colors: "rgb(186, 12, 47)" },
//   { valueField: "recoveredAmount", name: "Recuperado", colors: "rgb(0,97,0)" },
// ];

const populationByRegions = [
  {
    region: "Asia",
    val: 4119626293,
    colors: "#ba0c2f",
  },
  {
    region: "Africa",
    val: 1012956064,
    colors: "rgb(0,97,0)",
  },
  {
    region: "Northern America",
    val: 344124520,
    colors: "#ba0c2f",
  },
  {
    region: "Latin America and the Caribbean",
    val: 590946440,
    colors: "rgb(0,97,0)",
  },
  {
    region: "Europe",
    val: 727082222,
    colors: "#ba0c2f",
  },
  {
    region: "Oceania",
    val: 35104756,
    colors: "#ba0c2f",
  },
];

({
  data: [
    {
      description: "Loans",
      total: 2,
    },
    {
      description: "CreditCards",
      total: 2,
    },
  ],
});