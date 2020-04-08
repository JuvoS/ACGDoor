<template>
  <div style="position: relative; width:100%; height: 100%;overflow: hidden;">
    <div class="preview"></div>
  </div>
</template>

<script>
import ProdGraph from "./comps/core/ProdGraph";
import mxgraph from "./comps/core/index.js";
const { mxOutline } = mxgraph;
export default {
  name: "HyzGraphPreview",
  data() {
    return {
      graph: null,
    };
  },

  mounted() {
    this.init();
  },
  methods: {
    init() {
      const container = document.querySelector(".preview");
      const graph = (this.graph = new ProdGraph(container));

      // graph.addListener("doubleClick", this.onGraphDblClick);
      this.graph.loadXML("xml/graph.xml");
    },
    initXML(xml) {
      this.graph.loadXML(xml);
    },
    initData(v, item) {
      this.data = v;
      this.item = item;
      if (item) {
        this.areas = _.filter(this.region, { parent_id: item.id });
      }

      const xml = _.get(v, "fileData", "");
      this.graph.loadXML(xml);
    },
    onBack() {
      this.showSearch = false;
      if (this.parentIds.length > 0) {
        this.fetchTopoFileById(this.parentIds[this.parentIds.length - 1]);
      }
    },
    //从编辑返回到呈现。默认还是编辑那层的视图
    onBackToShow() {},
    onGraphDblClick(sender, evt) {
      const cell = evt.getProperty("cell");
      const bindData = _.get(cell, "data.bindData", false);
      if (bindData) {
        this.fetchTopoFile(cell);
      }
    },

    //下钻
    fetchTopoFile(cell) {
      this.$http({
        method: "post",
        url: "resource/v1/topoFiles/list",
        data: {
          searchParas: {
            conditions: [
              {
                name: "resourceId",
                op: "eq",
                value: _.get(cell, "data.bindData.id", cell.id),
              },
            ],
          },
        },
        showSpin: true,
      }).then((result) => {
        const topData = _.get(result, "list[0]", null);
        if (topData) {
          this.parentIds.push(this.data.id);
          this.initData(topData);
        }
      });
    },

    //返回
    fetchTopoFileById(id) {
      this.$http({
        method: "get",
        url: `resource/v1/topoFiles/${id}`,
        showSpin: true,
      }).then((result) => {
        if (result) {
          this.parentIds = _.dropRight(this.parentIds);
          this.initData(result);
        }
      });
    },
    onEdit() {
      this.$emit("on-edit", this.data);
    },
    onCopy() {
      this.showCopyModal = true;
    },
    doCopy() {
      this.$http({
        method: "POST",
        url: `resource/v1/topoFiles/copyFloor`,
        data: {
          copyFloorId: this.item.id,
          copyBuildingId: this.item.parent_id,
          copyToFloorNumber: this.copyToFloor,
        },
        timeout: 60 * 1000, //最大1分钟等待时间
      })
        .then((result) => {
          this.$store.dispatch("region/fetch");
        })
        .finally(() => {
          this.$Message.warning("此操作需耗时8~10分钟，请耐心等待");
        });
    },
    onSearch() {
      this.showSearch = !this.showSearch;
      if (this.showSearch) {
        const cells = this.graph.model.cells;
        this.searchCells = _.filter(cells, (v) => v.value);
      }
    },
    doSearch(v) {
      const cell = this.graph.model.getCell(v);
      this.graph.setSelectionCell(cell);
    },
    mockAlarm() {
      const alarm = {
        id: "alarmid",
        objectId: "0b71ebe6c4b34b9ca0ab75584fa87065",
        severity: _.random(1, 4),
      };
      this.graph.addAlarm(alarm);
      // setTimeout(() => {
      //   this.graph.clearAlarm(alarm);
      // }, 2000);
    },
  },
  beforeDestroy() {
    this.graph.destory();
  },
};
</script>

<style lang="less" scoped>
@import "./styles/preview.less";
</style>
