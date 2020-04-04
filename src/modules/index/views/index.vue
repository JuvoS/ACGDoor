<template>
  <div style="width:100%;min-height:300px;">
    <!-- <SnowBoard style="width:100%;min-height:300px;"></SnowBoard> -->
    <!-- <VNavTab></VNavTab> -->
    <!-- <header>
      <h1 class="title slide-bar">I'm alphardex.</h1>
      <p class="subtitle slide-bar">A CSS Wizard</p>
    </header> -->
    <lottie
      :options="defaultOptions"
      :height="720"
      :width="1280"
      v-on:animCreated="handleAnimation"
    />
    <div class="loading">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
    <div id="lottie" style="width:100%;height:300px;"></div>
  </div>
</template>

<script>
import ContentLoader from "@/components/ContentLoader";
import VNavTab from "@/components/BaseMenu/VNavTab";
import SnowBoard from "@/components/SnowBoard";
import lottie from "lottie-web";
import * as animationData from "./data.json";
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
    SnowBoard
  },
  data() {
    return {
      defaultOptions: { animationData: animationData.default },
      animationSpeed: 1,
      anim: {}
    };
  },
  methods: {
    handleAnimation: function(anim) {
      this.anim = anim;
      console.log(anim); //这里可以看到 lottie 对象的全部属性
    }
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
        animationData: animationData.default
      };
      var anim;
      anim = lottie.loadAnimation(params);
    });
  }
};
</script>

<style lang="less" scoped>
.hovcard {
  height: 300px;
  display: grid;
  place-items: center;
}
</style>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Lato");
@import url("https://fonts.googleapis.com/css?family=Lora:400,400i,700");

.slide-bar {
  position: relative;
  color: transparent;
  animation: fill-text-white 2s 1.6s forwards infinite;

  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #35b9f1;
    transform: scaleX(0);
    transform-origin: left;
    animation: slide-in-out 2s 3s cubic-bezier(0.75, 0, 0, 1) forwards infinite;
  }
}

@keyframes slide-in-out {
  50% {
    transform: scaleX(1);
    transform-origin: left;
  }

  50.1% {
    transform-origin: right;
  }

  100% {
    transform: scaleX(0);
    transform-origin: right;
  }
}

@keyframes fill-text-white {
  to {
    color: white;
  }
}

header {
  .title,
  .subtitle {
    width: 250px;
    height: 30px;
  }

  .title {
    margin: 0;
    font-family: Lora, serif;
    font-size: 32px;
    line-height: 30px;

    &::before {
      background: #ff4081;
    }
  }

  .subtitle {
    margin: 10px 0 0 0;
    font-family: Lato, sans-serif;
    font-size: 12px;
    line-height: 30px;
    letter-spacing: 5px;
    text-transform: uppercase;
    animation-delay: 3.2s;

    &::before {
      background: #03a9f4;
      animation-delay: 2s;
    }
  }
}
</style>
<style lang="scss" scoped>
.loading {
  $colors: #7ef9ff, #89cff0, #4682b4, #0f52ba, #000080;
  display: flex;
  animation-delay: 1s;

  .dot {
    position: relative;
    width: 2em;
    height: 2em;
    margin: 0.8em;
    border-radius: 50%;

    &::before {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      background: inherit;
      border-radius: inherit;
      animation: wave 2s ease-out infinite;
    }

    @for $i from 1 through 5 {
      &:nth-child(#{$i}) {
        background: nth($colors, $i);

        &::before {
          animation-delay: $i * 0.2s;
        }
      }
    }
  }
}

@keyframes wave {
  50%,
  75% {
    transform: scale(2.5);
  }

  80%,
  100% {
    opacity: 0;
  }
}
</style>
