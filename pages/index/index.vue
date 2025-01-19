<template>
	<view class="container">
		<!-- 输入框：税后月薪 -->
		<view class="input-group">
			<text class="label">请输入你的税后月薪：</text>
			<input class="input" type="number" v-model.number="monthlySalary" placeholder="请输入数字" />
		</view>

		<!-- 日期选择器：出生年月日 -->
		<view class="input-group">
			<text class="label">请选择你的出生年月日：</text>
			<picker mode="date" :value="birthDate" :end="maxDate" @change="handleDateChange">
				<view class="input">{{ birthDate }}</view>
			</picker>
		</view>

		<!-- 性别选择器 -->
		<view class="input-group">
			<text class="label">请选择你的性别：</text>
			<radio-group class="radio-group" @change="handleGenderChange">
				<label class="radio-label">
					<radio value="男" :checked="gender === '男'" /> 男
				</label>
				<label class="radio-label">
					<radio value="女" :checked="gender === '女'" /> 女
				</label>
			</radio-group>
		</view>

		<!-- 按钮 -->
		<button class="generate-btn" @click="calculateTimeValue">点击生成你的时间价值</button>

		<!-- 结果显示 -->
		<view class="result" v-if="showResults">
			<!-- 高考、本科毕业、硕士毕业的日期和年龄 -->
			<view class="result-item">
				<text class="result-label">你参考高考的时间为：</text>
				<text class="result-value">{{ gaokaoDate }}，年龄为 18 岁</text>
			</view>

			<view class="result-item">
				<text class="result-label">你本科毕业的时间为：</text>
				<text class="result-value">{{ bachelorDate }}，年龄为 22 岁</text>
			</view>

			<view class="result-item">
				<text class="result-label">你硕士毕业的时间为：</text>
				<text class="result-value">{{ masterDate }}，年龄为 25 岁</text>
			</view>

			<!-- 时间价值相关结果 -->
			<view class="result-item">
				<text class="result-label">你赚一分钱需要的时间：</text>
				<text class="result-value">{{ timePerCent }} 秒</text>
			</view>

			<view class="result-item">
				<text class="result-label">你一秒能赚的钱：</text>
				<text class="result-value">{{ moneyPerSecond }} 元</text>
			</view>

			<view class="result-item">
				<text class="result-label">你赚够500万所需要的时间：</text>
				<text class="result-value">{{ timeForFiveMillion }} 年</text>
			</view>

			<view class="result-item">
				<text class="result-label">你赚够三个亿所需要的时间：</text>
				<text class="result-value">{{ timeForThreeHundredMillion }} 年</text>
			</view>

			<view class="result-item">
				<text class="result-label">你赚够一套一百五十万的房产所需要的时间为：</text>
				<text class="result-value">{{ timeForHouse }} 年，那时你的年龄为 {{ ageAtHouse }} 岁</text>
			</view>

			<view class="result-item">
				<text class="result-label">你再赚够一辆五十万小车所需要的时间为：</text>
				<text class="result-value">{{ timeForCar }} 年，那时你的年龄为 {{ ageAtCar }} 岁</text>
			</view>

			<view class="result-item">
				<text class="result-label">房车都齐备了，你再准备好30W彩礼交且花十万办婚礼娶到一个玩够了且不爱你的大陆汉女所需要的时间为：</text>
				<text class="result-value">{{ timeForMarriage }} 年，那时你的年龄为 {{ ageAtMarriage }} 岁,恭喜你终于可以在{{ ageAtMarriage }} 岁结婚了！！！</text>
			</view>

			<!-- 当前年龄和储蓄情况 -->
			<view class="result-item">
				<text class="result-label">你今年已经 {{ currentAge }} 岁，应该攒够 {{ moneySaved }} 元了吧</text>
			</view>

			<view class="result-item">
				<text class="result-label">你退休前应该还能存 {{ moneyBeforeRetirement }} 元</text>
			</view>

			<!-- 70岁寿终就寝的倒计时 -->
			<view class="result-item">
				<text class="result-label">假定你70岁寿终就寝，那么你还剩下的时间为：</text>
				<text class="result-value">{{ countdown.years }} 年 {{ countdown.months }} 月 {{ countdown.days }} 日
					{{ countdown.hours }} 时 {{ countdown.minutes }} 分 {{ countdown.seconds }} 秒</text>
			</view>
		</view>
	</view>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import { calculateSalary } from "./calculateSalary";
import { calculateTimeToAchieve } from "./calculateTimeToAchieve";
import { calculateAge } from "./calculateAge";
import { calculateGaokaoDate, calculateBachelorDate, calculateMasterDate } from "./calculateEducationDates";
import { calculateSavings } from "./calculateSavings";
import { startCountdown } from "./calculateCountdown";

export default {
  setup() {
    const monthlySalary = ref(3300); // 用户输入的税后月薪
    const birthDate = ref("1990-01-01"); // 用户输入的出生日期
    const gender = ref("男"); // 用户选择的性别
    const gaokaoDate = ref(""); // 高考日期
    const bachelorDate = ref(""); // 本科毕业日期
    const masterDate = ref(""); // 硕士毕业日期
    const ageAtGaokao = ref(18);
    const ageAtBachelor = ref(22);
    const ageAtMaster = ref(25);

    const timePerCent = ref(0); // 赚一分钱所需的时间（秒）
    const moneyPerSecond = ref(0); // 每秒赚的钱
    const timeForFiveMillion = ref(0); // 赚够500万所需的时间（年）
    const timeForThreeHundredMillion = ref(0); // 赚够3亿所需的时间（年）
    const timeForHouse = ref(0); // 赚够150万房产所需的时间（年）
    const timeForCar = ref(0); // 赚够50万小车所需的时间（年）
    const timeForMarriage = ref(0); // 准备40万彩礼和婚礼所需的时间（年）
    const ageAtHouse = ref(0); // 赚够房产时的年龄
    const ageAtCar = ref(0); // 赚够小车时的年龄
    const ageAtMarriage = ref(0); // 准备婚礼时的年龄
    const currentAge = ref(0); // 当前年龄
    const moneySaved = ref(0); // 当前应攒的钱
    const moneyBeforeRetirement = ref(0); // 退休前还能存的钱
    const showResults = ref(false); // 是否显示结果
    const maxDate = ref(new Date().toISOString().split("T")[0]); // 当前日期，用于限制日期选择器的最大值
    const countdown = ref({
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }); // 70岁寿终就寝的倒计时
    let countdownInterval = null; // 用于存储倒计时定时器

    // 处理出生日期选择器的变化
    const handleDateChange = (event) => {
      birthDate.value = event.detail.value; // 更新出生日期
      currentAge.value = calculateAge(birthDate.value); // 计算当前年龄
      gaokaoDate.value = calculateGaokaoDate(birthDate.value); // 计算高考日期
      bachelorDate.value = calculateBachelorDate(gaokaoDate.value); // 计算本科毕业日期
      masterDate.value = calculateMasterDate(bachelorDate.value); // 计算硕士毕业日期
    };

    // 处理性别选择器的变化
    const handleGenderChange = (event) => {
      gender.value = event.detail.value; // 更新性别
    };

    // 计算时间价值和相关结果
    const calculateTimeValue = () => {
      currentAge.value = calculateAge(birthDate.value); // 计算当前年龄
      gaokaoDate.value = calculateGaokaoDate(birthDate.value); // 计算高考日期
      bachelorDate.value = calculateBachelorDate(gaokaoDate.value); // 计算本科毕业日期
      masterDate.value = calculateMasterDate(bachelorDate.value); // 计算硕士毕业日期

      // 计算每秒收入和赚一分钱所需时间
      const salaryResults = calculateSalary(monthlySalary.value);
      timePerCent.value = salaryResults.timePerCent;
      moneyPerSecond.value = salaryResults.moneyPerSecond;

      // 计算赚够特定金额所需的时间
      const timeResults = calculateTimeToAchieve(monthlySalary.value);
      timeForFiveMillion.value = timeResults.timeForFiveMillion;
      timeForThreeHundredMillion.value = timeResults.timeForThreeHundredMillion;
      timeForHouse.value = timeResults.timeForHouse;
      ageAtHouse.value = timeResults.timeForHouse - 0 + 25;
      timeForCar.value = timeResults.timeForCar;
      ageAtCar.value = timeResults.timeForCar - 0 + ageAtHouse.value;
      timeForMarriage.value = timeResults.timeForMarriage;
      ageAtMarriage.value = timeResults.timeForMarriage - 0 + ageAtCar.value;

      // 计算当前应攒的钱和退休前还能存的钱
      const savingsResults = calculateSavings(monthlySalary.value, birthDate.value);
      moneySaved.value = savingsResults.moneySaved;
      moneyBeforeRetirement.value = savingsResults.moneyBeforeRetirement;

      // 显示结果
      showResults.value = true;

      // 启动倒计时
      if (countdownInterval) clearInterval(countdownInterval); // 清除旧的倒计时
      countdownInterval = startCountdown(currentAge.value, (countdownData) => {
        countdown.value = countdownData; // 更新倒计时数据
      });
    };

    // 组件销毁时清除倒计时
    onUnmounted(() => {
      if (countdownInterval) clearInterval(countdownInterval);
    });

    return {
      monthlySalary,
      birthDate,
      gender,
      gaokaoDate,
      bachelorDate,
      masterDate,
      timePerCent,
      moneyPerSecond,
      timeForFiveMillion,
      timeForThreeHundredMillion,
      timeForHouse,
      timeForCar,
      timeForMarriage,
      ageAtHouse,
      ageAtCar,
      ageAtMarriage,
      currentAge,
      moneySaved,
      moneyBeforeRetirement,
      showResults,
      maxDate,
      countdown,
      handleDateChange,
      handleGenderChange,
      calculateTimeValue
    };
  }
};
</script>

<style scoped>
	.container {
		padding: 20px;
		background-color: #f5f5f5;
	}

	.input-group {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
	}

	.label {
		font-size: 16px;
		font-weight: bold;
		margin-right: 10px;
	}

	.input {
		flex: 1;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 16px;
	}

	.radio-group {
		display: flex;
		align-items: center;
	}

	.radio-label {
		margin-right: 10px;
	}

	.generate-btn {
		width: 100%;
		padding: 15px;
		background-color: #007aff;
		color: white;
		font-size: 16px;
		border: none;
		border-radius: 8px;
		margin-bottom: 20px;
	}

	.result {
		background-color: white;
		padding: 20px;
		border-radius: 8px;
		margin-top: 20px;
	}

	.result-item {
		margin-bottom: 10px;
	}

	.result-label {
		font-size: 16px;
		font-weight: bold;
	}

	.result-value {
		font-size: 16px;
		color: #333;
	}
</style>