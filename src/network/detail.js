import {request} from "./request"


// 在这里多了一层封装, 在软件设计上是优秀的, 使net层与view层解耦
export function getDetail(iid) {
  return request({
    url: '/detail'
    , params: {iid}
  })
}

// 货品信息
export class Goods {
  constructor (itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discount
    this.realPrice = itemInfo.realPrice
  
    this.coumns = columns
    this.services = services
  }
}

// 商家信息
export class Shop {
  constructor (shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;             // 粉丝数
    this.sells = shopInfo.cSells;           // 销量
    this.score = shopInfo.score;            // 分数
    this.goodsCount = shopInfo.cGoods;      // 货量
  }
}
