<template>
  <Drawer
    v-model="isShow"
    :title="title+' - 指标设置'"
    inner
    scrollable
    :transfer="false"
    :mask-closable="true"
    placement="right"
    :width="300"
  >
    <div v-if="collapseValue.length === 0">还未有关联指标！请在相应资源类中添加。</div>
    <Collapse v-else simple :value="collapseValue">
      <Panel v-for="group in kpis" :name="group.name" :key="group.name">
        <span class="panel-title">{{group.name}}</span>
        <div slot="content">
          <Checkbox
            v-model="kpi.checked"
            @on-change="onKpiChanged(kpi)"
            v-for="kpi in group.value"
            :key="kpi.id"
            :label="kpi.kpiKey"
          >
            <span>{{kpi.kpiName}}</span>
          </Checkbox>
        </div>
      </Panel>
    </Collapse>
    <ButtonGroup style="width: 100%;">
      <Button style="width: 50%; margin: 12px 0;" type="primary" ghost @click="hide()">取消</Button>
      <Button
        v-if="collapseValue.length > 0"
        style="width: 50%; margin: 12px 0;"
        type="primary"
        @click="save"
      >保存</Button>
    </ButtonGroup>
  </Drawer>
</template>

<script>
export default {
  props: ["graph"],
  data() {
    return {
      isShow: false,
      title: "",
      bindCell: {},
      reuseClasss: [], //复用类
      kpis: [],
      collapseValue: []
    };
  },
  computed: {
    resClasses() {
      return _.cloneDeep(this.$store.state.resClass.list);
    }
  },
  methods: {
    show(cell) {
      const cellData = _.get(cell, "data", {});
      this.title = cellData.label;
      this.bindCell = cell;
      this.queryKpis(cellData);
    },
    hide() {
      this.isShow = false;
    },

    //查询指标信息
    queryKpis(cellData) {
      const resourceClassId = _.get(cellData, "bindData.resource_class_id", 0);
      //根据资源类id获取资源实例
      if (resourceClassId) {
        const id = parseInt(resourceClassId);
        this.$http({
          method: "POST",
          url: "resource/v1/resource/commandTemplates/list",
          data: {
            searchParas: {
              conditions: [{ name: "resourceClassId", op: "eq", value: id }]
            }
          },
          showSpin: false
        }).then(result => {
          const cmds = _.get(result, "list", []);
          const kpis = _.uniqBy(_.compact(_.map(cmds, "kpi")), "id");
          const subCells = this.graph.model.getChildren(this.bindCell);
          //检测是否已选
          kpis.forEach(kpi => {
            const find = _.find(subCells, { id: kpi.kpiKey });
            kpi.checked = find ? true : false;
          });
          const grouped = _.groupBy(kpis, "kpiType");
          const groupKpis = [];
          const keys = _.keys(grouped);
          keys.forEach(key => {
            groupKpis.push({
              name: key,
              value: grouped[key]
            });
          });
          this.kpis = groupKpis;

          //默认全展开
          this.$nextTick(() => {
            this.collapseValue = keys;
          });

          this.isShow = true;
        });
      }
    },

    onKpiChanged(v) {
      console.log("TCL: onKpiChanged -> v", v);
      //先定位是否已存在
      // const find = this.graph.model.getCell(v.kpiKey);
      // console.log("TCL: onKpiChanged -> find", find);
      // if (find && !v.checked) {
      //   //取消则删除掉
      //   this.graph.model.remove(find);
      // }

      // if (!find && v.checked) {
      //   this.addPmKpi(this.bindCell, [v]);
      // }
    },

    //先删除已有指标
    removeCellKpis(cells) {
      cells.forEach(cell => this.graph.model.remove(cell));
    },

    save() {
      const cell = this.graph.getSelectionCell();

      const flattenKpis = _.flatten(_.map(this.kpis, "value"));
      const checkedKpis = _.filter(flattenKpis, v => v.checked);

      const subCells = this.graph.model.getChildren(cell);
      const kpiCells = _.filter(subCells, v => _.get(v, "data.isKpi", false));
      this.removeCellKpis(kpiCells);

      const pmKpis = _.filter(checkedKpis, { kpiType: "PM" });
      const cmKpis = _.filter(checkedKpis, { kpiType: "CM" });
      const ctmKpis = _.filter(checkedKpis, { kpiType: "CTM" });

      this.graph.getModel().beginUpdate();
      try {
        this.addPmKpi(cell, pmKpis);
        this.addCmKpi(cell, cmKpis);
        this.addCtmKpi(cell, ctmKpis);
        this.graph.setCellStyles("foldable", 0, this.graph.getSelectionCells());
      } finally {
        this.graph.getModel().endUpdate();
      }

      this.hide();
      // this.$emit("bind-success", cell);
    },

    addPmKpi(cell, pmKpis) {
      const { width: cellWidth, height: cellHeight } = cell.geometry;
      const style =
        "rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=10;align=left;spacingLeft=4";
      pmKpis.forEach((kpi, i) => {
        // const width = kpi.kpiName.length * 12 + 40;
        const width = 100;
        const kpiCell = this.graph.insertVertex(
          cell,
          kpi.kpiKey,
          `${kpi.kpiName}:`,
          0,
          0,
          width,
          20,
          style,
          true
        );

        kpiCell.geometry.offset = new mxPoint(
          -(width - cellWidth) / 2,
          -24 * (i + 1)
        );
        kpiCell.setConnectable(false);
        kpiCell.data = {
          kpi,
          isKpi: true,
          id: _.get(cell, "data.bindData.id", "")
        };
      });
      this.graph.setCellStyles("foldable", 0, cell);
    },
    addCmKpi(cell, cmKpis) {
      const { width: cellWidth, height: cellHeight } = cell.geometry;
      const style =
        "rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=10;align=left;spacingLeft=4";
      cmKpis.forEach((kpi, i) => {
        const width = 100;
        const kpiCell = this.graph.insertVertex(
          cell,
          kpi.kpiKey,
          `${kpi.kpiName}:`,
          0,
          1,
          width,
          20,
          style,
          true
        );
        kpiCell.geometry.offset = new mxPoint(
          -(width - cellWidth) / 2,
          24 * (i + 1)
        );
        kpiCell.setConnectable(false);
        kpiCell.data = {
          kpi,
          isKpi: true,
          id: _.get(cell, "data.bindData.id", "")
        };
      });
    },
    addCtmKpi(cell, ctmKpis) {
      const style =
        "rounded=1;whiteSpace=wrap;html=1;fillColor=#fff;strokeColor=#fff;fontSize=10;align=left;spacingLeft=0;spacingTop=0;";
      ctmKpis.forEach((kpi, i) => {
        const width = 60;
        const kpiCell = this.graph.insertVertex(
          cell,
          kpi.kpiKey,
          `<button style="width:${width}px" class="graph-cmd-btn blue">${
            kpi.kpiName
          }</button>`,
          1,
          0,
          width,
          20,
          style,
          true
        );
        kpiCell.geometry.offset = new mxPoint(6, 24 * i);
        kpiCell.setConnectable(false);
        kpiCell.data = {
          kpi,
          isKpi: true,
          id: _.get(cell, "data.bindData.id", "")
        };
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/styles/theme";

.bind-item {
  padding: 5px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-select {
    background: @primary-color;
    color: white;
  }
}
</style>
