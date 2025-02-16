"use strict";
function calculateAge(birthDate) {
  const birth = new Date(birthDate);
  const now = /* @__PURE__ */ new Date();
  return now.getFullYear() - birth.getFullYear();
}
function caculateAgeByActiveNum(beginAge, numberYear) {
  return parseInt(beginAge) + Math.ceil(numberYear);
}
exports.caculateAgeByActiveNum = caculateAgeByActiveNum;
exports.calculateAge = calculateAge;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/utils/calculators/calculateAge.js.map
