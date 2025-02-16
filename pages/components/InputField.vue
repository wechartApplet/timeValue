<template>
	<view class="input-group">
		<!-- 内容区 -->
		<view class="content">
			<text v-if="label" class="label">{{ label }}</text>
			<input class="input" :type="inputType" :value="value" @input="$emit('update:value', $event.target.value)" :placeholder="placeholder" @blur="onBlur"
				@focus="onFocus" :class="{ 'error-border': error }" />
		</view>

		<!-- 错误提示区 -->
		<view v-if="error" class="error">
			<text class="label error-message">{{ error }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			label: {
				type: String,
				default: ''
			},
			inputType: {
				type: String,
				default: 'text'
			},
			placeholder: {
				type: String,
				default: ''
			},
			value: {
				type: [String, Number],
				default: ''
			},
			error: {
				type: String,
				default: ''
			}
		},
		methods: {
			onBlur() {
				this.$emit('blur');
			},
			onFocus() {
				this.$emit('focus');
			}
		}
	};
</script>

<style scoped>
	.input-group {
		display: flex;
		flex-direction: column;
		margin-bottom: 20px;
	}

	.content {
		display: flex;
		align-items: center;
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

	.error-border {
		border-color: #f56c6c !important;
		animation: shake 0.5s;
	}

	.error {
		margin-top: 5px;
	}

	.error-message {
		color: red;
	}

	@keyframes shake {

		0%,
		100% {
			transform: translateX(0);
		}

		10%,
		30%,
		50%,
		70%,
		90% {
			transform: translateX(-5px);
		}

		20%,
		40%,
		60%,
		80% {
			transform: translateX(5px);
		}
	}
</style>