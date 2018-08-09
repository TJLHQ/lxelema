<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="plot">
      <div :class="{active:current==index}" v-for="(item,index) in plots"></div>
    </div>
  </div>
</template>
<script>
  import Bscroll from 'better-scroll';
  export default{
    props: {
      autoplay: {
        type: Boolean,
        default: true
      },
      loop: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 2000
      }
    },
    mounted(){
      setTimeout(() => {
        this._sliderWidth();
        this._sliderInt();
        this.plot()
        if(this.autoplay){
          this._play()
        }
      }, 20)

      window.addEventListener('resize',()=>{
          if(!this.slider){
              return
          }
          this.sliderWidth(true);
          this.slider.refresh();
      })
    },
    data(){
      return {
        current: 0,
        plots: []
      }
    },
    methods: {
      _sliderWidth(isresize){
        let width = 0;
        let clientWidth = this.$refs.slider.clientWidth;
        let sliderChildren = this.$refs.sliderGroup.children;
        for (let item of sliderChildren) {
          item.setAttribute('class', 'slider-list');
          item.style.width = clientWidth + 'px';
          width += clientWidth;
        }
        if (this.loop && !isresize) {
          width += clientWidth * 2
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _sliderInt(){
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          click: true
        })
        this.slider.on('scrollEnd', () => {
          let index = this.slider.getCurrentPage().pageX;
          this.current = index;
          if (this.autoplay) {
            clearTimeout(this.timer);
            this._play()
          }
        })
        this.slider.on('beforeScrollStart', () => {
          if (this.autoplay) {
            clearTimeout(this.timer)
          }
        })
      },
      _play(){
        this.timer = setTimeout(() => {
          this.slider.next(400)
        }, this.interval)
      },
      plot(){
        this.plots = new Array(this.sliderChildren.length - 2)
      }
    },
    activated(){
    if(this.autoplay){
        this._play()
    }
    },
    deactivated(){
    clearTime(this.timer)
    }
  }
</script>
