import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
Vue.use(Vuex)
let store=new Vuex.Store({
  state:{
    seller:[],
    foods:[],
    // goods页的foods层
    checkFood:{},
    showFood:false,
    ERR_OK:0,
    token:false
  },
  actions:{
    init({commit,state}){
      axios.get('/api/seller').then(res=>{
        if(res.data.errno==state.ERR_OK){
          commit('seller',res.data.data)
        }else{
          return
        }
      })
    }

  },
  mutations:{
    set_token(state,flag){
      state.token=flag
    },
    // 设置增加
    setCount(state,data){
      let boo=true;
      state.foods.forEach(item=>{
        if(item.name==data.name){
          item.count++
          boo=false
          return
        }
      })
      if(boo){
        Vue.set(data,'count',1);
        state.foods.push(data)
      }
    },
    // 设置减少
    defau(state,data){
      state.foods.forEach(item=>{
        if(item.name==data.name){
          item.count--
        }
      })
    },
    // 首页存seller值
    seller(state,data){
      state.seller=data
    },
// 存取右边的food中item
    checkFood(state,data){
      state.checkFood=data;
    },
    foodShow(state){
      state.showFood=true
    },
    foodHide(state){
      state.showFood=false
    }
  },
  getters:{
    token(state){
      return state.token
    },
    seller(state){
      return state.seller
    },
    //        总个数
    totalCount(state){
      let count=0;
      state.foods.forEach(item=>{
        count+=item.count
      })
      return count
    },
    //        总价格
    totalPrice(state){
      let total = 0;
      state.foods.forEach(food => {
        total += food.price * food.count
      })
      return total
    },
    food(state){
      return state.checkFood
    },
    showFlag(state){
      return state.showFood
    }
  }
})
export default store
