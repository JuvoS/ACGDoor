<template>
  <section class="single" @scroll.passive="getScroll($event)">
    <header
      :class="{
        'single-header': true,
        'single-header-fixed': headerFixedStatus
      }"
    >
      <SingleHeader></SingleHeader>
    </header>
    <slot></slot>
  </section>
</template>
<script>
import SingleHeader from "./SingleHeader";
export default {
  components: {
    SingleHeader
  },
  data() {
    return {
      headerFixedStatus: false
    };
  },
  mounted() {},
  methods: {
    getScroll(event) {
      // 滚动条距离底部的距离scrollBottom
      let scrollBottom =
        event.target.scrollHeight -
        event.target.scrollTop -
        event.target.clientHeight;
      // if (this.finished && scrollBottom < 40) {
      //  操作
      // }

      console.log("scroll ->", event.target.scrollTop);
    }
  }
};
</script>
<style lang="less" scoped>
.single {
  position: relative;
  &-header {
    width: 100%;
    &-fixed {
      position: fixed;
      top: 0;
    }
  }
}
</style>
