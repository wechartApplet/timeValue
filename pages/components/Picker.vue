<template>
	<view class="input-group">
		<text v-if="label" class="label">{{ label }}</text>
		<picker mode="date" :value="modelValue" :end="maxDate" @change="onPickerChange">
			<view class="input">{{ modelValue }}</view>
		</picker>
	</view>
</template>

<script>
	export default {
		props: {
			label: {
				type: String,
				default: ''
			},
			modelValue: {
				type: String,
				default: ''
			},
			maxDate: {
				type: String,
				default: ''
			}
		},
		methods: {
			onPickerChange(event) {
				this.$emit('update:modelValue', event.detail.value);
			}
		}
	};
</script>
<style scoped>
	.input-group {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 20px;
	}

	.label {
		font-size: 16px;
		font-weight: bold;
		margin-right: 10px;
	}

	.input {
		flex: 1;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 16px;
		transition: border-color 0.3s ease;
	}
</style>