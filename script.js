import { returnsArrays } from "./src/calculosInvestimentos";

const calculateButton = document.getElementById("calculate-results");

function renderProgression() {
  const startingAmount = Number(
    document.getElementById("starting-amount").value
  );
  const timeAmount = Number(document.getElementById("time-amount").value);
  const timeAmountPeriod = document.getElementById("time-amount-period").value;
  const contribution = Number(
    document.getElementById("addiotional-contribution").value
  );
  const returnRate = Number(document.getElementById("return-rate").value);
  const returnRatePeriod = document.getElementById("evaluation-period").value;
  const taxRate = Number(document.getElementById("tax-rate").value);

  const returnArray = returnsArrays(
    startingAmount,
    timeAmount,
    timeAmountPeriod,
    contribution,
    returnRate,
    returnRatePeriod
  );

  console.log(returnArray)
}

calculateButton.addEventListener('click', renderProgression)
