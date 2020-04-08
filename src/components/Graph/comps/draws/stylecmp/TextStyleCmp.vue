<template>
  <div>
    <Divider style="font-size: 12px">文本</Divider>
    <div style="padding-left:12px;">
      <div style="display:flex; align-items: center;">
        <Select
          size="small"
          v-model="labelPositionValue"
          transfer
          style="width: 70px;margin-right: 6px;"
          @on-change="onLabelPositionChanged"
        >
          <Option v-for="lp in labelPositions" :key="lp.name" :value="lp.name">{{lp.label}}</Option>
        </Select>
        <InputNumber
          size="small"
          style="width: 45px; margin-right: 7px;"
          :min="0"
          :max="100"
          @on-change="onTextSizeChanged"
          v-model="textSize"
        />

        <div
          class="my-icon"
          :style="{backgroundColor: isBold ? '#0cbabd' : 'transparent'}"
          @click="toggleTextStyle('bold')"
        >
          <img src="static/imgs/toolbar/bold.svg" />
        </div>
        <div
          class="my-icon"
          :style="{backgroundColor: isItalic ? '#0cbabd' : 'transparent'}"
          @click="toggleTextStyle('italic')"
        >
          <img src="static/imgs/toolbar/italic.svg" />
        </div>
        <div
          class="my-icon"
          :style="{backgroundColor: isUnderline ? '#0cbabd' : 'transparent'}"
          @click="toggleTextStyle('underline')"
        >
          <img src="static/imgs/toolbar/underline.svg" />
        </div>
      </div>
      <div style="margin-top: 2px;">
        <div
          class="my-icon"
          @click="onTextAlign('left')"
          :style="{backgroundColor: textAlign == 'left' ? '#0cbabd' : 'transparent'}"
        >
          <img src="static/imgs/toolbar/text-align-left.svg" />
        </div>
        <div
          class="my-icon"
          @click="onTextAlign('center')"
          :style="{backgroundColor: textAlign == 'center' ? '#0cbabd' : 'transparent'}"
        >
          <img src="static/imgs/toolbar/text-align-center.svg" />
        </div>
        <div
          class="my-icon"
          @click="onTextAlign('right')"
          :style="{backgroundColor: textAlign == 'right' ? '#0cbabd' : 'transparent'}"
        >
          <img src="static/imgs/toolbar/text-align-right.svg" />
        </div>
        <div
          class="my-icon"
          @click="onTextVAlign('top')"
          :style="{backgroundColor: textVAlign == 'top' ? '#0cbabd' : 'transparent'}"
          style="margin-left: 8px;"
        >
          <img src="static/imgs/toolbar/text-align-top.svg" />
        </div>
        <div
          class="my-icon"
          @click="onTextVAlign('middle')"
          :style="{backgroundColor: textVAlign == 'middle' ? '#0cbabd' : 'transparent'}"
        >
          <img src="static/imgs/toolbar/text-align-middle.svg" />
        </div>
        <div
          class="my-icon"
          @click="onTextVAlign('bottom')"
          :style="{backgroundColor: textVAlign == 'bottom' ? '#0cbabd' : 'transparent'}"
        >
          <img src="static/imgs/toolbar/text-align-bottom.svg" />
        </div>
        <div
          class="my-icon"
          @click="toggleTextHorizontal()"
          :style="{backgroundColor: isHorizontal ? 'transparent' : '#0cbabd'}"
          style="margin-left: 8px;"
        >
          <img src="static/imgs/toolbar/vertical.svg" />
        </div>
      </div>
    </div>
    <div style="padding-left:6px;margin-top: 10px;">
      <div style="display:flex; align-items: center;margin-top: -8px;">
        <attritem layout="h" title="文本色" titleWidth="51">
          <ColorPicker
            size="small"
            style="width: 50px;"
            transfer
            v-model="textColor"
            recommend
            editable
            alpha
            @on-active-change="onTextColorChanged"
          />
        </attritem>
        <attritem layout="h" title="背景色" titleWidth="51">
          <ColorPicker
            size="small"
            style="width: 50px;"
            transfer
            v-model="textBgColor"
            recommend
            editable
            alpha
            @on-active-change="onTextBgColorChanged"
          />
        </attritem>
      </div>
      <div style="display:flex; align-items: center;margin-top: -8px;">
        <attritem layout="h" title="上边距" titleWidth="51">
          <InputNumber
            size="small"
            style="width: 50px; "
            :min="0"
            :max="100"
            @on-change="onSpaceTopChanged"
            v-model="spaceTop"
          />
        </attritem>
        <attritem layout="h" title="下边距" titleWidth="51">
          <InputNumber
            size="small"
            style="width: 50px; "
            :min="0"
            :max="100"
            @on-change="onSpaceBottomChanged"
            v-model="spaceBottom"
          />
        </attritem>
      </div>
      <div style="display:flex; align-items: center;margin-top: -8px;">
        <attritem layout="h" title="左边距" titleWidth="51">
          <InputNumber
            size="small"
            style="width: 50px; "
            :min="0"
            :max="100"
            @on-change="onSpaceLeftChanged"
            v-model="spaceLeft"
          />
        </attritem>
        <attritem layout="h" title="右边距" titleWidth="51">
          <InputNumber
            size="small"
            style="width: 50px; "
            :min="0"
            :max="100"
            @on-change="onSpaceRightChanged"
            v-model="spaceRight"
          />
        </attritem>
      </div>

      <attritem layout="h" title titleWidth="0" style="margin-top: -8px;">
        <Checkbox
          style="font-weight: bold;"
          v-model="isTextHidden"
          @on-change="onTextIsHiddenChange"
        >隐藏文字</Checkbox>
      </attritem>
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
      isTextHidden: false,

      textColor: "#000",
      textBgColor: "none",
      textSize: 12,
      textAlign: "center",
      textVAlign: "middle",

      isHorizontal: true,
      isBold: false,
      isItalic: false,
      isUnderline: false,

      spaceTop: 0,
      spaceBottom: 0,
      spaceLeft: 0,
      spaceRight: 0,

      labelPositionValue: "bottom",
      labelPositions: [
        {
          name: "topLeft",
          label: "左上角",
          value: [
            mxConstants.ALIGN_LEFT,
            mxConstants.ALIGN_TOP,
            mxConstants.ALIGN_RIGHT,
            mxConstants.ALIGN_BOTTOM
          ]
        },
        {
          name: "top",
          label: "顶部",
          value: [
            mxConstants.ALIGN_CENTER,
            mxConstants.ALIGN_TOP,
            mxConstants.ALIGN_CENTER,
            mxConstants.ALIGN_BOTTOM
          ]
        },
        {
          name: "topRight",
          label: "右上角",
          value: [
            mxConstants.ALIGN_RIGHT,
            mxConstants.ALIGN_TOP,
            mxConstants.ALIGN_LEFT,
            mxConstants.ALIGN_BOTTOM
          ]
        },
        {
          name: "left",
          label: "居左",
          value: [
            mxConstants.ALIGN_LEFT,
            mxConstants.ALIGN_MIDDLE,
            mxConstants.ALIGN_RIGHT,
            mxConstants.ALIGN_MIDDLE
          ]
        },
        {
          name: "center",
          label: "居中",
          value: [
            mxConstants.ALIGN_CENTER,
            mxConstants.ALIGN_MIDDLE,
            mxConstants.ALIGN_CENTER,
            mxConstants.ALIGN_MIDDLE
          ]
        },
        {
          name: "right",
          label: "居右",
          value: [
            mxConstants.ALIGN_RIGHT,
            mxConstants.ALIGN_MIDDLE,
            mxConstants.ALIGN_LEFT,
            mxConstants.ALIGN_MIDDLE
          ]
        },
        {
          name: "bottomLeft",
          label: "左下角",
          value: [
            mxConstants.ALIGN_LEFT,
            mxConstants.ALIGN_BOTTOM,
            mxConstants.ALIGN_RIGHT,
            mxConstants.ALIGN_TOP
          ]
        },
        {
          name: "bottom",
          label: "底部",
          value: [
            mxConstants.ALIGN_CENTER,
            mxConstants.ALIGN_BOTTOM,
            mxConstants.ALIGN_CENTER,
            mxConstants.ALIGN_TOP
          ]
        },
        {
          name: "bottomRight",
          label: "右下角",
          value: [
            mxConstants.ALIGN_RIGHT,
            mxConstants.ALIGN_BOTTOM,
            mxConstants.ALIGN_LEFT,
            mxConstants.ALIGN_TOP
          ]
        }
      ]
    };
  },

  methods: {
    init(v) {
      this.cell = v;
      const style = this.graph.getCellStyle(v);

      var pos = mxUtils.getValue(
        style,
        mxConstants.STYLE_LABEL_POSITION,
        mxConstants.ALIGN_CENTER
      );
      var vpos = mxUtils.getValue(
        style,
        mxConstants.STYLE_VERTICAL_LABEL_POSITION,
        mxConstants.ALIGN_MIDDLE
      );

      if (pos == mxConstants.ALIGN_LEFT && vpos == mxConstants.ALIGN_TOP) {
        this.labelPositionValue = "topLeft";
      } else if (
        pos == mxConstants.ALIGN_CENTER &&
        vpos == mxConstants.ALIGN_TOP
      ) {
        this.labelPositionValue = "top";
      } else if (
        pos == mxConstants.ALIGN_RIGHT &&
        vpos == mxConstants.ALIGN_TOP
      ) {
        this.labelPositionValue = "topRight";
      } else if (
        pos == mxConstants.ALIGN_LEFT &&
        vpos == mxConstants.ALIGN_BOTTOM
      ) {
        this.labelPositionValue = "bottomLeft";
      } else if (
        pos == mxConstants.ALIGN_CENTER &&
        vpos == mxConstants.ALIGN_BOTTOM
      ) {
        this.labelPositionValue = "bottom";
      } else if (
        pos == mxConstants.ALIGN_RIGHT &&
        vpos == mxConstants.ALIGN_BOTTOM
      ) {
        this.labelPositionValue = "bottomRight";
      } else if (pos == mxConstants.ALIGN_LEFT) {
        this.labelPositionValue = "left";
      } else if (pos == mxConstants.ALIGN_RIGHT) {
        this.labelPositionValue = "right";
      } else {
        this.labelPositionValue = "center";
      }

      const noLabel = mxUtils.getValue(style, mxConstants.STYLE_NOLABEL, 0);
      this.isTextHidden = noLabel == 1;

      this.textColor = mxUtils.getValue(
        style,
        mxConstants.STYLE_FONTCOLOR,
        "#000"
      );
      this.textBgColor = mxUtils.getValue(
        style,
        mxConstants.STYLE_LABEL_BACKGROUNDCOLOR,
        "transparent"
      );
      this.textSize = parseInt(
        mxUtils.getValue(style, mxConstants.STYLE_FONTSIZE, 12)
      );

      this.textAlign = mxUtils.getValue(
        style,
        mxConstants.STYLE_ALIGN,
        mxConstants.ALIGN_CENTER
      );
      this.textVAlign = mxUtils.getValue(
        style,
        mxConstants.STYLE_VERTICAL_ALIGN,
        mxConstants.ALIGN_MIDDLE
      );
      this.isHorizontal = mxUtils.getValue(
        style,
        mxConstants.STYLE_HORIZONTAL,
        true
      );

      const score = mxUtils.getValue(style, mxConstants.STYLE_FONTSTYLE, 0);
      //把分数转换成对应的二进制。位数不够补0
      const trans = _.padStart(score.toString(2), 3, 0);
      this.isUnderline = trans[0] == "1" ? true : false;
      this.isItalic = trans[1] == "1" ? true : false;
      this.isBold = trans[2] == "1" ? true : false;

      this.spaceTop = mxUtils.getValue(style, mxConstants.STYLE_SPACING_TOP, 0);
      this.spaceBottom = mxUtils.getValue(
        style,
        mxConstants.STYLE_SPACING_BOTTOM,
        0
      );
      this.spaceLeft = mxUtils.getValue(
        style,
        mxConstants.STYLE_SPACING_LEFT,
        0
      );
      this.spaceRight = mxUtils.getValue(
        style,
        mxConstants.STYLE_SPACING_RIGHT,
        0
      );
    },

    onLabelPositionChanged(v) {
      const item = _.find(this.labelPositions, { name: v });
      this.graph.getModel().beginUpdate();
      try {
        var vals = item.value;

        if (vals != null) {
          this.graph.setCellStyles(
            mxConstants.STYLE_LABEL_POSITION,
            vals[0],
            this.graph.getSelectionCells()
          );
          this.graph.setCellStyles(
            mxConstants.STYLE_VERTICAL_LABEL_POSITION,
            vals[1],
            this.graph.getSelectionCells()
          );
          this.graph.setCellStyles(
            mxConstants.STYLE_ALIGN,
            vals[2],
            this.graph.getSelectionCells()
          );
          this.graph.setCellStyles(
            mxConstants.STYLE_VERTICAL_ALIGN,
            vals[3],
            this.graph.getSelectionCells()
          );
        }
      } finally {
        this.graph.getModel().endUpdate();
      }
    },
    onTextIsHiddenChange(v) {
      this.graph.changeStyle(true, [mxConstants.STYLE_NOLABEL], [v ? 1 : 0]);
    },
    onTextColorChanged(v) {
      this.textColor = v;
      this.graph.changeStyle(true, [mxConstants.STYLE_FONTCOLOR], [v]);
    },
    onTextBgColorChanged(v) {
      this.textBgColor = v;
      this.graph.changeStyle(
        true,
        [mxConstants.STYLE_LABEL_BACKGROUNDCOLOR],
        [v]
      );
    },
    onTextSizeChanged(v) {
      this.graph.changeStyle(true, [mxConstants.STYLE_FONTSIZE], [v]);
    },
    onSpaceLeftChanged(v) {
      this.graph.changeStyle(true, [mxConstants.STYLE_SPACING_LEFT], [v]);
    },
    onSpaceRightChanged(v) {
      this.graph.changeStyle(true, [mxConstants.STYLE_SPACING_RIGHT], [v]);
    },
    onSpaceTopChanged(v) {
      this.graph.changeStyle(true, [mxConstants.STYLE_SPACING_TOP], [v]);
    },
    onSpaceBottomChanged(v) {
      this.graph.changeStyle(true, [mxConstants.STYLE_SPACING_BOTTOM], [v]);
    },
    onTextAlign(type) {
      this.textAlign = type;
      this.graph.changeStyle(true, [mxConstants.STYLE_ALIGN], [type]);
    },
    onTextVAlign(type) {
      this.textVAlign = type;
      this.graph.changeStyle(true, [mxConstants.STYLE_VERTICAL_ALIGN], [type]);
    },

    toggleTextHorizontal(type) {
      this.isHorizontal = !this.isHorizontal;
      this.graph.changeStyle(
        true,
        [mxConstants.STYLE_HORIZONTAL],
        [this.isHorizontal ? 1 : 0]
      );
    },
    toggleTextStyle(type) {
      if (type === "bold") {
        this.isBold = !this.isBold;
      } else if (type === "italic") {
        this.isItalic = !this.isItalic;
      } else {
        this.isUnderline = !this.isUnderline;
      }

      //字体的加粗、倾斜、下划线三个状态用二进制值来存的fontStyle里的
      const uScore = this.isUnderline ? 4 : 0;
      const iScore = this.isItalic ? 2 : 0;
      const bScore = this.isBold ? 1 : 0;
      const total = uScore + iScore + bScore;
      this.graph.changeStyle(true, [mxConstants.STYLE_FONTSTYLE], [total]);
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@/styles/theme";
.my-icon {
  width: 25px;
  height: 25px;
  margin: 0px 2px;
  margin-top: 4px;
  border-radius: 2px;
  background: #fff;
  border: 1px solid #999;
  display: inline-block;
  padding-top: 3px;
  text-align: center;
  &:hover {
    cursor: pointer;
    background: 1px solid fade(@primary-color, 50%);
  }
  img {
    width: 18px;
  }
}
</style>
