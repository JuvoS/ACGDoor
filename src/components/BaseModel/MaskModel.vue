<template>
  <div class="mask" v-if="value" @click="onClickMask">
    <div class="mask-close" @click="onCloseMask">关闭</div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    maskclosable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClickMask() {
      if (this.maskclosable) this.onCloseMask();
    },
    onCloseMask() {
      this.$emit("input", !this.value);
    }
  }
};
</script>

<style lang="less" scoped>
.mask {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
  z-index: 99;
  &-close {
    color: #fff;
    margin: 10px 20px;
    float: right;
    text-align: center;
    position: absolute;
    right: 0;
  }
}
</style>
