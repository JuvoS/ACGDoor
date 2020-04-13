<template>
  <section class="section-shaped my-0">
    <div class="shape shape-style-1 shape-default shape-skew">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="container pt-5">
      <div class="row flex-xl-nowrap mt-5">
        <div class="col-md-3 col-xl-2 bd-sidebar">siderbar</div>

        <div class="col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content">
          <div
            style="width:100%;min-height:300px;"
            class="row d-flex justify-content-center"
          >
            <div id="lottie" style="width:100%;height:300px;"></div>
            <br />
            <div>
              <p>Speed: x{{ animationSpeed }}</p>
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
        </div>
        <div class="col-xl-2 bd-toc">toc</div>
      </div>
    </div>
  </section>
</template>

<script>
import lottie from "lottie-web";
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
        path: "lottie/pinjump.json"
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
