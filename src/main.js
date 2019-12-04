import Vue from 'vue';
import FastClick from "fastclick";
import VueLazyLoad from "vue-lazyload";

import App from './App.vue';
import router from "./router";
import store from "./store";

import toast from "./components/common/toast";



Vue.config.productionTip = false

// 为Vue原型添加 $bus 做为事件总线, 以解决复杂组件之件事件传递问题. 有点类似于 Vuex 解决数据在组件之关数据传递的问题
Vue.prototype.$bus = new Vue();

// 使用 toast 插件 类似 msgBox
Vue.use(toast);     // use(toast) 会调用 toast 插件的 install 方法, 并将 Vue 作为方法的参数

// 使用 FastClick 解决在移动端 点击事件的 300 毫秒延迟问题
FastClick.attach(document.body);

// 使用 VueLazyLoad 实现图片在须视范围内的懒加载
//    <img v-lazy="img.src" >  在img标签中要将 :src 改成 v-lazy
Vue.use(VueLazyLoad, {
  loading: require("./assets/img/common/wait.png")
});

new Vue({
  render: h => h(App)
  , router
  , store
}).$mount('#app')
