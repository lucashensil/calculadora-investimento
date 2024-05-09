function convertMonthlyReturnRate(yearlyReturnRate) {
  return yearlyReturnRate ** (1 / 12);
}

export function returnsArrays(
  startingAmount = 0,
  timeHorizon = 0,
  timePeriod = "monthly",
  contribution = 0,
  returnRate = 0,
  returnTimeFrame = "monthly"
) {
  if (!timeHorizon || !startingAmount) {
    throw new Error(
      "Investimento inicial e prazo devem ser preenchidos com valores positivos"
    );
  }

  const finalReturnRate =
    returnTimeFrame === "monthly"
      ? 1 + returnRate / 100
      : convertMonthlyReturnRate(1 + returnRate / 100);

  const finalTimeHorizon =
    timePeriod === "monthly" ? timeHorizon : timeHorizon * 12;

  const referenceInvestmentObject = {
    investedAmount: startingAmount,
    interestReturns: 0,
    totalInterestReturns: 0,
    month: 0,
    totalAmount: startingAmount,
  };

  const array = [referenceInvestmentObject];
  for (
    let timeReference = 1;
    timeReference <= finalTimeHorizon;
    timeReference++
  ) {
    const totalAmount =
      array[timeReference - 1].totalAmount * finalReturnRate + contribution;

    const interestReturns =
      array[timeReference - 1].totalAmount * (finalReturnRate - 1);

    const investedAmount = startingAmount + contribution * timeReference;

    const totalInterestReturns = totalAmount - investedAmount;

    array.push({
      investedAmount: investedAmount,
      interestReturns: interestReturns,
      totalInterestReturns: totalInterestReturns,
      month: timeReference,
      totalAmount: totalAmount,
    });
  }

  return array
}
