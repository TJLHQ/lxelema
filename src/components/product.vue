<template>
  <div class="all">
    <div class="news" ref="newsScroll">
      <ul>
        <li v-for="item in news">
          <h2>{{item.name}}</h2>
          <p>{{item.content}}</p>
          <div class="newsball"></div>
        </li>
      </ul>
    </div>
    <div class="balls" v-for="item in balls">
      <transition name="fade">
        <div class="bigball">
          <div class="ball"></div>
        </div>
      </transition>
    </div>
  </div>

</template>
<script>
  import BScroll from 'better-scroll'
  export default{
      created(){
        this.$nextTick(()=>{
          this.init()
        })
      },
     data(){
         return{
           balls:[
             {show:false},
             {show:false},
             {show:false},
             {show:false},
             {show:false},
           ],
           news:[
             {
               name:'今日新闻',
               content:'地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费'
             },
             {
               name:'今日新闻',
               content:'地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费'
             },
             {
               name:'今日新闻',
               content:'地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费'
             },
             {
               name:'今日新闻',
               content:'地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费'
             },
             {
               name:'今日新闻',
               content:'地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费'
             },
             {
               name:'今日新闻',
               content:'地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费'
             },
             {
               name:'今日新闻',
               content:'地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费'
             },
             {
               name:'今日新闻',
               content:'地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费'
             },
             {
               name:'今日新闻',
               content:'地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费'
             },
             {
               name:'今日新闻',
               content:'地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费'
             },
             {
               name:'今日新闻',
               content:'地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费'
             },
             {
               name:'今日新闻',
               content:'地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费'
             },
             {
               name:'今日新闻',
               content:'地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费'
             },
             {
               name:'今日新闻',
               content:'地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费'
             },
             {
               name:'今日新闻',
               content:'地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费'
             },
             {
               name:'今日新闻',
               content:'地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费'
             },
             {
               name:'今日新闻',
               content:'地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费'
             },
             {
               name:'今日新闻',
               content:'地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费地方是发的发的顺丰的收费的收费'
             }
           ]
         }
     },
    methods:{
         init(){
             let i=0;
           this.meunScroll = new BScroll(this.$refs.newsScroll, {
             click:true,
             probeType:3,
             scrollbar:{
               fade:true
             },
             pullDownRefresh:{
               threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
               stop: 20
             },
             pullUpLoad : {
               threshold: -20 // 在上拉到超过底部 20px 时，触发 pullingUp 事件
             }

           });
           this.meunScroll.on('pullingDown', () => {
             // 刷新数据的过程中，回弹停留在距离顶部还有20px的位置
             alert('dddd')
             this.meunScroll.finishPullDown()
           });
           this.meunScroll.on('pullingUp', () => {
               i++
             alert(i)
           })

         }
    }
  }
</script>
<style lang="less">
  .all{
    position: absolute;
    top:170px;
    bottom:0;
    width: 100%;
    overflow: hidden;
    .news{
      height:100%;
      li{
        padding:18px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        border-top:1px solid #ccc;
        h2{
          font-size: 20px;
          font-weight:bold;
          padding-bottom:15px;
        }
        p{
          text-indent: 2em;
          color: #bbb;
          line-height: 1.5em;
        }
        .newsball{
          width: 20px;
          height: 20px;
          position: absolute;
          right:20px;
          top:20px;
          -webkit-border-radius:;
          -moz-border-radius:;
          border-radius:50%;
          background: green;
        }
      }
    }
  }


</style>
