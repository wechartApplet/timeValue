

/**
 * 计算工作至今应该存下的钱
 * @param {Object} birthDate
 * @param {Object} beginWorkAge
 * @param {Object} monthlySalary
 */
export function calculateCurrentSavings(birthDate,beginWorkAge,monthlySalary){
	const birthYear = new Date(birthDate).getFullYear(); // 出生年份
	const currentYear = new Date().getFullYear(); // 当前年份
	const yearsSinceBirth = currentYear - birthYear - beginWorkAge; // 出生至今的年数
	
	// 计算当前应攒的钱（出生至今的总月数 * 月薪）
	return (monthlySalary * yearsSinceBirth * 12).toFixed(2);
}

/**
 * 计算退休前还能存的钱
 * @param {Object} birthDate
 * @param {Object} beginWorkAge
 * @param {Object} retirementAge
 * @param {Object} monthlySalary
 */
export function calculateBeforeRetirementSavings(birthDate,beginWorkAge,retirementAge,monthlySalary){
	const birthYear = new Date(birthDate).getFullYear(); // 出生年份
	const currentYear = new Date().getFullYear(); // 当前年份
	const yearsSinceBirth = currentYear - birthYear - beginWorkAge; // 出生至今的年数
	
	// 计算退休前还能存的钱（假设退休年龄为65岁）
	const yearsToRetirement = retirementAge - yearsSinceBirth;
	return (monthlySalary * yearsToRetirement * 12).toFixed(2);
}