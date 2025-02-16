<template>
	<InputField v-for="(item,index) in InputFieldConfig" :key="index" :label="item.label" :inputType="item.inputType"
		:placeholder="item.placeholder" :value="item.modelValue" @update:value="item.modelValue  = $event" :error="item.error"
		@blur="handleBlur(item)" @focus="handleFocus(item)" />
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
						modelValue: 3300,
						error: ""
					},
					{
						label: "请输入公司为你缴纳的社保(元)：",
						inputType: "number",
						placeholder: "请输入数字",
						modelValue: 652.8,
						error: ""
					},
					{
						label: "请输入公司为你缴纳的公积金(元)：",
						inputType: "number",
						placeholder: "请输入数字",
						modelValue: 271,
						error: ""
					}
				]
			};
		},
		methods: {
			handleBlur(item) {
				// 在这里处理 blur 事件，例如验证输入
				console.log(`Blur on ${item.label}`);
			},
			handleFocus(item) {
				// 在这里处理 focus 事件
				console.log(`Focus on ${item.label}`);
			}
		}
	};
</script>