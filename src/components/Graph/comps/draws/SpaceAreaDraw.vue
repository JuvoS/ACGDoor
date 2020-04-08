<template>
  <div>
    <div class="svgspace"></div>
    <div class="colorspace"></div>
    <div v-if="toolState" style="position:absolute; top: 15px; left: 285px;">
      <Button
        class="step-btn"
        small
        :type="drawStep==0?'primary':'default'"
        @click="drawStep=0"
      >绘点阶段</Button>
      <Button
        class="step-btn"
        small
        :type="drawStep==1?'primary':'default'"
        @click="drawStep=1"
      >连线阶段</Button>
      <Button
        v-if="drawStep==1"
        class="step-btn"
        small
        type="default"
        @click="onClearPointLine"
      >重置连线</Button>
      <Button class="step-btn" small type="primary" @click="$emit('on-draw-area-finish', true)">完成</Button>
    </div>
  </div>
</template>

<script>
import mxgraph from "../core/index";
import UID from "@tools/util/lib/uid";
const { mxCell, mxUtils, mxVertexHandler } = mxgraph;
import * as d3 from "d3";
export default {
  data() {
    return {
      graph: null,

      drawState: false,
      editState: false,
      drawLayer: null,
      pointArr: [],
      pointIndex: 0,
      lastCell: null,
      firstCell: null,
      checkedCell: null,

      drawStep: "",
      toolState: false,
      startCell: null,
      connectArr: []
    };
  },
  methods: {
    initGraph(graph) {
      this.graph = graph;
      this.graph.drawAreaMode = false;
      this.$nextTick(() => {
        if (this.graph.getDrawAreaLayer()) {
          this.drawLayer = this.graph.getDrawAreaLayer();
        } else {
          this.drawLayer = this.graph.addDrawAreaLayer();
        }

        this.drawStep = 0;
      });
    },

    //检查所有状态是否需执行
    checkDraw(evt) {
      if (!evt) return;
      const cell = evt.getProperty("cell");
      let consumed = _.get(evt, "consumed", false);
      mxVertexHandler.prototype.rotationEnabled = !_.get(
        this.graph,
        "drawAreaMode",
        false
      );

      if (_.get(this.graph, "drawAreaMode", false)) {
        //初始化绘制图层

        switch (this.drawStep) {
          case 0:
            let scale = this.graph.view.getScale();
            let { x, y, offsetX, offsetY } = evt.properties.event;
            let dx = this.graph.view.translate.x;
            let dy = this.graph.view.translate.y;
            //2.5为点的半径
            let px = (offsetX - dx * scale - 2.5 * scale) / scale;
            let py = (offsetY - dy * scale - 2.5 * scale) / scale;

            if (
              !(
                (consumed && cell && cell.isAPoint) ||
                (consumed && cell == undefined)
              )
            )
              this.onCreatePoint(px, py);

            break;
          case 1:
            if (cell) {
              if (this.startCell && cell.id == this.startCell.id) {
                this.graph.setCellsSelectable(false); //禁用元素选中
                this.onCreateRetangle();
              } else {
                this.onConnectPoint(cell);
              }
            }

            break;
          default:
            break;
        }
      }
    },
    //绘制点
    onCreatePoint(x, y) {
      let width = 5,
        height = 5;

      let pointCell = this.graph.insertVertex(
        this.drawLayer,
        UID(2),
        "",
        x,
        y,
        width,
        height,
        // "shape=ellipse;whiteSpace=wrap;html=1;aspect=fixed;"

        "shape=image;image=static/imgs/graph/general/apoint.svg;fill=none;"
      );

      pointCell.isAPoint = true;
    },
    //点连线
    onConnectPoint(cell) {
      if (!cell.isAPoint) return;
      if (!this.lastCell) {
        cell.setAttribute("width", 8);
        cell.setAttribute("height", 8);
        this.startCell = cell;
      }
      if (this.lastCell) {
        this.graph.insertEdge(
          this.graph.getDrawAreaLayer(),
          null,
          "",
          this.lastCell,
          cell,
          "shape=none;noLabel=1;rounded=0;curved=0;startArrow=none;endArrow=none;html=1;edgeStyle=straight;strokeWidth=2;"
        );
      }

      this.connectArr.push(cell.id);
      this.lastCell = cell;
    },
    //清除点点连线
    onClearPointLine() {
      if (this.graph.getDrawAreaLayer())
        this.graph.removeCells(
          _.filter(this.graph.getDrawAreaLayer().children || [], o => {
            return !o.isAPoint;
          })
        );

      this.lastCell = null;
      this.connectArr = [];
    },

    //生成图形
    onCreateRetangle() {
      let parr = [];
      this.connectArr.forEach(ele => {
        let connectTmp = this.graph.getModel().getCell(ele);
        if (connectTmp) {
          let { x, y } = connectTmp.getGeometry();

          parr.push({
            x: x + 2,
            y: y + 2
          });
        }
      });
      let minX = _.minBy(parr, "x");
      let maxX = _.maxBy(parr, "x");
      let minY = _.minBy(parr, "y");
      let maxY = _.maxBy(parr, "y");

      parr.push(parr[0]);
      let data = this.createSvgImg(minX.x, maxX.x, minY.y, maxY.y, parr);

      let cell = this.graph.insertVertex(
        null,
        UID(2),
        "",
        minX.x,
        minY.y,
        maxX.x - minX.x,
        maxY.y - minY.y,
        "shape=image;image=" + data + ";"
      );
      cell.isDrawSvg = true;

      this.onClearPaint();
      this.onClearPointLine();
    },
    //清理图形画布
    onClearPaint() {
      d3.select(".svgspace")
        .selectAll("svg")
        .remove();
      document.querySelector(".colorspace").innerHTML = "";
    },
    //结束绘制
    onFinishStep() {
      console.log(this.graph.getDrawAreaLayer());
      this.onClearPaint();
      this.onClearPointLine();
    },

    //创建SVG图像
    createSvgImg(minx, maxx, miny, maxy, pointarr) {
      let svgBox = d3
        .select(".svgspace")
        .append("svg")
        .attr("version", 1.1)
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
        .attr("width", maxx - minx + "px")
        .attr("height", maxy - miny + "px")
        .attr("id", "basicsvg");
      let pointTxt = this.pointsArrFac(this.pointCutEmpty(pointarr));
      svgBox
        .append("g")
        .append("polygon")
        .attr("points", pointTxt)
        .attr("fill", "rgba(20,53,77,0.6)")
        .attr("stroke", "#2986b0")
        .attr("stroke-width", 1);

      let data =
        "data:image/svg+xml," +
        mxUtils.getXml(document.getElementById("basicsvg"));

      return data;
    },
    //切除SVG空白区域
    pointCutEmpty(arr) {
      let minTmpX = _.minBy(arr, "x");
      let minTmpY = _.minBy(arr, "y");
      let tmp = [];
      for (let i = 0; i < arr.length; i++) {
        tmp.push({
          x: arr[i].x - minTmpX.x,
          y: arr[i].y - minTmpY.y
        });
      }
      return tmp;
    },
    //SVG点格式化
    pointsArrFac(arr) {
      let txt = "";
      arr.forEach(ele => {
        let { x, y } = ele;
        txt += x + "," + y + " ";
      });
      return txt;
    },

    //装载需编辑SVG图像
    onEditLoadSvg(obj) {
      document.querySelector(".colorspace").innerHTML = obj.style.match(
        /(?<=xml,).+(?=;)/
      )[0];
    },
    //改变填充色
    onChangeFill(color) {
      d3.select("#basicsvg")
        .selectAll("polygon")
        .attr("fill", color);

      this.dealChangeEvent();
    },
    //改变描边
    onChangeStroke(color, width = 1) {
      d3.select("#basicsvg")
        .selectAll("polygon")
        .attr("stroke", color)
        .attr("stroke-width", width);

      this.dealChangeEvent();
    },
    //改变描边宽度
    onChangeStrokeWidth(width) {
      d3.select("#basicsvg")
        .selectAll("polygon")
        .attr("stroke-width", width);

      this.dealChangeEvent();
    },
    //处理颜色变化
    dealChangeEvent() {
      if (!this.checkedCell) return;
      this.checkedCell.style = this.checkedCell.style.replace(
        /\<svg([\s\S]*?)\<\/svg\>/,
        document.querySelector(".colorspace").innerHTML
      );

      this.graph.refresh();
    },

    destory() {},

    onDrawAreaState(v) {
      this.toolState = v;
      this.onFinishStep();
      this.graph.getModel().setVisible(this.graph.getDrawAreaLayer(), v);
    }
  }
};
</script>

<style lang="less" scoped>
.step-btn {
  margin-right: 5px;
}
.step-btn:last-child {
  margin: 0;
}
</style>
