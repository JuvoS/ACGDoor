<template>
  <div class="parking-space-view">
    <div class="space-pane">
      <div class="space-pane-info">
        <template v-if="!parkingSpaceInfo.vehiclePicture">- 暂无图像信息 -</template>

        &nbsp;&nbsp;&nbsp;&nbsp;{{ parkingSpaceInfo.licensePlateNumber }}
        &nbsp;&nbsp;&nbsp;&nbsp;{{ parkingSpaceInfo.parkingTime }}
        &nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      <div class="space-pane-img" v-if="parkingSpaceInfo.vehiclePicture">
        <img :src="parkingSpaceInfo.vehiclePicture" />
      </div>
    </div>
  </div>
</template>
<script>
/**
 * ##停车位信息##
 *
 * **Props**
 *   + parkingSpaceId; 车位ID
 *
 * **API**
 *
 * **Event**
 *   + on-ready; 车位信息加载完毕，返回车位信息
 *
 * @author Chorin <xiaolinxuan@foxmail.com>
 * @date 2019-12-05
 */
export default {
  name: "ParkingSpaceView",
  components: {},
  props: {
    parkingSpaceId: {
      type: String,
      default: ""
    }
  },
  watch: {
    parkingSpaceId: {
      immediate: true,
      handler(v) {
        if (v) {
          this.initView(v);
        }
      }
    }
  },
  data() {
    return {
      parkingSpaceInfo: {}
    };
  },
  methods: {
    /**
     * 初始化界面
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-05
     */
    initView(parkingSpaceId) {
      this.renderParkingSpaceInfo(parkingSpaceId);
    },

    /**
     * 渲染车位信息
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-05
     */
    renderParkingSpaceInfo(parkingSpaceId) {
      this.getParkingInfo(parkingSpaceId).then(info => {
        this.parkingSpaceInfo = info;
        this.$emit("on-ready", info);
      });
    },

    /**
     * 获取车位信息
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-05
     */
    async getParkingInfo(id) {
      console.log("fetchSpaceInfo->", id);
      let info = {};
      await this.$http({
        method: "GET",
        url: `lpgs/parkingSpace/${id}`,
        showSpin: false
      }).then(result => {
        info = result || {};
      });
      return info;
    }
  }
};
</script>
<style lang='less' scoped>
.parking-space-view {
  .space-pane {
    position: relative;
    width: 450px;
    &-img {
      display: flex;
      width: 100%;
      overflow: hidden;
      overflow-y: auto;
      background-color: #9e9e9e;
      > div {
        color: #f2f2f2;
      }

      img {
        margin: 0 auto;
        max-height: 30vw;
        max-width: 450px;
      }
    }
    &-info {
      position: absolute;
      bottom: 0;
      width: 100%;
      background: rgba(0, 0, 0, 0.8);
    }
  }
}
</style>
  