<template>
  <view class="input-group">
    <text v-if="label" class="label">{{ label }}</text>
    <radio-group class="radio-group" @change="onRadioChange">
      <label v-for="(option, index) in options" :key="index" class="radio-label">
        <radio :value="option.value" :checked="modelValue === option.value" /> {{ option.label }}
      </label>
    </radio-group>
  </view>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: Number,
      default: null
    }
  },
  methods: {
    onRadioChange(event) {
      this.$emit('update:modelValue', event.detail.value - 0);
    }
  }
};
</script>
<style scoped>
	.input-group {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
	}
	
	.label {
		font-size: 16px;
		font-weight: bold;
		margin-right: 10px;
	}
	.radio-group {
		display: flex;
		align-items: center;
	}
	
	.radio-label {
		margin-right: 10px;
	}
</style>