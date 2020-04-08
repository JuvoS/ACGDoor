<template>
  <div>
    <Divider style="font-size: 12px">连线</Divider>
    <div style="display:flex; flex-wrap: wrap;padding-left:6px;">
      <Select
        size="small"
        style="width: 75px;"
        v-model="edgeStyle.pattern"
        transfer
        @on-change="onEdgePatternChanged"
      >
        <Option v-for="item in edgePatterns" :key="item.name" :value="item.name">{{item.label}}</Option>
      </Select>&nbsp;&nbsp;
      <Select
        size="small"
        style="width: 75px;"
        v-model="edgeStyle.shape"
        transfer
        @on-change="onEdgeShapeChanged"
      >
        <Option v-for="item in edgeShapes" :key="item.name" :value="item.name">{{item.label}}</Option>
      </Select>&nbsp;&nbsp;
      <InputNumber
        size="small"
        style="width: 70px;"
        :max="50"
        :formatter="value => `${value}px`"
        @on-change="onStyleChanged($event, 'size')"
        v-model="edgeStyle.size"
      />&nbsp;&nbsp;
      <Select
        size="small"
        :disabled="edgeStyle.style === 'straight'"
        style="width: 75px; margin-top: 5px;"
        v-model="edgeStyle.cornerStyle"
        transfer
        @on-change="onEdgeCornerStyleChanged"
      >
        <Option v-for="item in edgeCornerStyles" :key="item.name" :value="item.name">{{item.label}}</Option>
      </Select>&nbsp;&nbsp;
      <Select
        size="small"
        style="width: 75px; margin-top: 5px;"
        v-model="edgeStyle.style"
        transfer
        @on-change="onEdgeStyleChanged"
      >
        <Option v-for="item in edgeStyles" :key="item.name" :value="item.name">{{item.label}}</Option>
      </Select>&nbsp;&nbsp;
      <ColorPicker
        size="small"
        style="width: 70px; margin-top: 5px;"
        transfer
        v-model="edgeStyle.color"
        recommend
        editable
        alpha
        @on-active-change="onColorChanged"
      />
      <attritem layout="h" title="起始箭头" titleWidth="73" style="margin-top: 2px;">
        <Select
          size="small"
          :disabled="dontShowArrow"
          style="width: 75px;"
          v-model="edgeStyle.startArrow"
          transfer
          @on-change="onArrowChanged($event, true)"
        >
          <Option v-for="item in arrows" :key="item.name" :value="item.name">{{item.label}}</Option>
        </Select>&nbsp;&nbsp;
        <InputNumber
          size="small"
          :disabled="dontShowArrow"
          style="width: 70px;"
          v-model="edgeStyle.startSize"
          @on-change="onArrowSizeChanged($event, true)"
        ></InputNumber>
      </attritem>
      <attritem layout="h" title="结束箭头" titleWidth="73" style="margin-top: -8px;">
        <Select
          size="small"
          :disabled="dontShowArrow"
          style="width: 75px;"
          v-model="edgeStyle.endArrow"
          transfer
          @on-change="onArrowChanged($event, false)"
        >
          <Option v-for="item in arrows" :key="item.name" :value="item.name">{{item.label}}</Option>
        </Select>&nbsp;&nbsp;
        <InputNumber
          size="small"
          :disabled="dontShowArrow"
          style="width: 70px;"
          v-model="edgeStyle.endSize"
          @on-change="onArrowSizeChanged($event, false)"
        ></InputNumber>
      </attritem>
      <hyz-h-box>
        <attritem layout="h" title titleWidth="0" style="margin-top: -8px;">
          <Checkbox style="font-weight: bold;" v-model="isHidden" @on-change="onIsHiddenChange">隐藏连线</Checkbox>
        </attritem>
        <attritem layout="h" title titleWidth="0" style="margin-top: -8px;">
          <Checkbox
            style="font-weight: bold;"
            v-model="isWatchHidden"
            @on-change="onWatchIsHiddenChange"
          >预览模式隐藏</Checkbox>
        </attritem>
      </hyz-h-box>
    </div>
  </div>
</template>

<script>
import mxgraph from "../../core/index";
const { mxConstants, mxUtils } = mxgraph;
export default {
  props: ["graph"],
  data() {
    return {
      cell: null,
      isHidden: false,
      isWatchHidden: false,
      edgeStyle: {
        color: "#333333",
        size: 1,
        cornerStyle: "sharp",
        style: "straight",
        pattern: "solid",
        shape: "line",
        startArrow: "none",
        endArrow: "default",
        startSize: 6,
        endSize: 6
      },
      edgePatterns: [
        {
          name: "solid",
          label: "实线",
          value: [null, null]
        },
        {
          name: "dashed",
          label: "虚线",
          value: ["1", null]
        }
      ],
      edgeShapes: [
        {
          name: "line",
          label: "单线",
          value: [null, null, null, null]
        },
        {
          name: "link",
          label: "双线",
          value: ["link", null, null, null]
        }
      ],
      edgeCornerStyles: [
        { name: "sharp", label: "直角", value: ["0", null] },
        { name: "rounded", label: "圆角", value: ["1", null] },
        { name: "curved", label: "曲角", value: [null, "1"] }
      ],
      edgeStyles: [
        {
          name: "straight",
          label: "直线",
          keys: [
            mxConstants.STYLE_EDGE,
            mxConstants.STYLE_CURVED,
            mxConstants.STYLE_NOEDGESTYLE
          ],
          value: ["straight", null, null]
        },
        {
          name: "orthogonal",
          label: "正交",
          keys: [
            mxConstants.STYLE_EDGE,
            mxConstants.STYLE_CURVED,
            mxConstants.STYLE_NOEDGESTYLE
          ],
          value: ["orthogonalEdgeStyle", null, null]
        },
        {
          name: "elbow",
          label: "上折",
          keys: [
            mxConstants.STYLE_EDGE,
            mxConstants.STYLE_ELBOW,
            mxConstants.STYLE_CURVED,
            mxConstants.STYLE_NOEDGESTYLE
          ],
          value: ["elbowEdgeStyle", null, null, null]
        },
        {
          name: "elbowv",
          label: "下折",
          keys: [
            mxConstants.STYLE_EDGE,
            mxConstants.STYLE_ELBOW,
            mxConstants.STYLE_CURVED,
            mxConstants.STYLE_NOEDGESTYLE
          ],
          value: ["elbowEdgeStyle", "vertical", null, null]
        },
        {
          name: "curved",
          label: "曲线",
          keys: [
            mxConstants.STYLE_EDGE,
            mxConstants.STYLE_CURVED,
            mxConstants.STYLE_NOEDGESTYLE
          ],

          value: ["orthogonalEdgeStyle", "1", null]
        },
        {
          name: "entityRelation",
          label: "反对角",
          keys: [
            mxConstants.STYLE_EDGE,
            mxConstants.STYLE_CURVED,
            mxConstants.STYLE_NOEDGESTYLE
          ],

          value: ["entityRelationEdgeStyle", null, null]
        }
      ],

      arrows: [
        {
          name: "none",
          label: "无箭头",
          value: [mxConstants.NONE]
        },
        {
          name: "classic",
          label: "默认",
          value: [mxConstants.ARROW_CLASSIC]
        },
        {
          name: "block",
          label: "填充形",
          value: [mxConstants.ARROW_BLOCK]
        },
        {
          name: "open",
          label: "开放形",
          value: [mxConstants.ARROW_OPEN]
        },

        {
          name: "oval",
          label: "圆形",
          value: [mxConstants.ARROW_OVAL]
        },
        {
          name: "diamond",
          label: "菱形",
          value: [mxConstants.ARROW_DIAMOND]
        }
      ],

      //有些自定义边不能选箭头
      dontShowArrow: false
    };
  },

  methods: {
    init(v) {
      this.cell = v;
      const style = this.graph.getCellStyle(v);
      console.log("TCL: initStyle -> style", style);

      //pattern
      var edgePattern = mxUtils.getValue(
        style,
        mxConstants.STYLE_DASHED,
        mxConstants.STYLE_DASH_PATTERN
      );

      this.edgeStyle.pattern = edgePattern == 1 ? "dashed" : "solid";

      //shape
      var edgeShape = mxUtils.getValue(style, mxConstants.STYLE_SHAPE, "line");

      this.edgeStyle.shape = edgeShape === "line" ? "line" : "link";

      this.dontShowArrow = edgeShape === "link";

      //size
      var edgeSize = mxUtils.getValue(style, mxConstants.STYLE_STROKEWIDTH, 2);

      this.edgeStyle.size = edgeSize;
      this.isWatchHidden = _.get(this.cell, "isWatchHidden", 0) == 1;

      //cornstyle
      var rounded = mxUtils.getValue(style, mxConstants.STYLE_ROUNDED, 0);
      var curved = mxUtils.getValue(style, mxConstants.STYLE_CURVED, 0);
      if (rounded == 1) {
        this.edgeStyle.cornerStyle = "rounded";
      } else if (curved == 1) {
        this.edgeStyle.cornerStyle = "curved";
      } else {
        this.edgeStyle.cornerStyle = "sharp";
      }

      //style
      var edge = mxUtils.getValue(style, mxConstants.STYLE_EDGE, "straight");
      if (edge == "straight") {
        this.edgeStyle.style = "straight";
      } else if (edge == "orthogonalEdgeStyle") {
        this.edgeStyle.style = curved == 1 ? "curved" : "orthogonal";
      } else if (edge == "elbowEdgeStyle") {
        var elbow = mxUtils.getValue(style, mxConstants.STYLE_ELBOW, "null");
        this.edgeStyle.style = elbow == "vertical" ? "elbowv" : "elbow";
      } else if (edge == "entityRelationEdgeStyle") {
        this.edgeStyle.style = "entityRelation";
      }

      //color
      var edgeColor = mxUtils.getValue(
        style,
        mxConstants.STYLE_STROKECOLOR,
        "red"
      );

      this.edgeStyle.color = edgeColor;

      var startArrow = mxUtils.getValue(
        style,
        mxConstants.STYLE_STARTARROW,
        mxConstants.NONE
      );
      this.edgeStyle.startArrow = startArrow;
      var endArrow = mxUtils.getValue(
        style,
        mxConstants.STYLE_ENDARROW,
        mxConstants.NONE
      );
      this.edgeStyle.endArrow = endArrow;

      const opacity = mxUtils.getValue(style, mxConstants.STYLE_OPACITY, 100);
      this.isHidden = opacity === 0;

      // const arr = [];
      // Object.keys(style).forEach(o => {
      //   arr.push(`${o}:${style[o]}`);
      // });

      // return arr.join(";");
    },

    onStyleChanged(v, type) {
      this.graph.changeStyle(
        false,
        [mxConstants.STYLE_STROKEWIDTH],
        [v],
        false
      );
    },

    onEdgePatternChanged(v) {
      const item = _.find(this.edgePatterns, { name: v });
      const keys = [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN];
      this.graph.changeStyle(false, keys, item.value, false);
    },
    onEdgeCornerStyleChanged(v) {
      const item = _.find(this.edgeCornerStyles, { name: v });
      const keys = [mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED];
      this.graph.changeStyle(false, keys, item.value, false);

      //如果是曲线，并且是正交，则改为曲线，否则改为正交
      if (v == "curved") {
        this.edgeStyle.style = "curved";
      } else if (this.edgeStyle.style == "curved") {
        this.edgeStyle.style = "orthogonal";
      }
    },
    onEdgeStyleChanged(v) {
      const item = _.find(this.edgeStyles, { name: v });
      this.graph.changeStyle(false, item.keys, item.value, false);

      //如果是曲线，则改为曲线，否则改为直角
      if (v == "curved") {
        this.edgeStyle.cornerStyle = "curved";
      } else if (this.edgeStyle.cornerStyle == "curved") {
        this.edgeStyle.cornerStyle = "sharp";
      }
    },

    onArrowChanged(v, isStart) {
      const item = _.find(this.arrows, { name: v });
      const keys = [
        isStart ? mxConstants.STYLE_STARTARROW : mxConstants.STYLE_ENDARROW
      ];
      this.graph.changeStyle(false, keys, item.value, false);
    },
    onArrowSizeChanged(v, isStart) {
      const keys = [
        isStart ? mxConstants.STYLE_STARTSIZE : mxConstants.STYLE_ENDSIZE
      ];
      this.graph.changeStyle(false, keys, [v], false);
    },
    onColorChanged(v) {
      this.graph.changeStyle(
        false,
        [mxConstants.STYLE_STROKECOLOR],
        [v],
        false
      );
    },
    onEdgeShapeChanged(v) {
      const item = _.find(this.edgeShapes, { name: v });
      const keys = [
        mxConstants.STYLE_SHAPE,
        mxConstants.STYLE_STARTSIZE,
        mxConstants.STYLE_ENDSIZE,
        "width"
      ];
      this.graph.changeStyle(false, keys, item.value, false);
    },
    onIsHiddenChange(v) {
      this.isHidden = v;
      if (v) {
        this.graph.changeStyle(true, [mxConstants.STYLE_OPACITY], [0]);
      } else {
        this.graph.changeStyle(true, [mxConstants.STYLE_OPACITY], [100]);
      }
    },
    onWatchIsHiddenChange(v) {
      this.cell.isWatchHidden = v ? 1 : 0;
    }
  }
};
</script>

<style>
</style>
