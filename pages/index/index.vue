<template>
	<view class="container">
		<InputFieldItem :data="data" />
		<DatePickerItem :data="data" />
		<RadioGroupItem :data="data" />
		<view class="input-group">
			<button class="generate-btn" @click="calculateTimeValue">{{ btnMessage }}</button>
		</view>
	</view>
</template>

<script>
	import InputFieldItem from './sections/InputFieldItem.vue';
	import DatePickerItem from './sections/DatePickerItem.vue';
	import RadioGroupItem from './sections/RadioGroupItem.vue';
	import {
		ref,
		computed
	} from 'vue';

	export default {
		components: {
			InputFieldItem,
			DatePickerItem,
			RadioGroupItem
		},
		props: {
			data: {
				type: Object,
				required: true
			}
		},
		setup() {
			const btnMessage = ref('点击生成你的时间价值');
			return {
				btnMessage
			}
		}
	};
</script>

<style>
	.container {
		padding: 20px;
	}

	.generate-btn {
		width: 100%;
		padding: 15px;
		background-color: #007aff;
		color: white;
		font-size: 16px;
		border: none;
		border-radius: 8px;
		margin-bottom: 20px;
	}
</style>