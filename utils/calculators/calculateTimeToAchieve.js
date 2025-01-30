
/**
 * 计算特定金额所需要的时间 
 * 返回的时小数点两位的年 例 7.26 年
 * @param {Object} monthlySalary
 * @param {Object} money
 */
export function calculateTimeToAchieve(monthlySalary,money) {
	return (money / monthlySalary / 12).toFixed(2);
}