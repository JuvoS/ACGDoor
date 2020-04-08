<template>
  <div class="content">
    <!-- <div class="content-card" :style=""></div> -->
    <div class="content-card"></div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      cardPos: [],
    };
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  min-height: 300px;
  position: relative;
  &-card {
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
    padding: 15px 20px;
    position: absolute;
  }
}
</style>
