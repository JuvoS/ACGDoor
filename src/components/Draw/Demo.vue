<template>
  <div class="drawdemo">
    <div class="drawdemo-pane">
      <div class="drawdemo-area">
        <DrawArea
          ref="drawAreaAction"
          id="drawAreaAction"
          style="width:100%;height:100%;background:rgba(0,0,0,.6)"
          :initArea="choseAreaData"
          @monitor-area="onMonitorArea"
          @on-points="onPoints"
        ></DrawArea>
      </div>
      <div class="drawdemo-back">
        <img src="images/mas.png" style="width:100%;height:100%" />
      </div>
    </div>
    <div class="drawdemo-wrapper">
      <div class="drawdemo-wrapper-btn">
        <div class="drawdemo-wrapper-btn-item" @click="onChoseArea">开始</div>
        <div class="drawdemo-wrapper-btn-item" @click="onEditArea">编辑</div>
        <div class="drawdemo-wrapper-btn-item" @click="onFinishArea">完成</div>
        <div class="drawdemo-wrapper-btn-item" @click="clearPaint">清除</div>
        <div class="drawdemo-wrapper-btn-item" @click="onLeaveArea">取消</div>
      </div>
      <div class="drawdemo-btn-item">数据列</div>
      <div class="drawdemo-btn-info">
        <div v-for="(item,key) in points" :key="key">x:{{item.x}}} y:{{item.y}}</div>
      </div>
      <div class="drawdemo-btn-item">完成数据</div>
      <div class="drawdemo-btn-info">
        <div v-for="(item,key) in finishPoints" :key="key">x:{{item.x}}} y:{{item.y}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    DrawArea: () => import("./Area")
  },
  data() {
    return {
      choseAreaData: [
        { x: 200, y: 50 },
        { x: 400, y: 50 },
        { x: 400, y: 150 }
      ],
      points: [],
      finishPoints: []
    };
  },
  mounted() {},

  methods: {
    clearPaint() {
      this.$refs.drawAreaAction.clear();
    },
    onChoseArea() {
      this.onEditArea();
      this.clearPaint();
    },
    onEditArea() {
      document.getElementById("drawAreaAction").style.cursor = "crosshair";
    },
    //离开区域时光标状态重置
    onLeaveArea() {
      document.getElementById("drawAreaAction").style.cursor = "default";
      this.clearPaint();
    },
    //完成区域绘制
    onFinishArea() {
      if (this.$refs.drawAreaAction.drawState) {
        this.$refs.drawAreaAction.finish();
      }
    },
    //导出数据
    onMonitorArea(v) {
      console.log("area ->", v);
      this.finishPoints = v;
    },
    onPoints(v) {
      this.points = v;
    }
  }
};
</script>
<style lang="less" scoped>
.drawdemo {
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  &-area {
    position: absolute;
    width: 100%;
    height: 400px;
  }
  &-back {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  &-pane {
    position: relative;
    flex: 1;
    height: 100%;
  }
  &-wrapper {
    width: 300px;
    &-btn {
      display: flex;
      flex-direction: column;
      &-item {
        margin: 10px auto;
        cursor: pointer;
      }
    }
  }
}
</style>