<template>
	<view class="container">
		<InputFieldItem :data="formData" @update:data="updateFormData" />
		<DatePickerItem :data="formData" @update:data="updateFormData" />
		<RadioGroupItem :data="formData" @update:data="updateFormData" />
		<ButtonGroupItem :data="formData" />
	</view>
</template>

<script>
	import InputFieldItem from './sections/InputFieldItem.vue';
	import DatePickerItem from './sections/DatePickerItem.vue';
	import RadioGroupItem from './sections/RadioGroupItem.vue';
	import ButtonGroupItem from './sections/ButtonGroupItem.vue';
	import {
		reactive,
		ref,
		onMounted
	} from 'vue';

	export default {
		components: {
			InputFieldItem,
			DatePickerItem,
			RadioGroupItem,
			ButtonGroupItem
		},
		setup() {

			// 统一管理表单数据
			const formData = reactive({
				// 输入字段数据
				monthlySalary: 3300,
				companySocialSecurity: 652.8,
				companyProvidedHousingFund: 271,

				// 日期选择器数据
				birthDate: "1990-01-01",

				// 性别选择数据
				gender: 0,

				// 错误状态
				hasErrors: false,
				errors: []
			});
			// 更新表单数据的方法
			const updateFormData = (newData) => {
				console.log('Updating form data with:', newData); // 添加日志
				Object.keys(newData).forEach(key => {
					if (key in formData) {
						formData[key] = newData[key];
					}
				});

				console.log('After nextTick:', formData);
			};
			return {
				formData,
				updateFormData
			};
		}
	};
</script>

<style scoped>
	.container {
		padding: 20px;
	}
</style>