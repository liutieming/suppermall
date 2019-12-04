import Toast from "./Toast";

const obj = {};

// install 是 Vue.use() 方法 回调的函数
obj.install = (Vue) => {
  console.log("执行了 obj 的 install 方法");
  // console.log(Vue);
  
  // 1. 创建组件构造器
  const toastConstructor = Vue.extend(Toast);
  
  // 2. new 方法, 根据组件构造器, 可以创建出一个组件对象
  const toast = new toastConstructor();
  
  // 3. 将组件对象, 手动的挂载到一个 元素上(div)
  toast.$mount(document.createElement("div"));
  
  // 4. toast.$el 对应的就是div了
  document.body.appendChild(toast.$el);           // 这里 才真正的加载到界面上了.
  
  Vue.prototype.$toast = toast;
};

export default obj;


