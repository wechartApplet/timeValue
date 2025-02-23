<template>
	<view class="input-group">
		<view class="content">
			<text v-if="label" class="label">{{ label }}</text>
			<input class="input" :type="inputType" :value="value" @input="handleInput" :placeholder="placeholder"
				@blur="handleBlur" @focus="handleFocus" :class="{ 'error-border': error }" />
		</view>
		<view v-if="error" class="error">
			<text class="error-message">{{ error }}</text>
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
			handleInput(e) {
				const newValue = e.target.value;
				if (this.inputType === 'number') {
					// 允许负数
					if (/^-?\d*\.?\d*$/.test(newValue)) {
						this.$emit('update:value', newValue);
					}
				} else {
					this.$emit('update:value', newValue);
				}
			},
			handleBlur(e) {
				this.$emit('blur', e.detail.value);
			},
			handleFocus(e) {
				this.$emit('focus');
			}
		}
	};
</script>

<style lang="scss" scoped>
.input-group {
	margin-bottom: 15px;
	
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
		
		&.error-border {
			border-color: #f56c6c !important;
			animation: shake 0.5s;
		}
	}
	
	.error {
		margin-top: 5px;
		
		&-message {
			color: #f56c6c;
			font-size: 14px;
		}
	}
}

@keyframes shake {
	0%, 100% { transform: translateX(0); }
	10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
	20%, 40%, 60%, 80% { transform: translateX(5px); }
}
</style>