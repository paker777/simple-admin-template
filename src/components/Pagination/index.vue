<template>
  <div class="pagination">
    <el-pagination
      background
      :page-sizes="pageSizes"
      :page-size.sync="size"
      :current-page.sync="current"
      :layout=" layout"
      :total="total"
      :disabled="disabled"
      class="right"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>

</template>

<script>
export default {
  name: 'Pagination',
  props: {
    // 每页显示条数
    pageSize: {
      type: [String, Number],
      default: 10
    },
    // 默认在第几页
    currentPage: {
      type: [String, Number],
      default: 1
    },
    // 总条数
    total: {
      type: [String, Number],
      default: 0
    },
    // 每页可选显示条数
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 50, 100]
      }
    },
    // 布局设计
    layout: {
      type: String,
      default: 'total,prev, pager, next, sizes'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    current: {
      get() {
        return this.currentPage
      },
      set(val) {
        this.$emit('update:currentPage', val) // 改变当前为第几页的值赋值给父组件
      }
    },
    size: {
      get() {
        return this.pageSize
      },
      set(val) {
        this.$emit('update:pageSize', val) // 改变当前页显示几条数据的值赋值给父组件
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pagination', { currentPage: 1, pageSize: val })
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { currentPage: val, pageSize: this.pageSize })
    }
  }
}
</script>
