"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup() {
    const monthlySalary = common_vendor.ref(3300);
    const companySocialSecurity = common_vendor.ref(652.8);
    const companyProvidedHousingFund = common_vendor.ref(271);
    const birthDate = common_vendor.ref("1990-01-01");
    const maxDate = common_vendor.ref("");
    const gender = common_vendor.ref(0);
    const errors = common_vendor.ref({
      monthlySalary: false,
      companySocialSecurity: false,
      companyProvidedHousingFund: false
    });
    const errorMessage = common_vendor.ref("");
    const validateMonthlySalary = () => {
      if (monthlySalary.value <= 0) {
        errors.value.monthlySalary = true;
        errorMessage.value = "税后月薪必须大于0";
      } else {
        errors.value.monthlySalary = false;
      }
    };
    const validateSocialSecurity = () => {
      if (companySocialSecurity.value < 0) {
        errors.value.companySocialSecurity = true;
        errorMessage.value = "社保金额必须大于等于0";
      } else {
        errors.value.companySocialSecurity = false;
      }
    };
    const validateHousingFund = () => {
      if (companyProvidedHousingFund.value < 0) {
        errors.value.companyProvidedHousingFund = true;
        errorMessage.value = "公积金金额必须大于等于0";
      } else {
        errors.value.companyProvidedHousingFund = false;
      }
    };
    const clearValidation = (inputName) => {
      errors.value[inputName] = false;
      if (!Object.values(errors.value).some(Boolean)) {
        errorMessage.value = "";
      }
    };
    const hasErrors = common_vendor.computed(() => {
      return Object.values(errors.value).some(Boolean);
    });
    const setMaxDate = () => {
      const currentDateObj = /* @__PURE__ */ new Date();
      maxDate.value = `${currentDateObj.getFullYear()}-${String(currentDateObj.getMonth() + 1).padStart(2, "0")}-${String(currentDateObj.getDate()).padStart(2, "0")}`;
    };
    const handleDateChange = (event) => {
      birthDate.value = event.detail.value;
    };
    const handleGenderChange = (event) => {
      gender.value = event.detail.value - 0;
    };
    setMaxDate();
    const calculateTimeValue = () => {
      const params = {
        monthlySalary: monthlySalary.value,
        companySocialSecurity: companySocialSecurity.value,
        companyProvidedHousingFund: companyProvidedHousingFund.value,
        birthDate: birthDate.value,
        gender: gender.value
      };
      if (!hasErrors.value) {
        common_vendor.index.navigateTo({
          url: `/pages/result/result?data=${encodeURIComponent(JSON.stringify(params))}`,
          success: () => {
            common_vendor.index.__f__("log", "at pages/index/index.vue:159", "跳转成功");
          },
          fail: (err) => {
            common_vendor.index.__f__("error", "at pages/index/index.vue:162", "跳转失败", err);
          }
        });
      } else {
        common_vendor.index.showToast({
          title: "请修正错误后再尝试",
          icon: "none",
          // 显示纯文本提示
          duration: 2e3
          // 提示框显示时长
        });
      }
    };
    return {
      monthlySalary,
      // 用户输入的税后月薪
      companySocialSecurity,
      // 公司交的社保
      companyProvidedHousingFund,
      // 公司交的公积金
      birthDate,
      // 用户输入的出生日期
      maxDate,
      // 出生日期最大值限制
      gender,
      // 用户选择的性别
      errors,
      // 错误状态
      errorMessage,
      // 错误信息
      validateMonthlySalary,
      // 验证税后月薪的值
      validateSocialSecurity,
      // 验证社保金额的值
      validateHousingFund,
      // 验证公积金金额的值
      clearValidation,
      // 清除验证错误
      handleDateChange,
      // 处理出生日期选择器的变化
      handleGenderChange,
      // 处理性别选择器的变化
      calculateTimeValue,
      // 点击按钮时获取所有值并跳转页面
      hasErrors
      // 是否有错误
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $setup.validateMonthlySalary && $setup.validateMonthlySalary(...args)),
    b: common_vendor.o(($event) => $setup.clearValidation("monthlySalary")),
    c: $setup.errors.monthlySalary ? 1 : "",
    d: $setup.monthlySalary,
    e: common_vendor.o(common_vendor.m(($event) => $setup.monthlySalary = $event.detail.value, {
      number: true
    })),
    f: common_vendor.o((...args) => $setup.validateSocialSecurity && $setup.validateSocialSecurity(...args)),
    g: common_vendor.o(($event) => $setup.clearValidation("companySocialSecurity")),
    h: $setup.errors.companySocialSecurity ? 1 : "",
    i: $setup.companySocialSecurity,
    j: common_vendor.o(common_vendor.m(($event) => $setup.companySocialSecurity = $event.detail.value, {
      number: true
    })),
    k: common_vendor.o((...args) => $setup.validateHousingFund && $setup.validateHousingFund(...args)),
    l: common_vendor.o(($event) => $setup.clearValidation("companyProvidedHousingFund")),
    m: $setup.errors.companyProvidedHousingFund ? 1 : "",
    n: $setup.companyProvidedHousingFund,
    o: common_vendor.o(common_vendor.m(($event) => $setup.companyProvidedHousingFund = $event.detail.value, {
      number: true
    })),
    p: common_vendor.t($setup.birthDate),
    q: $setup.birthDate,
    r: $setup.maxDate,
    s: common_vendor.o((...args) => $setup.handleDateChange && $setup.handleDateChange(...args)),
    t: $setup.gender === 0,
    v: $setup.gender === 1,
    w: common_vendor.o((...args) => $setup.handleGenderChange && $setup.handleGenderChange(...args)),
    x: $setup.hasErrors
  }, $setup.hasErrors ? {
    y: common_vendor.t($setup.errorMessage)
  } : {}, {
    z: common_vendor.o((...args) => $setup.calculateTimeValue && $setup.calculateTimeValue(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
