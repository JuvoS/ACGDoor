<template>
  <div style="width: 100%;">
    <img-content></img-content>
    <img-content offset="right"></img-content>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "this"
    }
  },
  components: {
    ImgContent: () => import("@/components/ImgContent")
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="less" scoped>
</style>
