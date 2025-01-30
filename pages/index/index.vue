<template>
	<view class="container">
		<!-- 输入框：税后月薪 -->
		<view class="input-group">
			<text class="label">请输入你的税后月薪(元)：</text>
			<input class="input" type="number" v-model.number="monthlySalary" placeholder="请输入数字"
				@blur="validateMonthlySalary" @focus="clearValidation('monthlySalary')"
				:class="{ 'error-border': errors.monthlySalary }" />
		</view>

		<!-- 输入框：社保金额 -->
		<view class="input-group">
			<text class="label">请输入公司为你缴纳的社保(元)：</text>
			<input class="input" type="number" v-model.number="companySocialSecurity" placeholder="请输入数字"
				@blur="validateSocialSecurity" @focus="clearValidation('companySocialSecurity')"
				:class="{ 'error-border': errors.companySocialSecurity }" />
		</view>

		<!-- 输入框：公积金金额 -->
		<view class="input-group">
			<text class="label">请输入公司为你缴纳的公积金(元)：</text>
			<input class="input" type="number" v-model.number="companyProvidedHousingFund" placeholder="请输入数字"
				@blur="validateHousingFund" @focus="clearValidation('companyProvidedHousingFund')"
				:class="{ 'error-border': errors.companyProvidedHousingFund }" />
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

		<!-- 错误提示 -->
		<view class="input-group">
			<text v-if="hasErrors" class="label error-message">{{ errorMessage }}</text>
		</view>
		<!-- <view v-if="hasErrors" class="error-message">{{ errorMessage }}</view> -->

		<!-- 按钮 -->
		<view class="input-group">
			<button class="generate-btn" @click="calculateTimeValue">点击生成你的时间价值</button>
		</view>
	</view>
</template>

<script>
	import {
		ref,
		computed
	} from 'vue';

	export default {
		setup() {
			const monthlySalary = ref(3300); // 用户输入的税后月薪
			const companySocialSecurity = ref(652.8); // 公司交的社保
			const companyProvidedHousingFund = ref(271); // 公司交的公积金
			const birthDate = ref("1990-01-01"); // 用户输入的出生日期
			const maxDate = ref(''); // 出生日期最大值限制
			const gender = ref(0); // 用户选择的性别

			const errors = ref({
				monthlySalary: false,
				companySocialSecurity: false,
				companyProvidedHousingFund: false,
			}); // 错误状态
			const errorMessage = ref(''); // 错误信息

			// 验证税后月薪的值
			const validateMonthlySalary = () => {
				if (monthlySalary.value <= 0) {
					errors.value.monthlySalary = true; // 如果输入值小于0，标记为无效
					errorMessage.value = '税后月薪必须大于0';
				} else {
					errors.value.monthlySalary = false; // 如果输入值有效，清除错误标记
				}
			};

			// 验证社保金额的值
			const validateSocialSecurity = () => {
				if (companySocialSecurity.value < 0) {
					errors.value.companySocialSecurity = true; // 如果输入值小于0，标记为无效
					errorMessage.value = '社保金额必须大于等于0'; // 设置错误信息
				} else {
					errors.value.companySocialSecurity = false; // 如果输入值有效，清除错误标记
				}
			};

			// 验证公积金金额的值
			const validateHousingFund = () => {
				if (companyProvidedHousingFund.value < 0) {
					errors.value.companyProvidedHousingFund = true; // 如果输入值小于0，标记为无效
					errorMessage.value = '公积金金额必须大于等于0'; // 设置错误信息
				} else {
					errors.value.companyProvidedHousingFund = false; // 如果输入值有效，清除错误标记
				}
			};

			// 清除验证错误
			const clearValidation = (inputName) => {
				errors.value[inputName] = false; // 清除指定输入框的错误标记
				if (!Object.values(errors.value).some(Boolean)) {
					errorMessage.value = ''; // 如果没有错误，清除错误信息
				}
			};

			// 是否有错误
			const hasErrors = computed(() => {
				return Object.values(errors.value).some(Boolean);
			});

			// 设置 maxDate 为当前日期
			const setMaxDate = () => {
				const currentDateObj = new Date();
				maxDate.value =
					`${currentDateObj.getFullYear()}-${String(currentDateObj.getMonth() + 1).padStart(2, '0')}-${String(currentDateObj.getDate()).padStart(2, '0')}`;
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
			setMaxDate();

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
				if(!hasErrors){//没有报错才可跳转
					uni.navigateTo({
						url: `/pages/result/result?data=${encodeURIComponent(JSON.stringify(params))}`,
						success: () => {
							console.log('跳转成功');
						},
						fail: (err) => {
							console.error('跳转失败', err);
						}
					});
				}
			};

			return {
				monthlySalary,
				companySocialSecurity,
				companyProvidedHousingFund,
				birthDate,
				maxDate,
				gender,
				errors,
				errorMessage,
				validateMonthlySalary,
				validateSocialSecurity,
				validateHousingFund,
				clearValidation,
				handleDateChange,
				handleGenderChange,
				calculateTimeValue,
				hasErrors,
			};
		},
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
		transition: border-color 0.3s ease;
	}

	.error-border {
		border-color: #f56c6c !important;
		animation: shake 0.5s;
	}

	.error-message {
		color: red;
	}

	@keyframes shake {

		0%,
		100% {
			transform: translateX(0);
		}

		10%,
		30%,
		50%,
		70%,
		90% {
			transform: translateX(-5px);
		}

		20%,
		40%,
		60%,
		80% {
			transform: translateX(5px);
		}
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