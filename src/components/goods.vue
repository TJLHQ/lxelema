<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}"
              @click="selectMenu(index,$event)" ref="menuList">
                <span class="text border-1px">
                   <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="item in goods" class="food-list" ref="foodList">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">

                    <cartcontrol :food="food" @add="addFood"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice"
                :minPrice="seller.minPrice"></shopcart>
    </div>
    <food @add="addFood" ref="food"></food>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import shopcart from './shopcart.vue'
  import cartcontrol from './cartcontrol.vue'
  import food from './food.vue'
  import {mapGetters, mapMutations} from 'vuex'
  export default{
    components: {
      shopcart,
      cartcontrol,
      food
    },
    data(){
      return {
        listHeight: [],
        scrollY: 0,
        goods: []
      }
    },
    computed: {
      ...mapGetters(['seller']),
//        计算左边的高亮显示
      currentIndex(){
        for (let i = 0; i < this.listHeight.length; i++) {
          let Height1 = this.listHeight[i];
          let Height2 = this.listHeight[i + 1];
          if (!Height2 || (this.scrollY >= Height1 && this.scrollY < Height2)) {
            return i
          }
        }
        return 0
      },
//      获取item中的count
      selectFoods(){
        let foods = [];
        this.goods.forEach(good => {
          good.foods.forEach(food => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    methods: {
//        点击li显示food层
      selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
//        右边的item
        this.checkFood(food)
        this.foodShow()
      },
//        初始化左右边滚动条的高度
      _initScroll(){
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3,
          click: true
        });
        //        计算右边滚动时的高度
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      //        计算滚动的区间
      _calculateHeight() {
        let foodList = this.$refs.foodList;
        let height = 0;
        this.listHeight.push(height);
        for (let item of foodList) {
          height += item.clientHeight
          this.listHeight.push(height);
        }
      },
      //        点击左边的li右边滚动到相应的li上
      selectMenu(index, event){
        if (!event._constructed) {
          return
        }
        let foodList = this.$refs.foodList;
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
//      接受价格传过来的值
      addFood(target) {
        this._drop(target);
      },
//      执行小球下落动画
      _drop(target) {
        // 体验优化,异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);
        });
      },
      ...mapMutations(['checkFood', 'foodShow'])
    },
    created(){
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then((res) => {
        res = res.data;
        if (res.errno === 0) {
          this.goods = res.data
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight()
          })

        }
      });
    }

  }
</script>
<style lang="less">
  @import "../assets/css/mixin.less";
  .goods {
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper {
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
      .menu-item {
        display: table;
        height: 54px;
        width: 56px;
        padding: 0 12px;
        line-height: 14px;
        &.current {
          position: relative;
          z-index: 10;
          margin-top: -1px;
          background: #fff;
          font-weight: 700;
          .text {
            .border-none();
          }

        }
        .icon {
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          margin-right: 2px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease {
            .bg-image('decrease_3');
          }

          &.discount {
            .bg-image('discount_3')
          }

          &.guarantee {
            .bg-image('guarantee_3')
          }

          &.invoice {
            .bg-image('invoice_3')
          }

          &.special {
            .bg-image('special_3')
          }

        }
        .text {
          display: table-cell;
          width: 56px;
          vertical-align: middle;
          .border-1px(rgba(7, 17, 27, 0.1));
          font-size: 12px;
        }
      }
    }
    .foods-wrapper {
      flex: 1;
      .title {
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background: #f3f5f7;
      }
      .food-item {
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        .border-1px(rgba(7, 17, 27, 0.1));
        &:last-child {
          .border-none();
          margin-bottom: 0;
        }
        .icon {
          flex: 0 0 57px;
          margin-right: 10px;
        }
        .content {
          flex: 1;
          .name {
            margin: 2px 0 8px 0;
            height: 14px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .desc, .extra {
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .desc {
            line-height: 12px;
            margin-bottom: 8px;
          }
          .extra {
            .count {
              margin-right: 12px;
            }
          }
          .price {
            font-weight: 700;
            line-height: 24px;
            .now {
              margin-right: 8px;
              font-size: 14px;
              color: rgb(240, 20, 20);
            }
            .old {
              text-decoration: line-through;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }

          }
          .cartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom: 12px;
          }
        }

      }

    }

  }
</style>
