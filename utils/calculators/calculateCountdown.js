/**
 * 计算从出生日期到目标年龄的倒计时（精确到秒）
 * @param {Date} birthDate 出生日期
 * @param {Number} targetAge 目标年龄
 * @param {Function} setCountdown 更新倒计时的回调函数
 */
export function startCountdown(birthDate, targetAge, setCountdown) {
  // 计算目标日期：出生日期 + 目标年龄
  const targetDate = new Date(birthDate.getTime());
  targetDate.setFullYear(targetDate.getFullYear() + targetAge);

  // 每秒更新倒计时
  const interval = setInterval(() => {
    const now = new Date(); // 当前时间
    const diff = targetDate - now; // 剩余时间（毫秒）

    if (diff <= 0) {
      clearInterval(interval); // 如果时间已经结束，清除定时器
      setCountdown({
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      });
      return;
    }

    // 计算倒计时的年、月、日、时、分、秒
    const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25; // 每年平均天数（考虑闰年）
    const millisecondsPerMonth = millisecondsPerYear / 12; // 每月平均天数
    const millisecondsPerDay = 1000 * 60 * 60 * 24; // 每天的毫秒数
    const millisecondsPerHour = 1000 * 60 * 60; // 每小时的毫秒数
    const millisecondsPerMinute = 1000 * 60; // 每分钟的毫秒数

    const countdown = {
      years: Math.floor(diff / millisecondsPerYear),
      months: Math.floor((diff % millisecondsPerYear) / millisecondsPerMonth),
      days: Math.floor((diff % millisecondsPerMonth) / millisecondsPerDay),
      hours: Math.floor((diff % millisecondsPerDay) / millisecondsPerHour),
      minutes: Math.floor((diff % millisecondsPerHour) / millisecondsPerMinute),
      seconds: Math.floor((diff % millisecondsPerMinute) / 1000)
    };

    setCountdown(countdown); // 更新倒计时
  }, 1000);

  return interval; // 返回定时器，以便外部可以清除
}