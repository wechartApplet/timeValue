/**
 * @param {Object} yearWithDecimal
 * 将 7.26这种格式的 年 转换成  n年n月n日类型
 */
export function convertYearToYearMonthDay(yearWithDecimal) {
    // 获取整数部分（年）
    const year = Math.floor(yearWithDecimal);
    
    // 获取小数部分
    const decimalPart = yearWithDecimal - year;
    
    // 获取月份（小数部分乘以12，取整数部分）
    const month = Math.floor(decimalPart * 12);
    
    // 获取天数（小数部分乘以12后的小数部分，乘以30，取整数部分）
    const day = Math.floor((decimalPart * 12 - month) * 30);
    
    // 返回结果
    return {
        year: year,
        month: month,
        day: day
    };
}

/**
 * 获限当前的年月日
 */
export function currentDate(){
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // 月份从 0 开始，需要加 1，并补齐两位
	const day = currentDate.getDate().toString().padStart(2, '0'); // 补齐两位
   // 返回结果
    return {
        year: year,
        month: month,
        day: day
    };
}
