"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_calculators_calculateEducationDates = require("../../utils/calculators/calculateEducationDates.js");
const utils_calculators_calculateTimePrice = require("../../utils/calculators/calculateTimePrice.js");
const utils_calculators_calculateTimeToAchieve = require("../../utils/calculators/calculateTimeToAchieve.js");
const utils_common_common = require("../../utils/common/common.js");
const utils_calculators_calculateAge = require("../../utils/calculators/calculateAge.js");
const utils_calculators_calculateSavings = require("../../utils/calculators/calculateSavings.js");
const _sfc_main = {
  setup(props, context) {
    const route = common_vendor.useRoute();
    const showResults_man = common_vendor.ref(false);
    const showResults_woman = common_vendor.ref(false);
    const middleExamDate = common_vendor.ref("");
    const highExamDate = common_vendor.ref("");
    const GradExamDate = common_vendor.ref("");
    const masterDate = common_vendor.ref("");
    const timePerCent = common_vendor.ref(0);
    const moneyPerSecond = common_vendor.ref(0);
    const timeForHouse = common_vendor.ref(0);
    const timeForCar = common_vendor.ref(0);
    const timeForMarriage = common_vendor.ref(0);
    const houseToDate = common_vendor.ref(0);
    const carToDate = common_vendor.ref(0);
    const marryToDate = common_vendor.ref(0);
    const ageAtHouse = common_vendor.ref(0);
    const ageAtCar = common_vendor.ref(0);
    const ageAtMarriage = common_vendor.ref(0);
    const currentAge = common_vendor.ref(0);
    const moneyCurrentSaved = common_vendor.ref(0);
    const moneyBeforeRetirement = common_vendor.ref(0);
    const BeforeRetirementToDate = common_vendor.ref(0);
    const timeForFiveMillion = common_vendor.ref(0);
    const timeForThreeHundredMillion = common_vendor.ref(0);
    common_vendor.onMounted(() => {
      const query = route.query;
      if (query.data) {
        const params = JSON.parse(decodeURIComponent(query.data));
        const monthlySalary = params.monthlySalary;
        params.companySocialSecurity;
        params.companyProvidedHousingFund;
        const birthDate = params.birthDate;
        const gender = params.gender;
        const examDates = utils_calculators_calculateEducationDates.calculateExamDate(birthDate);
        const timePrice = utils_calculators_calculateTimePrice.calculateTimePrice(monthlySalary);
        showResults_man.value = !Boolean(gender - 0);
        showResults_woman.value = Boolean(gender - 0);
        middleExamDate.value = examDates.middleExamDate;
        highExamDate.value = examDates.highExamDate;
        GradExamDate.value = examDates.GradExamDate;
        masterDate.value = examDates.masterDate;
        timePerCent.value = timePrice.timePerCent;
        moneyPerSecond.value = timePrice.moneyPerSecond;
        const timeForHouse_yd = utils_calculators_calculateTimeToAchieve.calculateTimeToAchieve(monthlySalary, 15e5);
        const timeForCar_yd = utils_calculators_calculateTimeToAchieve.calculateTimeToAchieve(monthlySalary, 5e5);
        const timeForMarriage_yd = utils_calculators_calculateTimeToAchieve.calculateTimeToAchieve(monthlySalary, 4e5);
        timeForHouse.value = utils_common_common.convertYearToYearMonthDay(timeForHouse_yd);
        timeForCar.value = utils_common_common.convertYearToYearMonthDay(timeForCar_yd);
        timeForMarriage.value = utils_common_common.convertYearToYearMonthDay(timeForMarriage_yd);
        houseToDate.value = utils_common_common.addYearsToDate(birthDate, 25, timeForHouse_yd);
        carToDate.value = utils_common_common.addYearsToDate(birthDate, 25, parseFloat(timeForHouse_yd) + parseFloat(
          timeForCar_yd
        ));
        marryToDate.value = utils_common_common.addYearsToDate(birthDate, 25, parseFloat(timeForHouse_yd) + parseFloat(
          timeForCar_yd
        ) + parseFloat(timeForMarriage_yd));
        ageAtHouse.value = utils_calculators_calculateAge.caculateAgeByActiveNum(25, timeForHouse_yd);
        ageAtCar.value = utils_calculators_calculateAge.caculateAgeByActiveNum(25, parseFloat(timeForHouse_yd) + parseFloat(
          timeForCar_yd
        ));
        ageAtMarriage.value = utils_calculators_calculateAge.caculateAgeByActiveNum(25, parseFloat(timeForHouse_yd) + parseFloat(
          timeForCar_yd
        ) + parseFloat(timeForMarriage_yd));
        currentAge.value = utils_calculators_calculateAge.calculateAge(birthDate);
        moneyCurrentSaved.value = utils_calculators_calculateSavings.calculateCurrentSavings(birthDate, 25, monthlySalary);
        moneyBeforeRetirement.value = utils_calculators_calculateSavings.calculateBeforeRetirementSavings(
          birthDate,
          25,
          65,
          monthlySalary
        );
        BeforeRetirementToDate.value = utils_common_common.addYearsToDate(birthDate, utils_calculators_calculateAge.calculateAge(birthDate), 65 - utils_calculators_calculateAge.calculateAge(birthDate));
        const fiveMillion_yd = utils_calculators_calculateTimeToAchieve.calculateTimeToAchieve(monthlySalary, 5e6);
        const threeHundredMill_yd = utils_calculators_calculateTimeToAchieve.calculateTimeToAchieve(monthlySalary, 3e8);
        timeForFiveMillion.value = utils_common_common.convertYearToYearMonthDay(fiveMillion_yd);
        timeForThreeHundredMillion.value = utils_common_common.convertYearToYearMonthDay(threeHundredMill_yd);
      }
    });
    return {
      middleExamDate,
      highExamDate,
      GradExamDate,
      masterDate,
      timePerCent,
      moneyPerSecond,
      timeForHouse,
      timeForCar,
      timeForMarriage,
      houseToDate,
      carToDate,
      marryToDate,
      ageAtHouse,
      ageAtCar,
      ageAtMarriage,
      currentAge,
      moneyCurrentSaved,
      moneyBeforeRetirement,
      BeforeRetirementToDate,
      showResults_man,
      showResults_woman,
      timeForFiveMillion,
      timeForThreeHundredMillion
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.showResults_man
  }, $setup.showResults_man ? common_vendor.e({
    b: common_vendor.t($setup.middleExamDate),
    c: common_vendor.t($setup.highExamDate),
    d: common_vendor.t($setup.GradExamDate),
    e: common_vendor.t($setup.masterDate),
    f: common_vendor.t($setup.timePerCent),
    g: common_vendor.t($setup.moneyPerSecond),
    h: common_vendor.t($setup.timeForHouse),
    i: common_vendor.t($setup.houseToDate),
    j: common_vendor.t($setup.ageAtHouse),
    k: common_vendor.t($setup.timeForCar),
    l: common_vendor.t($setup.carToDate),
    m: common_vendor.t($setup.ageAtCar),
    n: common_vendor.t($setup.timeForMarriage),
    o: common_vendor.t($setup.marryToDate),
    p: common_vendor.t($setup.ageAtMarriage),
    q: common_vendor.t($setup.ageAtMarriage),
    r: common_vendor.t($setup.currentAge),
    s: common_vendor.t((/* @__PURE__ */ new Date()).getFullYear()),
    t: common_vendor.t($setup.moneyCurrentSaved),
    v: common_vendor.t($setup.moneyBeforeRetirement),
    w: common_vendor.t($setup.BeforeRetirementToDate)
  }, {}, {}, {}, {}, {}, {}, {
    J: common_vendor.t($setup.timeForFiveMillion),
    K: common_vendor.t($setup.timeForThreeHundredMillion)
  }) : {}, {
    L: $setup.showResults_woman
  }, $setup.showResults_woman ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b615976f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/result/result.js.map
