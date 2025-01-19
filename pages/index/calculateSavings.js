// 计算当前应攒的钱和退休前还能存的钱
export function calculateSavings(monthlySalary, birthDate) {
  const birthYear = new Date(birthDate).getFullYear(); // 出生年份
  const currentYear = new Date().getFullYear(); // 当前年份
  const yearsSinceBirth = currentYear - birthYear; // 出生至今的年数

  // 计算当前应攒的钱（出生至今的总月数 * 月薪）
  const moneySaved = (monthlySalary * yearsSinceBirth * 12).toFixed(2);

  // 计算退休前还能存的钱（假设退休年龄为60岁）
  const yearsToRetirement = 60 - yearsSinceBirth;
  const moneyBeforeRetirement = (monthlySalary * yearsToRetirement * 12).toFixed(2);

  return {
    moneySaved, // 当前应攒的钱
    moneyBeforeRetirement // 退休前还能存的钱
  };
}