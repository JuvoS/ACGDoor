import { mxgraph, GraphBase } from "./GraphBase";
import FileSaver from "file-saver";
import defaultConfig from "../plugins/defaultEditConfig";
import contextmenu from "../plugins/contextmenu";
import keybind from "../plugins/keybind";
import clipboard from "../plugins/clipboard";
import hover from "../plugins/hover";
import draw from "../plugins/draw";
// import dblClickAddText from "../plugins/dblClickAddText";
import "../plugins/shapes";
import undo from "../plugins/undo";
import extras from "../plugins/extras";
import connectionHandler from "../plugins/connectionHandler";
import makedraggable from "../plugins/makedraggable";
import tooltip from "../plugins/tooltip";
import Layout from "../plugins/layout";
import imgUrlFormate from "../plugins/imgUrlFormate";
import extendcanvas from "../plugins/extendcanvas";
import tilePage from "../plugins/tilePage";
import scrollZoom from "../plugins/scrollZoom";
import makeDragCustom from "../plugins/makeDragCustom";
import cellFoldable from "../plugins/cellFoldable";
import Vue from "vue";
import UID from "@tools/util/lib/uid";

const {
  mxGraph,
  mxCell,
  mxImage,
  mxShape,
  mxPoint,
  mxVertexHandler,
  mxCodec,
  mxUtils,
  mxConstants,
  mxEventObject,
  mxCellHighlight,
  mxCellOverlay,
  mxEvent,
  mxRectangle
} = mxgraph;

/**
 * 可编辑Graph类
 */
export default class EditGraph extends GraphBase {
  _init() {
    super._init();
    defaultConfig(this, this.isDark);
    tilePage(this);
    scrollZoom(this);
    cellFoldable(this);
    contextmenu(this, true);
    connectionHandler(this);
    keybind(this);
    clipboard(this);
    // hover(this);
    // dblClickAddText(this);
    extras(this);
    tooltip(this);
    // extendcanvas(this);
    this.undoManager = undo(this);
  }

  //注册图标使之可以拖拽
  makedraggable() {
    makedraggable(this);
  }

  makeDragCustom(item) {
    makeDragCustom(this, item);
  }

  deleteCells() {
    const cells = this.getDeletableCells(this.getSelectionCells());
    if (cells != null && cells.length > 0) {
      this.removeCells(cells);
    }
  }

  editCell() {
    if (this.isEnabled()) {
      this.startEditingAtCell();
    }
  }

  highlightCells(cells) {
    this.highlight = new mxCellHighlight(this, "#ff0000", 2);
    cells.forEach(cell => this.highlight.highlight(this.view.getState(cell)));
  }

  clearHighlightCells(cells) {
    this.highlight = new mxCellHighlight(this, "#000000", 2);
    cells.forEach(cell => this.highlight.highlight(this.view.getState(cell)));
  }

  lightInstantCells() {
    let cells = _.values(this.model.cells);
    cells.forEach(cell => {
      let cellKeyName = _.get(cell, "data.keyName", "");
      if (cellKeyName) {
        this.cellLightState(cell);
      }
    });
  }

  cellLightState(cell) {
    const graph = this;
    let lightState = _.get(cell, "isLightInstance", false);
    let cellDomain = _.get(cell, "data.bindData", {});
    let isImage =
      mxUtils.getValue(this.getCellStyle(cell), "shape", "image") === "image";
    let style = this.getCellStyle(cell);

    if (graph.instantState) {
      if (_.isEmpty(cellDomain)) {
        let lastBorderColor = _.get(cell, "lastBorder.strokecolor", "");
        let borderColor = mxUtils.getValue(
          style,
          isImage
            ? mxConstants.STYLE_IMAGE_BORDER
            : mxConstants.STYLE_STROKECOLOR,
          "none"
        );
        if (lastBorderColor) borderColor = lastBorderColor;
        if (borderColor)
          cell.lastBorder = {
            strokecolor: borderColor
          };
        cell.isLightInstance = true;

        graph.model.setStyle(
          cell,
          mxUtils.setStyle(
            graph.model.getStyle(cell),
            isImage
              ? mxConstants.STYLE_IMAGE_BORDER
              : mxConstants.STYLE_STROKECOLOR,
            graph.instantState ? "#ff0000" : borderColor
          )
        );
      } else if (lightState) {
        cell.lightState = false;
        let lastBorder = _.get(cell, "lastBorder.strokecolor", "");
        graph.model.setStyle(
          cell,
          mxUtils.setStyle(
            graph.model.getStyle(cell),
            isImage
              ? mxConstants.STYLE_IMAGE_BORDER
              : mxConstants.STYLE_STROKECOLOR,
            lastBorder
          )
        );
      }
    } else {
      if (_.isEmpty(cellDomain)) {
        let lastBorderColor = _.get(cell, "lastBorder.strokecolor", "");
        let borderColor = mxUtils.getValue(
          style,
          isImage
            ? mxConstants.STYLE_IMAGE_BORDER
            : mxConstants.STYLE_STROKECOLOR,
          "none"
        );
        if (lastBorderColor) borderColor = lastBorderColor;
        if (borderColor)
          cell.lastBorder = {
            strokecolor: borderColor
          };
        cell.isLightInstance = true;

        graph.model.setStyle(
          cell,
          mxUtils.setStyle(
            graph.model.getStyle(cell),
            isImage
              ? mxConstants.STYLE_IMAGE_BORDER
              : mxConstants.STYLE_STROKECOLOR,
            borderColor
          )
        );
      }
    }
  }

  group() {
    if (this.getSelectionCount() == 1) {
      this.setCellStyles("container", "1");
    } else {
      this.setSelectionCell(this.groupCells(null, 0));
    }
  }

  ungroup() {
    const graph = this;
    if (
      graph.getSelectionCount() == 1 &&
      graph.getModel().getChildCount(graph.getSelectionCell()) == 0
    ) {
      graph.setCellStyles("container", "0");
    } else {
      graph.setSelectionCells(graph.ungroupCells());
    }
  }

  redo() {
    try {
      var graph = this;
      if (graph.isEditing()) {
        document.execCommand("redo", false, null);
      } else {
        this.undoManager.redo();
      }
    } catch (e) {
      // ignore all errors
    }
  }

  undo() {
    try {
      var graph = this;
      if (graph.isEditing()) {
        // Stops editing and executes undo on graph if native undo
        // does not affect current editing value
        var value = graph.cellEditor.textarea.innerHTML;
        document.execCommand("undo", false, null);

        if (value == graph.cellEditor.textarea.innerHTML) {
          graph.stopEditing(true);
          this.undoManager.undo();
        }
      } else {
        this.undoManager.undo();
      }
    } catch (e) {
      // ignore all errors
    }
  }

  lockUnlock() {
    if (!this.isSelectionEmpty()) {
      this.getModel().beginUpdate();
      try {
        var defaultValue = this.isCellMovable(this.getSelectionCell()) ? 1 : 0;
        this.dolock(defaultValue, this.getSelectionCells());
      } finally {
        this.getModel().endUpdate();
      }
    }
  }

  dolock(flag, cells) {
    this.toggleCellStyles(mxConstants.STYLE_MOVABLE, flag, cells);
    this.toggleCellStyles(mxConstants.STYLE_RESIZABLE, flag, cells);
    this.toggleCellStyles(mxConstants.STYLE_ROTATABLE, flag, cells);
    this.toggleCellStyles(mxConstants.STYLE_DELETABLE, flag, cells);
    this.toggleCellStyles(mxConstants.STYLE_EDITABLE, flag, cells);
    this.toggleCellStyles("connectable", flag, cells);
  }

  changeStyle(isVertex, keys, values, setToDefault) {
    this.getModel().beginUpdate();
    try {
      const style = isVertex
        ? this.stylesheet.getDefaultVertexStyle()
        : this.stylesheet.getDefaultEdgeStyle();
      keys.forEach((key, i) => {
        // if (values[i] == null) {
        //   delete style[key];
        // } else {
        this.setCellStyles(key, values[i]);
        // }
        if (setToDefault) {
          style[key] = values[i];
        }
      });
    } finally {
      this.getModel().endUpdate();
    }
  }

  isDefaultLayerShow() {
    return this.model.isVisible(this.getDefaultParent());
  }

  copyPaste() {
    const s = this.gridSize;
    let cell = this.getSelectionCells();
    this.setSelectionCells(
      this.moveCells(this.getSelectionCells(), s, s, true)
    );
    console.log(cell);
    this.fireEvent(new mxEventObject("copyPasteEnd"));
  }

  //递归删除图层下的子元素
  //由于事务的原因，不能简单的forEach里直接remove。
  removeCellChildren(cell) {
    if (cell.children.length > 0) {
      this.model.remove(cell.children[0]);
      this.removeCellChildren(cell);
    }
  }

  backDefaultLayer() {
    if (this.devicePortLayer) {
      this.removeCellChildren(this.devicePortLayer);
      //该方法未生效，原因未知。
      // this.removeCells(this.devicePortLayer.children, true);
      this.getModel().setVisible(this.devicePortLayer, false);
      this.devicePortLayerRelations = [];
      if (this.bakBackgroundImage) {
        //缓存背景图
        this.backgroundImage = this.bakBackgroundImage;
        this.bakBackgroundImage = null;
      }
    }
    defaultConfig(this);
    this.getModel().setVisible(this.getDefaultParent(), true);
  }

  //打开端子图层
  openPortLayer(from, to) {
    this.fireEvent(new mxEventObject("openPortLayer"));

    //关闭默认图层
    this.getModel().setVisible(this.getDefaultParent(), false);

    this.getModel().beginUpdate();
    try {
      if (!this.devicePortLayer) {
        this.addDevicePortLayer();
      }

      this.getModel().setVisible(this.devicePortLayer, true);
      this.foldingEnabled = false;
      this.setConnectableEdges(false);
      // mxVertexHandler.prototype.rotationEnabled = false;
      mxShape.prototype.constraints = [];

      const { cell: fromCell, values: fromData } = from;
      const { cell: toCell, values: toData } = to;

      let fromGroupData = [];
      const prck = _.get(fromData, "[0].parent_resource_class_keyname", null);
      //如果是端子类则需要分组
      if (prck === "terminals") {
        //to的数据分组一下
        const groupd = _.groupBy(fromData, "terminal_type");

        const keys = _.keys(groupd);
        keys.forEach(key => {
          const vNode = {
            name: key,
            resource_class_id: fromCell.resource_class_id,
            children: groupd[key]
          };
          fromGroupData.push(vNode);
        });
      } else {
        fromGroupData = fromData;
      }

      //to的数据分组一下
      const groupd = _.groupBy(toData, "terminal_type");

      const keys = _.keys(groupd);
      let toGroupData = [];
      keys.forEach(key => {
        const vNode = {
          name: key,
          resource_class_id: toCell.resource_class_id,
          children: groupd[key]
        };
        toGroupData.push(vNode);
      });

      const { clientWidth, clientHeight } = this.container;
      const scale = this.view.scale;
      const width = Math.ceil(clientWidth / scale);
      const height = Math.ceil(clientHeight / scale);

      this.addDevicePort(
        fromCell,
        fromGroupData,
        (1 / 4) * width,
        (1 / 4) * height
      );
      this.addDevicePort(
        toCell,
        toGroupData,
        (2 / 4) * width,
        (1 / 4) * height,
        true
      );
      if (this.backgroundImage) {
        //缓存背景图
        this.bakBackgroundImage = this.backgroundImage;
      }
      this.backgroundImage = "none";
    } finally {
      this.getModel().endUpdate();
    }
  }

  addDevicePort(cell, data, x, y, isDcc) {
    const baseW = 100;
    const baseH = 25;

    let totalH = 0;
    data.forEach(item => {
      if (isDcc) {
        totalH += baseH * Math.max(1, Math.ceil(item.children.length / 2));
      } else {
        totalH += baseH * Math.max(1, item.children.length);
      }
    });

    const style =
      "rounded=0;whiteSpace=wrap;html=1;editable=0;resizable=0;movable=0;rotatable=0;cloneable=0;deletable=0;";
    this.getModel().beginUpdate();
    try {
      var v1 = this.insertVertex(
        this.devicePortLayer,
        cell.id,
        cell.name,
        x,
        y,
        baseW,
        totalH,
        `devicePort;verticalLabelPosition=top;labelPosition=center;align=center;verticalAlign=bottom;${style};movable=1;`
      );
      v1.setConnectable(true);
      let preH = 0;

      let relations = [];
      data.forEach((item, i) => {
        const childNum = item.children.length;
        let h = 0;
        if (isDcc) {
          h = baseH * Math.max(1, Math.ceil(childNum / 2));
        } else {
          h = baseH * Math.max(1, childNum);
        }
        const sub = this.insertVertex(
          v1,
          item.id,
          item.name,
          0,
          preH,
          baseW,
          h,
          style
        );
        preH += h;
        item.children.forEach((tom, j) => {
          let x = 1;
          let y = (1 / (childNum + 1)) * (j + 1);
          if (isDcc) {
            x = j % 2 === 0 ? 0 : 1;
            y =
              j % 2 === 0
                ? (1 / (childNum + 1)) * (j + 1)
                : (1 / (childNum + 1)) * j;
          }

          let isLeft = x === 0;

          const port = this.insertVertex(
            sub,
            tom.id,
            null,
            x,
            y,
            10,
            10,
            `portConstraint=${
              isLeft ? "west" : "east"
            };shape=circle;direction=${
              isLeft ? "west" : "east"
            };perimeter=none;" +
              "routingCenterX=0.5;routingCenterY=0;${style}`,
            true
          );
          port.data = { bindData: tom, parent: item, isPort: true };
          if (isLeft) {
            port.geometry.offset = new mxPoint(-10, -5);
          } else {
            port.geometry.offset = new mxPoint(0, -5);
          }
          port.setConnectable(true);

          //如果端子已有关系
          if (tom.relations) {
            relations = [...relations, ...tom.relations];
          }
        });
      });

      this.devicePortLayerRelations = relations;

      //初始化连接关系
      relations.forEach(relation => {
        const { mainResourceId, passiveResourceId } = relation;
        const source = this.model.getCell(mainResourceId);
        const target = this.model.getCell(passiveResourceId);

        if (source && target) {
          if (this.isCellVisible(source) && this.isCellVisible(target)) {
            const edge = this.insertEdge(
              this.devicePortLayer,
              null,
              "连接",
              source,
              target
            );
          }
        }
      });
    } finally {
      this.getModel().endUpdate();
    }
  }

  //添加设备端子层，用于端子关系连接
  addDevicePortLayer() {
    this.devicePortLayer = new mxCell();
    this.devicePortLayer.setId("devicePortLayer");
    this.getModel().add(this.model.root, this.devicePortLayer);
  }

  //从风机等设备往下钻，如果没有拓扑图，默认把下面的端子带出来呈现
  initPortDevices(ports, resClass, item, itemResClass) {
    const portStyle =
      "shape=image;dontSet=1;html=1;verticalLabelPosition=bottom;verticalAlign=top;imageAspect=0;image=" +
      resClass.icon;
    const parent = this.getDefaultParent();
    this.getModel().beginUpdate();
    try {
      const center = this.insertVertex(
        parent,
        item.id,
        item.serial,
        400,
        100,
        itemResClass.topoWidth || 60,
        itemResClass.topoHeight || 60,
        "shape=image;dontSet=1;html=1;verticalLabelPosition=bottom;verticalAlign=top;imageAspect=0;image=" +
          itemResClass.icon
      );
      center.data = {
        label: itemResClass.objectName,
        keyName: itemResClass.keyName,
        tableName: itemResClass.storageTableName,
        type: "vertex",
        resourceClassId: itemResClass.id,
        isExtendClass: true,
        dontSet: true,
        bindData: item
      };

      ports.forEach((port, i) => {
        const item = this.insertVertex(
          parent,
          UID(2),
          port.name,
          100 + 100 * i,
          200,
          30,
          30,
          portStyle
        );
        item.setId(port.id);
        item.data = {
          label: resClass.objectName,
          keyName: resClass.keyName,
          tableName: resClass.storageTableName,
          type: "vertex",
          resourceClassId: resClass.id,
          isExtendClass: true,
          dontSet: true,
          bindData: port
        };

        //添加边关系
        this.insertEdge(
          parent,
          null,
          "",
          center,
          item,
          `shape=none;noLabel=1;rounded=0;curved=0;startArrow=classic;endArrow=classic;html=1;edgeStyle=straight;strokeWidth=2;`
        );
      });
    } finally {
      this.getModel().endUpdate();
      this.doLayout("circle");
    }
  }

  toggleDevicePortLayer() {
    this.getModel().setVisible(this.devicePortLayer, true);
  }

  getXML() {
    const model = _.cloneDeep(this.getModel());
    let ids = [];
    Object.values(model.cells).forEach(cell => {
      ids.push(cell.id);
      if (cell.data) {
        cell.data = JSON.stringify(cell.data);
      }
    });

    console.log("ids is ", ids, _.uniq(ids), model);
    const enc = new mxCodec(mxUtils.createXmlDocument());

    let node = enc.encode(model);

    if (this.view.translate.x != 0 || this.view.translate.y != 0) {
      node.setAttribute("dx", Math.round(this.view.translate.x * 100) / 100);
      node.setAttribute("dy", Math.round(this.view.translate.y * 100) / 100);
    }

    if (this.container.style.backgroundColor) {
      node.setAttribute(
        "backgroundColor",
        this.container.style.backgroundColor
      );
    }

    if (this.backgroundImage != null && this.backgroundImage != "none") {
      node.setAttribute(
        "backgroundImage",
        JSON.stringify(this.backgroundImage)
      );
    } else {
      const { clientWidth, clientHeight } = this.container;
      const scale = this.view.scale;
      const width = Math.ceil(clientWidth / scale);
      const height = Math.ceil(clientHeight / scale);
      let emptyImg = new mxImage("", width, height);
      node.setAttribute("backgroundImage", JSON.stringify(emptyImg));
    }

    // let childTmp = _.get(node, "children[0].children", [])
    // childTmp = _.filter(childTmp, o => { return !(o.getAttribute("drawState") == 0) })
    // node.children[0].children = childTmp

    return mxUtils.getPrettyXml(node);
  }

  logXml() {
    console.log("XML is:", this.getXML());
  }

  loadXML(xml) {
    super.loadXML(xml);
    this.clear();

    if (xml) {
      this.getModel().beginUpdate();
      try {
        const doc = mxUtils.parseXml(xml);
        const root = doc.documentElement;
        const dec = new mxCodec(root.ownerDocument);
        dec.decode(root, this.getModel());

        var bgColor = root.getAttribute("backgroundColor");
        if (
          this.isDark &&
          (bgColor === "white" || bgColor === "rgb(255, 255, 255)")
        ) {
          this.container.style.backgroundColor = null;
        } else {
          this.container.style.backgroundColor = bgColor;
        }

        // Sets background image
        var bgImg = root.getAttribute("backgroundImage");
        if (bgImg) {
          bgImg = JSON.parse(bgImg);

          const bgWidth = bgImg.width;
          const bgHeight = bgImg.height;
          if (bgImg.src) {
            // this.setBgImg(bgImg.src);
            this.setBackgroundImage(new mxImage(bgImg.src, bgWidth, bgHeight));
            this.pageFormat = new mxRectangle(
              0,
              0,
              (bgWidth / 3) * 2,
              (bgHeight / 3) * 2
            );
          } else {
            this.backgroundImage = null;
          }
          this.refresh();
        } else {
          this.backgroundImage = null;
        }
      } finally {
        this.getModel().endUpdate();

        Object.values(this.getModel().cells).forEach(cell => {
          if (cell.data && _.isString(cell.data)) {
            cell.data = JSON.parse(cell.data);
          }

          //添加下钻标识
          const canDrill = _.get(cell, "data.canDrill", false);
          if (canDrill) {
            // this.addCanDrill(cell);
          }

          //非绘制图形图片地址转换
          if (_.get(cell, "isDrawSvg", 0) != 1) imgUrlFormate(cell);

          //清除绘制产生的垃圾数据
          if (cell.drawState == 0 || cell.drawState == 1)
            this.model.remove(cell);
        });

        this.refresh();
      }
    } else {
      this.backgroundImage = null;
      this.view.validateBackgroundImage();
    }
  }

  //返回已绑定的资源类及其资源实例
  getResClasses() {
    let allInstances = [];
    Object.values(this.getModel().cells).forEach(cell => {
      const bindData = _.get(cell, "data.bindData", null);
      if (bindData) {
        allInstances.push(bindData);
      }
    });
    const grouped = _.groupBy(allInstances, "resource_class_id");
    let result = [];
    _.keys(grouped).forEach(key => {
      result.push({ resId: key, instances: grouped[key] });
    });
    return result;
  }

  //添加区域绘制层
  addDrawAreaLayer() {
    this.areaDrawLayer = new mxCell();
    this.areaDrawLayer.setId("areaDrawLayer");
    return this.getModel().add(this.model.root, this.areaDrawLayer);
  }
  //获取区域绘制层
  getDrawAreaLayer() {
    return this.getModel().getCell("areaDrawLayer");
  }

  /**
   * 设置cell组呈现状态
   * @param {Array} cellList
   * @param {Boolean} visible
   */
  setCellVisible(cellList, visible) {
    let model = this.getModel();
    for (let i in cellList) {
      model.setVisible(cellList[i], visible);
    }
  }

  showCells(cellList) {
    this.setCellVisible(cellList, true);
  }

  hideCells(cellList) {
    this.setCellVisible(cellList, false);
  }

  setBgImg(img) {
    const { clientWidth, clientHeight } = this.container;
    const scale = this.view.scale;
    const width = Math.ceil(clientWidth / scale);
    const height = Math.ceil(clientHeight / scale);
    // this.setBackgroundImage(new mxImage(img, 1920, 1080));
    // this.view.validateBackgroundImage();

    //需要按图片真实大小来设置
    //这样后面缩放的时候才不会失真
    const vimg = document.createElement("img");
    vimg.src = img;
    vimg.onload = () => {
      this.setBackgroundImage(
        new mxImage(img, vimg.naturalWidth, vimg.naturalHeight)
      );
      this.pageFormat = new mxRectangle(
        0,
        0,
        (vimg.naturalWidth / 3) * 2,
        (vimg.naturalHeight / 3) * 2
      );
      this.view.validateBackgroundImage();

      this.refresh();
    };
  }

  setEdgeFlow(cell) {
    var state = this.view.getState(cell);
    state.shape.node
      .getElementsByTagName("path")[0]
      .removeAttribute("visibility");
    state.shape.node
      .getElementsByTagName("path")[0]
      .setAttribute("stroke-width", "12");
    state.shape.node
      .getElementsByTagName("path")[0]
      .setAttribute("stroke", "lightGray");
    state.shape.node
      .getElementsByTagName("path")[1]
      .setAttribute("class", "flow");
  }

  markDrill() {
    this.getModel().beginUpdate();
    try {
      const cell = this.getSelectionCell();
      if (cell) {
        cell.data.canDrill = true;
      }
    } finally {
      this.getModel().endUpdate();
    }
  }

  export() {
    const xml = this.getXML();
    const blob = new Blob([xml], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, "graph.xml");
  }

  import(file) {
    const reader = new FileReader();
    reader.onload = e => {
      const txt = e.target.result;
      this.loadXML(txt);
    };
    reader.readAsText(file);
  }

  clear() {
    this.backgroundImage = null;
    this.getModel().clear();
  }

  resetView() {
    this.view.scaleAndTranslate(1, 0, 0);
  }

  /**
   * 绑定资源实例
   */
  bindResourceInstance(cell) {
    this.fireEvent(new mxEventObject("bindResourceInstance", "cell", cell));
  }

  /**
   * 为实例设置指标
   */
  setKpi(cell) {
    this.fireEvent(new mxEventObject("setKpi", "cell", cell));
  }

  save() {
    this.fireEvent(new mxEventObject("saveGraph"));
  }

  /**
   * 为实例设置阈值
   */
  setAlarm(cell) {
    this.fireEvent(new mxEventObject("setAlarm", "cell", cell));
  }

  /**
   * 下钻
   */
  drillCell(cell) {
    this.fireEvent(new mxEventObject("drillCell", "cell", cell));
  }

  addCanDrill(cell) {
    const img = new mxImage(`static/mxgraph/images/state/drill.svg`, 16, 16);
    const alarmOverlay = new mxCellOverlay(
      img,
      "",
      null,
      null,
      null,
      "default"
    );

    // alarmOverlay.addListener(mxEvent.CLICK, function(sender, evt) {
    //   mxUtils.alert("\nLast update: " + new Date());
    // });
    this.addCellOverlay(cell, alarmOverlay);
  }

  //切换画线模式
  toggleDrawLine(v) {
    this.drawLineMode = v;
    draw(this, v);
    contextmenu(this, !v);
  }

  //切换画区域模式
  toggleDrawArea(v) {
    this.drawAreaMode = v;
    this.lockGraph(v);
    if (v) {
      this.isCellMovable = function(cell) {
        return true;
      };

      // // const spaceWidth = document.getElementById("workspace").offsetWidth > 480 ? document.getElementById("workspace").offsetWidth - 300 : document.getElementById("workspace").offsetWidth;
      // const spaceWidth = document.getElementById("workspace").offsetWidth - 300;
      // const spaceHeight =
      //     document.getElementById("workspace").offsetHeight > 280 ?
      //     document.getElementById("workspace").offsetHeight - 180 :
      //     document.getElementById("workspace").offsetHeight;
      // const pageWidth = this.pageFormat.width;
      // const pageHeight = this.pageFormat.height;
      // let psWidthScale = pageWidth / spaceWidth;
      // let psHeightScale = pageHeight / spaceHeight;
      // let widthScale = spaceWidth / pageWidth;
      // let heightScale = spaceHeight / pageHeight;
      // // console.log(spaceWidth, pageWidth,window.innerWidth/1152);

      // // this.view.scaleAndTranslate(Math.min(widthScale, heightScale, psWidthScale, psHeightScale), 0, 0);
      // // this.view.scaleAndTranslate(psWidthScale, 0, 0);
      // this.view.scaleAndTranslate(spaceWidth / 1152, 0, 0);
    }
  }

  lockGraph(v) {
    this.setConnectable(!v);
    this.isCellLocked = function(cell) {
      return v;
    };
  }

  clearBackground() {
    this.backgroundImage = null;
    this.container.style.backgroundColor = null;
    this.view.validateBackgroundImage();
  }

  doLayout(type) {
    Layout.execute(this, type);
  }

  //摄像头关联车位模式
  toggleCameraRelateParkingSpaceMode(flag) {
    this.cameraRelateParkingSpaceMode = flag;
    this.setPanning(flag);
    this.lockGraph(flag);
    mxVertexHandler.prototype.rotationEnabled = !flag;
  }

  areaDrawSvgColor(graph, cell, color) {
    console.log(cell, color);
    // let areaStyle = cell.style.match(
    //   /(?<=xml,).+(?=;)/
    // )[0]

    cell.style = cell.style.replace(
      /fill="([\s\S]*?)\" stroke/,
      'fill="' + color + '" stroke'
    );

    graph.refresh();
  }

  areaDrawSvgBorderColor(graph, cell, color) {
    cell.style = cell.style.replace(
      /stroke="([\s\S]*?)\" stroke-width/,
      'stroke="' + color + '" stroke-width'
    );

    graph.refresh();
  }

  areaDrawSvgBorderWidth(graph, cell, width) {
    cell.style = cell.style.replace(
      /stroke-width="([\s\S]*?)\"\/\>\<\/g/,
      'stroke-width="' + width + '"/></g'
    );

    graph.refresh();
  }

  destory() {
    if (!this.destroyed) {
      this.destroyed = true;

      if (this.tooltipHandler != null) {
        this.tooltipHandler.destroy();
      }

      if (this.selectionCellsHandler != null) {
        this.selectionCellsHandler.destroy();
      }

      if (this.panningHandler != null) {
        this.panningHandler.destroy();
      }

      if (this.popupMenuHandler != null) {
        this.popupMenuHandler.destroy();
      }

      if (this.connectionHandler != null) {
        this.connectionHandler.destroy();
      }

      if (this.graphHandler != null) {
        this.graphHandler.destroy();
      }

      if (this.cellEditor != null) {
        this.cellEditor.destroy();
      }

      if (this.view != null) {
        this.view.destroy();
      }

      if (this.model != null && this.graphModelChangeListener != null) {
        this.model.removeListener(this.graphModelChangeListener);
        this.graphModelChangeListener = null;
      }

      mxEvent.removeAllListeners(document);
      if (this.container) this.container = null;

      this.destroy();
    }
  }
}
