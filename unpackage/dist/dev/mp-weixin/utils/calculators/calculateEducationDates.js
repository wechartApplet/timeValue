"use strict";
function calculateExamDate(birthDate) {
  const birthYear = new Date(birthDate).getFullYear();
  const middleExamYear = birthYear + 15;
  const highExamYear = birthYear + 18;
  const GradExamYear = birthYear + 22;
  const masterYearYear = birthYear + 25;
  return {
    middleExamDate: `${middleExamYear}-06-15`,
    highExamDate: `${highExamYear}-06-07`,
    GradExamDate: `${GradExamYear}-12-21`,
    masterDate: `${masterYearYear}-06-20`
  };
}
exports.calculateExamDate = calculateExamDate;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/utils/calculators/calculateEducationDates.js.map
