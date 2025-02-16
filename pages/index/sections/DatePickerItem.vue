<template>
	<Picker :label="pickerConfig.label" :modelValue="pickerConfig.modelValue" :maxDate="pickerConfig.maxDate" />
</template>

<script>
	import Picker from '@/pages/components/Picker.vue';

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
				const setMaxDate = () => {
					const currentDateObj = new Date();
					maxDate.value =
						`${currentDateObj.getFullYear()}-${String(currentDateObj.getMonth() + 1).padStart(2, '0')}-${String(currentDateObj.getDate()).padStart(2, '0')}`;
				};
				return {
					label: "请选择你的出生年月日：",
					modelValue: "1990-01-01",
					maxDate: setMaxDate
				};
			}
		}
	};
</script>