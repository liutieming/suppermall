// 实现一个监听器Observer，用来劫持并监听所有属性，如果有变动的，就通知订阅者Dep。
// Observer是一个数据监听器，其实现核心方法就是 Object.defineProperty( )。
//    如果要对所有属性都进行监听的话，那么可以通过递归方法遍历所有属性值，并对其进
//    行Object.defineProperty( )处理。如下代码，实现了一个Observer。


function observe(data) {
  console.log("observe this:", this);
  if (!data || typeof data !== "object") return;
  
  Object.keys(data).forEach((key) => {
    defineReactive(data, key, data[key])
  })
}

function defineReactive(data, key, val) {
  console.log("defineReactive this:", this);
  observe(val);   // 递归遍历所有子属性
  Object.defineProperty(data, key, {
    enumerable: true
    , configurable: true
    , get: () => {
      return val;
    }
    , set: (newVal) => {
      val = newVal;
      console.log("属性" + key + "已经被监听, 现值为: " + newVal.toString());
    }
  })
}

function Dep () {
  console.log("Dep this:", this);
  this.subs = [];
}
Dep.prototype = {
  addSub: (sub) => {
    this.subs.push(sub);
  }
  , notify: () => {
    this.subs.forEach((sub) => {
      sub.update();
    })
  }
}


let myLib = {
  book1: {
    name: "book1-name"
  }
  , book2: {
    name: "book2-name"
  }
}

observe(myLib);
myLib.book1.name = "vue权威指南"
myLib.book2.name = "没有该书"