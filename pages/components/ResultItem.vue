<template>
  <view class="result-item">
    <text class="result-label">{{ label }}</text>
	<text
	  v-for="(item, index) in value"
	  :key="index"
	  class="result-value"
	>
	  {{ item }}
	</text>
  </view>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: Array, 
      required: true
    }
  }
};
</script>

<style scoped>
result-item {
  margin-bottom: 10px;
}
.result-label {
  font-weight: bold;
}
.result-value {
  margin-left: 10px;
}
</style>