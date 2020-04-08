<template>
  <div style="width: 100%;">
    <!-- <img-content></img-content>
    <img-content offset="right"></img-content> -->
    <!-- <TitleWrap></TitleWrap> -->
    <AutoHeader></AutoHeader>
    <!-- <BaseGraph ref="pregraph" style="width:100%;height:500px;"></BaseGraph> -->
  </div>
</template>

<script>
// import BaseGraph from "@/components/Graph/base";
export default {
  props: {
    title: {
      type: String,
      default: "this",
    },
  },
  components: {
    // ImgContent: () => import("@/components/ImgContent")
    TitleWrap: () => import("@/components/Title"),
    AutoHeader: () => import("@/components/BaseBoard/AutoHeader"),
    // BaseGraph,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="less" scoped></style>
