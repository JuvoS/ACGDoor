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
    // var animationData = {
    //   v: "5.6.7",
    //   fr: 25,
    //   ip: 0,
    //   op: 17,
    //   w: 1280,
    //   h: 720,
    //   nm: "AB",
    //   ddd: 0,
    //   assets: [
    //     { id: "image_0", w: 911, h: 1634, u: "images/", p: "img_0.png", e: 0 }
    //   ],
    //   layers: [
    //     {
    //       ddd: 0,
    //       ind: 1,
    //       ty: 2,
    //       nm: "mouth.png",
    //       cl: "png",
    //       refId: "image_0",
    //       sr: 1,
    //       ks: {
    //         o: { a: 0, k: 100, ix: 11 },
    //         r: {
    //           a: 1,
    //           k: [
    //             {
    //               i: { x: [0.833], y: [0.833] },
    //               o: { x: [0.167], y: [0.167] },
    //               t: 0,
    //               s: [23]
    //             },
    //             { t: 16, s: [0] }
    //           ],
    //           ix: 10
    //         },
    //         p: { a: 0, k: [640, 360, 0], ix: 2 },
    //         a: { a: 0, k: [455.5, 817, 0], ix: 1 },
    //         s: { a: 0, k: [30, 30, 100], ix: 6 }
    //       },
    //       ao: 0,
    //       ip: 0,
    //       op: 750,
    //       st: 0,
    //       bm: 0
    //     }
    //   ],
    //   markers: []
    // };
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
