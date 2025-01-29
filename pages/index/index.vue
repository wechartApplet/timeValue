<template>
	<view class="container">
		<!-- 输入框：税后月薪 -->
		<view class="input-group">
			<text class="label">请输入你的税后月薪(元)：</text>
			<input class="input" type="number" v-model.number="monthlySalary" placeholder="请输入数字" />
		</view>

		<view class="input-group">
			<text class="label">请输入公司为你缴纳的社保(元)：</text>
			<input class="input" type="number" v-model.number="companySocialSecurity" placeholder="请输入数字" />
		</view>

		<view class="input-group">
			<text class="label">请输入公司为你缴纳的公积金(元)：</text>
			<input class="input" type="number" v-model.number="companyProvidedHousingFund" placeholder="请输入数字" />
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
					<radio value="0" :checked="gender === 0" /> 男
				</label>
				<label class="radio-label">
					<radio value="1" :checked="gender === 1" /> 女
				</label>
			</radio-group>
		</view>
		<view class="input-group">
			<!-- 按钮 -->
			<button class="generate-btn" @click="calculateTimeValue">点击生成你的时间价值</button>
			<!-- <button class="generate-btn" @click="">点击生成你的时间价值</button> -->
		</view>

	</view>
</template>

<script>
	import {
		ref, //用于创建响应式变量。
		onMounted, //在组件挂载完成后执行代码。
		onUnmounted //在组件卸载之前执行代码。
	} from "vue";

	import {
		convertYearToYearMonthDay,
		currentDate
	} from '@/utils/common/common.js';

	export default {
		setup() {


			const currentDateObj = currentDate(); // 调用 currentDate 函数并获取返回的对象

			const monthlySalary = ref(3300); // 用户输入的税后月薪
			const companySocialSecurity = ref(652.8);
			const companyProvidedHousingFund = ref(271);

			const birthDate = ref("1990-01-01"); // 用户输入的出生日期
			const maxDate = ref('');
			const gender = ref(0); // 用户选择的性别
			// 设置 maxDate 为当前日期
			const setMaxDate = () => {
				maxDate.value =
					`${currentDateObj.year}-${currentDateObj.month}-${currentDateObj.day}`; // 格式化为 YYYY-MM-DD
			};

			// 处理出生日期选择器的变化
			const handleDateChange = (event) => {
				birthDate.value = event.detail.value; // 更新出生日期
			};

			// 处理性别选择器的变化
			const handleGenderChange = (event) => {
				gender.value = event.detail.value - 0; // 更新性别
			};

			// 在页面加载时设置 maxDate
			onMounted(() => {
				setMaxDate();
			});


			// 点击按钮时获取所有值并跳转页面
			const calculateTimeValue = () => {
				const params = {
					monthlySalary: monthlySalary.value,
					companySocialSecurity: companySocialSecurity.value,
					companyProvidedHousingFund: companyProvidedHousingFund.value,
					birthDate: birthDate.value,
					gender: gender.value
				};
				// 跳转到结果页并传递参数
				uni.navigateTo({
					url: `/pages/result/result?data=${encodeURIComponent(JSON.stringify(params))}`,
					success: () => {
						console.log('跳转成功');
					},
					fail: (err) => {
						console.error('跳转失败', err);
					}
				});
			};


			return {
				monthlySalary,
				companySocialSecurity,
				companyProvidedHousingFund,
				birthDate,
				maxDate,
				gender,
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
</style>