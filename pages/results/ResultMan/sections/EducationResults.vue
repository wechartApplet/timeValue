<template>
  <view>
    <Divider :text="educationConfig.title" />
    <view v-for="(item, index) in educationConfig.items" :key="index">
      <ResultItem :label="item.label" :value="item.value" />
    </view>
  </view>
</template>

<script>
import Divider from '@/pages/components/Divider.vue';
import ResultItem from '@/pages/components/ResultItem.vue';

export default {
  components: {
    Divider,
    ResultItem
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    educationConfig() {
      return {
        title: "受教育的时间",
        items: [
          {
            label: '你参考中考的时间为：',
            value: [this.data.middleExamDate, '年龄为 15 岁']
          },
          {
            label: '你参考高考的时间为：',
            value: [this.data.highExamDate, '年龄为 18 岁']
          },
          {
            label: '你参加研考的时间为：',
            value: [this.data.GradExamDate, '年龄为 22 岁']
          },
          {
            label: '你硕士毕业的时间为：',
            value: [this.data.masterDate, '年龄为 25 岁']
          }
        ]
      };
    }
  }
};
</script>