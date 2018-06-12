import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/goods'
import seller from '@/components/seller'
import Ratings from '@/components/ratings'
import store from '../store'
Vue.use(Router)
if(window.localStorage.getItem('token')){
  store.commit('login',window.localStorage.getItem('token'))
}
export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect:'/goods'
    },
    {
      path:'/goods',
      component: Goods
    },
    {
      path:'/ratings',
      component: Ratings
    },
    {
      path:"/seller",
      component: seller
    }
  ]
})
