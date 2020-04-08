<template>
  <div>
    <Divider style="font-size: 12px">节点</Divider>
    <div style="padding-left: 6px;">
      <div style="display:flex; align-items: center;">
        <attritem layout="h" :title="isImage ? '背景颜色' : '填充颜色'" titleWidth="60">
          <ColorPicker
            size="small"
            style="width: 40px;"
            transfer
            v-model="fillColor"
            recommend
            editable
            alpha
            @on-active-change="onFillColorChanged"
          />
        </attritem>
        <attritem layout="h" title="边框颜色" titleWidth="60">
          <ColorPicker
            size="small"
            style="width: 40px;"
            transfer
            v-model="borderColor"
            recommend
            editable
            alpha
            @on-active-change="onBorderColorChanged"
          />
        </attritem>
      </div>
      <div style="display:flex; align-items: center;margin-top: -8px;">
        <attritem layout="h" title="边框宽度" titleWidth="60">
          <InputNumber
            size="small"
            style="width: 46px"
            :min="0"
            :max="100"
            @on-change="onBorderWidthChanged"
            v-model="borderWidth"
          />
        </attritem>
        <attritem layout="h" title="样式" titleWidth="30">
          <Select
            size="small"
            style="width: 60px;"
            v-model="borderStyle"
            transfer
            @on-change="onBorderStyleChanged"
          >
            <Option :value="0">实线</Option>
            <Option :value="1">虚线</Option>
          </Select>
        </attritem>
      </div>
      <attritem v-if="!isImage" layout="h" title="渐变颜色" titleWidth="50" style="margin-top: -8px;">
        <Select
          size="small"
          style="width: 80px;"
          v-model="gradientDirection"
          @on-change="onGradientDirectionChanged"
        >
          <Option value="east">往东</Option>
          <Option value="west">往西</Option>
          <Option value="south">往南</Option>
          <Option value="north">往北</Option>
        </Select>&nbsp;&nbsp;
        <ColorPicker
          size="small"
          style="width: 42px;"
          transfer
          v-model="gradientColor"
          recommend
          editable
          @on-active-change="onGradientColorChanged"
        />
      </attritem>
    </div>

    <div style="display:flex; align-items: center;padding-left:6px;margin-top:-8px;">
      <attritem layout="h" title="旋转角度" titleWidth="60">
        <InputNumber
          size="small"
          style="width: 46px"
          @on-change="onVertexRotationChanged"
          v-model="vertexRotation"
        />
      </attritem>
      <attritem layout="h" title="透明度" titleWidth="50">
        <InputNumber
          size="small"
          style="width: 46px"
          :min="0"
          :max="100"
          @on-change="onVertexOpacityChanged"
          v-model="vertexOpacity"
        />
      </attritem>
    </div>

    <div style="display:flex; align-items: center;padding-left:16px;margin-top: -4px;">
      <Checkbox
        style="font-weight: bold;"
        v-model="isRounded"
        @on-change="onVertexIsRoundedChanged"
      >圆角</Checkbox>
      <Checkbox
        style="font-weight: bold;"
        v-model="isShadow"
        @on-change="onVertexIsShadowChanged"
      >阴影</Checkbox>
      <Checkbox
        style="font-weight: bold;"
        v-model="isGlass"
        @on-change="onVertexIsGlassChanged"
      >玻璃效果</Checkbox>
    </div>
    <Checkbox
      style="margin-left: 16px; margin-top:4px;font-weight: bold;"
      v-model="isHidden"
      @on-change="onVertexIsHiddenChange"
    >隐藏节点</Checkbox>

    <Upload
      v-if="isImage"
      style="margin-left: 16px; margin-top:4px;font-weight: bold;"
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
      <Button size="small" type="primary" ghost>更换图标</Button>
    </Upload>
    <Divider style="font-size: 12px">位置大小</Divider>

    <div style="display:flex; align-items: center;padding-left:6px;margin-top:-8px;">
      <attritem layout="h" title="宽" titleWidth="25">
        <InputNumber
          size="small"
          style="width: 60px"
          @on-change="onVertexWidthChanged"
          v-model="vertexWidth"
        />
      </attritem>
      <attritem layout="h" title="高" titleWidth="25">
        <InputNumber
          size="small"
          style="width: 60px"
          @on-change="onVertexHeightChanged"
          v-model="vertexHeight"
        />
      </attritem>
      <Tooltip content="保持缩放比" placement="left">
        <Checkbox v-model="isConstrainSize" />
      </Tooltip>
    </div>
    <div style="display:flex; align-items: center;padding-left:6px;margin-top:-8px;">
      <attritem layout="h" title="X" titleWidth="25">
        <InputNumber
          size="small"
          style="width: 60px"
          @on-change="onVertexXChanged"
          v-model="vertexX"
        />
      </attritem>
      <attritem layout="h" title="Y" titleWidth="25">
        <InputNumber
          size="small"
          style="width: 60px"
          @on-change="onVertexYChanged"
          v-model="vertexY"
        />
      </attritem>
    </div>
    <div style="padding-left:16px; margin-top: -2px;">
      <Button @click="toggleFlip('flipH')" size="small" type="primary" ghost>水平翻转</Button>&nbsp;&nbsp;
      <Button @click="toggleFlip('flipV')" size="small" type="primary" ghost>垂直翻转</Button>
    </div>

    <Divider style="font-size: 12px">其它</Divider>
    <div style="padding-left:16px; margin-top: -2px;">
      <Checkbox
        style="margin-left: 4px; margin-top:4px;font-weight: bold;"
        v-model="isFoldable"
        @on-change="onVertexIsFoldableChange"
      >可折叠</Checkbox>
      <Checkbox
        style="margin-left: 4px; margin-top:4px;font-weight: bold;"
        v-model="isMovable"
        @on-change="onVertexIsMovableChange"
      >可移动</Checkbox>
      <Checkbox
        style="margin-left: 4px; margin-top:4px;font-weight: bold;"
        v-model="isResizable"
        @on-change="onVertexIsResizableChange"
      >可缩放</Checkbox>
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
      fillColor: "#fff",
      borderColor: "#000",
      borderWidth: 1,
      gradientDirection: "south",
      gradientColor: "none",
      isImage: false,

      vertexWidth: 64,
      vertexHeight: 64,
      vertexX: 0,
      vertexY: 0,
      isConstrainSize: true,
      vertexRotation: 0,
      vertexOpacity: 100,

      isHidden: false,
      isRounded: true,
      isShadow: false,
      isGlass: false,
      isFoldable: false,
      isMovable: true,
      isResizable: true,

      borderStyle: 1,

      //icon上传参数
      params: {},

      isDrawSvg: false
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

  methods: {
    init(v) {
      this.cell = v;
      const style = this.graph.getCellStyle(v);
      this.isImage = mxUtils.getValue(style, "shape", "image") === "image";
      this.isDrawSvg = _.get(v, "isDrawSvg", false);

      //init size
      const { x, y, width, height } = v.geometry;
      this.vertexX = v.geometry.relative ? v.geometry.offset.x : x;
      this.vertexY = v.geometry.relative ? v.geometry.offset.y : y;
      this.vertexWidth = width;
      this.vertexHeight = height;

      const rotation = mxUtils.getValue(style, mxConstants.STYLE_ROTATION, 0);
      this.vertexRotation = rotation;
      const opacity = mxUtils.getValue(style, mxConstants.STYLE_OPACITY, 100);
      this.vertexOpacity = opacity;
      this.isHidden = opacity === 0;

      this.isRounded = mxUtils.getValue(style, mxConstants.STYLE_ROUNDED, 1)
        ? true
        : false;
      this.isShadow = mxUtils.getValue(style, mxConstants.STYLE_SHADOW, 0)
        ? true
        : false;
      this.isGlass = mxUtils.getValue(style, mxConstants.STYLE_GLASS, 0)
        ? true
        : false;

      this.fillColor = mxUtils.getValue(
        style,
        this.isImage
          ? mxConstants.STYLE_IMAGE_BACKGROUND
          : mxConstants.STYLE_FILLCOLOR,
        "#fff"
      );
      this.borderColor = mxUtils.getValue(
        style,
        this.isImage
          ? mxConstants.STYLE_IMAGE_BORDER
          : mxConstants.STYLE_STROKECOLOR,
        "#000"
      );
      this.borderWidth = mxUtils.getValue(
        style,
        mxConstants.STYLE_STROKEWIDTH,
        1
      );
      this.borderStyle = mxUtils.getValue(style, mxConstants.STYLE_DASHED, 0);

      if (this.isDrawSvg) {
        let colorArr = v.style.match(/fill="([\s\S]*?)\" stroke/);
        let strokeArr = v.style.match(/stroke="([\s\S]*?)\" stroke-width/);
        let strokeWidthArr = v.style.match(
          /stroke-width="([\s\S]*?)\"\/\>\<\/g/
        );

        this.fillColor = _.get(colorArr, "[1]", "#fff");
        this.borderColor = _.get(strokeArr, "[1]", "#000");
        this.borderWidth = mxUtils.getValue(
          style,
          mxConstants.STYLE_STROKEWIDTH,
          parseInt(_.get(strokeWidthArr, "[1]", 1))
        );
      }

      this.gradientColor = mxUtils.getValue(
        style,
        mxConstants.STYLE_GRADIENTCOLOR,
        "#fff"
      );
      this.gradientDirection = mxUtils.getValue(
        style,
        mxConstants.STYLE_GRADIENT_DIRECTION,
        "south"
      );

      this.isFoldable = this.graph.isCellFoldable(v);
      this.isMovable = this.graph.isCellMovable(v);
      this.isResizable = this.graph.isCellResizable(v);
    },

    onVertexWidthChanged(v) {
      this.graph.getModel().beginUpdate();
      try {
        let geo = this.graph.getCellGeometry(this.cell);
        if (geo) {
          const value = Math.max(1, v);
          geo = geo.clone();
          if (this.isConstrainSize) {
            geo.height =
              Math.round((geo.height * value * 100) / geo.width) / 100;
            this.vertexHeight = geo.height;
          }
          geo.width = value;
          this.graph.getModel().setGeometry(this.cell, geo);
        }
      } finally {
        this.graph.getModel().endUpdate();
      }
    },

    onVertexHeightChanged(v) {
      this.graph.getModel().beginUpdate();
      try {
        let geo = this.graph.getCellGeometry(this.cell);
        if (geo) {
          const value = Math.max(1, v);
          geo = geo.clone();
          if (this.isConstrainSize) {
            geo.width =
              Math.round((geo.width * value * 100) / geo.height) / 100;
            this.vertexWidth = geo.width;
          }
          geo.height = v;
          this.graph.getModel().setGeometry(this.cell, geo);
        }
      } finally {
        this.graph.getModel().endUpdate();
      }
    },

    onVertexXChanged(v) {
      this.graph.getModel().beginUpdate();
      try {
        let geo = this.graph.getCellGeometry(this.cell);
        if (geo) {
          geo = geo.clone();
          if (geo.relative) {
            geo.offset.x = v;
          } else {
            geo.x = v;
          }
          this.graph.getModel().setGeometry(this.cell, geo);
        }
      } finally {
        this.graph.getModel().endUpdate();
      }
    },
    onVertexYChanged(v) {
      this.graph.getModel().beginUpdate();
      try {
        let geo = this.graph.getCellGeometry(this.cell);
        if (geo) {
          geo = geo.clone();
          if (geo.relative) {
            geo.offset.y = v;
          } else {
            geo.y = v;
          }
          this.graph.getModel().setGeometry(this.cell, geo);
        }
      } finally {
        this.graph.getModel().endUpdate();
      }
    },
    onVertexRotationChanged(v) {
      this.graph.getModel().beginUpdate();
      try {
        const value = mxUtils.mod(Math.round(v * 100), 36000) / 100;
        this.graph.setCellStyles(
          mxConstants.STYLE_ROTATION,
          value,
          this.graph.getSelectionCells()
        );
      } finally {
        this.graph.getModel().endUpdate();
      }
    },
    onVertexIsHiddenChange(v) {
      if (v) {
        this.vertexOpacity = 0;
        this.onVertexOpacityChanged(0);
      } else {
        this.vertexOpacity = 100;
        this.onVertexOpacityChanged(this.vertexOpacity);
      }
    },
    onVertexOpacityChanged(v) {
      this.isHidden = v === 0;
      this.graph.changeStyle(true, [mxConstants.STYLE_OPACITY], [v]);
    },

    onFillColorChanged(v) {
      if (this.isDrawSvg)
        return this.graph.areaDrawSvgColor(this.graph, this.cell, v);
      this.fillColor = v;
      this.graph.changeStyle(
        true,
        [
          this.isImage
            ? mxConstants.STYLE_IMAGE_BACKGROUND
            : mxConstants.STYLE_FILLCOLOR
        ],
        [v]
      );
    },
    onBorderColorChanged(v) {
      if (this.isDrawSvg)
        return this.graph.areaDrawSvgBorderColor(this.graph, this.cell, v);
      this.borderColor = v;
      this.graph.changeStyle(
        true,
        [
          this.isImage
            ? mxConstants.STYLE_IMAGE_BORDER
            : mxConstants.STYLE_STROKECOLOR
        ],
        [v]
      );
    },
    onBorderWidthChanged(v) {
      if (this.isDrawSvg)
        return this.graph.areaDrawSvgBorderWidth(this.graph, this.cell, v);
      this.graph.changeStyle(true, [mxConstants.STYLE_STROKEWIDTH], [v]);
    },
    onBorderStyleChanged(v) {
      this.graph.changeStyle(true, [mxConstants.STYLE_DASHED], [v]);
    },
    onGradientColorChanged(v) {
      this.gradientColor = v;
      this.graph.changeStyle(true, [mxConstants.STYLE_GRADIENTCOLOR], [v]);
    },
    onGradientDirectionChanged(v) {
      this.graph.changeStyle(true, [mxConstants.STYLE_GRADIENT_DIRECTION], [v]);
    },
    onVertexIsRoundedChanged(v) {
      this.graph.changeStyle(true, [mxConstants.STYLE_ROUNDED], [v ? 1 : 0]);
    },
    onVertexIsShadowChanged(v) {
      this.graph.changeStyle(true, [mxConstants.STYLE_SHADOW], [v ? 1 : 0]);
    },
    onVertexIsGlassChanged(v) {
      this.graph.changeStyle(true, [mxConstants.STYLE_GLASS], [v ? 1 : 0]);
    },
    onVertexIsFoldableChange(v) {
      this.graph.setCellStyles("collapsible", [v ? 1 : 0], [this.cell]);
      this.graph.changeStyle(true, [mxConstants.STYLE_FOLDABLE], [v ? 1 : 0]);
    },
    onVertexIsMovableChange(v) {
      this.graph.changeStyle(true, [mxConstants.STYLE_MOVABLE], [v ? 1 : 0]);
    },
    onVertexIsResizableChange(v) {
      this.graph.changeStyle(true, [mxConstants.STYLE_RESIZABLE], [v ? 1 : 0]);
    },
    toggleFlip(v) {
      this.graph.toggleCellStyles(v, false);
    },
    onBeforeUpload(file) {
      this.params.name = file.name;
    },
    onIconUploadSuccess(v) {
      if (v.hyz_result) {
        const path = v.hyz_result.split("|")[1];
        this.graph.changeStyle(true, [mxConstants.STYLE_IMAGE], [path]);
      }
    },
    updatePosition(v) {
      this.vertexX = v.x;
      this.vertexY = v.y;
    },
    updateSize(v) {
      this.vertexWidth = v.width;
      this.vertexHeight = v.height;
    }
  }
};
</script>

<style>
</style>
