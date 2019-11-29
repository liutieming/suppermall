import axios from "axios"

// 导出一个函数, 这个函数返回的是Promise类型
export function request(config) {
  // 1. 创建 axios 实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/vip'  // http://106.54.54.237:8000/api/v1
    , timeout: 5000
  })
  
  // 2. axios 拦截器
  // 2.1 请求拦截的作业
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    // console.log(err);
  })
  
  // 2.2 响应拦截器
  instance.interceptors.response.use(result => {
    return result.data
  }, err => {
// console.logerr);
  })
  
  return instance(config);
}
