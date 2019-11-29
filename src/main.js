import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store";


Vue.config.productionTip = false

// 为Vue原型添加 $bus 做为事件总线, 以解决复杂组件之件事件传递问题. 有点类似于 Vuex 解决数据在组件之关数据传递的问题
Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App)
  , router
  , store
}).$mount('#app')
