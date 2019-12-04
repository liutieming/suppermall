<template>
  <div class="buttom-bar">
    <div class="check-content">
      <check-button class="check-button" :checked="isAllCheck" @click.native="btnCheck"/>
      <span>全选</span>
    </div>
    <div class="price">
      <span>合计: {{totalPrice | formatTotalPrice}}</span>
    </div>
    <div class="calc">去付款({{checkedLength}})</div>
  </div>
</template>
<script>
  import CheckButton from "@/components/common/checkButton/CheckButton.vue"
  import {mapGetters} from "vuex";
  
  export default {
    name: "CartButtomBar"
    , components: {
      CheckButton
    }
    , data() {
      return {}
    }
    , methods: {
      btnCheck() {
        if (this.isAllCheck) {
          this.$store.getters.cartList.forEach(item => {
            item.checked = false
          })
        } else {
          this.$store.getters.cartList.forEach(item => item.checked = true)
        }
      }
    }
    , filters: {
      formatTotalPrice(value) {
        return "¥ " + value.toFixed(2);
      }
    }
    , computed: {
      totalPrice() {
        // 第一种对数组累计求值的方法, 使用 forEach
        let totalP = 0.0;
        this.$store.getters.cartList.forEach(item => {
          item.checked ? totalP += item.lowNowPrice * item.count : null;
        })
        
        // 第二种对数组累计求值的方法, 使用 reduce
        totalP = this.$store.state.cartList.reduce((sum, item) => {
          return sum += item.checked ? item.lowNowPrice * item.count : 0;
        }, 0)       // 参数 0 必须给出. 0 是 传参 sum 的初使值
        return totalP;
      }
      , ...mapGetters(["cartList"])
      , checkedLength() {
        return this.cartList.filter(item => item.checked === true).length
      }
      , isAllCheck() {
        return this.cartList && this.cartList.length > 0
          ? this.cartList.filter(item => item.checked === false).length === 0
          : false;
      }
    }
  }
</script>
<style scoped>
  .buttom-bar {
    position: relative;
    display: flex;
    align-items: center;
    
    height: 40px;
    background-color: #eee;
    font-size: 18px;
  }
  .check-content {
    display: flex;
    align-items: center;
    width: 20%;
    margin-left: 10px;
    margin-right: 20px;
  }
  .check-button {
    height: 25px;
    margin-left: 6px;
    margin-right: 6px;
  }
  .price {
    flex: 1;
    margin-left: 6px;
  }
  .calc {
    display: flex;
    align-items: center;        /*内部元素垂直居中*/
    justify-content: center;    /*内部元素水平居中*/
    background-color: #f00;
    color: #ffffff;
    width: 30%;                 /*真对父的宽度的 30%*/
    height: 100%;               /*真对父的高的 100%*/
  }
</style>
