"use strict";
function calculateTimePrice(monthlySalary) {
  const workingDaysPerMonth = 30;
  const workingHoursPerDay = 24;
  const workingSecondsPerMonth = workingDaysPerMonth * workingHoursPerDay * 3600;
  const moneyPerSecond = (monthlySalary / workingSecondsPerMonth).toFixed(4);
  const timePerCent = (0.01 / parseFloat(moneyPerSecond)).toFixed(2);
  return {
    moneyPerSecond,
    // 每秒赚的钱
    timePerCent
    // 赚一分钱需要的时间（秒）
  };
}
exports.calculateTimePrice = calculateTimePrice;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/utils/calculators/calculateTimePrice.js.map
