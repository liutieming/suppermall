import {request} from "./request"


// 在这里多了一层封装, 在软件设计上是优秀的, 使net层与view层解耦
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data'
    , params: {type, page}
  })
}


