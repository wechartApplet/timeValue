<template>
  <view class="divider-container">
    <view class="divider">
      <view class="divider_line"></view>
      <text class="divider_text">{{ text }}</text>
      <view class="divider_line"></view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.divider-container {
  margin: 20px 0;
}
.divider {
  display: flex;
  align-items: center;
}
.divider_line {
  flex: 1;
  height: 1px;
  background-color: #ccc;
}
.divider_text {
  margin: 0 10px;
}
</style>