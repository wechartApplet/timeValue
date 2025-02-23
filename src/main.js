import './styles/variables.scss'
import store from './store'

// 将 store 挂载到全局
const app = createApp(App)
app.config.globalProperties.$store = store 