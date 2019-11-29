import Vue from "vue";
import Vuex from "vuex";

import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters"


// 1. 安装 Vuex 插件
Vue.use(Vuex);

// 2. 创建 store 对象
const store = new Vuex.Store({
  state
  , mutations
  , actions
  , getters
});

// 3. 挂载Vue实例上
export default store;

