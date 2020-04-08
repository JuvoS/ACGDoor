<template>
  <div style="position: relative;" :style="{height: height+'px'}">
    <div id="graph"></div>
    <div style="position: absolute; right: 4px; top: 4px;">
      <Button
        type="primary"
        size="small"
        v-if="preSerials.length > 0"
        @click.stop="backHome"
        icon="ios-home"
      >{{serial}}</Button>&nbsp;&nbsp;
      <Button
        type="primary"
        size="small"
        v-if="preSerials.length > 0"
        @click.stop="fetchRelation(preSerials[preSerials.length-1])"
        icon="ios-arrow-back"
      >{{preSerials[preSerials.length-1]}}</Button>
    </div>
  </div>
</template>

<script>
import mxgraph from "./comps/core/index.js";
import Layout from "./comps/plugins/layout";

const { mxGraph, mxConstants } = mxgraph;
export default {
  props: {
    serial: {
      type: String,
      default: ""
    },
    height: {
      type: Number,
      default: 300
    },
    iconScale: {
      type: Number,
      default: 0.6
    },
    heightRatio: {
      type: Number,
      default: 0.4
    }
  },
  data() {
    return {
      graph: null,
      preSerials: [],
      curSerial: ""
    };
  },
  mounted() {
    const isDark = this.$ls.get("THEME") === "dark";
    const container = document.getElementById("graph");
    const graph = (this.graph = new mxGraph(container));
    graph.addListener("click", this.onGraphClick);
    graph.setCellsEditable(false);
    graph.setCellsMovable(false);
    graph.setCellsResizable(false);
    graph.setCellsDeletable(false);

    let style = [];
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_CONNECTOR;
    style[mxConstants.STYLE_STROKECOLOR] = "#0cbabd";
    style[mxConstants.STYLE_STROKEWIDTH] = 2;
    style[mxConstants.STYLE_ROUNDED] = true;
    style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
    style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
    // style[mxConstants.STYLE_EDGE] = mxConstants.EDGESTYLE_ORTHOGONAL;
    style[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_CLASSIC;
    style[mxConstants.STYLE_FONTSIZE] = "12";
    style[mxConstants.STYLE_FONTCOLOR] = "#333";
    style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = "#b2dfdb";
    graph.getStylesheet().putDefaultEdgeStyle(style);

    // Creates the default style for vertices
    style = [];
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
    style[mxConstants.STYLE_ROUNDED] = true;
    style[mxConstants.STYLE_FILLCOLOR] = "#fff";
    // style[mxConstants.STYLE_GRADIENTCOLOR] = "#efefef";
    style[mxConstants.STYLE_FONTCOLOR] = isDark ? "#efefef" : "#444";
    style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
    style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
    style[mxConstants.STYLE_FONTSIZE] = "12";
    style[mxConstants.STYLE_FONTSTYLE] = 0;
    style[mxConstants.STYLE_ROTATABLE] = 0; //禁止旋转

    graph.getStylesheet().putDefaultVertexStyle(style);
    mxGraph.prototype.keepEdgesInBackground = true;
    this.fetchRelation(this.serial);
  },
  methods: {
    onGraphClick(sender, evt) {
      const cell = evt.properties.cell;
      if (cell && cell.serial && cell.serial !== this.curSerial) {
        this.fetchRelation(cell.serial, true);
      }
    },
    backHome() {
      this.fetchRelation(this.serial);
      this.preSerials = [];
    },
    fetchRelation(serial, enableLog) {
      if (enableLog) {
        this.preSerials.push(this.curSerial);
      } else {
        this.preSerials = _.dropRight(this.preSerials);
      }
      this.curSerial = serial;

      this.$http({
        method: "GET",
        url: `resource/v1/resource/resourceRelations/getResourceRelation/${serial}`
      }).then(result => {
        this.graph.getModel().clear();

        const prs = result.passiveRelations || [];
        const mrs = result.mainRelations || [];

        const heightRatio = this.heightRatio;
        const iconScale = this.iconScale;

        const domHeight = this.height;
        const domWidth = this.$el.clientWidth;
        const parent = this.graph.getDefaultParent();
        this.graph.getModel().beginUpdate();
        try {
          const { icon, width, height } = this.getResIcon(result.type);
          const shapeStyle =
            "shape=image;html=1;verticalLabelPosition=bottom;verticalAlign=top;imageAspect=0;image=" +
            icon;

          const vertex = this.graph.insertVertex(
            parent,
            null,
            serial,
            (domWidth - width * iconScale) * 0.5,
            (domHeight - height * iconScale) * heightRatio,
            width * iconScale,
            height * iconScale,
            shapeStyle
          );

          // const perWidth = Math.max(80, (domWidth - 160) / prs.length);

          // if(perWidth*prs.length > domWidth)

          //bottom
          const prGapWidthRatio = 1 / (prs.length + 1);
          prs.forEach((v, i) => {
            if (v.instance && v.relation) {
              const { icon, width, height } = this.getResIcon(v.instance.type);

              const shapeStyle =
                "shape=image;html=1;verticalLabelPosition=bottom;verticalAlign=top;imageAspect=0;image=" +
                icon;

              let label = v.instance.label || v.instance.name;
              if (v.instance.softIdentifiCode)
                label += `[${v.instance.softIdentifiCode}]`;
              const vertex2 = this.graph.insertVertex(
                parent,
                null,
                label,
                (domWidth - width * iconScale) * prGapWidthRatio * (i + 1),
                (domHeight - height * iconScale) * heightRatio * 2,
                width * iconScale,
                height * iconScale,
                shapeStyle
              );

              vertex2.serial = v.instance.serial;

              const edge = this.graph.insertEdge(
                parent,
                null,
                v.relation.relationType,
                vertex2,
                vertex
              );
            }
          });

          //top
          const gapWidthRatio = 1 / (mrs.length + 1);
          mrs.forEach((v, i) => {
            if (v.instance && v.relation) {
              const { icon, width, height } = this.getResIcon(v.instance.type);

              const shapeStyle =
                "shape=image;html=1;verticalLabelPosition=bottom;verticalAlign=top;imageAspect=0;image=" +
                icon;

              const vertex2 = this.graph.insertVertex(
                parent,
                null,
                v.instance.label || v.instance.name,
                (domWidth - width * iconScale) * gapWidthRatio * (i + 1),
                0,
                width * iconScale,
                height * iconScale,
                shapeStyle
              );

              vertex2.serial = v.instance.serial;

              const edge = this.graph.insertEdge(
                parent,
                null,
                v.relation.relationType,
                vertex,
                vertex2
              );
            }
          });
        } finally {
          this.graph.getModel().endUpdate();
        }
      });
    },
    getResIcon(type) {
      const res = _.find(this.$store.state.resClass.list, {
        keyName: type
      });
      if (res) {
        const parent = _.find(this.$store.state.resClass.list, {
          id: res.parentId
        });
        return {
          icon: parent.icon || "static/imgs/graph/default.svg",
          width: parent.topoWidth || 30,
          height: parent.topoHeight || 30
        };
      } else {
        return {
          icon: "static/imgs/graph/default.svg",
          width: 30,
          height: 30
        };
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>