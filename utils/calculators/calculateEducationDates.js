// 计算中考、高考、本科毕业和硕士毕业的日期
/**
 * 中考日期大约为每年的 6月15 ~ 17 日
 * 高考日期大约为每年的 6月7 ~ 8 日
 * 研考日期大约是每年的 12月21 ~ 23 日
 * 研究生毕业大约是每年的 6月20 ~ 30日
 * @param {Object} birthDate
 */
export function calculateExamDate(birthDate) {
	const birthYear = new Date(birthDate).getFullYear(); // 出生年份
	const middleExamYear = birthYear + 15;
	const highExamYear = birthYear + 18;
	const GradExamYear = birthYear + 22;
	const masterYearYear = birthYear + 25;
	return {
		middleExamDate: `${middleExamYear}-06-15`,
		highExamDate: `${highExamYear}-06-07`,
		GradExamDate: `${GradExamYear}-12-21`,
		masterDate: `${masterYearYear}-06-20`,
	}
	
}