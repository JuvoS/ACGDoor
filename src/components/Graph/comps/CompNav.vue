<template>
  <div class="compnav">
    <div class="nav-collapse">
      <div class="compnav-search">
        <div class="compnav-search-btn">
          <Input search placeholder="查找元素" style="width: 100%" @on-search="onSearchItem" />
        </div>
        <div class="compnav-search-pane" v-if="searchArr.length>0">
          <div class="nav-panel" id="searchPane">
            <div class="img-container" v-for="item in searchArr" :key="item.type">
              <div
                class="nav-drag-item"
                :title="item.label"
                v-bind="{width: item.topoWidth || 30,
                 height: item.topoHeight || 30, 
                 type: item.topoType || 'vertex', 
                 img: item.icon ? item.icon : 'static/imgs/graph/default.svg', 
                 label: item.objectName, 
                 keyName: item.keyName, 
                 rank: item.rank,
                 tableName: item.storageTableName, 
                 shapeStyle: item.shapeStyle,
                 resourceClassId: item.id,
                 itemType: item.type}"
              >
                <div class="text-omit">{{item.objectName}}</div>

                <img
                  ref="dragImg"
                  v-imgtrans
                  :src="item.icon ? item.icon : `static/imgs/graph/space/area.svg`"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Collapse simple v-model="collapseValue">
        <Panel name="general">
          <span class="panel-title">通用</span>
          <div slot="content" class="nav-panel">
            <div class="img-container" v-for="item in general" :key="item.type">
              <div
                class="nav-drag-item"
                style="height: 60px;"
                :title="item.label"
                v-bind="{width: item.width || 30,
                 height: item.height || 30, 
                 type: item.cellType || 'vertex', 
                 itemType: item.type,
                 shapeStyle: item.shapeStyle,
                 label: item.label}"
              >
                <img ref="dragImg" :src="`static/imgs/graph/general/${item.type}.svg`" />
                <!-- <div class="text-omit">{{item.label}}</div> -->
              </div>
            </div>
          </div>
        </Panel>
        <Panel name="special">
          <span class="panel-title">特殊</span>
          <div slot="content" class="nav-panel">
            <div class="img-container" v-for="item in special" :key="item.type">
              <div
                class="nav-drag-item"
                :title="item.label"
                v-bind="{width: item.width || 30,
                 height: item.height || 30, 
                 type: item.cellType || 'vertex', 
                 itemType: item.type,
                 shapeStyle: item.shapeStyle,
                 label: item.label}"
              >
                <div class="text-omit">{{item.label}}</div>

                <img ref="dragImg" :src="`static/imgs/graph/special/${item.type}.svg`" />
              </div>
            </div>
          </div>
        </Panel>
        <Panel name="area">
          <span class="panel-title">区域</span>
          <div slot="content" class="nav-panel">
            <div class="img-container" v-for="item in space" :key="item.type">
              <div
                class="nav-drag-item"
                :title="item.label"
                v-bind="{width: item.topoWidth || 30,
                 height: item.topoHeight || 30, 
                 type: item.topoType || 'vertex', 
                 img: item.icon ? item.icon : 'static/imgs/graph/area/default.svg', 
                 label: item.objectName, 
                 keyName: item.keyName, 
                 rank: item.rank,
                 tableName: item.storageTableName, 
                 resourceClassId: item.id,
                }"
              >
                <div class="text-omit">{{item.objectName}}</div>

                <img
                  ref="dragImg"
                  v-imgtrans
                  :src="item.icon ? item.icon : `static/imgs/graph/area/default.svg`"
                />
              </div>
            </div>
          </div>
        </Panel>
        <Panel v-if="enableParking" name="parking">
          <span class="panel-title">停车场</span>
          <div slot="content" class="nav-panel">
            <div class="img-container" v-for="item in parking" :key="item.type">
              <div
                class="nav-drag-item"
                :title="item.label"
                v-bind="{width: item.topoWidth || 30,
                 height: item.topoHeight || 30, 
                 type: item.topoType || 'vertex', 
                 img: item.icon ? item.icon : 'static/imgs/graph/default.svg', 
                 label: item.label, 
                 keyName: item.keyName, 
                 rank: item.rank,
                 tableName: item.storageTableName, 
                 shapeStyle: item.shapeStyle,
                 resourceClassId: item.id,
                 itemType: item.type}"
              >
                <div class="text-omit">{{item.objectName}}</div>

                <img
                  ref="dragImg"
                  v-imgtrans
                  :src="item.icon ? item.icon : `static/imgs/graph/parking/${item.type}.svg`"
                />
              </div>
            </div>
          </div>
        </Panel>
        <Panel v-for="basicClass in list" :name="basicClass.type" :key="basicClass.type">
          <span class="panel-title">{{basicClass.type}}</span>
          <div slot="content" class="nav-panel">
            <div class="img-container" v-for="resClass in basicClass.children" :key="resClass.id">
              <!-- <Tooltip :content="resClass.objectName" placement="right"> -->
              <div
                class="nav-drag-item"
                :title="resClass.objectName"
                v-bind="{width: resClass.topoWidth || 30,
                 height: resClass.topoHeight || 30, 
                 type: resClass.topoType || 'vertex', 
                 isRegion: basicClass.type === '地域',
                 img: resClass.icon ? resClass.icon : 'static/imgs/graph/default.svg', 
                 label: resClass.objectName, 
                 rank: resClass.rank,
                 keyName: resClass.keyName, 
                 tableName: resClass.storageTableName, 
                 resourceClassId: resClass.id}"
              >
                <div class="text-omit">{{resClass.objectName}}</div>

                <img
                  ref="dragImg"
                  v-imgtrans
                  :src="resClass.icon ? resClass.icon : 'static/imgs/graph/default.svg'"
                />
              </div>
              <!-- </Tooltip> -->
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
    <div class="outline-wrapper">
      <label style="padding: 4px 8px;">鸟瞰图</label>
      <div id="graphOutline" />
      <hyz-h-box style="zoom-group">
        <Tooltip content="放大">
          <div class="my-cmd" @click="graph.zoomIn()">
            <img src="static/imgs/toolbar/zoom_in.svg" />
          </div>
        </Tooltip>
        <Tooltip content="缩小">
          <div class="my-cmd" @click="graph.zoomOut()">
            <img src="static/imgs/toolbar/zoom_out.svg" />
          </div>
        </Tooltip>
        <Tooltip content="重置视图">
          <div class="my-cmd" @click="graph.resetView()">
            <img src="static/imgs/toolbar/reset.svg" />
          </div>
        </Tooltip>
        <!-- <Select size="small" style="width: 70px;" v-model="zoom" @on-change="onZoomChanged">
          <Option :value="0.5">50%</Option>
          <Option :value="1">100%</Option>
          <Option :value="1.5">150%</Option>
          <Option :value="2">200%</Option>
          <Option :value="3">300%</Option>
        </Select>-->
      </hyz-h-box>
    </div>
  </div>
</template>

<script>
import mxgraph from "./core/index.js";
const { mxOutline } = mxgraph;
export default {
  props: ["enableParking"],
  data() {
    return {
      collapseValue: "",
      graph: null,
      list: [],
      outline: null,
      isInited: false,
      zoom: 1,
      general: [
        {
          type: "rect",
          label: "矩形",
          width: 45,
          height: 20,
          shapeStyle: "rounded=0;whiteSpace=wrap;html=1;"
        },
        {
          type: "roundRect",
          label: "圆角矩形",
          shapeStyle: "rounded=1;whiteSpace=wrap;html=1;",
          width: 45,
          height: 20
        },
        {
          type: "square",
          label: "正方形",
          shapeStyle: "rounded=0;whiteSpace=wrap;html=1;aspect=fixed;",
          width: 30,
          height: 30
        },
        {
          type: "hexagon",
          label: "六边形",
          shapeStyle:
            "rounded=0;shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;",
          width: 50,
          height: 30
        },
        {
          type: "triangle",
          label: "三角形",
          shapeStyle: "shape=triangle;rounded=0;whiteSpace=wrap;html=1;",
          width: 30,
          height: 30
        },
        {
          type: "diamond",
          label: "菱形",
          shapeStyle: "rounded=0;shape=rhombus;whiteSpace=wrap;html=1;",
          width: 50,
          height: 40
        },
        {
          type: "circle",
          label: "圆形",
          shapeStyle: "shape=ellipse;whiteSpace=wrap;html=1;aspect=fixed;",
          width: 40,
          height: 40
        },
        {
          type: "ellipse",
          label: "椭圆型",
          shapeStyle: "shape=ellipse;whiteSpace=wrap;html=1;",
          width: 50,
          height: 30
        },
        {
          type: "cube",
          label: "长方体",
          shapeStyle:
            "shape=cube;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;",
          width: 50,
          height: 50
        },
        {
          type: "cylinder",
          label: "圆柱体",
          shapeStyle:
            "shape=cylinder;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;",
          width: 30,
          height: 50
        },

        {
          type: "cloud",
          label: "云型",
          shapeStyle: "shape=ellipse;shape=cloud;whiteSpace=wrap;html=1;",
          width: 50,
          height: 30
        },
        {
          type: "text",
          label: "文本",
          shapeStyle:
            "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;",
          width: 30,
          height: 30
        },
        {
          type: "image",
          label: "图片",
          shapeStyle:
            "shape=image;image=static/imgs/graph/general/image.svg;whiteSpace=wrap;html=1;align=center;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;",
          width: 45,
          height: 45
        },
        {
          type: "link",
          label: "双线",
          cellType: "edge",
          shapeStyle:
            "shape=link;noLabel=1;startArrow=none;endArrow=none;rounded=0;curved=0;html=1;edgeStyle=straight;strokeWidth=2;",
          width: 50,
          height: 50
        },
        {
          type: "line",
          label: "实线",
          cellType: "edge",
          shapeStyle:
            "shape=none;noLabel=1;rounded=0;curved=0;startArrow=none;endArrow=none;html=1;edgeStyle=straight;strokeWidth=2;",
          width: 50,
          height: 50
        },
        {
          type: "curve",
          label: "曲线",
          cellType: "edge",
          shapeStyle:
            "shape=none;noLabel=1;rounded=0;curved=1;startArrow=none;endArrow=none;html=1;edgeStyle=straight;strokeWidth=2;",
          width: 50,
          height: 50
        },
        {
          type: "dashed",
          label: "虚线",
          cellType: "edge",
          shapeStyle:
            "shape=none;noLabel=1;rounded=0;curved=0;startArrow=none;endArrow=none;dashed=1;html=1;edgeStyle=straight;strokeWidth=2;",
          width: 50,
          height: 50
        },
        {
          type: "blank",
          label: "占位",
          shapeStyle: "fillColor=none;strokeColor=none;noLabel=1;",
          width: 20,
          height: 20
        }
      ],
      special: [
        {
          type: "kpi",
          label: "指标面板",
          width: 200,
          height: 120,
          shapeStyle:
            "rounded=0;whiteSpace=wrap;html=1;opacity=50;align=left;verticalAlign=top;spacingTop=4;spacingLeft=4"
        },
        {
          type: "singleKpi",
          label: "指标",
          width: 10,
          height: 10,
          shapeStyle:
            "rounded=0;whiteSpace=wrap;html=1;opacity=50;align=left;verticalAlign=top;spacingTop=4;spacingLeft=4"
        }
      ],
      searchArr: [],
      allItemArr: []
    };
  },
  computed: {
    space() {
      const resList = this.$store.state.resClass.list;
      const areaRes = _.filter(
        resList,
        v => v.rank == 3 && v.storageTableName === "d_area_1"
      );
      return _.map(areaRes, res => {
        return {
          ...res,
          type: res.keyName
          // shapeStyle:
          //   "shape=image;html=1;verticalLabelPosition=bottom;verticalAlign=top;imageAspect=0;image=" +
          //   res.icon
        };
      });
    },
    parking() {
      const resList = this.$store.state.resClass.list;
      let result = [];
      _.forEach(resList, v => {
        if (v.keyName === "parking_camera") {
          result.push({
            ...v,
            type: "parking-camera",
            label: "摄像头"
          });
        } else if (v.keyName === "lpgs_two_dimension_code") {
          result.push({
            ...v,
            type: "parking-spot",
            label: "定位点",
            shapeStyle: "shape=ellipse;whiteSpace=wrap;html=1;aspect=fixed;",
            topoWidth: 10,
            topoHeight: 10
          });
        } else if (v.keyName === "parking_space") {
          result.push({
            ...v,
            type: "parking-car-space",
            label: "停车位",
            shapeStyle: "rounded=0;whiteSpace=wrap;html=1;"
          });
        } else if (v.keyName === "parking_area") {
          result.push({
            ...v,
            type: "parking-area",
            label: "停车区域",
            shapeStyle: "rounded=0;whiteSpace=wrap;html=1;",
            topoWidth: 250,
            topoHeight: 130
          });
        }
      });
      return result;
    }
  },
  methods: {
    initGraph(graph) {
      this.graph = graph;
      this.initRes(null, true);
      if (!this.outline) {
        mxOutline.prototype.border = 6;
        this.outline = new mxOutline(
          graph,
          document.getElementById("graphOutline")
        );
      }
    },

    initRes(resList, needInit) {
      // console.log("TCL: initRes -> resList, needInit", resList, needInit);

      let rank2List = resList;
      if (needInit) {
        const resList = this.$store.state.resClass.list;
        const rank3List = _.filter(
          resList,
          v => v.rank == 3 && v.basicClass === "设备"
        );
        const rank2Ids = _.map(rank3List, "parentId");

        rank2List = _.filter(resList, v => {
          return v.rank === 2 && rank2Ids.includes(v.id);
        });
      }
      const grouped = _.groupBy(rank2List, "basicClass");
      let list = [];
      _.keys(grouped).forEach(key => {
        list.push({
          type: key,
          children: grouped[key]
        });
      });
      this.list = list;
      this.$nextTick(() => {
        if (!this.isInited && this.graph) {
          this.graph.makedraggable();
          this.isInited = true;
        }
        this.collapseValue = list[0].type;
      });

      this.allItemArr = [
        ...this.general,
        ...this.special,
        ...this.space,
        ...this.parking
      ];
      this.list.forEach(ele => {
        this.allItemArr = [...this.allItemArr, ...ele.children];
      });

      this.allItemArr = _.uniqWith(this.allItemArr, _.isEqual);
    },

    onZoom(sender, evt) {
      console.log("TCL: onZoom -> evt", evt);
    },

    onZoomChanged(v) {
      this.graph.zoomTo(v);
    },

    onSearchItem(v) {
      let strExp = RegExp(v);
      this.searchArr = [];
      if (!v && this.allItemArr.length > 0) return;
      this.searchArr = _.filter(this.allItemArr, o => {
        let tmpLabel = _.get(o, "label", "");
        let tmpObjName = _.get(o, "objectName", "");
        return strExp.test(tmpLabel) || strExp.test(tmpObjName);
      });
      this.$nextTick(() => {
        let cusArr = document
          .getElementById("searchPane")
          .querySelectorAll(".nav-drag-item");
        Array.from(cusArr).forEach(ele => {
          this.graph.makeDragCustom(ele);
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../styles/compNav.less";
.zoom-group {
  background: red;
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
.compnav {
  height: calc(~"100vh - 64px - 90px");
  &-search {
    padding: 10px 10px 5px 10px;
    margin-bottom: 5px;
    &-btn {
    }
    &-pane {
      padding-left: 10px;
      margin-top: 10px;
    }
  }
}
</style>