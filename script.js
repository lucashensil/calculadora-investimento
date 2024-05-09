import { returnsArrays } from "./src/calculosInvestimentos";

const calculateButton = document.getElementById("calculate-results");
const form = document.getElementById("investment-form");

function renderProgression(event) {
  event.preventDefault();
  if (document.querySelector(".error")) {
    return;
  }
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

  console.log(returnArray);
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
