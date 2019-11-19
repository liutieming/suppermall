import Vue from "vue"
import VueRouter from "vue-router"

// import Home from '../views/home/Home'
// import Category from '../views/category/Category'
// import Cart from '../views/cart/Cart'
// import Profile from '../views/profile/Profile'

// layload
const Home      = () => import('../views/home/Home')
const Category  = () => import('../views/category/Category')
const Cart      = () => import('../views/cart/Cart')
const Profile   = () => import('../views/profile/Profile')
const Detail    = () => import('../views/detail/Detail')


// 1. 安装插件
Vue.use(VueRouter);

// 2. 创建 routes
const routes = [
  {
    path: ""
    , redirect: "/home"
  }
  , {
    path: '/home',
    name: 'home',
    component: Home
  }
  , {
    path: '/category',
    name: 'category',
    component: Category
  }
  , {
    path: '/cart',
    name: 'cart',
    component: Cart
  }
  , {
    path: '/profile',
    name: 'profile',
    component: Profile
  }
  , {
    path: "/detail",
    name: "detail",
    component: Detail
  }
  
]

// 3. 创建 router 并引用 route, 且导出
const router = new VueRouter({
  routes
  , mode: "history"
})
export default router


