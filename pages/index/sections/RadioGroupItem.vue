<template>
	<RadioGroup :label="RadioGroupConfig.label" :options="RadioGroupConfig.options"
		:modelValue="RadioGroupConfig.modelValue" />
</template>

<script>
	import RadioGroup from '@/pages/components/RadioGroup.vue';

	export default {
		components: {
			RadioGroup
		},
		props: {
			data: {
				type: Object,
				required: true
			}
		},
		computed: {
			RadioGroupConfig() {
				return {
					label: "请选择你的性别：",
					options: [{
							value: 0,
							label: '男'
						},
						{
							value: 1,
							label: '女'
						}

					],
					modelValue: 0
				};
			}
		}
	};
</script>