<template>
  <div class="completion-input-box">
    <FromList  :text="'创业项目名称'" v-model="projectN"></FromList>
    <FromList  :text="'所属公司名称'" v-model="companyN"></FromList>
    <FromList  :text="'所属投资机构名称'" v-model="mechanismN"></FromList>
  </div>
</template>
<script>
  import FromList from './VInput.vue'
  export default {
    name: 'search',
    data() {
      return {
        projectN: '55555',         // 创业项目名称
        companyN: '',         // 所属公司名称
        mechanismN: ''        // 所属机构名称
      }
    },
    components: {
      FromList
    }
  }
</script>
