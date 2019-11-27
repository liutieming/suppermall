// 这里写的都是混入功能代码 详细文档见 https://cn.vuejs.org/v2/guide/mixins.html#ad

import {debounce} from "./utils";

import BackTop from "@/components/common/backTop/BackTop.vue";
import {BACK_POSITION} from "./const";


// 1. 混入图片图片加载刷新 scroll 高度的功能
export const itemImgListenerMixin = {
  // 混入 数据
  date() {
    return {
      eItemImgListener: null
    }
  }
  // 混入 钩子函数
  , mounted() {
    ///////////////// 1. 完成图片加载事件 解决 刷新 scroll 高度问题 /////////////////
    // 防抖函数: 包装一层防抖功能, 以解决频繁执行 refresh() 函数,
    //   第一个参数 接收的是一个函数
    //   第二个参数 500 指延时500毫秒执行. 即在500毫秒内有多次执行仅执行最后一次函数
    const refresh = debounce(this.$refs.refScroll.refresh, 500)
  
    ///////////////// 2. 定义事件函数 /////////////////
    this.eItemImgListener = () => {
      refresh();
    }
  
    ///////////////// 3. 注册事件 /////////////////
    // 在事件总线($bus)上, 注册事件($on)的方法, 实现图片完成加载事件的监听
    this.$bus.$on("itemImgLoaded", this.eItemImgListener)
  }
}


// 2. 混入 回到顶部功能
export const backTopMixin = {
  components: {
    BackTop
  }
  , data() {
    return {
      isShowBackTop: false
    }
  }
  , methods: {
    // 混入方法, 需要注意的是: 只能将methods下面的具体方法对象混入Vue中, 如果Vue中有同名方法
    //     则会被覆盖.
    backTop() {
      this.$refs.refScroll.scrollTo(0, 0, 333);
    }
    , listenShowBackTop(position) {
      this.isShowBackTop = -position.y > BACK_POSITION
    }
  }
}
