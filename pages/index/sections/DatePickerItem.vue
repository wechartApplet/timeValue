<template>
	<Picker 
		:label="pickerConfig.label" 
		:modelValue="pickerConfig.modelValue" 
		:maxDate="pickerConfig.maxDate"
		@update:modelValue="handleDateChange" 
	/>
</template>

<script>
import Picker from '@/pages/components/Picker.vue';
import { ref } from 'vue';

export default {
	components: {
		Picker
	},
	props: {
		data: {
			type: Object,
			required: true
		}
	},
	computed: {
		pickerConfig() {
			return {
				label: "请选择你的出生年月日：",
				modelValue: this.data.birthDate || "1990-01-01",
				maxDate: this.getMaxDate()
			};
		}
	},
	methods: {
		getMaxDate() {
			const currentDateObj = new Date();
			return `${currentDateObj.getFullYear()}-${String(currentDateObj.getMonth() + 1).padStart(2, '0')}-${String(currentDateObj.getDate()).padStart(2, '0')}`;
		},
		handleDateChange(value) {
			this.$emit('update:data', { 
				...this.data, 
				birthDate: value 
			});
		}
	}
};
</script>