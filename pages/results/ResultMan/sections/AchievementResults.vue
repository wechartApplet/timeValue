<template>
	<view>
		<Divider :text="workConfig.title" />
		<view v-for="(item, index) in workConfig.items" :key="index">
			<ResultItem :label="item.label" :value="item.value" />
		</view>
	</view>
</template>

<script>
	import Divider from '@/pages/components/Divider.vue';
	import ResultItem from '@/pages/components/ResultItem.vue';

	export default {
		components: {
			Divider,
			ResultItem
		},
		props: {
			data: {
				type: Object,
				required: true
			}
		},
		computed: {
			workConfig() {
				return {
					title: "逃脱奴籍所需时间",
					items: [{
							label: '你赚够500万所需要的时间约为：',
							value: [
								this.data.timeForFiveMillion,
								`， 时间已经来到 ${ this.data.fiveMillionToDate }`,
								`， 那时你的年龄约为 ${ this.data.ageAtFiveMillion } 岁`,
							]
						},
						{
							label: '你赚够三个亿所需要的时间约为：',
							value: [
								this.data.timeForThreeHundredMillion,
								`， 时间已经来到 ${ this.data.threeHundredMillionToDate }`,
								`， 那时你的年龄约为 ${ this.data.ageAtThreeHundredMillion } 岁`,
							]
						}
					]
				};
			}
		}
	};
</script>