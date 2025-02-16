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
					title: "算你25岁开始工作且永不失业",
					items: [{
							label: '你赚够一套一百五十万的房产所需要的时间约为：',
							value: [
								this.data.timeForHouse,
								`， 时间已经来到 ${ this.data.houseToDate }`,
								`， 那时你的年龄约为 ${ this.data.ageAtHouse } 岁`,
							]
						},
						{
							label: '你再赚够一辆五十万小车所需要的时间约为：',
							value: [
								this.data.timeForCar,
								`， 时间已经来到 ${ this.data.carToDate }`,
								`， 那时你的年龄约为 ${ this.data.ageAtCar } 岁`,
							]
						},
						{
							label: '房车都齐备了，你再准备好30W彩礼再花十万办婚礼娶到一个玩够了且不爱你但她大发善心只为超度你的大陆汉女所需要的时间约为：',
							value: [
								this.data.timeForMarriage,
								`， 时间已经来到 ${ this.data.marryToDate }`,
								`， 那时你的年龄约为 ${ this.data.marryToDate } 岁,,恭喜你终于可以在${ this.data.marryToDate } 岁结婚了!!!我想那时的你一定很开心很幸福吧!!!`,
							]
						}
					]
				};
			}
		}
	};
</script>