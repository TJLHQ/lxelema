<template>
  <div class="completion-input-box">
    <span class="input-box-name">{{text}}</span>
    <input
      type="text"
      ref="input"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
  </div>
</template>
<script>
  export default {
    name: 'inputlsit',
    props: ['text', 'value'],
    watch:{
        value(newVal){
            if(parseInt(newVal)%2===0){
                console.log('2222')
            }
        }
    }
  }
</script>
<style scoped>
  input{
    border:1px solid #ccc;
  }
  p{
    color: red;
  }
</style>
