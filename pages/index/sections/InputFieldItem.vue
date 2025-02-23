<template>
	<InputField v-for="(item, index) in InputFieldConfig" :key="index" :label="item.label" :inputType="item.inputType"
		:placeholder="item.placeholder" :value="item.modelValue" :error="item.error"
		@update:value="(value) => handleInputChange(index, value)" @blur="(value) => handleBlur(index, value)"
		@focus="() => {}" />
</template>

<script>
import InputField from '@/pages/components/InputField.vue';

export default {
	components: {
		InputField
	},
	props: {
		data: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			InputFieldConfig: [{
					label: "请输入你的税后月薪(元)：",
					inputType: "number",
					placeholder: "请输入数字",
					key: 'monthlySalary',
					modelValue: this.data.monthlySalary || 3300,
					error: ""
				},
				{
					label: "请输入公司为你缴纳的社保(元)：",
					inputType: "number",
					placeholder: "请输入数字",
					key: 'companySocialSecurity',
					modelValue: this.data.companySocialSecurity || 652.8,
					error: ""
				},
				{
					label: "请输入公司为你缴纳的公积金(元)：",
					inputType: "number",
					placeholder: "请输入数字",
					key: 'companyProvidedHousingFund',
					modelValue: this.data.companyProvidedHousingFund || 271,
					error: ""
				}
			]
		};
	},
	methods: {
		handleInputChange(index, value) {
			this.InputFieldConfig[index].modelValue = Number(value);
		},
		
		handleBlur(index, value) {
			if (this.validateInput(index, Number(value))) {
				const key = this.InputFieldConfig[index].key;
				const newValue = Number(value);
				
				const newData = {
					...this.data,
					[key]: newValue,
					hasErrors: false
				};
				this.$emit('update:data', newData);
			}
		},
		
		validateInput(index, value) {
			const item = this.InputFieldConfig[index];

			if (!value && value !== 0) {
				item.error = `${item.label.replace('请输入', '').replace('：', '')}不能为空`;
				return false;
			}

			if (isNaN(value)) {
				item.error = `请输入有效的数字`;
				return false;
			}

			if (value <= 0) {
				item.error = `${item.label.replace('请输入', '').replace('：', '')}必须大于0`;
			} else {
				item.error = '';
			}

			return true;
		}
	}
};
</script>