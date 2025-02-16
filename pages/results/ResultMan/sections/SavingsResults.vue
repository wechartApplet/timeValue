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
					title: "存款数量",
					items: [{
							label: `你今年已经 ${ this.data.currentAge } 岁`,
							value: [
								`， 时间已经来到 ${ new Date().getFullYear() }`,
								`， 应该攒够 ${ this.data.moneyCurrentSaved } 元了吧`,
							]
						},
						{
							label: '假定最新的退休年龄为65',
							value: [
								`，那么退休前你应该还能存 ${ this.data.moneyBeforeRetirement } 元`,
								`， 时间已经来到 ${ this.data.BeforeRetirementToDate } 年`,
							]
						}
					]
				};
			}
		}
	};
</script>