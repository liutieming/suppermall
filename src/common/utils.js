/////////// debounce 防抖函数 //////////
// 实现不频繁的事件监听, 即按 delay 参数给定的时间进行监听
export function debounce (func, delay) {
  let timer = null;
  return (...args) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
