<template>
    <view>
        <Divider :text="timePriceConfig.title" />
        <view v-for="(item, index) in timePriceConfig.items" :key="index">
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
        timePriceConfig() {
            return {
                title: "不眠不休的时间单价",
                items: [
                    {
                        label: '你赚一分钱需要的时间：',
                        value: [`${this.data.timePerCent} 秒`]
                    },
                    {
                        label: '你一秒能赚的钱：',
                        value: [`${this.data.moneyPerSecond} 元`]
                    }
                ]
            };
        }
    }
};
</script>