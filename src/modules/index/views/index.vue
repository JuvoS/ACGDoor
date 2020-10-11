<template>
  <div style="width: 100%;">
    <!-- <img-content></img-content>
    <img-content offset="right"></img-content>-->
    <!-- <TitleWrap></TitleWrap> -->
    <!-- <AutoHeader></AutoHeader> -->
    <!-- <BaseGraph ref="pregraph" style="width:100%;height:500px;"></BaseGraph> -->
    <!-- <MixanBoard style="width:100%;height:400px"></MixanBoard> -->
    <!-- <DrawDemo></DrawDemo> -->
    <div style="margin:10px">
    <BaseCrud edit >
      <template slot="tool" slot-scope="cell">
        <a-button type="primary" style="margin-left:5px" @click="onDo(cell)">操作</a-button>
      </template>
    </BaseCrud>
    </div>
  </div>
</template>

<script>
// import BaseGraph from "@/components/Graph/base";
export default {
  props: {
    title: {
      type: String,
      default: "this"
    }
  },
  components: {
    // ImgContent: () => import("@/components/ImgContent")
    TitleWrap: () => import("@/components/Title"),
    AutoHeader: () => import("@/components/BaseBoard/AutoHeader"),
    MixanBoard: () => import("@/components/BaseBoard/Mixan"),
    DrawDemo: () => import("@/components/Draw/Demo"),
    BaseCrud: () => import("@/components/BaseCrud")
    // BaseGraph,
  },
  data() {
    return {};
  },
  methods: {
    onDo(val){
      console.log("co ->",val);
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped></style>
