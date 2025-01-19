// 计算高考、本科毕业和硕士毕业的日期
export function calculateGaokaoDate(birthDate) {
  const birthYear = new Date(birthDate).getFullYear(); // 出生年份
  const gaokaoYear = birthYear + 18; // 高考年份（18岁）
  return `${gaokaoYear}-06-07`; // 高考日期固定为6月7日
}

export function calculateBachelorDate(gaokaoDate) {
  const gaokaoYear = new Date(gaokaoDate).getFullYear(); // 高考年份
  const bachelorYear = gaokaoYear + 4; // 本科毕业年份（高考后4年）
  return `${bachelorYear}-06-07`; // 本科毕业日期固定为6月7日
}
export function calculateMasterDate(bachelorDate) {
  const bachelorYear = new Date(bachelorDate).getFullYear(); // 本科毕业年份
  const masterYear = bachelorYear + 3; // 硕士毕业年份（本科毕业后3年）
  return `${masterYear}-06-07`; // 硕士毕业日期固定为6月7日
}