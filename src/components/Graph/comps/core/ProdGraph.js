import { mxgraph, GraphBase } from "./GraphBase";
import defaultConfig from "../plugins/defaultPreviewConfig";
import tooltip from "../plugins/tooltip";
import adaption from "../plugins/adaption";
// import dynamicLoad from "../plugins/dynamicLoad";

const {
  mxGraph,
  mxImage,
  mxCodec,
  mxUtils,
  mxPoint,
  mxCellHighlight,
  mxCellOverlay,
  mxConstants,
  mxEventObject,
} = mxgraph;

/**
 * 生产Graph类
 */
export default class ProdGraph extends GraphBase {
  _init() {
    super._init();
    defaultConfig(this, this.isDark);
    tooltip(this);
  }

  loadXML(xml, hideBg, options = {}) {
    super.loadXML(xml);
    this.clear();
    this.getModel().beginUpdate();
    try {
      const doc = mxUtils.parseXml(xml);
      const root = doc.documentElement;

      // this.batchDeleteCellFromXMLDOM(root, options.filterOptions || {});
      // this.batchSettingStyleFromXMLDOM(root, options.styleOptions || {});

      const dec = new mxCodec(root.ownerDocument);
      dec.decode(root, this.getModel());

      var bgColor = root.getAttribute("backgroundColor");
      // if (
      //   this.isDark &&
      //   (bgColor === "white" || bgColor === "rgb(255, 255, 255)")
      // ) {
      //   this.container.style.backgroundColor = null;
      // } else {
      this.container.style.backgroundColor = bgColor;
      // }

      // Sets background image
      var bgImg = root.getAttribute("backgroundImage");
      var bgDx = root.getAttribute("dx") || 0;
      var bgDy = root.getAttribute("dy") || 0;
      if (bgImg) {
        adaption(this, bgImg, bgDx, bgDy, hideBg);
      } else {
        this.backgroundImage = "none";
      }
    } finally {
      this.getModel().endUpdate();
    }

    let edgeArr = [];
    Object.values(this.getModel().cells).forEach((cell) => {
      let style = this.getCellStyle(cell);
      let noLabel = mxUtils.getValue(style, mxConstants.STYLE_NOLABEL);
      if (noLabel) cell.isTextHidden = noLabel;
      if (cell.data) {
        cell.data = JSON.parse(cell.data);

        this.toggleSingleCellTextShow(cell, true);
        if (cell.edge) {
          // this.model.setValue(cell, "");
          if (cell.data.type === "edge" && cell.data.tableName) {
            this.setEdgeFlow(cell);
            edgeArr.push(cell);
          }
        }

        //添加下钻标识
        const canDrill = _.get(cell, "data.canDrill", false);
        if (canDrill) {
          // this.addCanDrill(cell);
        }
      }
    });

    this.setLineLow(edgeArr);
    this.fireEvent(new mxEventObject("anim-txt"));
  }

  dynamicLoad(data, resClass, state, fileObj = {}) {
    // dynamicLoad(this, data, resClass, state, fileObj);

    this.fireEvent(new mxEventObject("anim-txt"));
  }

  toggleAnimRun(v) {
    this.animState = false;
    if (v) this.animState = true;

    this.animCellsShow();
  }

  animCellsShow() {
    let cells = _.values(this.model.cells);
    cells.forEach((cell) => {
      this.animCellShow(cell);
    });
  }

  animCellShow(cell) {
    if (cell.data) {
      if (cell.edge) {
        if (cell.data.type === "edge" && cell.data.tableName) {
          this.setEdgeFlow(cell);
        }
      }
    }
  }

  toggleTextShow(v) {
    let cells = _.values(this.model.cells);
    cells.forEach((cell) => {
      this.toggleSingleCellTextShow(cell, v);
    });
  }

  toggleSingleCellTextShow(cell, v) {
    let keyName = _.get(cell, "data.keyName", "");
    let tableName = _.get(cell, "data.tableName", "");
    let isTextHidden = _.get(cell, "isTextHidden", 0);
    if ((keyName || tableName) && isTextHidden != 1) {
      this.model.setStyle(
        cell,
        mxUtils.setStyle(
          this.model.getStyle(cell),
          mxConstants.STYLE_NOLABEL,
          v ? 1 : 0
        )
      );
    }
    if (cell.data) {
      if (cell.edge) {
        if (cell.data.type === "edge" && cell.data.tableName) {
          this.setEdgeFlow(cell);
        }
      }
    }
  }

  getResources() {
    let result = [];
    Object.values(this.getModel().cells).forEach((cell) => {
      const bindData = _.get(cell.data, "bindData", "");
      if (bindData) {
        result.push(bindData);
      }
    });
    return result;
  }

  //返回指定指标下有指标的cell
  getKpiCells() {
    const cells = Object.values(this.getModel().cells);
    const kpiCells = _.filter(cells, (v) => {
      return _.get(v, "data.isKpi", false);
    });
    return kpiCells;
  }
  //返回独立指标cell
  getSingleKpiCells() {
    const cells = Object.values(this.getModel().cells);
    const kpiCells = _.filter(cells, (v) => {
      return _.get(v, "data.isSingleKpi", false);
    });
    return kpiCells;
  }

  //重置单指标渲染
  setSingleKpiPane(type, title, val) {
    let txt = "";
    switch (type) {
      case "CTM":
        txt =
          `<div class="graph-prod"><div>` +
          title +
          `</div>` +
          `<div class="graph-prod-btn">` +
          val +
          `</div></div>`;
        break;
      case "PM":
        txt =
          `<div class="graph-prod">` +
          `<div>` +
          val +
          `</div>` +
          `<div class="graph-prod-cell graph-prod-active">` +
          title +
          `</div></div>`;
        break;
      case "CM":
        txt =
          `<div class="graph-prod">` +
          `<div>` +
          val +
          `</div>` +
          `<div class="graph-prod-cell">` +
          title +
          `</div></div>`;
        break;
      default:
        break;
    }

    return txt;
  }

  //根据专业进行过滤
  filterByDomain(domain) {
    const cells = this.getModel().getChildren(this.getDefaultParent());
    if (!cells) return;
    let showArr = [];
    let hideArr = [];
    cells.forEach((cell) => {
      const cellDomain = _.get(cell, "data.bindData.domain", null);
      if (domain === "showAllDomain") {
        showArr.push(cell);
      } else if (cellDomain) {
        if (cellDomain == domain) {
          showArr.push(cell);
        } else {
          hideArr.push(cell);
        }
      }
    });
    this.showCells(showArr);
    this.hideCells(hideArr);
  }
  //根据KeyName进行过滤
  filterByKeyName(keyName) {
    const cells = this.getModel().getChildren(this.getDefaultParent());
    if (!cells) return;
    cells.forEach((cell) => {
      const cellKeyName = _.get(cell, "data.keyName", null);
      if (keyName === "showAll") {
        this.model.setVisible(cell, true);
      } else {
        this.model.setVisible(cell, cellKeyName == keyName);
      }
    });
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

  /**
   * 设置元素填充颜色
   * @param {Object} cell
   * @param {String} color
   */
  setCellFill(cell, color) {
    this.model.setStyle(
      cell,
      mxUtils.setStyle(
        this.model.getStyle(cell),
        mxConstants.STYLE_FILLCOLOR,
        color
      )
    );
  }

  setCellsOneFill(cellList, fill) {
    let arr = [];
    for (let i in cellList) {
      arr.push({ cell: cellList[i], fill: fill });
    }

    this.setCellsFill(arr);
  }
  setCellsFill(cellFilList) {
    cellFilList.forEach((ele) => {
      this.setCellFill(ele.cell, ele.fill);
    });
  }

  //动画线条设定
  setEdgeFlow(cell) {
    var state = this.view.getState(cell);
    if (!state) return;
    const path0 = state.shape.node.getElementsByTagName("path")[0];
    if (path0) {
      path0.removeAttribute("visibility");
      path0.setAttribute("stroke-width", "0");
      path0.setAttribute("stroke", "lightGray");
    }

    const path1 = state.shape.node.getElementsByTagName("path")[1];
    if (path1) {
      path1.setAttribute("class", "flow");
      if (!_.get(this, "animState", false)) {
        path1.removeAttribute("class", "flow");
      }
    }
  }

  setLineLow(cells) {
    this.orderCells(true, cells);
  }

  addCanDrill(cell) {
    const img = new mxImage(`static/mxgraph/images/state/drill.svg`, 16, 16);
    const overlay = new mxCellOverlay(img, "", null, null, null, "default");
    overlay.data = { type: "drill" };
    // alarmOverlay.addListener(mxEvent.CLICK, function(sender, evt) {
    //   mxUtils.alert("\nLast update: " + new Date());
    // });
    this.addCellOverlay(cell, overlay);
  }

  //设置告警
  addAlarm(alarm) {
    const resId = _.get(alarm, "objectId", 0);
    const severity = _.get(alarm, "severity", 0);
    const cell = this.getModel().getCell(resId);

    if (!cell) return;

    const img = new mxImage(
      `static/mxgraph/images/alarm/lv${severity}.gif`,
      16,
      16
    );

    const { width, height } = cell.geometry;
    const offset = new mxPoint(-width, -height);
    const overlay = new mxCellOverlay(
      img,
      "告警级别" + severity,
      null,
      null,
      offset,
      "pointer"
    );

    overlay.data = { type: "alarm" };
    let _this = this;
    overlay.addListener("click", function(sender, evt) {
      _this.fireEvent(new mxEventObject("alarm-info", "alarm", alarm));
    });
    this.addCellOverlay(cell, overlay);
  }

  clearAlarm(alarm) {
    const resId = _.get(alarm, "objectId", 0);
    const cell = this.getModel().getCell(resId);
    const overlays = cell.overlays;
    if (cell && overlays) {
      const alarmOverlay = overlays.find(
        (ol) => _.get(ol, "data.type", null) == "alarm"
      );
      if (alarmOverlay) {
        this.removeCellOverlay(cell, alarmOverlay);
      }
    }
  }

  //设置运行状态
  addOperateStatus() {}

  clearOperateStatus(alarm) {
    const resId = _.get(alarm, "objectId", 0);
    return this.clearResOverlay(resId, "operate");
  }
  addResOverlay(resId, title, overlayType, pic, offsetX, offsetY, callback) {
    const cell = this.getModel().getCell(resId);
    if (!cell) return;

    const { width, height } = cell.geometry;
    let imgW = 8;
    if (width / 2 < imgW) imgW = width / 2;
    const img = new mxImage(pic, imgW * 2, imgW * 2);

    // const offset = new mxPoint(width + imgW, height + imgW);
    const offset = new mxPoint(0, -height);
    const overlay = new mxCellOverlay(
      img,
      title,
      null,
      null,
      offset,
      "pointer"
    );

    overlay.data = { type: overlayType };
    overlay.addListener("click", function(sender, evt) {
      callback(sender, evt);
    });
    this.addCellOverlay(cell, overlay);
  }
  clearResOverlay(resId, type) {
    const cell = this.getModel().getCell(resId);
    const overlays = cell.overlays;
    if (cell && overlays) {
      const overlayTmp = overlays.find(
        (ol) => _.get(ol, "data.type", null) == type
      );
      if (overlayTmp) {
        this.removeCellOverlay(cell, overlayTmp);
      }
    }
  }

  clear() {
    this.getModel().clear();
    //重置背景
    this.backgroundImage = "none";
    this.animState = false;
  }

  clearBackStroke(cell) {
    this.model.setStyle(
      cell,
      mxUtils.setStyle(
        this.model.getStyle(cell),
        mxConstants.STYLE_FILLCOLOR,
        "none"
      )
    );
    this.model.setStyle(
      cell,
      mxUtils.setStyle(
        this.model.getStyle(cell),
        mxConstants.STYLE_STROKECOLOR,
        "none"
      )
    );
  }

  getXML() {
    const model = _.cloneDeep(this.getModel());
    Object.values(model.cells).forEach((cell) => {
      if (cell.data) {
        cell.data = JSON.stringify(cell.data);
      }
    });
    const enc = new mxCodec(mxUtils.createXmlDocument());
    const node = enc.encode(model);

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

    if (this.backgroundImage != null) {
      node.setAttribute(
        "backgroundImage",
        JSON.stringify(this.backgroundImage)
      );
    }
  }

  logXml() {
    console.log("XML is:", this.getXML());
  }

  resetView() {
    this.view.scaleAndTranslate(1, 0, 0);
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

      this.container = null;
    }
  }
}
