<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods" active-class="active">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings" active-class="active">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller" active-class="active">商家</router-link>
      </div>
    </div>
    <transition :name="transitionName">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    </transition>
  </div>
</template>

<script>
  import VHeader from './components/header.vue'
  export default {
    components:{
      VHeader
    },
    created(){
        this.$store.dispatch('init')
    },
    data(){
      return{
        transitionName: 'slide-left'
      }
    },
    beforeRouteUpdate (to, from, next) {
      console.log('aaaaaa')
        if(this.$route.path!='/seller') //假设name为home的路由都使用`slide-left`,其它的路由都为`slider-right`
        {
            this.$router.isBack=true;
        }
      let isBack = this.$router.isBack
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false
      next()
    }
  }
</script>

<style lang="less">
@import "./assets/css/mixin.less";
.tab{
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  .border-1px(rgba(7, 17, 27, 0.1));
  .tab-item{
    flex: 1;
    text-align: center;
    & > a{
    font-size: 14px;
    color: rgb(77, 85, 93);

  }
    .active{
      color: rgb(240, 20, 20);
    }


  }

}
.slide-left-enter-active ,.slide-left-leave-active{
  transition: all .5s ease;
}
.slide-left-enter {
  opacity: 0;
}
.slide-left-leave-to{
  opacity: 0;
}

.slide-right-enter-active,.slide-right-leave-active {
  transition: all .3s ease;
}
.slide-right-enter {
  opacity: 0;
}
.slide-right-leave-to{
    opacity: 0;
}


</style>
