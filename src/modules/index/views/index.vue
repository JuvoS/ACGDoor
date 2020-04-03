<template>
  <div style="width:100%;min-height:300px;">
    <!-- <SnowBoard style="width:100%;min-height:300px;"></SnowBoard> -->
    <!-- <VNavTab></VNavTab> -->

    <!-- <HeadBoxSuba></HeadBoxSuba> -->
    <div class="grid-color">
      <CardColor></CardColor>
      <CardColor></CardColor>
      <CardColor></CardColor>
    </div>
    <LoadingActiona></LoadingActiona>
  </div>
</template>

<script>
import ContentLoader from "@/components/ContentLoader";
import VNavTab from "@/components/BaseMenu/VNavTab";
import SnowBoard from "@/components/SnowBoard";
import LoadingActiona from "@/components/Loading/Actiona";
import HeadBoxSuba from "@/components/HeadBox/SubTitlea";
import CardColor from "@/components/Card/Color";
export default {
  props: {
    title: {
      type: String,
      default: "this"
    }
  },
  components: {
    ContentLoader,
    VNavTab,
    SnowBoard,
    LoadingActiona,
    HeadBoxSuba,
    CardColor
  }
};
</script>

<style lang="less" scoped>
.hovcard {
  height: 300px;
  display: grid;
  place-items: center;
}
.grid-color {
  display: grid;
  grid-template-columns: 33.3% 33.4% 33.3%;
  grid-row-gap: 50px;
}
</style>
