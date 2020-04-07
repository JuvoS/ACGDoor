<template>
  <div id="floorSvg" class="floor"></div>
</template>
<script>
import FloorPaneObj from "./d3/floorPane";
import * as d3 from "d3";
export default {
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      this.initFloor();
    });
  },
  methods: {
    initFloor() {
      document.getElementById("floorSvg").innerHTML = "";

      let floorPane = new FloorPaneObj();
      floorPane.init(
        "floorSvg",
        [
          ...this.floorInfoArr("B"),
          ...this.floorInfoArr("Q"),
          ...this.floorInfoArr("T2"),
          ...this.floorInfoArr("T1"),
          ...this.floorInfoArr("G"),
        ],
        (overRes) => {},
        (leaveRes) => {},
        (clickRes) => {},
        (dbclickRes) => {}
      );
    },
    floorInfoArr(code) {
      let arr = [];
      for (let i = 0; i < 10; i++) {
        if (code == "Q" && i > 4) continue;
        arr.push({
          id: code + "_" + i,
          floor: i,
          floorType: code,
        });
      }
      return arr;
    },
  },
};
</script>
<style lang="less" scoped>
.floor {
  width: 100%;
  height: 100%;
}
</style>
