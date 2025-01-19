// 计算70岁寿终就寝的倒计时
export function startCountdown(currentAge) {
  const targetDate = new Date(); // 目标日期
  targetDate.setFullYear(targetDate.getFullYear() + 70 - currentAge); // 假设70岁寿终就寝

  // 每秒更新倒计时
  const interval = setInterval(() => {
    const now = new Date(); // 当前时间
    const diff = targetDate - now; // 剩余时间（毫秒）

    // 计算倒计时的年、月、日、时、分、秒
    const countdown = {
      years: Math.floor(diff / (1000 * 60 * 60 * 24 * 365)),
      months: Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)),
      days: Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000)
    };

    return countdown; // 返回倒计时对象
  }, 1000);
}