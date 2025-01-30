
/**
 *  根据出生日期计算当前年龄
 * @param {Object} birthDate
 */
export function calculateAge(birthDate) {
  const birth = new Date(birthDate); // 出生日期
  const now = new Date(); // 当前日期
  return now.getFullYear() - birth.getFullYear(); // 当前年龄
}

/**
 * 根据两个数值返回年龄
 * @param {Object} beginAge
 * @param {Object} numberYear
 */
export function caculateAgeByActiveNum(beginAge,numberYear){
	return parseInt(beginAge) + Math.ceil(numberYear);
}