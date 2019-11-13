<template>
  <div class="wrapper" ref="wrapper">   <!--wrapper 与 content 必须挨着 不然 滚动失效-->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  // 对 better-scroll 的封装
  import BScroll from "better-scroll"
  
  export default {
    name: "scroll"
    , data() {
      return {
        scroll: null
      }
    }
    , props: {            // 接收父控件传入的参数
      probeType: {        // 设置滚动监听类型
        type: Number
        , default() {
          return 0        // 监听类型的值: 0, 1: 不监听, 2: 只监听一下, 3: 实时监听
        }
      }
      , pullUpLoad: {     // 设置加载更多
        type: Boolean
        , default: false  // 值: ture 加载更多事件生效, false 加载更多事件失效
      }
    }
    , mounted() {
      console.log('xxxxxxxxxxxxxxxxxxxxx  ' + this.$refs.wrapper);
      this.scroll = new BScroll(this.$refs.wrapper, {
        // probeType 监听类型: 0, 1: 不监听, 2: 只监听一次, 3: 一直监听
        probeType: this.probeType
        
        // click 点击类型: true: 接受点击, false: 不接受点击事件. 其中 button 不受其影响
        , click: true
        
        // pullUpLoad 加载更多事件: 手势为向上拖动到底部
        , pullUpLoad: this.pullUpLoad
      })
      , this.scroll.on("scroll", (position) => {    // 滚动监听程序
        console.log('this.$emit("scroll", position)........... 应由父组件给出具体处理逻辑');
        this.$emit("scroll", position)              // 发射事件 第一个参数是事件名称, 第二个参数是 事件参数
      })
      , this.scroll.on("pullingUp", () => {         // 加载更多监听程序
        console.log("pullingUp.............. 应由父组件给出具体处理逻辑");
        this.$emit("pullingUp")
      })
    }
    , methods: {
      backTop(x = 0, y = 0, time = 333) {
        console.log("backTop().....");
        this.scroll.scrollTo(x, y, time);
      }
      
      , finishPullUp () {           // 这里对 finsihPullUp() 进行一次包装, 对 better-scroll 组件解耦
        this.scroll.finishPullUp()  // 该方法 刷新 pullUpLoad状态, 允许下一次加载更多
      }
      , refresh () {                // 这里对 refresh() 进行一层包装, 对 better-scroll 组件解耦
        console.log("refresh()....................");
        this.scroll.refresh()       // 调用原生scroll方法,重新计算 scroll管理的高度
      }
    }
    , computed: {}
    , components: {}
  }
</script>
<style scoped>
</style>
