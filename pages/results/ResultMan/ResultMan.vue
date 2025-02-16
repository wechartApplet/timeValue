<template>
	<view>
		<EducationResults :data="data" />
		<TimePriceResults :data="data" />
		<WorkResults :data="data" />
		<SavingsResults :data="data" />
		<AchievementResults :data="data" />
		<CountdownResults :data="data" />
	</view>
</template>

<script>
	import EducationResults from './sections/EducationResults.vue';
	import TimePriceResults from './sections/TimePriceResults.vue';
	import WorkResults from './sections/WorkResults.vue';
	import SavingsResults from './sections/SavingsResults.vue';
	import AchievementResults from './sections/AchievementResults.vue';
	import CountdownResults from './sections/CountdownResults.vue';

	export default {
		components: {
			EducationResults,
			TimePriceResults,
			WorkResults,
			SavingsResults,
			AchievementResults,
			CountdownResults
		},
		props: {
			data: {
				type: Object,
				required: true
			}
		}
	};
</script>