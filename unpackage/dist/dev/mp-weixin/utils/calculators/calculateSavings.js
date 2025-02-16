"use strict";
function calculateCurrentSavings(birthDate, beginWorkAge, monthlySalary) {
  const birthYear = new Date(birthDate).getFullYear();
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const yearsSinceBirth = currentYear - birthYear - beginWorkAge;
  return (monthlySalary * yearsSinceBirth * 12).toFixed(2);
}
function calculateBeforeRetirementSavings(birthDate, beginWorkAge, retirementAge, monthlySalary) {
  const birthYear = new Date(birthDate).getFullYear();
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const yearsSinceBirth = currentYear - birthYear - beginWorkAge;
  const yearsToRetirement = retirementAge - yearsSinceBirth;
  return (monthlySalary * yearsToRetirement * 12).toFixed(2);
}
exports.calculateBeforeRetirementSavings = calculateBeforeRetirementSavings;
exports.calculateCurrentSavings = calculateCurrentSavings;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/utils/calculators/calculateSavings.js.map
