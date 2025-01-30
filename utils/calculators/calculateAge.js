
/**
 *  根据出生日期计算当前年龄
 * @param {Object} birthDate
 */
export function calculateAge(birthDate) {
  const birth = new Date(birthDate); // 出生日期
  const now = new Date(); // 当前日期
  return now.getFullYear() - birth.getFullYear(); // 当前年龄
}