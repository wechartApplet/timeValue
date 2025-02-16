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
					title: "倒计时",
					items: [{
							label: '假定最新的退休年龄为65岁，那么你剩下的时间为: ',
							value: [
								this.data.countdown_tx.years,' 年 ',
								this.data.countdown_tx.months,' 月 ',
								this.data.countdown_tx.days,' 日 ',
								this.data.countdown_tx.hours,' 时 ',
								this.data.countdown_tx.minutes,' 分 ',
								this.data.countdown_tx.seconds,' 秒 '
							]
						},
						{
							label: '假定你70岁寿终就寝，那么你还剩下的时间为：',
							value: [
								this.data.countdown_sz.years,' 年 ',
								this.data.countdown_sz.months,' 月 ',
								this.data.countdown_sz.days,' 日 ',
								this.data.countdown_sz.hours,' 时 ',
								this.data.countdown_sz.minutes,' 分 ',
								this.data.countdown_sz.seconds,' 秒 '
							]
						}
					]
				};
			}
		}
	};
</script>