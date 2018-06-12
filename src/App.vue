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
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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


</style>
