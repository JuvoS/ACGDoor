<template>
  <div :class="{'boardmenu':!isMobile,'boardmenu-mobile':isMobile}">
    <!-- <div class="loading">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>-->
    <WaveLabel></WaveLabel>
    <WaveLabel delay="2"></WaveLabel>
  </div>
</template>
<script>
export default {
  props: {},
  components: {
    WaveLabel: () => import("@/components/Wave/Label")
  },
  data() {
    return {
      isMobile: false
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
    }
  }
};
</script>
<style lang="less" scoped>
.boardmenu {
  width: 80px;
  height: 100%;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;

  &-mobile {
    width: 100%;
    height: 50px;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
</style>

