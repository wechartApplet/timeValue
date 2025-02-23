// 创建全局状态管理
const store = {
    state: {
        calculationParams: null
    },
    setParams(params) {
        this.state.calculationParams = params;
        console.log('store设置数据:', params); // 添加日志
    },
    clearParams() {
        this.state.calculationParams = null;
    }
};

export default store; 