<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" :key="index"></span>
  </div>
</template>
<script>
  const Length=5;
  const Cls_on='on';
  const Cls_off='off';
  const Cls_half='half';
  export default{
    props:{
      size:{
        type:Number
      },
      score:{
        type:Number
      }
    },
    computed:{
      starType() {
        return 'star-' + this.size;
      },
      itemClasses(){
        let result = [];
        let Number=Math.floor(this.score*2)/2;
        let bool=Number%1!==0;
        let Value=Math.floor(Number);
        for (let i=0;i<Value;i++){
          result.push(Cls_on)
        }
        if(bool){
          result.push(Cls_half)
        }
        while (result.length<Length){
          result.push(Cls_off)
        }
        return result
      }
    }

  }
</script>
<style lang="less">
  @import "../assets/css/mixin.less";
  .star{
    font-size: 0;
    .star-item{
      display: inline-block;
      background-repeat: no-repeat;
    }
  }
  .star-48{
    .star-item{
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;
      &:last-child{
        margin-right: 0
      }
    }
    .on{
      .bg-image('star48_on')
    }
    .half{
      .bg-image('star48_half')
    }
    .off{
      .bg-image('star48_off')
    }
  }
  .star-36{
    .star-item{
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;
      &:last-child{
        margin-right: 0
      }
    }
    .on{
      .bg-image('star36_on')
    }
    .half{
      .bg-image('star36_half')
    }
    .off{
      .bg-image('star36_off')
    }
  }
  .star-24{
    .star-item{
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;
      &:last-child{
        margin-right: 0
      }
    }
    .on{
      .bg-image('star24_on')
    }
    .half{
      .bg-image('star24_half')
    }
    .off{
      .bg-image('star24_off')
    }
  }
</style>
