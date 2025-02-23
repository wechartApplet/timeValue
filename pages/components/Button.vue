<template>
  <view class="input-group">
    <button :class="buttonClass" @tap="$emit('click')">{{ text }}</button>
  </view>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'primary',  // primary, secondary, danger 等
      validator: (value) => {
        return ['primary', 'secondary', 'danger'].includes(value);
      }
    },
    size: {
      type: String,
      default: 'normal',  // small, normal, large
      validator: (value) => {
        return ['small', 'normal', 'large'].includes(value);
      }
    }
  },
  computed: {
    buttonClass() {
      return [
        'btn',
        `btn-${this.type}`,
        `btn-${this.size}`
      ];
    }
  },
  methods: {
    onClick() {
      this.$emit('click');
    }
  }
};
</script>

<style scoped>
.btn {
  width: 100%;
  border: none;
  border-radius: 8px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

/* 类型样式 */
.btn-primary {
  background-color: #007aff;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

/* 尺寸样式 */
.btn-small {
  padding: 8px;
  font-size: 14px;
}

.btn-normal {
  padding: 15px;
  font-size: 16px;
}

.btn-large {
  padding: 20px;
  font-size: 18px;
}

/* 悬停效果 */
.btn:hover {
  opacity: 0.9;
}

/* 点击效果 */
.btn:active {
  transform: scale(0.98);
}
</style>