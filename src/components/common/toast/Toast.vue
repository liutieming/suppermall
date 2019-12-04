<template>
  <div class="toast" v-show="isShow">
    {{msg}}
  </div>
</template>
<script>
  export default {
    name: "Toast"
    , components: {}
    , data() {
      return {
        isShow: false
        , msg: ""
      }
    }
    , methods: {
      show(msg, duration = 2000) {
        this.isShow = true;
        this.msg = msg;
        setTimeout(() => {
          this.isShow = false;
          this.msg = '';
        }, duration)
      }
    }
    , computed: {}
  }
</script>
<style scoped>
  .toast {
    /*下面4行代码实现居中定位*/
    position: fixed;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);
  
    z-index: 9999;                          /*保持在最高层*/
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 18px;
  }
</style>
