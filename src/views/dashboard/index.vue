<template>
  <div class="app-container">
    <div class="text">
      <Pagination />
      <Dialog :visible.sync="visible" title="新增" />
      <el-button type="primary" @click="$router.push('/employees/index')">打开</el-button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      visible: false
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
