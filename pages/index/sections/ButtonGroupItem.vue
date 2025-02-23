<template>
	<Button :text="buttonConfig.text" :type="buttonConfig.type" :disabled="isProcessing" @click="debounceClick" />
</template>

<script>
import Button from '@/pages/components/Button.vue';
import store from '@/store';

export default {
	components: {
		Button
	},
	props: {
		data: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			clickTimer: null,
			isProcessing: false
		};
	},
	computed: {
		buttonConfig() {
			return {
				text: '点击生成你的时间价值',
				type: 'primary'
			};
		}
	},
	methods: {
		debounceClick() {
			if (this.isProcessing) return;
			
			if (this.clickTimer) {
				clearTimeout(this.clickTimer);
			}
			
			this.clickTimer = setTimeout(() => {
				this.handleClick();
				this.clickTimer = null;
			}, 500);
		},

		validateAllFields() {
			return true;
		},

		async handleClick() {
			if (this.isProcessing) return;
			this.isProcessing = true;

			try {
				const monthlySalary = Number(this.data.monthlySalary);
				const companySocialSecurity = Number(this.data.companySocialSecurity);
				const companyProvidedHousingFund = Number(this.data.companyProvidedHousingFund);

				if (this.validateAllFields() && 
						monthlySalary > 0 && 
						companySocialSecurity > 0 && 
						companyProvidedHousingFund > 0) {
					
					const params = {
						monthlySalary,
						companySocialSecurity,
						companyProvidedHousingFund,
						birthDate: this.data.birthDate,
						gender: Number(this.data.gender)
					};

					store.setParams(params);
					uni.$emit('calculation-params', params);
					const pages = getCurrentPages();
					const prevPage = pages[pages.length - 1];
					prevPage.params = params;

					await uni.navigateTo({
						url: '/pages/results/Result',
						success: () => {
							console.log('跳转成功');
						},
						fail: (err) => {
							console.error('跳转失败', err);
							uni.showToast({
								title: '页面跳转失败，请重试',
								icon: 'none',
								duration: 2000
							});
						}
					});
				}
			} catch (error) {
				console.error('处理出错:', error);
				uni.showToast({
					title: '操作失败，请重试',
					icon: 'none',
					duration: 2000
				});
			} finally {
				this.isProcessing = false;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.button {
	&-primary {
		background-color: #409eff;
		color: white;
		
		&:hover {
			background-color: #66b1ff;
		}
		
		&:disabled {
			background-color: #a0cfff;
		}
	}
}
</style>