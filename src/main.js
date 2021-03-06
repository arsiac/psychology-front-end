import Vue from 'vue'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import router from '@/router'
import store from '@/store'
import less from 'less'
import { isAuth, toDateString } from '@/utils'
import App from './App.vue'

Vue.use(less)
Vue.use(ElementUI)

// 挂载全局
Vue.prototype.$auth = isAuth
Vue.prototype.$dateString = toDateString

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
