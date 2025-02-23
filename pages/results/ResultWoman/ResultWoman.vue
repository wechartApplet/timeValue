<template>
	<view class="woman-result">
		<ResultItem 
			:label="labelValue" 
			:value="valueArray"
		/>
	</view>
</template>

<script>
	import ResultItem from '@/pages/components/ResultItem.vue';

	export default {
		components: {
			ResultItem
		},
		data() {
			return {
				labelValue: '恭喜你，可以成为一个伟大人类的母亲了，不必参与这个游戏!',
				valueArray: [
					'无论如何你都是人生的赢家',
					'每一个女孩子都能嫁给自己所爱的人',
					'都能拥有幸福',
					'都能成为一个伟大人类的母亲',
					'尽情享受那至高无尚的荣誉和幸福吧!!!'
				]
			};
		}
	};
</script>

<style lang="scss" scoped>
.woman-result {
	padding: 20px;
}
</style>