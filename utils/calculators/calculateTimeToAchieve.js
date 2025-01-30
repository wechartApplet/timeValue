
/**
 * 计算赚够特定金额所需的时间
 * @param {Object} monthlySalary
 */
export function calculateTimeToAchieve_old(monthlySalary) {
  // 定义目标金额
  const fiveMillion = 5000000; // 500万
  const threeHundredMillion = 300000000; // 3亿
  const housePrice = 1500000; // 150万房产
  const carPrice = 500000; // 50万小车
  const marriageCost = 400000; // 40万彩礼和婚礼费用

  // 计算赚够每个目标金额所需的时间（年）
  const timeForFiveMillion = (fiveMillion / monthlySalary / 12).toFixed(2);
  const timeForThreeHundredMillion = (threeHundredMillion / monthlySalary / 12).toFixed(2);
  const timeForHouse = (housePrice / monthlySalary / 12).toFixed(2);
  const timeForCar = (carPrice / monthlySalary / 12).toFixed(2);
  const timeForMarriage = (marriageCost / monthlySalary / 12).toFixed(2);

  return {
    timeForFiveMillion, // 赚够500万所需的时间（年）
    timeForThreeHundredMillion, // 赚够3亿所需的时间（年）
    timeForHouse, // 赚够150万房产所需的时间（年）
    timeForCar, // 赚够50万小车所需的时间（年）
    timeForMarriage // 准备40万彩礼和婚礼所需的时间（年）
  };
}

/**
 * 计算特定金额所需要的时间 
 * 返回的时小数点两位的年 例 7.26 年
 * @param {Object} monthlySalary
 * @param {Object} money
 */
export function calculateTimeToAchieve(monthlySalary,money) {
	return (money / monthlySalary / 12).toFixed(2);
}