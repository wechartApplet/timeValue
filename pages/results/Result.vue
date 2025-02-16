<template>
	<view class="container">
		<view class="result" v-if="showResults_man">
			<ResultMan :data="manData" />
		</view>
		<view class="result" v-if="showResults_woman">
			<ResultWoman />
		</view>
	</view>
</template>

<script>
	import ResultMan from './ResultMan/ResultMan.vue';
	import ResultWoman from './ResultWoman/ResultWoman.vue';
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
		components: {
			ResultMan,
			ResultWoman
		},
		data() {
			return {
				showResults_man: false,
				showResults_woman: false,
				manData: {
					//1. 考试
					middleExamDate: '',
					highExamDate: '',
					GradExamDate: '',
					masterDate: '',
					//2. 时间单价
					timePerCent: 0,
					moneyPerSecond: 0,
					//3. 25岁开始工作且永不失业
					timeForHouse: '',
					houseToDate: '',
					ageAtHouse: 0,
					timeForCar: '',
					carToDate: '',
					ageAtCar: 0,
					timeForMarriage: '',
					marryToDate: '',
					ageAtMarriage: 0,
					//4. 存款数量
					currentAge: 0,
					moneyCurrentSaved: 0,
					moneyBeforeRetirement: 0,
					BeforeRetirementToDate: '',
					//5. 逃脱奴籍
					timeForFiveMillion: '',
					fiveMillionToDate: '',
					ageAtFiveMillion: 0,
					timeForThreeHundredMillion: '',
					threeHundredMillionToDate: '',
					ageAtThreeHundredMillion: 0,
					//6. 倒计时
					countdown_tx: {
						years: 0,
						months: 0,
						days: 0,
						hours: 0,
						minutes: 0,
						seconds: 0
					},
					countdown_sz: {
						years: 0,
						months: 0,
						days: 0,
						hours: 0,
						minutes: 0,
						seconds: 0
					}
				}
			};
		},
		mounted() {
			this.fetchData();
		},
		methods: {
			fetchData() {
				const query = this.$route.query;
				if (query.data) {
					const params = JSON.parse(decodeURIComponent(query.data));
					const {
						gender,
						birthDate,
						monthlySalary
					} = params;
					// console.log(params);
					this.showResults_man = gender === 0;
					this.showResults_woman = gender === 1;

					// 1. 调用 考试日期 的计算方法 
					const examDates = calculateExamDate(birthDate);
					// 2. 调用 时间单价 的计算方法
					const timePrice = calculateTimePrice(monthlySalary);
					// 3. 调用 25岁开始工作且永不失业 的计算方法
					const timeForHouse_yd = calculateTimeToAchieve(monthlySalary, 1500000); // 1500000
					const timeForCar_yd = calculateTimeToAchieve(monthlySalary, 500000); // 500000
					const timeForMarriage_yd = calculateTimeToAchieve(monthlySalary, 400000); // 400,000
					// 4. 调用 存款数量 的计算方法 --- 己调用
					// 5. 调用 逃脱奴籍 的计算方法
					const fiveMillion_yd = calculateTimeToAchieve(monthlySalary, 5000000);
					const threeHundredMill_yd = calculateTimeToAchieve(monthlySalary, 300000000);
					// 6. 倒计时
					// 启动65岁退休的倒计时
					this.retirementInterval = startCountdown(new Date(birthDate), 65, (countdown_tx) => {
						this.$set(this.manData, 'countdown_tx', countdown_tx);//使用 this.$set 更新倒计时数据
					});
					// 启动70岁寿终就寝的倒计时
					this.lifeEndInterval = startCountdown(new Date(birthDate), 70, (countdown_sz) => {
						this.$set(this.manData, 'countdown_sz', countdown_sz);
					});

					// 1. 考试日期 赋值
					this.manData.middleExamDate = examDates.middleExamDate;
					this.manData.highExamDate = examDates.highExamDate;
					this.manData.GradExamDate = examDates.GradExamDate;
					this.manData.masterDate = examDates.masterDate;
					// 2. 时间单价 赋值
					this.manData.timePerCent = timePrice.timePerCent;
					this.manData.moneyPerSecond = timePrice.moneyPerSecond;
					// 3. 为25岁开始工作模块赋值
					//赋值
					this.manData.timeForHouse = convertYearToYearMonthDay(timeForHouse_yd);
					this.manData.timeForCar = convertYearToYearMonthDay(timeForCar_yd);
					this.manData.timeForMarriage = convertYearToYearMonthDay(timeForMarriage_yd);
					// 赋值
					this.manData.houseToDate = addYearsToDate(birthDate, 25, timeForHouse_yd);
					this.manData.carToDate = addYearsToDate(birthDate, 25, parseFloat(timeForHouse_yd) + parseFloat(
						timeForCar_yd));
					this.manData.marryToDate = addYearsToDate(birthDate, 25, parseFloat(timeForHouse_yd) + parseFloat(
							timeForCar_yd) +
						parseFloat(timeForMarriage_yd));
					//赋值
					this.manData.ageAtHouse = caculateAgeByActiveNum(25, timeForHouse_yd);
					this.manData.ageAtCar = caculateAgeByActiveNum(25, parseFloat(timeForHouse_yd) + parseFloat(
						timeForCar_yd));
					this.manData.ageAtMarriage = caculateAgeByActiveNum(25, parseFloat(timeForHouse_yd) + parseFloat(
							timeForCar_yd) +
						parseFloat(timeForMarriage_yd));
					// 4. 为 存款数量 赋值
					this.manData.currentAge = calculateAge(birthDate);
					this.manData.moneyCurrentSaved = new Intl.NumberFormat('en-US').format(calculateCurrentSavings(
						birthDate, 25, monthlySalary));
					this.manData.moneyBeforeRetirement = new Intl.NumberFormat('en-US').format(
						calculateBeforeRetirementSavings(birthDate, 25, 65,
							monthlySalary));
					this.manData.BeforeRetirementToDate = addYearsToDate(birthDate, calculateAge(birthDate), 65 -
						calculateAge(birthDate));
					// 5. 为 逃脱奴籍 赋值
					// 赋值
					this.manData.timeForFiveMillion = convertYearToYearMonthDay(fiveMillion_yd);
					this.manData.timeForThreeHundredMillion = convertYearToYearMonthDay(threeHundredMill_yd);
					// 赋值
					this.manData.fiveMillionToDate = addYearsToDate(birthDate, 25, fiveMillion_yd);
					this.manData.threeHundredMillionToDate = addYearsToDate(birthDate, 25, threeHundredMill_yd);
					// 赋值
					this.manData.ageAtFiveMillion = caculateAgeByActiveNum(25, fiveMillion_yd);
					this.manData.ageAtThreeHundredMillion = caculateAgeByActiveNum(25, threeHundredMill_yd);

				}
			}



		},
		beforeDestroy() {
			clearInterval(this.retirementInterval);
			clearInterval(this.lifeEndInterval);
		}
	};
</script>

<style scoped>
	.container {
		padding: 5px 20px 20px 20px;
	}

	.result {
		background-color: white;
		padding: 0 20px 20px 20px;
		border-radius: 8px;
	}
</style>