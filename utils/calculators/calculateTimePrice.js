
/**
 * 计算每秒赚的钱和赚一分钱需要的时间
 * @param {Object} monthlySalary
 */
export function calculateTimePrice(monthlySalary) {
  // 假设每月工作30天，每天工作24小时
  const workingDaysPerMonth = 30;
  const workingHoursPerDay = 24;
  const workingSecondsPerMonth = workingDaysPerMonth * workingHoursPerDay * 3600;

  // 计算每秒赚的钱
  const moneyPerSecond = (monthlySalary / workingSecondsPerMonth).toFixed(4);

  // 计算赚一分钱需要的时间（秒）
  const timePerCent = (0.01 / parseFloat(moneyPerSecond)).toFixed(2);

  return {
    moneyPerSecond, // 每秒赚的钱
    timePerCent // 赚一分钱需要的时间（秒）
  };
}