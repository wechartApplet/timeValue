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
	import { calculateExamDate } from '@/utils/calculators/calculateEducationDates.js';
	import { calculateTimePrice } from '@/utils/calculators/calculateTimePrice.js';
	import { calculateTimeToAchieve } from '@/utils/calculators/calculateTimeToAchieve.js';
	import { convertYearToYearMonthDay, currentDate, addYearsToDate } from '@/utils/common/common.js';
	import { calculateAge, caculateAgeByActiveNum } from '@/utils/calculators/calculateAge.js';
	import { calculateCurrentSavings, calculateBeforeRetirementSavings } from '@/utils/calculators/calculateSavings.js';
	import { startCountdown } from '@/utils/calculators/calculateCountdown.js';
	import store from '@/store';

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
		onLoad() {
			try {
				// 从 store 获取数据
				const params = store.state.calculationParams;
				console.log('获取到的数据:', params); // 添加日志

				if (params) {
					const {
						gender,
						birthDate,
						monthlySalary
					} = params;

					// 设置性别显示
					this.showResults_man = gender === 0;
					this.showResults_woman = gender === 1;

					// 1. 调用 考试日期 的计算方法 
					const examDates = calculateExamDate(birthDate);
					// 2. 调用 时间单价 的计算方法
					const timePrice = calculateTimePrice(monthlySalary);
					// 3. 调用 25岁开始工作且永不失业 的计算方法
					const timeForHouse_yd = calculateTimeToAchieve(monthlySalary, 1500000);
					const timeForCar_yd = calculateTimeToAchieve(monthlySalary, 500000);
					const timeForMarriage_yd = calculateTimeToAchieve(monthlySalary, 400000);
					// 4. 调用 存款数量 的计算方法 --- 己调用
					// 5. 调用 逃脱奴籍 的计算方法
					const fiveMillion_yd = calculateTimeToAchieve(monthlySalary, 5000000);
					const threeHundredMill_yd = calculateTimeToAchieve(monthlySalary, 300000000);

					// 6. 倒计时
					// 启动65岁退休的倒计时
					this.retirementInterval = startCountdown(new Date(birthDate), 65, (countdown_tx) => {
						this.$set(this.manData, 'countdown_tx', countdown_tx);
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

					// 使用完后清除数据
					store.clearParams();
				} else {
					console.error('没有获取到数据');
					uni.showToast({
						title: '数据加载失败',
						icon: 'none',
						duration: 2000
					});
				}
			} catch (error) {
				console.error('获取数据失败:', error);
				uni.showToast({
					title: '数据加载失败',
					icon: 'none',
					duration: 2000
				});
			}
		},
		methods: {
			fetchData() {
				try {
					const params = uni.getStorageSync('calculationParams');
					if (params) {
						console.log('获取到的数据:', params);
						const {
							gender,
							birthDate,
							monthlySalary
						} = params;

						this.showResults_man = gender === '0' || gender === 0;
						this.showResults_woman = gender === '1' || gender === 1;

						// 1. 调用 考试日期 的计算方法 
						const examDates = calculateExamDate(birthDate);
						// 2. 调用 时间单价 的计算方法
						const timePrice = calculateTimePrice(monthlySalary);
						// 3. 调用 25岁开始工作且永不失业 的计算方法
						const timeForHouse_yd = calculateTimeToAchieve(monthlySalary, 1500000);
						const timeForCar_yd = calculateTimeToAchieve(monthlySalary, 500000);
						const timeForMarriage_yd = calculateTimeToAchieve(monthlySalary, 400000);
						// 4. 调用 存款数量 的计算方法 --- 己调用
						// 5. 调用 逃脱奴籍 的计算方法
						const fiveMillion_yd = calculateTimeToAchieve(monthlySalary, 5000000);
						const threeHundredMill_yd = calculateTimeToAchieve(monthlySalary, 300000000);

						// 6. 倒计时
						// 启动65岁退休的倒计时
						this.retirementInterval = startCountdown(new Date(birthDate), 65, (countdown_tx) => {
							this.$set(this.manData, 'countdown_tx', countdown_tx);
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

						// 清除存储的数据
						uni.removeStorageSync('calculationParams');
					}
				} catch (error) {
					console.error('获取数据失败:', error);
					uni.showToast({
						title: '数据加载失败',
						icon: 'none',
						duration: 2000
					});
				}
			}
		},
		beforeDestroy() {
			clearInterval(this.retirementInterval);
			clearInterval(this.lifeEndInterval);
		}
	};
</script>

<style lang="scss" scoped>
.container {
	padding: 5px 20px 20px 20px;
	
	.result {
		background-color: white;
		padding: 0 20px 20px 20px;
		border-radius: 8px;
	}
}
</style>