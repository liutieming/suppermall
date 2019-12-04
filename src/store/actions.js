
import {ADD_CART, ADD_COUNT} from "./mutations-types";

export default {
  addCart(context, payload) {
    payload.count = 1;
    const find = context.state.cartList.find(item => item.iid === payload.iid);
    // find ? context.commit(ADD_COUNT, find) : context.commit(ADD_CART, payload);
    
    return new Promise((resolve, reject) => {
      if (find) {
        context.commit(ADD_COUNT, find);
        resolve("该商品已加 1");
      } else{
        context.commit(ADD_CART, payload);
        resolve("该商品已加入购物车")
      }
    })
  }
}
