
import {ADD_CART, ADD_COUNT} from "./mutations-types";

export default {
  // // 将商品存入数组, 并统计该同样商品加入的次数, (比如以前有1个A产品, 再传一个A产品, count 加 1)
  // addCart(state, payload) {
  //   payload.count = 1;
  //   let findGood = state.cartList.find(item => item.iid === payload.iid);
  //   findGood ? findGood.count++ : state.cartList.push(payload);
  //   // 上面代码中处理了两个变化, 一个是 count + , 一个是 push payload. vue 的规范, 建议一个方法只处理一种变化,
  //   // 所以要将上面的代码进行功能拆分, 以 actions 组织调用.
  // },
  
  // mutations的方法应符合一个方法只处理一种变化
  // 实现 count + 1
  [ADD_COUNT] (state, payload) {
    payload.count++
  }
  
  // 实现 cartList.push
  , [ADD_CART] (state, payload) {
    payload.checked = false;          // 在购物车中是否显示选中.
    state.cartList.push(payload);
  }
}


