<template>
  <el-dialog
    custom-class="uq-dialog-custom"
    :title="$slots.title ? '' : title"
    :visible.sync="show"
    :width="width"
    :append-to-body="appendToBody"
    :modal="modal"
    :close-on-click-modal="false"
    :fullscreen="fullscreen"
    :destroy-on-close="destroyOnClose"
    :modal-append-to-body="modalAppendToBody"
    :before-close="handleClose"
    @open="open"
    @opened="opened"
    @close="close"
    @closed="closed"
  >
    <template v-if="$slots.title">
      <span slot="title">
        <slot name="title" />
      </span>
    </template>
    <slot />
    <span slot="footer" class="dialog-footer">
      <slot name="footer" />
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '提示'
    },
    appendToBody: {
      // Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true
      type: Boolean,
      default: true
    },
    modalAppendToBody: {
      // 遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Dialog 的父元素上
      type: Boolean,
      default: true
    },
    modal: {
      // 是否需要遮罩层
      type: Boolean,
      default: true
    },
    fullscreen: {
      // 是否全屏
      type: Boolean,
      default: false
    },
    destroyOnClose: {
      // 关闭时销毁 Dialog 中的元素
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '30%'
    }
  },
  data() {
    return {
    }
  },
  computed: {
    show: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val) // visible 改变的时候通知父组件
      }
    }
  },
  methods: {
    handleClose(done) {
      // 关闭前回调
      this.$emit('beforeClose')
      done()
    },
    open() {
      // Dialog 打开的回调
      this.$emit('open')
    },
    opened() {
      // Dialog 打开动画结束时的回调
      this.$emit('opened')
    },
    close() {
      // Dialog 关闭的回调
      this.$emit('close')
    },
    closed() {
      // Dialog 关闭动画结束时的回调
      this.$emit('closed')
    }
  }
}
</script>

