<template>
  <div
    :class="{
      basicpane: true,
      'basicpane-wrapper': !isMobile,
      'basicpane-mwrapper': isMobile,
    }"
  >
    <BoardMenu style="background:#fff"></BoardMenu>
    <slot></slot>
  </div>
</template>
<script>
export default {
  components: {
    BoardMenu: () => import("./BoardMenu"),
  },
  data() {
    return {
      isMobile: false,
    };
  },
  mounted() {
    this.isMobile = this._isMobile();
  },
  methods: {
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
  },
};
</script>
<style lang="less" scoped>
.basicpane {
  width: 100%;
  height: 100vh;
  display: flex;
  &-wrapper {
    flex-direction: row;
  }
  &-mwrapper {
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    overflow-y: auto;
  }
}
</style>
