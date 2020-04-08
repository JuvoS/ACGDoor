import { mxgraph, GraphBase } from "./GraphBase";
import defaultConfig from "../plugins/defaultPreviewConfig";
import tooltip from "../plugins/tooltip";
import cellFoldable from "../plugins/cellFoldable";
import adaption from "../plugins/adaption";

const {
  mxGraph,
  mxImage,
  mxCodec,
  mxUtils,
  mxPoint,
  mxCellHighlight,
  mxCellOverlay,
  mxConstants
} = mxgraph;

/**
 * 纯查看Graph类
 */
export default class PreviewGraph extends GraphBase {
  _init() {
    super._init();
    defaultConfig(this, this.isDark);
    tooltip(this);
    cellFoldable(this);
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

  /// 2019-12-12 Chorin: 增加options:{filterOptions, styleOptions, }
  loadXML(xml, options = {}) {
    super.loadXML(xml, options);
    this.clear();
    this.getModel().beginUpdate();
    try {
      const doc = mxUtils.parseXml(xml);
      const root = doc.documentElement;
      this.batchDeleteCellFromXMLDOM(root, options.filterOptions || {});
      this.batchSettingStyleFromXMLDOM(root, options.styleOptions || {});

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
      var bgDx = root.getAttribute("dx") || 0;
      var bgDy = root.getAttribute("dy") || 0;
      if (bgImg) {
        adaption(this, bgImg, bgDx, bgDy, this.isDark);
      } else {
        this.backgroundImage = "none";
      }
    } finally {
      this.getModel().endUpdate();
    }
    Object.values(this.getModel().cells).forEach(cell => {
      if (cell.data) {
        cell.data = JSON.parse(cell.data);
        // if (cell.edge) {
        //   // this.model.setValue(cell, "");
        //   if (cell.data.type === "edge" && cell.data.tableName) {
        //     this.setEdgeFlow(cell);
        //   }
        // }

        //添加下钻标识
        const canDrill = _.get(cell, "data.canDrill", false);
        if (canDrill) {
          // this.addCanDrill(cell);
        }
      }
    });

    this.hideFromWatch();
  }

  hideFromWatch() {
    _.values(this.getModel().cells).forEach(cell => {
      let isWatchHidden = _.get(cell, "isWatchHidden", 0) == 0;
      this.getModel().setVisible(cell, isWatchHidden);
    });
  }

  //根据专业进行过滤
  filterByDomain(domain) {
    const cells = this.getModel().getChildren(this.getDefaultParent());
    cells.forEach(cell => {
      const cellDomain = _.get(cell, "data.bindData.domain", null);
      if (domain === "showAllDomain") {
        this.model.setVisible(cell, true);
      } else {
        this.model.setVisible(cell, cellDomain == domain);
      }
    });
  }

  setEdgeFlow(cell) {
    var state = this.view.getState(cell);
    const path0 = state.shape.node.getElementsByTagName("path")[0];
    if (path0) {
      path0.removeAttribute("visibility");
      path0.setAttribute("stroke-width", "12");
      path0.setAttribute("stroke", "lightGray");
    }

    const path1 = state.shape.node.getElementsByTagName("path")[1];
    if (path1) {
      path1.setAttribute("class", "flow");
    }
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
    const alarmOverlay = new mxCellOverlay(
      img,
      "告警级别" + severity,
      null,
      null,
      offset,
      "pointer"
    );

    // alarmOverlay.addListener(mxEvent.CLICK, function(sender, evt) {
    //   mxUtils.alert("\nLast update: " + new Date());
    // });
    this.addCellOverlay(cell, alarmOverlay);
  }

  clearAlarm(alarm) {
    const resId = _.get(alarm, "objectId", 0);
    const cell = this.getModel().getCell(resId);
    this.removeCellOverlays(cell);
  }

  clear() {
    this.getModel().clear();
    this.backgroundImage = null;
  }

  getXML() {
    const model = _.cloneDeep(this.getModel());
    Object.values(model.cells).forEach(cell => {
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

    return mxUtils.getPrettyXml(node);
  }

  logXml() {
    console.log("XML is:", this.getXML());
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
