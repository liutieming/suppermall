
import {ADD_CART, ADD_COUNT} from "./mutations-types";

export default {
  addCart(context, payload) {
    payload.count = 1
    const find = context.state.cartList.find(item => item.iid === payload.iid);
    find ? context.commit(ADD_COUNT, find) : context.commit(ADD_CART, payload);
  }
}
