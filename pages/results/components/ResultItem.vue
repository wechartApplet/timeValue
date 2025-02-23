<template>
    <view class="result-item">
        <text class="title">{{ label }}</text>
        <view class="content">
            <template v-if="Array.isArray(value)">
                <text v-for="(item, index) in value" :key="index" class="value">
                    {{ item }}
                </text>
            </template>
            <text v-else class="value">{{ value }}</text>
        </view>
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
            type: [Array, String, Number],
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.result-item {
    margin-bottom: 20px;
    
    .title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
        color: $text-color;
    }
    
    .content {
        .value {
            display: block;
            margin-bottom: 8px;
            line-height: 1.5;
            color: $text-color;
            
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}
</style> 