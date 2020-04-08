<template>
  <Drawer
    v-model="isShow"
    :title="title+' - 阈值设置'"
    inner
    scrollable
    :transfer="false"
    :mask-closable="true"
    placement="right"
    :width="700"
  >
    <div>
      <div class="threshold" v-for="(alarm,index) in alarmArrList" :key="index">
        <div class="threshold-left">
          <Icon type="md-pulse" class="threshold-left-icon" />告警故障码:
          <Select v-model="alarm.alarmCode" style="width:120px">
            <Option
              v-for="(item) in alarmInfo.list"
              :value="item.errorCode"
              :label="item.errorCode"
              :key="'alarmStandardIndex_' + item.errorCode"
            >{{item.errorCode}}-{{item.title}}</Option>
          </Select>
        </div>
        <div class="threshold-right">
          <span class="threshold-right-title">条件关系:</span>
          <Select v-model="alarm.condType" class="threshold-right-cond">
            <Option
              v-for="item in condition.type"
              :value="item.value"
              :key="item.value"
            >{{ item.name }}</Option>
          </Select>
          <div class="threshold-right-inner">
            <div class="threshold-right-inner-pane" v-for="(cond,i) in alarm.condCompare" :key="i">
              <Select v-model="cond.cdpare" style="width: 100px;margin-right:5px;">
                <Option
                  v-for="item in condition.compare"
                  :value="item.value"
                  :key="item.value"
                >{{ item.name }}</Option>
              </Select>
              <Input
                v-model="cond.cdvalue"
                placeholder="请输入"
                style="width: 100px;margin-right:5px;"
              />
              <div class="threshold-right-icon">
                <Icon :size="18" type="md-add" @click="onAddCond(index)" v-if="cond.addState" />
                <Icon :size="18" type="md-close" @click="onDelCond(index,i)" v-if="cond.delState" />
              </div>
            </div>
          </div>
          <Icon class="threshold-icon" :size="24" type="md-close" @click="onDelAlarm(index)" />
        </div>
      </div>
      <Button @click="onAddAlarm" class="threshold-addbtn">增加阈值</Button>
    </div>

    <ButtonGroup style="width: 100%;">
      <Button style="width: 50%; margin: 12px 0;" type="primary" ghost @click="hide()">取消</Button>
      <Button style="width: 50%; margin: 12px 0;" type="primary" @click="save">保存</Button>
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

      alarmInfo: [],
      condition: {
        type: [
          { name: "and", value: "and" },
          { name: "or", value: "or" }
        ],
        compare: [
          { name: "大于", value: "gt" },
          { name: "大于等于", value: "ge" },
          { name: "小于", value: "lt" },
          { name: "小于等于", value: "le" },
          { name: "等于", value: "eq" },
          { name: "不等于", value: "noteq" }
        ]
      },
      alarmArrList: [
        // {
        //   alarmCode: "",
        //   condType: "",
        //   condCompare: [
        //     {
        //       cdpare: "",
        //       cdvalue: "",
        //       addState: true,
        //       delState: false
        //     }
        //   ]
        // }
      ],
      commandId: "",
      updateDelTemp: []
    };
  },
  mounted() {
    this.onFetchAlarmArr();
  },
  methods: {
    show(cell) {
      const cellData = _.get(cell, "data", {});
      this.title = cellData.label;
      this.bindCell = cell;
      this.queryKpiThresholds(cellData);
    },
    hide() {
      this.isShow = false;
    },
    onFetchAlarmArr() {
      if (this.alarmInfo.length === 0) {
        this.$http({
          method: "post",
          url: "resource/v1/resource/alarmStandards/list",
          data: {
            searchParas: {
              conditions: []
            }
          }
        })
          .then(result => {
            this.alarmInfo = result;
          })
          .catch(() => {});
      }
    },

    //查询指标信息
    queryKpiThresholds(cellData) {
      let commandId = _.get(cellData, "bindData.id", "");
      this.commandId = commandId;

      this.$http({
        method: "post",
        url: "resource/v1/resource/kpiThresholds/list",
        data: {
          searchParas: {
            conditions: [
              {
                name: "resourceId",
                op: "eq",
                value: commandId
              }
            ]
          }
        }
      }).then(res => {
        this.updateDelTemp = {
          kpiThresholdList: _.get(res, "list", []),
          id: commandId
        };

        let tmp = _.get(res, "list", []);
        let altmp = [];
        tmp.forEach(ele => {
          let rule = JSON.parse(ele.ruleInfo);
          let ruleInfo = [];
          for (var i = 0; i < rule.length; i++) {
            let m = {
              cdpare: rule[i].op,
              cdvalue: rule[i].value
            };
            if (i == 0) {
              m.addState = true;
            } else {
              m.delState = true;
            }
            ruleInfo.push(m);
          }
          altmp.push({
            id: ele.id,
            alarmCode: ele.alarmErrorCode,
            condType: ele.logic,
            condCompare: ruleInfo
          });
        });
        this.alarmArrList = altmp;
      });

      this.isShow = true;
    },
    onAddAlarm() {
      let alarmTmp = {
        alarmCode: "",
        condType: "",
        condCompare: [
          {
            cdpare: "",
            cdvalue: "",
            addState: true,
            delState: false
          }
        ]
      };
      this.alarmArrList.push(alarmTmp);
    },
    onDelAlarm(index) {
      this.alarmArrList.splice(index, 1);
    },
    onAddCond(index) {
      let cdTmp = {
        cdpare: "",
        cdvalue: "",
        addState: false,
        delState: true
      };
      this.alarmArrList[index].condCompare.push(cdTmp);
    },
    onDelCond(index, i) {
      this.alarmArrList[index].condCompare.splice(i, 1);
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
      let tmp = [];
      this.alarmArrList.forEach(ele => {
        let alarm = _.filter(this.alarmInfo.list, {
          errorCode: ele.alarmCode
        });
        let cmp = [];
        ele.condCompare.forEach(el => {
          cmp.push({ op: el.cdpare, value: el.cdvalue });
        });

        tmp.push({
          resourceId: this.commandId,
          alarmErrorCode: ele.alarmCode,
          alarmLevel: _.get(alarm, "[0].alarmLevel", "").toString(),
          logic: ele.condType,
          ruleInfo: JSON.stringify(cmp)
        });
      });

      _.merge(this.updateDelTemp.kpiThresholdList, tmp);
      let data = {
        resourceId: this.updateDelTemp.id,
        kpiThresholdList: tmp
      };

      this.$http({
        method: "post",
        url: "resource/v1/resource/kpiThresholds/batchadd",
        data: data
      })
        .then(() => {
          return this.$Message.success("保存成功");
        })
        .catch(() => {
          this.$Message.error("保存失败，请稍后再试！");
        });

      this.hide();
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
          `<button style="width:${width}px" class="graph-cmd-btn blue">${kpi.kpiName}</button>`,
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

.threshold {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 5px 0;
  &-left {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 220px;
    line-height: 30px;
    &-icon {
      line-height: 30px;
    }
  }
  &-right {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    &-title {
      width: 65px;
      text-align: center;
    }
    line-height: 30px;
    &-cond {
      width: 100px;
      margin-right: 5px;
    }
    &-inner {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      &-pane {
        width: 270px;
        margin-bottom: 5px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
      }
    }
    &-icon {
      line-height: 30px;
    }
  }
  &-icon {
    line-height: 30px;
    margin: 2px 0;
  }
  &-addbtn {
    padding: 5px auto;
    width: 100%;
    color: #03a9f4;
    background-color: transparent;
    border-color: #03a9f4;
    border-style: dashed;
  }
  &-footer {
    margin: 10px auto;
    text-align: right;
  }
}
</style>
