<template>
  <div style="width: 100%; min-height: 300px;">
    <!-- <VNavTab></VNavTab> -->
    <!-- <header>
      <h1 class="title slide-bar">I'm alphardex.</h1>
      <p class="subtitle slide-bar">A CSS Wizard</p>
    </header>-->
    <TipCard title="测试pa">
      <div slot="pane">pane</div>
    </TipCard>
    <TipCard title="2D楼宇模型" center>
      <div slot="pane">
        <FloorBuildings style="width: 100%; height: 600px;"></FloorBuildings>
      </div>
    </TipCard>
    <TipCard title="雪花背景">
      <div slot="pane">
        <SnowBoard style="width: 100%; min-height: 300px;"></SnowBoard>
      </div>
    </TipCard>

    <TipCard title="色彩">
      <div slot="pane">
        <div class="grid-color">
          <CardColor></CardColor>
          <CardColor></CardColor>
          <CardColor></CardColor>
        </div>
      </div>
    </TipCard>

    <TipCard title="Lottie动效">
      <div slot="pane">
        <div id="lottie" style="width: 100%; height: 300px;"></div>
      </div>
    </TipCard>
  </div>
</template>

<script>
import ContentLoader from "@/components/ContentLoader";
import VNavTab from "@/components/BaseMenu/VNavTab";
import SnowBoard from "@/components/SnowBoard";
import LoadingActiona from "@/components/Loading/Actiona";
import HeadBoxSuba from "@/components/HeadBox/SubTitlea";
import CardColor from "@/components/Card/Color";

import lottie from "lottie-web";
import * as animationData from "./data.json";
export default {
  props: {
    title: {
      type: String,
      default: "this",
    },
  },
  components: {
    ContentLoader,
    VNavTab,
    SnowBoard,
    LoadingActiona,
    HeadBoxSuba,
    CardColor,
    TipCard: () => import("@/components/Card/TipPane"),
    FloorBuildings: () => import("@/components/Buildings/Floor"),
  },
  data() {
    return {
      defaultOptions: { animationData: animationData.default },
      animationSpeed: 1,
      anim: {},
    };
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim;
      console.log(anim); //这里可以看到 lottie 对象的全部属性
    },
  },
  mounted() {
    this.$nextTick(() => {
      var params = {
        container: document.getElementById("lottie"),
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: animationData.default,
      };
      var anim;
      anim = lottie.loadAnimation(params);
    });
  },
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
