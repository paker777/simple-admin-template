<template>
  <div class="app-container">
    <div class="text">员工管理</div>
    <el-button type="primary" @click="$router.push('/employees/employees-detail')">详情页</el-button>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.app-container {
  .text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
