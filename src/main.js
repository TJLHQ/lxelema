// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import echarts from 'echarts'
import store from './store'
import elementUI from 'element-ui'
Vue.use(elementUI)
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
Vue.prototype.$http=axios
Vue.filter('time',(value)=>{
  let y=new Date(parseInt(value)).getFullYear();
  let M=new Date(parseInt(value)).getMonth()+1;
  let d=new Date(parseInt(value)).getDate();
  let h=new Date(parseInt(value)).getHours();
  let m=new Date(parseInt(value)).getMinutes();
  let s=new Date(parseInt(value)).getSeconds();
  return `${y}-${M>9?M:'0'+M}-${d>9?d:'0'+d} ${h>9?h:'0'+h}:${m>9?m:'0'+m}:${s>9?s:'0'+s}`
})
import './assets/css/index.less'
Vue.prototype.$echarts=echarts

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
