<template>
  <div style="width:100%;min-height:300px;">
    <div id="lottie" style="width:100%;height:300px;"></div>
    <br />
    <div>
      <p>Speed: x{{animationSpeed}}</p>
      <input
        type="range"
        value="1"
        min="0"
        max="3"
        step="0.5"
        v-on:change="onSpeedChange"
        v-model="animationSpeed"
      />
    </div>
    <button v-on:click="stop">stop</button>
    <button v-on:click="pause">pause</button>
    <button v-on:click="play">play</button>
  </div>
</template>

<script>
import lottie from "lottie-web";
import * as animationData from "./data.json";
export default {
  props: {
    title: {
      type: String,
      default: "this"
    }
  },
  components: {},
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
    },

    stop: function() {
      this.anim.stop();
    },

    play: function() {
      this.anim.play();
    },

    pause: function() {
      this.anim.pause();
    },

    onSpeedChange: function() {
      this.anim.setSpeed(this.animationSpeed);
    }
  },
  mounted() {
    this.$nextTick(() => {
      var params = {
        container: document.getElementById("lottie"),
        renderer: "svg", //svg/canvas/html
        loop: true,
        autoplay: true,
        // animationData: animationData.default
        path: "./data.json"
      };
      var anim;
      anim = lottie.loadAnimation(params);
      this.handleAnimation(anim);
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
.grid-color {
  display: grid;
  grid-template-columns: 33.3% 33.4% 33.3%;
  grid-row-gap: 50px;
}
</style>
