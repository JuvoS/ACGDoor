<template>
  <div id="toolbar">
    <div>
      <Tooltip placement="top" content="返回">
        <div class="my-cmd" @click="$emit('back')">
          <img src="static/imgs/toolbar/back.svg" />
        </div>
      </Tooltip>
      <span class="separator"></span>
      <Tooltip placement="top" content="导入">
        <Upload
          action
          :format="['xml']"
          accept=".xml"
          :show-upload-list="false"
          :before-upload="handleBeforeUpload"
        >
          <div class="my-cmd">
            <img src="static/imgs/toolbar/upload.svg" />
          </div>
        </Upload>
      </Tooltip>
      <Tooltip placement="top" content="导出">
        <div class="my-cmd" @click="graph.export()">
          <img src="static/imgs/toolbar/download.svg" />
        </div>
      </Tooltip>
      <span class="separator"></span>
      <Tooltip placement="top" content="放大">
        <div class="my-cmd" @click="graph.zoomIn()">
          <img src="static/imgs/toolbar/zoom_in.svg" />
        </div>
      </Tooltip>
      <Tooltip placement="top" content="缩小">
        <div class="my-cmd" @click="graph.zoomOut()">
          <img src="static/imgs/toolbar/zoom_out.svg" />
        </div>
      </Tooltip>
      <Tooltip placement="top" content="重置视图">
        <div class="my-cmd" @click="graph.resetView()">
          <img src="static/imgs/toolbar/reset.svg" />
        </div>
      </Tooltip>
      <span class="separator"></span>
      <Tooltip placement="top" content="撤销">
        <div class="my-cmd" @click="graph.undo()">
          <img src="static/imgs/toolbar/undo.svg" />
        </div>
      </Tooltip>
      <Tooltip placement="top" content="重做">
        <div class="my-cmd" @click="graph.redo()">
          <img src="static/imgs/toolbar/redo.svg" />
        </div>
      </Tooltip>
      <span class="separator"></span>
      <Tooltip placement="top" content="组合">
        <div class="my-cmd" @click="graph.group()">
          <img src="static/imgs/toolbar/group.svg" />
        </div>
      </Tooltip>
      <Tooltip placement="top" content="解组">
        <div class="my-cmd" @click="graph.ungroup()">
          <img src="static/imgs/toolbar/ungroup.svg" />
        </div>
      </Tooltip>
      <span class="separator"></span>
      <Tooltip placement="top" content="放置顶层">
        <div class="my-cmd" @click="graph.orderCells(false)">
          <img src="static/imgs/toolbar/bring_to_top.svg" />
        </div>
      </Tooltip>
      <Tooltip placement="top" content="放置底层">
        <div class="my-cmd" @click="graph.orderCells(true)">
          <img src="static/imgs/toolbar/bring_to_bottom.svg" />
        </div>
      </Tooltip>
      <span class="separator"></span>
      <Tooltip placement="top" content="左对齐">
        <div class="my-cmd" @click="graph.alignCells('left')">
          <img src="static/imgs/toolbar/align_left.svg" />
        </div>
      </Tooltip>
      <Tooltip placement="top" content="水平居中">
        <div class="my-cmd" @click="graph.alignCells('center')">
          <img src="static/imgs/toolbar/align_center.svg" />
        </div>
      </Tooltip>
      <Tooltip placement="top" content="右对齐">
        <div class="my-cmd" @click="graph.alignCells('right')">
          <img src="static/imgs/toolbar/align_right.svg" />
        </div>
      </Tooltip>
      <Tooltip placement="top" content="上对齐">
        <div class="my-cmd" @click="graph.alignCells('top')">
          <img src="static/imgs/toolbar/align_top.svg" />
        </div>
      </Tooltip>
      <Tooltip placement="top" content="垂直居中">
        <div class="my-cmd" @click="graph.alignCells('middle')">
          <img src="static/imgs/toolbar/align_middle.svg" />
        </div>
      </Tooltip>
      <Tooltip placement="top" content="下对齐">
        <div class="my-cmd" @click="graph.alignCells('bottom')">
          <img src="static/imgs/toolbar/align_bottom.svg" />
        </div>
      </Tooltip>
      <span class="separator"></span>
      <Poptip v-model="showLayout" trigger="hover" placement="bottom">
        <div class="my-cmd">
          <img src="static/imgs/toolbar/layout.svg" />
        </div>
        <div slot="content">
          <Button size="small" type="text" @click="doLayout('horizontalFlow')">水平布局</Button>
          <Button size="small" type="text" @click="doLayout('verticalFlow')">垂直布局</Button>
          <Button size="small" type="text" @click="doLayout('horizontalTree')">水平树</Button>
          <Button size="small" type="text" @click="doLayout('verticalTree')">垂直树</Button>
          <Button size="small" type="text" @click="doLayout('circle')">环形布局</Button>
        </div>
      </Poptip>
      <!-- <Poptip trigger="hover" title="快键键：">
        <div class="my-cmd">
          <img src="static/imgs/toolbar/help.svg">
        </div>
        <div slot="content">
          <p>delete: 删除选中元素</p>
          <p>ctrl+a: 全选</p>
          <p>ctrl+z: 回退</p>
        </div>
      </Poptip>-->
      <Tooltip placement="top" content="清空">
        <div class="my-cmd" @click="graph.clear()">
          <img src="static/imgs/toolbar/clear.svg" />
        </div>
      </Tooltip>
      <Tooltip placement="top" content="输出XML">
        <div class="my-cmd" @click="graph.logXml()">
          <img src="static/imgs/toolbar/xml.svg" />
        </div>
      </Tooltip>
      <Tooltip placement="top" content="上传背景图">
        <Upload
          class="my-cmd"
          ref="upload"
          :show-upload-list="false"
          accept="image/*, *.svg"
          :format="['jpg','jpeg','svg','png']"
          :max-size="20480"
          :headers="headers"
          name="files"
          :data="params"
          :before-upload="onBeforeUpload"
          :on-success="onIconUploadSuccess"
          :action="uploadUrl"
        >
          <img src="static/imgs/toolbar/bgimg.svg" />
        </Upload>
      </Tooltip>
      <Tooltip placement="top" content="画线模式">
        <div
          class="my-cmd"
          :style="{backgroundColor: enableDrawLine ? '#ddd' : 'transparent'}"
          @click="toggleDrawLine"
        >
          <img src="static/imgs/toolbar/drawline.svg" />
        </div>
      </Tooltip>
      <Tooltip placement="top" content="区域绘制">
        <div
          class="my-cmd"
          :style="{backgroundColor: enableDrawArea ? '#ddd' : 'transparent'}"
          @click="areaDraw"
        >
          <img src="static/imgs/toolbar/draw.svg" />
        </div>
      </Tooltip>
      <Tooltip placement="top" content="搜索元素">
        <div
          class="my-cmd"
          :style="{backgroundColor: showSearch ? '#ddd' : 'transparent'}"
          @click="toggleSerach"
        >
          <img src="static/imgs/toolbar/search.svg" />
        </div>
      </Tooltip>
      <span class="separator"></span>
      <Tooltip placement="top" content="批量绑定">
        <div class="my-cmd" @click="onBind">
          <img src="static/imgs/toolbar/bind.svg" />
        </div>
      </Tooltip>
      <Tooltip placement="top" content="批量解绑">
        <div class="my-cmd" @click="onUnBind">
          <img src="static/imgs/toolbar/unbind.svg" />
        </div>
      </Tooltip>
      <Tooltip placement="top" content="高亮未实例">
        <div
          class="my-cmd"
          :style="{backgroundColor: enableLightNoInstance ? '#ddd' : 'transparent'}"
          @click="lightNoInstance"
        >
          <img src="static/imgs/toolbar/light_instant.svg" />
        </div>
      </Tooltip>
      <Tooltip placement="top" content="隐藏元素">
        <div
          class="my-cmd"
          :style="{backgroundColor: enableHideState ? '#ddd' : 'transparent'}"
          @click="toggleHideCell"
        >
          <img src="static/imgs/toolbar/hide_cell.svg" />
        </div>
      </Tooltip>
      <span class="separator"></span>
      <!-- <Tooltip placement="top" content="图层">
        <div class="my-cmd" @click="$emit('toggle-layer')">
          <img src="static/imgs/toolbar/layer.svg">
        </div>
      </Tooltip>-->
      <Tooltip placement="top" content="保存(ctrl+shift+s)">
        <div class="my-cmd" @click="onSave">
          <img src="static/imgs/toolbar/save.svg" />
        </div>
      </Tooltip>
      <Tooltip placement="top" content="返回上级">
        <div class="my-cmd" @click="onBackUp">
          <img src="static/imgs/toolbar/up.svg" />
        </div>
      </Tooltip>
    </div>
    <div>
      <div v-if="isExpand" class="my-cmd" @click="onExpand(false)">
        <img src="static/imgs/toolbar/less.svg" />
      </div>
      <div v-else class="my-cmd" @click="onExpand(true)">
        <img src="static/imgs/toolbar/more.svg" />
      </div>
    </div>
    <Select
      v-show="showSearch"
      ref="search"
      filterable
      clearable
      @on-change="doSearch"
      prefix="ios-search"
      placeholder="按元素名称搜索"
      style="position:absolute; top: 50px; left: 280px;width: 200px;"
    >
      <Option
        v-for="item in searchCells"
        :label="item.value"
        :value="item.id"
        :key="item.id"
      >{{ item.value }}</Option>
    </Select>
    <div
      v-if="enableDrawLine"
      style="position:absolute; top: 35px; left: 275px;"
    >画线模式下右键完成画线。如果要退出画线模式，请先右键再点再点图标。</div>
    <Modal v-model="enableHideState" title="隐藏元素" :footer-hide="true">
      <div>
        <div v-if="cellGroup.length>0">
          <Divider>资源类</Divider>
          <div class="area-pane">
            <Checkbox
              :indeterminate="indeterminate"
              :value="checkAll"
              @click.prevent.native="handleCheckAll"
            >全选</Checkbox>
          </div>
          <CheckboxGroup v-model="hideCellGroup" @on-change="checkAllGroupChange">
            <Checkbox v-for="(item,key) in cellGroup" :key="key" :label="item">
              <span>{{item}}</span>
            </Checkbox>
          </CheckboxGroup>
        </div>
        <div v-if="handGroup.length>0">
          <Divider>手绘区域</Divider>
          <div class="area-pane">
            <Checkbox
              :indeterminate="indeterminateHand"
              :value="checkAllHand"
              @click.prevent.native="handleCheckHand"
            >全选</Checkbox>
          </div>
          <CheckboxGroup v-model="hideHandGroup" @on-change="checkHandGroupChange">
            <Checkbox v-for="(item,key) in handGroup" :key="key" :label="item">
              <span>{{item}}</span>
            </Checkbox>
          </CheckboxGroup>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import UID from "@tools/util/lib/uid";
import Timer from "@/utils/timer";
export default {
  props: ["isRoot"],
  data() {
    return {
      graph: null,
      isExpand: true,
      showSearch: false,
      searchKey: "",
      searchCells: [],

      showLayout: false,
      enableDrawLine: false,
      enableDrawArea: false,
      enableLightNoInstance: false,
      enableHideState: false,
      //icon上传参数
      params: {},
      cellGroup: [],
      areaGroup: [],
      handGroup: [],
      hideCellGroup: [],
      cellGroupAll: [],
      indeterminate: false,
      checkAll: false,
      indeterminateArea: false,
      checkAllArea: false,
      hideAreaGroup: [],
      indeterminateHand: false,
      checkAllHand: false,
      hideHandGroup: []
    };
  },
  computed: {
    headers() {
      return {
        Authorization: "Bearer " + this.$ls.get("TOKEN")
      };
    },
    uploadUrl() {
      return `${this.$config.http.baseURL}fileSystem/upload`;
    }
  },
  watch: {
    "graph.view.drawState": {
      handler(newValue, oldValue) {
        this.enableDrawArea = newValue;
      },
      deep: true
    },
    hideCellGroup(v) {
      this.hideWaitTime(false, "data.label", v);
    },
    hideAreaGroup(v) {
      this.hideWaitTime(true, "value", v);
    },
    hideHandGroup(v) {
      this.hideWaitTime(true, "value", v);
    }
  },
  methods: {
    initGraph(graph) {
      this.graph = graph;
    },
    handleBeforeUpload(v) {
      this.graph.import(v);
      return false;
    },
    onExpand(v) {
      this.isExpand = v;
      this.$emit("expand-changed", v);
    },
    closeLayout() {
      this.showLayout = false;
    },
    doLayout(type) {
      this.graph.doLayout(type);
    },
    onBeforeUpload(file) {
      this.params.name = file.name;
    },
    onIconUploadSuccess(v) {
      if (v.hyz_result) {
        const path = v.hyz_result.split("|")[1];
        this.graph.setBgImg(path, 800, 600);
      }
    },
    toggleDrawLine() {
      this.enableDrawLine = !this.enableDrawLine;
      this.graph.toggleDrawLine(this.enableDrawLine);
    },
    areaDraw() {
      this.enableDrawArea = !this.enableDrawArea;

      this.$emit("on-draw-area", this.enableDrawArea);

      if (this.enableDrawArea) {
        // this.graph.setPanning(false);
        this.graph.toggleDrawArea(this.enableDrawArea);
        // this.graph.setCellsSelectable(false); //禁用元素选中
      } else {
        this.graph.setCellsSelectable(true); //启用元素选中
        // this.graph.setPanning(true);

        //   // this.graph.drawAreaMode = false;
        this.$set(this.graph, "drawAreaMode", false);
        this.graph.lockGraph(false);
        this.graph.refresh();
      }
    },
    toggleHideCell() {
      if (this.graph && this.graph.getModel().cells) {
        this.enableHideState = !this.enableHideState;
        let cellArr = _.groupBy(
          _.values(this.graph.getModel().cells),
          "data.label"
        );

        this.cellGroupAll = cellArr;

        let keysCell = _.filter(_.keys(cellArr), o => {
          return o != "undefined" && o != "" && o != "区域";
        });
        let areaCell = _.filter(
          _.keys(_.groupBy(_.get(cellArr, "区域", ""), "value")),
          o => {
            return o != "undefined" && o != "";
          }
        );
        let handCell = _.filter(
          _.keys(_.groupBy(_.get(cellArr, "区域", ""), "value")),
          o => {
            return o != "undefined" && o != "" && o != "区域";
          }
        );

        this.areaGroup = areaCell;
        this.handGroup = handCell;
        this.cellGroup = keysCell;
      } else {
        this.$Message.warning("请刷新组态图");
      }
    },
    //按资源类过滤显示隐藏
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.hideCellGroup = this.cellGroup;
      } else {
        this.hideCellGroup = [];
      }
    },
    checkAllGroupChange(data) {
      let { indeterminateHand, checkHand } = this.getCheckHand(data);
      this.indeterminate = indeterminateHand;
      this.checkAll = checkHand;
    },
    //按手绘区域过滤显示隐藏
    handleCheckHand() {
      if (this.indeterminateHand) {
        this.checkAllHand = false;
      } else {
        this.checkAllHand = !this.checkAllHand;
      }
      this.indeterminateHand = false;

      if (this.checkAllHand) {
        this.hideHandGroup = this.handGroup;
      } else {
        this.hideHandGroup = [];
      }
    },
    checkHandGroupChange(data) {
      let { indeterminateHand, checkHand } = this.getCheckHand(data);
      this.indeterminateHand = indeterminateHand;
      this.checkAllHand = checkHand;
    },
    //处理过滤状态
    getCheckHand(data) {
      let indeterminateHand = false;
      let checkHand = false;
      if (data.length === 3) {
        indeterminateHand = false;
        checkHand = true;
      } else if (data.length > 0) {
        indeterminateHand = true;
        checkHand = false;
      }

      return { indeterminateHand, checkHand };
    },
    //等待执行显示隐藏操作
    hideWaitTime(state, type, cellType) {
      this.$Spin.show();
      Timer.inTheEnd().then(() => {
        this.hideByCellList(
          this.getCellByOp(state, "data.label", "区域", type, cellType)
        );
      });
    },
    //显示隐藏操作
    hideByCellList({ hideArr, showArr }) {
      this.graph.showCells(
        _.filter(showArr, o => {
          return !o.visible;
        })
      );
      this.graph.hideCells(
        _.filter(hideArr, o => {
          return o.visible;
        })
      );
      this.$Spin.hide();
    },
    //获取显示隐藏Cell组
    getCellByOp(state, type, typeLabel, cellLabel, cellType) {
      let hideArr = [];
      let showArr = [];
      if (this.graph && this.graph.getModel().cells) {
        _.values(this.graph.getModel().cells).forEach(cell => {
          if (state) {
            if (_.get(cell, type, "") == typeLabel) {
              if (_.includes(cellType, _.get(cell, cellLabel, ""))) {
                hideArr.push(cell);
              } else {
                showArr.push(cell);
              }
            }
          } else {
            if (_.get(cell, type, "") != typeLabel) {
              if (_.includes(cellType, _.get(cell, cellLabel, ""))) {
                hideArr.push(cell);
              } else {
                showArr.push(cell);
              }
            }
          }
        });
      }

      return { hideArr, showArr };
    },

    lightNoInstance() {
      if (this.graph.instantState) {
        this.graph.instantState = false;
      } else {
        this.graph.instantState = true;
      }
      this.enableLightNoInstance = this.graph.instantState;
      this.graph.lightInstantCells();
    },
    toggleSerach() {
      this.showSearch = !this.showSearch;
      if (this.showSearch) {
        const cells = this.graph.model.cells;
        this.searchCells = _.filter(cells, v => v.value);
      }
    },
    doSearch(v) {
      const cell = this.graph.model.getCell(v);
      this.graph.setSelectionCell(cell);
    },

    //组态图里只填编码/区域，然后拿到后端的实例，两者结合
    onBind() {
      const cells = Object.values(this.graph.model.cells);
      //未绑定且有编码的元素
      let data = { device: [], region: [], other: [] };
      let dataCells = [];
      cells.forEach(v => {
        if (this.graph.isCellVisible(v)) {
          //隐藏的元素不参与绑定
          const serial = _.get(v, "data.serial", null);
          const { region, regionName, regionFullId, regionFullName } = _.get(
            v,
            "data.region",
            {}
          );
          const bindData = _.get(v, "data.bindData", null);
          const tableName = _.get(v, "data.tableName", "");
          const isArea = tableName === "d_area_1";

          const isParkingRes =
            tableName === "d_parking_space_1" ||
            tableName === "d_parking_camera_1" ||
            tableName === "d_lpgs_two_dimension_code_1";

          if (serial) {
            if (isArea) {
              data.region.push({
                code: serial,
                region,
                regionName,
                regionFullId,
                regionFullName
              });
            } else if (isParkingRes) {
              data.other.push({
                tableName,
                uniqueKey: serial,
                region,
                regionName,
                regionFullId,
                regionFullName
              });
            } else {
              data.device.push({
                serial,
                region,
                regionName,
                regionFullId,
                regionFullName
              });
            }
            dataCells.push(v);
          }
          if (bindData) {
            if (isArea) {
              data.region.push({
                code: bindData.code,
                region: bindData.region,
                regionName: bindData.region_name,
                regionFullId: bindData.region_full_id,
                regionFullName: bindData.region_full_name
              });
            } else if (isParkingRes) {
              data.other.push({
                tableName,
                uniqueKey: bindData.unique_key,
                region: bindData.region,
                regionName: bindData.region_name,
                regionFullId: bindData.region_full_id,
                regionFullName: bindData.region_full_name
              });
            } else {
              data.device.push({
                serial: bindData.serial,
                region: bindData.region,
                regionName: bindData.region_name,
                regionFullId: bindData.region_full_id,
                regionFullName: bindData.region_full_name
              });
            }
            dataCells.push(v);
          }
        }
      });

      this.$http({
        method: "post",
        url: "resource/v1/device/bindInstances",
        data
      }).then(result => {
        if (result) {
          dataCells.forEach((cell, i) => {
            //已绑定实例
            const bindData = _.get(cell, "data.bindData", null);
            if (bindData) {
              const isArea = cell.data.tableName === "d_area_1";
              const isParkingRes =
                cell.data.tableName === "d_parking_space_1" ||
                cell.data.tableName === "d_parking_camera_1" ||
                cell.data.tableName === "d_lpgs_two_dimension_code_1";

              const serialCode = isArea
                ? "code"
                : isParkingRes
                ? "unique_key"
                : "serial";
              const instance = _.find(result, {
                [serialCode]: bindData[serialCode]
              });
              if (instance) {
                //如果有，则更新绑定
                cell.data.bindData = instance;
                cell.value = instance[serialCode] || instance.name;
                cell.id = instance.id;
              } else {
                //如果实例不再，则解绑
                cell.data.bindData = null;
                cell.setId(UID(1));
                cell.value = _.get(cell, "data.label", "未命名");
              }
            } else {
              const serial = _.get(cell, "data.serial", null);
              const isArea = cell.data.tableName === "d_area_1";
              const isParkingRes =
                cell.data.tableName === "d_parking_space_1" ||
                cell.data.tableName === "d_parking_camera_1" ||
                cell.data.tableName === "d_lpgs_two_dimension_code_1";

              const serialCode = isArea
                ? "code"
                : isParkingRes
                ? "unique_key"
                : "serial";
              const instance = _.find(result, {
                [serialCode]: serial
              });
              if (instance) {
                delete cell.data.serial;
                delete cell.data.region;
                cell.value = instance[serialCode] || instance.name;
                cell.data.bindData = instance;
                cell.id = instance.id;
              }
            }
          });
          this.graph.refresh();
        }
      });
    },

    //当前有实例的都解绑
    onUnBind() {
      const cells = Object.values(this.graph.model.cells);
      //未绑定且有编码的元素
      let data = { device: [], region: [] };
      let dataCells = [];
      cells.forEach(cell => {
        if (this.graph.isCellVisible(cell)) {
          const bindData = _.get(cell, "data.bindData", null);
          if (bindData) {
            //解绑后只保留编码
            //因为地域数据有可能错的
            cell.data.serial =
              cell.data.bindData.serial ||
              cell.data.bindData.code ||
              cell.data.bindData.unique_key;

            delete cell.data.region;

            this.$set(cell.data, "bindData", null);
            cell.setId(UID(1));
            this.graph.model.setValue(cell, cell.data.label);
          }
        }
      });
    },

    onSave() {
      this.hideCellGroup = [];
      this.hideAreaGroup = [];
      this.graph.save();
    },
    onBackUp() {
      this.indeterminate = false;
      this.checkAll = false;
      this.hideCellGroup = [];
      this.hideAreaGroup = [];
      this.$emit("up");
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/styles/theme";
#toolbar {
  z-index: 3;
  position: fixed;
  display: flex;
  user-select: none;
  justify-content: space-between;
  align-items: center;
  width: calc(~"100% - 48px");
  padding: 0 4px;
}
#toolbar *::before {
  font-size: 16px !important;
}
#toolbar .disable {
  color: #666;
}
#toolbar .icon-select.disable {
  background: #eeeeee;
}
#toolbar .separator {
  margin: 4px;
  padding-top: 8px;
  border-left: 1px solid fade(@primary-color, 50%);
}
#toolbar .command {
  width: 27px;
  height: 27px;
  margin: 0px 6px;
  border-radius: 2px;
  padding-left: 4px;
  display: inline-block;
  border: 1px solid rgba(2, 2, 2, 0);
}
#toolbar .command:nth-of-type(1) {
  margin-left: 24px;
}
#toolbar .command:hover {
  cursor: pointer;
  border: 1px solid fade(@primary-color, 50%);
}
#toolbar .disable:hover {
  cursor: default;
  border: 1px solid rgba(2, 2, 2, 0);
}

.my-cmd {
  width: 27px;
  height: 27px;
  margin: 0px 2px;
  margin-top: 4px;
  border-radius: 2px;
  display: inline-block;
  padding-top: 3px;
  text-align: center;
  border: 1px solid rgba(2, 2, 2, 0);
  &:hover {
    cursor: pointer;
    border: 1px solid fade(@primary-color, 50%);
  }
  img {
    width: 18px;
  }
}
.on-back {
  position: absolute;
  right: 24px;
  top: 10px;
}
.on-up {
  position: absolute;
  right: 110px;
  top: 10px;
}
.area-pane {
  border-bottom: 1px solid #e9e9e9;
  padding-bottom: 6px;
  margin-bottom: 6px;
}
</style>
