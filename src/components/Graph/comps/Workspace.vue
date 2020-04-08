<template>
  <div>
    <div class="workspace" id="workspace"></div>
    <GraphInfoDraw
      v-show="infoType==='graph'"
      ref="graphInfoDraw"
      @back="$emit('back')"
      @up="$emit('up')"
      @on-save="$emit('on-save', $event)"
      @transfer-parking-lot="(v) => parkingLot = v"
      :parkingLot="parkingLot"
      :graph="graph"
      :navItem="item"
      :show="showInfo"
    />
    <VertexInfoDraw
      v-if="infoType ==='vertex'"
      ref="vertexInfoDraw"
      :graph="graph"
      :group="item"
      @on-edit="onEdit"
      @on-bind="onBind"
      @on-unbind="onUnBind"
      @save-success="onSaveSuccess"
    />
    <EdgeInfoDraw
      v-else-if="infoType ==='edge'"
      ref="edgeInfoDraw"
      :graph="graph"
      :group="item"
      @on-edit="onEdit"
      @on-bind="onBind"
      @on-unbind="onUnBind"
      @open-portlayer="() => {showInfo = true}"
    />
    <InstanceBindDraw
      ref="instanceBindDraw"
      :graph="graph"
      :item="item"
      :hasParent="hasParent"
      @create-instance="onCreateInstance"
      @bind-success="onBindSuccess"
    />
    <InstanceKpiDraw
      ref="instanceKpiDraw"
      :graph="graph"
      @create-instance="onCreateInstance"
      @bind-success="onBindSuccess"
    />
    <AlarmModel
      ref="alarmModel"
      :graph="graph"
      @create-instance="onCreateInstance"
      @bind-success="onBindSuccess"
    />
    <InstanceEditDraw
      ref="instanceEditDraw"
      :graph="graph"
      :item="item"
      :parkingLot="parkingLot"
      @save-success="onSaveSuccess"
      @on-delete-instance="onDeleteInstance"
    />
    <PortCmdDraw ref="portCmdDraw" :graph="graph" />
    <AfterCreateEdgePoptip ref="acep" :graph="graph" @add-vertex="afterEdgeAddVertex" />
    <LayerManager ref="layerManager" :graph="graph" />
    <SpaceAreaDraw ref="spaceAreaDraw" @on-draw-area-finish="$emit('on-finish-draw')" />
  </div>
</template>

<script>
import Graph from "./core/EditGraph";
import GraphInfoDraw from "./draws/GraphInfoDraw";
import InstanceBindDraw from "./draws/InstanceBindDraw";
import InstanceEditDraw from "./draws/InstanceEditDraw";
import VertexInfoDraw from "./draws/VertexInfoDraw";
import EdgeInfoDraw from "./draws/EdgeInfoDraw";
import InstanceKpiDraw from "./draws/InstanceKpiDraw";
import PortCmdDraw from "./draws/PortCmdDraw";
import AfterCreateEdgePoptip from "./widgets/AfterCreateEdgePoptip";
import LayerManager from "./widgets/LayerManager";
import SpaceAreaDraw from "./draws/SpaceAreaDraw";
import AlarmModel from "./draws/AlarmModel";
export default {
  props: ["item"],
  components: {
    GraphInfoDraw,
    InstanceBindDraw,
    InstanceEditDraw,
    VertexInfoDraw,
    EdgeInfoDraw,
    InstanceKpiDraw,
    PortCmdDraw,
    AfterCreateEdgePoptip,
    LayerManager,
    SpaceAreaDraw,
    AlarmModel
  },
  data() {
    return {
      graph: null,
      list: [],
      data: {},
      infoType: "graph",
      showInfo: true,
      hasParent: false,

      //特殊处理
      parkingLot: {} //停车场实例，地下空间进来时会生成或获取相关的停车场实例
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    resClasses() {
      return this.$store.state.resClass.list;
    }
  },
  methods: {
    getGraph() {
      return this.graph;
    },

    init() {
      const container = document.querySelector(".workspace");
      const graph = (this.graph = new Graph(container));

      graph.addListener("click", this.onGraphClick);
      this.$refs.spaceAreaDraw.initGraph(graph);

      graph.addListener("addCells", this.onCellAdded);

      //实例绑定
      graph.addListener("bindResourceInstance", this.onBindResourceInstance);
      //设置指标
      graph.addListener("setKpi", this.onSetKpi);
      //下钻
      graph.addListener("drillCell", this.onDrill);
      //端子层
      graph.addListener("openPortLayer", this.onOpenPortLayer);
      //阈值设置
      graph.addListener("setAlarm", this.onSetAlarm);
      //复制
      graph.addListener("copyPasteEnd", this.onReSelect);

      var mouseListener = {
        //比click精确，拖拽图标松开时click事件最后不会选中被拖拽的图标。
        mouseDown: this.onGraphMouseDown,
        mouseMove: function(sender, me) {},
        mouseUp: function(sender, me) {}
      };
      graph.addMouseListener(mouseListener);

      graph.addListener("cellsMoved", this.onCellsMoved);
      graph.addListener("cellsResized", this.onCellsResized);
      graph.addListener("saveGraph", () => {
        this.$refs.graphInfoDraw.save();
      });
    },

    initData(v) {
      this.data = v;
      this.$refs.graphInfoDraw.init(v);
      this.graph.loadXML(v.fileData);

      //针对楼层，如果有背景图默认加载进来
      const initBgImg = _.get(this.item, "base_svg", null);
      if (initBgImg && !this.data.id) {
        const img = initBgImg.split("|")[1];
        this.$nextTick(() => this.graph.setBgImg(img));
      }

      //如果有父级，需要过滤父资源类的组成关系
      if (v.parentId && v.resourceClassId) {
        this.hasParent = true;
      } else {
        this.hasParent = false;
      }
    },

    hideDraws() {
      if (this.$refs.edgeInfoDraw) {
        this.$refs.edgeInfoDraw.hide();
      }
      if (this.$refs.vertexInfoDraw) {
        this.$refs.vertexInfoDraw.hide();
      }
    },

    //下钻有端子获取设备下的端子实例
    //根据设备获取端子列表
    fetchPortByDevice(item) {
      console.log("TCL: fetchPortByDevice -> item", item);
      this.$http({
        method: "post",
        url: "execution/v1/execution/businessSqls/execBusinessSql",
        data: {
          keyName: "getTerminalByDeviceId",
          params: {
            device_id: item.id
          }
        }
      }).then(result => {
        const portResClass = _.find(this.resClasses, { keyName: "terminals" });
        const itemResClass = _.find(this.resClasses, {
          keyName: item.parent_resource_class_keyname
        });
        this.graph.initPortDevices(
          result.list,
          portResClass,
          item,
          itemResClass
        );
      });
    },

    setReuseClasss(relateReuses) {
      this.$refs.instanceBindDraw.setReuseClasss(relateReuses);
    },

    expandAttributePanel(v) {
      this.showInfo = v;
    },

    toggleLayer() {
      this.$refs.layerManager.toggle();
    },

    onCellAdded(sender, evt) {
      if (_.get(this.graph, "drawAreaMode", false)) return;
      const cell = evt.properties.cells[0];
      console.log("TCL: onCellAdded -> cell", cell);

      const style = this.graph.getCellStyle(cell);

      //设备下钻后自带动的端子添加时不需要选中。
      const dontSet = style.dontSet;
      //假如不是默认层则不响应
      if (!this.graph.isDefaultLayerShow() || dontSet) {
        // this.infoType = "graph";
        return;
      }

      if (cell.vertex) {
        if (cell.children) {
          //群组
        } else {
          //节点
          this.infoType = "vertex";
          this.$nextTick(() => {
            this.$refs.vertexInfoDraw.setItem(cell);
            // this.graph.bindResourceInstance(cell);
          });
        }
      } else if (cell.edge) {
        if (!cell.style) {
          cell.style =
            "shape=none;noLabel=1;rounded=0;curved=0;startArrow=none;endArrow=none;html=1;edgeStyle=straight;strokeWidth=2;";
        }

        //判断是否是资源类连线
        const isBizEdge = _.get(cell, "data.resourceClassId", false);
        if (isBizEdge) {
          this.infoType = "edge";
          this.$nextTick(() => {
            this.$refs.edgeInfoDraw.setItem(cell);
            // this.graph.bindResourceInstance(cell);
          });
        }

        const sourceHasResClass = _.get(
          cell.source,
          "data.resourceClassId",
          false
        );

        if (sourceHasResClass && !cell.target) {
          //如果连线没有连到节点上，则添加连线后弹出选择框
          const { offsetX, offsetY } = sender.lastEvent;
          this.$refs.acep.show(cell, offsetX, offsetY);
        }
      }
    },
    onGraphClick(sender, evt) {
      this.$refs.spaceAreaDraw.checkDraw(evt);
    },

    onGraphMouseDown(sender, evt) {
      if (this.graph.drawLineMode || this.graph.drawAreaMode) return;
      if (!_.get(this.graph, "drawAreaMode", false)) {
        this.expandAttributePanel(true);

        // const sm = this.graph.getSelectionModel();
        const cell = _.get(evt, "state.cell", undefined); // evt.getProperty("cell");
        console.log("TCL: onGraphClick -> cell", cell);

        //处于摄像头关联车位模式下，只能选择车位
        if (this.graph.cameraRelateParkingSpaceMode) {
          const keyName = _.get(
            cell,
            "data.bindData.parent_resource_class_keyname",
            ""
          );
          //假如点击的是车位，进行管理起来
          if (keyName == "parking_space") {
            this.$refs.vertexInfoDraw.setPickParkingSpaces(cell);
          }
          return;
        }

        //假如不是默认层则不响应
        if (!this.graph.isDefaultLayerShow()) {
          this.infoType = "graph";
          const isPort = _.get(cell, "data.isPort", false);
          if (isPort) {
            //如果是端子，则让选择指令模板
            this.$nextTick(() => {
              this.$refs.portCmdDraw.show(cell);
            });
          }
          return;
        }

        if (!cell) {
          this.infoType = "graph";
          if (this.$refs.vertexInfoDraw) {
            this.$refs.vertexInfoDraw.clearCameraParkingSpace();
          }
        } else if (cell.vertex) {
          this.infoType = "vertex";
          // this.graph.connectionHandler.constraintHandler.reset();
          // const incomingEdges = this.graph.getIncomingEdges(cell);
          // const outgoingEdges = this.graph.getOutgoingEdges(cell);
          // console.log("TCL: onGraphClick -> outgoingEdges", outgoingEdges);
          // outgoingEdges.forEach(cell => {
          //   console.log("cell state is", this.graph.view.getState(cell));
          // });

          // this.graph.highlightCells(outgoingEdges);
          this.$nextTick(() => {
            this.$refs.vertexInfoDraw.setItem(cell);
          });
        } else if (cell.edge) {
          this.infoType = "edge";
          this.$nextTick(() => {
            this.$refs.edgeInfoDraw.setItem(cell);
          });
        }
      } else {
        this.expandAttributePanel(false);
        this.infoType = "";
        this.hideAllPane();
      }
    },

    onCellsMoved(sender, evt) {
      const cells = evt.getProperty("cells");
      if (cells.length === 1 && cells[0].vertex) {
        if (this.$refs.vertexInfoDraw) {
          //如果是节点，更新一下位置信息
          this.$refs.vertexInfoDraw.updatePosition(cells[0].geometry);
        }
      }
    },

    onCellsResized(sender, evt) {
      const cells = evt.getProperty("cells");
      if (cells.length === 1 && cells[0].vertex) {
        if (this.$refs.vertexInfoDraw) {
          //如果是节点，更新一下尺寸信息
          this.$refs.vertexInfoDraw.updateSize(cells[0].geometry);
        }
      }
    },

    //cell绑定资源实例
    onBindResourceInstance(sender, evt) {
      const cell = evt.getProperty("cell");
      const cellData = _.get(cell, "data", {});
      this.$refs.instanceBindDraw.show(cellData);
    },

    //绑定成功后刷新信息面板
    onBindSuccess(cell) {
      if (cell.vertex) {
        this.$refs.vertexInfoDraw.setItem(cell);
      } else if (cell.edge) {
        this.$refs.edgeInfoDraw.setItem(cell);
      }
    },

    //删除实例后同时绑定的cell也需要重置
    onDeleteInstance(item) {
      this.onUnBind();
    },

    onUnBind() {
      this.$refs.instanceBindDraw.unBind();
    },

    //设置指标
    onSetKpi(sender, evt) {
      const cell = evt.getProperty("cell");
      this.$refs.instanceKpiDraw.show(cell);
    },

    markAndSave() {
      //标记并保存当前拓扑
      this.$refs.graphInfoDraw.markAndSave();
    },

    onDrill(sender, evt) {
      const cell = evt.getProperty("cell");
      const cellData = _.get(cell, "data.bindData", {});
      this.$emit("drill", cellData);
      if (this.$refs.vertexInfoDraw) {
        this.$refs.vertexInfoDraw.hide();
      }
      this.infoType = "graph";
    },

    onOpenPortLayer(sender, evt) {
      this.$refs.graphInfoDraw.hideDefaultLayer();
    },

    //创建资源实例
    onCreateInstance(resClass) {
      this.$refs.instanceEditDraw.add(resClass);
    },

    //新建实例并绑定
    onSaveSuccess(v) {
      this.$refs.instanceBindDraw.saveAndBind(v);
    },

    //信息面板发出的绑定事件
    onBind(cell) {
      const cellData = _.get(cell, "data", {});
      this.$refs.instanceBindDraw.show(cellData);
    },

    onEdit(cell, resClass) {
      const cellData = _.get(cell, "data", {});
      this.$refs.instanceEditDraw.edit(cellData, resClass);
    },

    afterEdgeAddVertex(resClass) {},

    hideAllPane() {
      if (this.$refs.edgeInfoDraw) this.$refs.edgeInfoDraw.hide();
      if (this.$refs.vertexInfoDraw) this.$refs.vertexInfoDraw.hide();
      if (this.$refs.instanceBindDraw) this.$refs.instanceBindDraw.hide();
      if (this.$refs.instanceKpiDraw) this.$refs.instanceKpiDraw.hide();
      if (this.$refs.alarmModel) this.$refs.alarmModel.hide();

      if (this.$refs.portCmdDraw) this.$refs.portCmdDraw.hide();
      if (this.$refs.acep) this.$refs.acep.hide();
      this.infoType = "";
    },
    //设定阈值
    onSetAlarm(sender, evt) {
      const cell = evt.getProperty("cell");
      this.$refs.alarmModel.show(cell);

      // this.hideAllPane();
      // const cellData = _.get(cell, "data", {});
      // this.$refs.alarmModel.show(cellData);
    },
    onReSelect() {
      this.$refs.vertexInfoDraw.setItem(this.graph.getSelectionCells()[0]);
    },
    //绘制状态变化
    onDrawAreaState(v) {
      this.$refs.spaceAreaDraw.onDrawAreaState(v);
    }
  },
  beforeDestroy() {
    this.graph.removeListener("click", this.onGraphClick);

    this.graph.removeListener("addCells", this.onCellAdded);

    //实例绑定
    this.graph.removeListener(
      "bindResourceInstance",
      this.onBindResourceInstance
    );
    //设置指标
    this.graph.removeListener("setKpi", this.onSetKpi);
    //下钻
    this.graph.removeListener("drillCell", this.onDrill);
    //端子层
    this.graph.removeListener("openPortLayer", this.onOpenPortLayer);
    //阈值设置
    this.graph.removeListener("setAlarm", this.onSetAlarm);

    this.graph.destory();

    this.graph = null;
  }
};
</script>
<style lang="less" scoped>
@import "../styles/workspace.less";
</style>
