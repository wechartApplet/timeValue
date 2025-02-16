"use strict";
function convertYearToYearMonthDay(yearWithDecimal) {
  const year = Math.floor(yearWithDecimal);
  const decimalPart = yearWithDecimal - year;
  const month = Math.floor(decimalPart * 12);
  const day = Math.floor((decimalPart * 12 - month) * 30);
  return ` ${year} 年 ${month} 个月 ${day} 天`;
}
function addYearsToDate(birthDate, beginWorkAge, yearsWithDecimal) {
  const birthDateObj = new Date(birthDate);
  const workYear = birthDateObj.getFullYear() + beginWorkAge;
  const workDateObj = new Date(birthDateObj);
  workDateObj.setFullYear(workYear);
  const years = Math.floor(yearsWithDecimal);
  const decimalPart = yearsWithDecimal - years;
  const months = Math.floor(decimalPart * 12);
  const days = Math.floor((decimalPart * 12 - months) * 30);
  workDateObj.setFullYear(workDateObj.getFullYear() + years);
  workDateObj.setMonth(workDateObj.getMonth() + months);
  workDateObj.setDate(workDateObj.getDate() + days);
  const year = workDateObj.getFullYear();
  const month = String(workDateObj.getMonth() + 1).padStart(2, "0");
  const day = String(workDateObj.getDate()).padStart(2, "0");
  return ` ${year} 年 ${month} 月 ${day} 日`;
}
exports.addYearsToDate = addYearsToDate;
exports.convertYearToYearMonthDay = convertYearToYearMonthDay;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/utils/common/common.js.map
