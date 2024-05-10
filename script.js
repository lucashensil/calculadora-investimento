import { returnsArrays } from "./src/calculosInvestimentos";
import { createTable } from "./src/table";
import { Chart } from "chart.js/auto";

const finalMoneyChart = document.getElementById("final-money-distribution");
let resultsChartReference = {};

const progressionChart = document.getElementById("progression");
let progressionChartReference = {};

const calculateButton = document.getElementById("calculate-results");
const clearButton = document.getElementById("clear-form");
const form = document.getElementById("investment-form");

const columnsArray = [
  {
    columnLabel: "Total Investido",
    accessor: "investedAmount",
    format: (info) => formatCurrency(info),
  },
  {
    columnLabel: "Rendimento Mensal",
    accessor: "interestReturns",
    format: (info) => formatCurrency(info),
  },
  {
    columnLabel: "Rendimento Total",
    accessor: "totalInterestReturns",
    format: (info) => formatCurrency(info),
  },
  { columnLabel: "Mês", accessor: "month" },
  {
    columnLabel: "Quantia Total",
    accessor: "totalAmount",
    format: (info) => formatCurrency(info),
  },
];

function formatCurrency(value) {
  return value.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}

function renderProgression(event) {
  event.preventDefault();
  if (document.querySelector(".error")) {
    return;
  }

  // resetCharts();

  const startingAmount = Number(
    document.getElementById("starting-amount").value.replace(",", ".")
  );
  const timeAmount = Number(document.getElementById("time-amount").value);
  const timeAmountPeriod = document.getElementById("time-amount-period").value;
  const contribution = Number(
    document.getElementById("addiotional-contribution").value.replace(",", ".")
  );
  const returnRate = Number(
    document.getElementById("return-rate").value.replace(",", ".")
  );
  const returnRatePeriod = document.getElementById("evaluation-period").value;
  const taxRate = Number(
    document.getElementById("tax-rate").value.replace(",", ".")
  );

  const returnArray = returnsArrays(
    startingAmount,
    timeAmount,
    timeAmountPeriod,
    contribution,
    returnRate,
    returnRatePeriod
  );

  //   const finalInvestment = returnArray[returnArray.length - 1];
  //   resultsChartReference = new Chart(finalMoneyChart, {
  //     type: "doughnut",
  //     data: {
  //       labels: ["Total Investido", "Rendimento", "Imposto"],
  //       datasets: [
  //         {
  //           data: [
  //             formatCurrency(finalInvestment.investedAmount),
  //             formatCurrency(
  //               finalInvestment.totalInterestReturns * (1 - taxRate / 100)
  //             ),
  //             formatCurrency(
  //               finalInvestment.totalInterestReturns * (taxRate / 100)
  //             ),
  //           ],
  //           backgroundColor: [
  //             "rgb(255, 99, 132)",
  //             "rgb(255, 99, 12)",
  //             "rgb(25, 9, 132)",
  //           ],
  //           hoverOffset: 4,
  //         },
  //       ],
  //     },
  //   });

  //   progressionChartReference = new Chart(progressionChart, {
  //     type: "bar",
  //     data: {
  //       labels: returnArray.map((investmentObject) =>
  //         formatCurrency(investmentObject.month)
  //       ),
  //       datasets: [
  //         {
  //           label: "Total investido",
  //           data: returnArray.map((investmentObject) =>
  //             formatCurrency(investmentObject.investedAmount)
  //           ),
  //           backgroundColor: "#f56",
  //         },
  //         {
  //           label: "Retorno do Investimento",
  //           data: returnArray.map(
  //             (investmentObject) => investmentObject.interestReturns
  //           ),
  //           backgroundColor: "#f90",
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       plugins: {
  //         legend: {
  //           position: "top",
  //         },
  //       },
  //     },
  //   });
  // }

  createTable(columnsArray, returnArray, "results-table");

  function isObjectEmpety(obj) {
    return Object.keys(obj).length === 0;
  }

  // function resetCharts() {
  //   if (
  //     !isObjectEmpety(progressionChartReference) &&
  //     !isObjectEmpety(resultsChartReference)
  //   ) {
  //     progressionChartReference.destroy();
  //     resultsChartReference.destroy();
  //   }
}

function clearForm() {
  form["starting-amount"].value = "";
  form["addiotional-contribution"].value = "";
  form["time-amount"].value = "";
  form["return-rate"].value = "";
  form["tax-rate"].value = "";
  // resetCharts();

  const errorInputs = document.querySelectorAll(".error");
  for (const error of errorInputs) {
    error.classList.remove("error");
    error.parentElement.querySelector("p").remove();
  }
}

function validateInput(event) {
  if (event.target.value === "") {
    return;
  }
  const parentElement = event.target.parentElement;
  const grandParentElement = event.target.parentElement.parentElement;
  const inputValue = event.target.value.replace(",", ".");
  if (
    !parentElement.classList.contains("error") &&
    (isNaN(inputValue) || Number(inputValue) <= 0)
  ) {
    const textElement = document.createElement("p");
    textElement.classList.add("text-red-500");
    textElement.innerText = "Insira um valor numérico maior do que zero";

    parentElement.classList.add("error");
    grandParentElement.appendChild(textElement);
  } else if (
    parentElement.classList.contains("error") &&
    !isNaN(inputValue) &&
    Number(inputValue) > 0
  ) {
    parentElement.classList.remove("error");
    grandParentElement.querySelector("p").remove();
  }
}

for (const formElement of form) {
  if (formElement.tagName === "INPUT" && formElement.hasAttribute("name")) {
    formElement.addEventListener("blur", validateInput);
  }
}

calculateButton.addEventListener("click", renderProgression);
clearButton.addEventListener("click", clearForm);
