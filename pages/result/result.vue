<template>
	<view class="container">
		<!-- 结果显示 -->
		<view class="result" v-if="showResults_man">

			<!-- 中高、高考、本科毕业、硕士毕业的日期和年龄 -->
			<view class="result-item">
				<text class="result-label">你参考中考的时间为：</text>
				<text class="result-value">{{ middleExamDate }}，年龄为 15 岁</text>
			</view>
			<view class="result-item">
				<text class="result-label">你参考高考的时间为：</text>
				<text class="result-value">{{ highExamDate  }}，年龄为 18 岁</text>
			</view>
			<view class="result-item">
				<text class="result-label">你参加研考的时间为：</text>
				<text class="result-value">{{ GradExamDate }}，年龄为 22 岁</text>
			</view>

			<view class="result-item">
				<text class="result-label">你硕士毕业的时间为：</text>
				<text class="result-value">{{ masterDate }}，年龄为 25 岁</text>
			</view>
			<view class="divider-container">
				<view class="divider">
					<view class="divider_line"></view>
					<text class="divider_text">不眠不休的时间单价</text>
					<view class="divider_line"></view>
				</view>
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

			<view class="divider-container">
				<view class="divider">
					<view class="divider_line"></view>
					<text class="divider_text">算你25岁开始工作且永不失业</text>
					<view class="divider_line"></view>
				</view>
			</view>

			<view class="result-item">
				<text class="result-label">你赚够一套一百五十万的房产所需要的时间约为：</text>
				<text class="result-value">{{ timeForHouse }}</text>
				<text class="result-value">， 时间已经来到{{ houseToDate }}</text>
				<text class="result-value">， 那时你的年龄约为 {{ ageAtHouse }} 岁</text>
			</view>

			<view class="result-item">
				<text class="result-label">你再赚够一辆五十万小车所需要的时间约为：</text>
				<text class="result-value">{{ timeForCar }}</text>
				<text class="result-value">， 时间已经来到 {{ carToDate }}</text>
				<text class="result-value">， 那时你的年龄约为 {{ ageAtCar }} 岁</text>
			</view>

			<view class="result-item">
				<text class="result-label">房车都齐备了，你再准备好30W彩礼再花十万办婚礼娶到一个玩够了且不爱你但她大发善心只为超度你的大陆汉女所需要的时间约为：</text>
				<text class="result-value">{{ timeForMarriage }}</text>
				<text class="result-value">， 时间已经来到 {{ marryToDate }}</text>
				<text class="result-value">， 那时你的年龄为 {{ ageAtMarriage }}
					岁,恭喜你终于可以在{{ ageAtMarriage }} 岁结婚了!!!我想那时的你一定很开心很幸福吧!!!</text>
			</view>
			<view class="divider-container">
				<view class="divider">
					<view class="divider_line"></view>
					<text class="divider_text">存款数量</text>
					<view class="divider_line"></view>
				</view>
			</view>
			<!-- 当前年龄和储蓄情况 -->
			<view class="result-item">
				<text class="result-label">你今年已经 {{ currentAge }} 岁</text>
				<text class="result-label">， 时间已经来到 {{ new Date().getFullYear()}} 年</text>
				<text class="result-label">， 应该攒够 {{ moneyCurrentSaved }} 元了吧</text>
			</view>

			<view class="result-item">
				<text class="result-label">假定最新的退休年龄为65，那么退休前你应该还能存 {{ moneyBeforeRetirement }} 元</text>
				<text class="result-label">， 时间已经来到 {{BeforeRetirementToDate}}</text>
			</view>
			<view class="divider-container" v-if="false">
				<view class="divider">
					<view class="divider_line"></view>
					<text class="divider_text">就算你此生无病无灾无意外</text>
					<view class="divider_line"></view>
				</view>
			</view>
			<!-- 70岁寿终就寝的倒计时 -->
			<view class="result-item" v-if="false">
				<text class="result-label">假定最新的退休年龄为65岁，那么你剩下的时间为: </text>
				<text class="result-value">{{ countdown_br.years }} 年 {{ countdown_br.months }} 月
					{{ countdown_br.days }} 日
					{{ countdown_br.hours }} 时 {{ countdown_br.minutes }} 分 {{ countdown_br.seconds }} 秒</text>
			</view>
			<view class="result-item" v-if="false">
				<text class="result-label">假定你70岁寿终就寝，那么你还剩下的时间为：</text>
				<text class="result-value">{{ countdown.years }} 年 {{ countdown.months }} 月 {{ countdown.days }} 日
					{{ countdown.hours }} 时 {{ countdown.minutes }} 分 {{ countdown.seconds }} 秒</text>
			</view>
			<view class="divider-container" v-if="false">
				<view class="divider">
					<view class="divider_line"></view>
					<text class="divider_text">社保和公积金</text>
					<view class="divider_line"></view>
				</view>
			</view>
			<view class="result-item" v-if="false">
				<text class="result-label">你65岁退休后领取的退休金为:</text>
				<text class="result-value">每月 元</text>
				<text class="result-value">， 那时时间已经来到了 年</text>
			</view>
			<view class="result-item" v-if="false">
				<text class="result-label">根据公司为你交的公积金你最好在</text>
				<text class="result-value"> 年贷款买房</text>
				<text class="result-value">， 那时时间已经来到了 年</text>
				<text class="result-value">， 每月你需要还房贷 元</text>
			</view>

			<view class="divider-container">
				<view class="divider">
					<view class="divider_line"></view>
					<text class="divider_text">逃脱奴籍所需时间</text>
					<view class="divider_line"></view>
				</view>
			</view>
			<view class="result-item">
				<text class="result-label">你赚够500万所需要的时间约为：</text>
				<text class="result-value">{{ timeForFiveMillion }} </text>
			</view>

			<view class="result-item">
				<text class="result-label">你赚够三个亿所需要的时间约为：</text>
				<text class="result-value">{{ timeForThreeHundredMillion }} </text>
			</view>
		</view>

		<view class="result" v-if="showResults_woman">
			<!-- <view class="result"> -->
			<view class="result-item">
				<text class="result-label">恭喜你，可以成为一个伟大人类的母亲了，不必参数这个游戏!</text>
				<text class="result-value">
					无论如何你都是人生的赢家，每一个女孩子都能嫁给自己所爱的人，都能拥有幸福，都能成为一个伟大人类的母亲，尽情享受那至高无尚的荣誉和幸福吧!!!
				</text>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		ref,
		onMounted,
		onUnmounted
	} from "vue";
	import {
		useRoute
	} from 'vue-router'; // 引入 useRoute
	import {
		calculateExamDate
	} from '@/utils/calculators/calculateEducationDates.js';
	import {
		calculateTimePrice
	} from '@/utils/calculators/calculateTimePrice.js';
	import {
		calculateTimeToAchieve
	} from '@/utils/calculators/calculateTimeToAchieve.js';
	import {
		convertYearToYearMonthDay,
		currentDate,
		addYearsToDate
	} from '@/utils/common/common.js';
	import {
		calculateAge,
		caculateAgeByActiveNum
	} from '@/utils/calculators/calculateAge.js';

	import {
		calculateCurrentSavings,
		calculateBeforeRetirementSavings
	} from '@/utils/calculators/calculateSavings.js';
	import {
		startCountdown
	} from '@/utils/calculators/calculateCountdown.js';

	export default {
		setup(props, context) {

			const route = useRoute(); // 使用 useRoute 获取路由对象
			// 选择男/女对应显示模块开关
			const showResults_man = ref(false); // 是否显示 男 的结果
			const showResults_woman = ref(false); // 是否显 女 的示结果
			// 考试日期
			const middleExamDate = ref(""); // 中考日期
			const highExamDate = ref(""); // 高考日期
			const GradExamDate = ref(""); // 研考日期
			const masterDate = ref(""); // 硕士毕业日期
			// 时间单价
			const timePerCent = ref(0); // 赚一分钱所需的时间（秒）
			const moneyPerSecond = ref(0); // 每秒赚的钱
			// 25岁开始工作且永不失业
			const timeForHouse = ref(0); // 赚够150万房产所需的时间（年）
			const timeForCar = ref(0); // 赚够50万小车所需的时间（年）
			const timeForMarriage = ref(0); // 准备40万彩礼和婚礼所需的时间（年）
			//完成目标对应的时间
			const houseToDate = ref(0);
			const carToDate = ref(0);
			const marryToDate = ref(0);
			// 完成目标时对应的年龄
			const ageAtHouse = ref(0); // 赚够房产时的年龄
			const ageAtCar = ref(0); // 赚够小车时的年龄
			const ageAtMarriage = ref(0); // 准备婚礼时的年龄
			//当前年龄和储蓄情况
			const currentAge = ref(0); // 当前年龄
			const moneyCurrentSaved = ref(0); // 当前应攒的钱
			const moneyBeforeRetirement = ref(0); // 退休前还能存的钱
			const BeforeRetirementToDate = ref(0); // 退休的时间
			const timeForFiveMillion = ref(0); // 赚够500万所需的时间（年）
			const timeForThreeHundredMillion = ref(0); // 赚够3亿所需的时间（年）

			// 接收页面传递的参数
			onMounted(() => {
				const query = route.query; // 获取传递的参数
				if (query.data) {
					const params = JSON.parse(decodeURIComponent(query.data)); // 解析参数
					const monthlySalary = params.monthlySalary;
					const companySocialSecurity = params.companySocialSecurity;
					const companyProvidedHousingFund = params.companyProvidedHousingFund;
					const birthDate = params.birthDate;
					const gender = params.gender;

					// 根据接收到的参数进行处理

					// 考试日期 
					const examDates = calculateExamDate(birthDate);
					// 时间单价
					const timePrice = calculateTimePrice(monthlySalary);

					// 显示结果
					showResults_man.value = !Boolean(gender - 0);
					showResults_woman.value = Boolean(gender - 0);
					// 考试日期
					middleExamDate.value = examDates.middleExamDate;
					highExamDate.value = examDates.highExamDate;
					GradExamDate.value = examDates.GradExamDate;
					masterDate.value = examDates.masterDate;
					// 时间单价
					timePerCent.value = timePrice.timePerCent;
					moneyPerSecond.value = timePrice.moneyPerSecond;
					// 25岁开始工作且永不失业
					const timeForHouse_yd = calculateTimeToAchieve(monthlySalary, 1500000); // 1500000
					const timeForCar_yd = calculateTimeToAchieve(monthlySalary, 500000); // 500000
					const timeForMarriage_yd = calculateTimeToAchieve(monthlySalary, 400000); // 400,000
					//赋值
					timeForHouse.value = convertYearToYearMonthDay(timeForHouse_yd);
					timeForCar.value = convertYearToYearMonthDay(timeForCar_yd);
					timeForMarriage.value = convertYearToYearMonthDay(timeForMarriage_yd);
					// 赋值
					houseToDate.value = addYearsToDate(birthDate, 25, timeForHouse_yd);
					carToDate.value = addYearsToDate(birthDate, 25, parseFloat(timeForHouse_yd) + parseFloat(
						timeForCar_yd));
					marryToDate.value = addYearsToDate(birthDate, 25, parseFloat(timeForHouse_yd) + parseFloat(
							timeForCar_yd) +
						parseFloat(timeForMarriage_yd));
					//赋值
					ageAtHouse.value = caculateAgeByActiveNum(25, timeForHouse_yd);
					ageAtCar.value = caculateAgeByActiveNum(25, parseFloat(timeForHouse_yd) + parseFloat(
						timeForCar_yd));
					ageAtMarriage.value = caculateAgeByActiveNum(25, parseFloat(timeForHouse_yd) + parseFloat(
							timeForCar_yd) +
						parseFloat(timeForMarriage_yd));
					// 当前年龄和储蓄情况
					currentAge.value = calculateAge(birthDate);
					moneyCurrentSaved.value = calculateCurrentSavings(birthDate, 25, monthlySalary);
					moneyBeforeRetirement.value = calculateBeforeRetirementSavings(birthDate, 25, 65,
						monthlySalary);
					BeforeRetirementToDate.value = addYearsToDate(birthDate, calculateAge(birthDate), 65 -
						calculateAge(birthDate));
					//逃脱奴籍所需要的时间
					const fiveMillion_yd = calculateTimeToAchieve(monthlySalary, 5000000);
					const threeHundredMill_yd = calculateTimeToAchieve(monthlySalary, 300000000);
					// 赋值
					timeForFiveMillion.value = convertYearToYearMonthDay(fiveMillion_yd);
					timeForThreeHundredMillion.value = convertYearToYearMonthDay(threeHundredMill_yd);

				}
			});

			return {
				middleExamDate,
				highExamDate,
				GradExamDate,
				masterDate,
				timePerCent,
				moneyPerSecond,
				timeForHouse,
				timeForCar,
				timeForMarriage,
				houseToDate,
				carToDate,
				marryToDate,
				ageAtHouse,
				ageAtCar,
				ageAtMarriage,
				currentAge,
				moneyCurrentSaved,
				moneyBeforeRetirement,
				BeforeRetirementToDate,
				showResults_man,
				showResults_woman,
				timeForFiveMillion,
				timeForThreeHundredMillion,
			};

		},
	}
</script>

<style scoped>
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

	/* 分割线样式 */
	.divider-container {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 20px 0;
	}

	.divider {
		display: flex;
		align-items: center;
		width: 100%;
	}

	.divider_line {
		flex: 1;
		height: 1px;
		background-color: #ccc;
		margin: 0 10px;
	}

	.divider_text {
		/* padding: 0 10px; */
		background-color: #fff;
	}
</style>