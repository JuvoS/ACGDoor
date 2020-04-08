<template>
  <div class="live-cammera">
    <live-camera v-if="liveCameraOptions" :camera="liveCameraOptions"></live-camera>
  </div>
</template>
<script>
/**
 * ##区域列表##
 * **Props**
 *  + id; 摄像头资源ID
 * **API**
 *
 * **Event**
 *  + click; 点击
 *
 * @author Chorin <xiaolinxuan@foxmail.com>
 * @date 2019-10-31
 */
import LiveCamera from "@/views/bas/overview/comps/LiveCamera.vue";
export default {
  name: "LiveCameraView",
  components: {
    LiveCamera
  },
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  watch: {
    id: {
      immediate: true,
      handler(v) {
        v && this.getCameraInfo(v);
      }
    }
  },
  data() {
    return {
      liveCameraOptions: null
    };
  },
  methods: {
    /**
     * 获取摄像头信息
     */
    getCameraInfo(id) {
      this.$http({
        method: "get",
        url: `/ivmp/camera/${id}`
      }).then(result => {
        if (result) {
          this.liveCameraOptions = result;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>