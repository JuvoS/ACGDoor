import mxgraph from "./index";
import Vue from "vue";
import GraphXMLUtils from "./GraphXMLUtils";
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
  mxRectangle,
} = mxgraph;

const GraphBaseConstant = {
  /** 高亮颜色 */
  HIGHLIGHT_COLOR: "#ff0000",
  /**  */
  TRANSPARENT: "transparent",
};

class GraphBase extends mxGraph {
  constructor(...args) {
    super(...args);
    this._init();
    this.highlightHandlerMap = {};
  }

  /**
   * 初始化，
   * 子类重载此方法必须先调用： super._init();
   * @returns {void}
   * @author Chorin <xiaolinxuan@foxmail.com>
   * @date 2019-12-06
   */
  _init(that) {
    that = that || this;
    // this.isDark = Vue.ls.get("THEME") === "dark";
  }

  /**
   * 加载XML
   * 子类重载此方法必须调用： super.loadXML()
   * @returns {void}
   * @author Chorin <xiaolinxuan@foxmail.com>
   * @date 2019-12-12
   */
  loadXML(xml, options = {}) {
    this.highlightHandlerMap = {};
  }

  /**
   * 创建高亮处理器
   * @returns {void}
   * @author Chorin <xiaolinxuan@foxmail.com>
   * @date 2019-12-06
   */
  createHighlightHandler(
    id = "",
    borderColor = GraphBaseConstant.HIGHLIGHT_COLOR,
    borderWidth = 2
  ) {
    let highlightHandler = {};
    if (id in this.highlightHandlerMap) {
      highlightHandler = this.highlightHandlerMap[id];
    } else {
      highlightHandler = new mxCellHighlight(this, borderColor, borderWidth);
      this.highlightHandlerMap[id] = highlightHandler;
    }
    return highlightHandler;
  }

  /**
   * 获取state
   * @returns {void}
   * @author Chorin <xiaolinxuan@foxmail.com>
   * @date 2019-12-06
   */
  getState(mxCell) {
    return this.view.getState(mxCell);
  }

  /**
   * 批量删除高亮处理器
   * @returns {void}
   * @author Chorin <xiaolinxuan@foxmail.com>
   * @date 2020-01-10
   */
  batchDeleteHighlightHandler(mxCellList) {
    mxCellList.forEach((mxCell) => {
      mxCell.id in this.highlightHandlerMap &&
        delete this.highlightHandlerMap[mxCell.id];
    });
  }

  /**
   * 重设高亮
   * @returns {void}
   * @author Chorin <xiaolinxuan@foxmail.com>
   * @date 2020-01-10
   */
  batchResetHighlight(mxCellList, borderColor) {
    console.log("##### batchResetHighlight", mxCellList, borderColor);
    this.batchClearHighlight(mxCellList);
    this.batchDeleteHighlightHandler(mxCellList);
    this.batchSetHighlight(mxCellList, borderColor);
  }

  /**
   * 批量设置高亮
   * @returns {void}
   * @author Chorin <xiaolinxuan@foxmail.com>
   * @date 2019-12-06
   */
  batchSetHighlight(mxCellList, borderColor) {
    console.log("##### batchSetHighlight", mxCellList, borderColor);

    mxCellList.forEach((mxCell) => {
      this.createHighlightHandler(mxCell.id, borderColor).highlight(
        this.getState(mxCell)
      );
    });
  }

  /**
   * 批量清除高亮
   * @returns {void}
   * @author Chorin <xiaolinxuan@foxmail.com>
   * @date 2019-12-06
   */
  batchClearHighlight(mxCellList) {
    mxCellList.forEach((mxCell) => {
      this.createHighlightHandler(mxCell.id).hide();
    });
  }

  /**
   * 批量删除cell
   * @returns {void}
   * @author Chorin <xiaolinxuan@foxmail.com>
   * @date 2019-12-06
   */
  batchRemoveCells(mxCellList) {
    this.removeCells(mxCellList);
  }

  /**
   * 批量增加cell
   * @returns {void}
   * @author Chorin <xiaolinxuan@foxmail.com>
   * @date 2019-12-06
   */
  batchAddCells(mxCellList) {
    this.addCells(mxCellList);
  }

  /**
   * 从XML DOM 中删除节点
   * @param {Object} [options=]
   * @param {Array} options.onlyExclude 仅删除元素的keyName数组
   * @param {Array} options.onlyInclude 仅保留元素的keyName数组
   * @returns {void}
   * @author Chorin <xiaolinxuan@foxmail.com>
   * @date 2019-12-12
   */
  batchDeleteCellFromXMLDOM(document, options = {}) {
    let { onlyExclude, onlyInclude } = options;
    if (!onlyExclude && !onlyInclude) {
      return;
    }
    let deleteDOMList = GraphXMLUtils.getMXCellDOMList(document, options);
    GraphXMLUtils.batchDeleteXMLDOM(deleteDOMList);
  }

  /**
   * 向XMLDOM中设置样式
   * @param {Object} [options=]
   * @param {Array} options.onlyExclude 仅删除元素的keyName数组
   * @param {Array} options.onlyInclude 仅保留元素的keyName数组
   * @param {Array} options.style  styleMap SVG/Canvas style 样式对象,
   * @returns {void}
   * @author Chorin <xiaolinxuan@foxmail.com>
   * @date 2019-12-12
   */
  batchSettingStyleFromXMLDOM(document, options = {}) {
    let { onlyExclude, onlyInclude } = options;
    if (!onlyExclude && !onlyInclude) {
      return;
    }
    let deleteDOMList = GraphXMLUtils.getMXCellDOMList(document, options);
    GraphXMLUtils.batchSettingXMLStyle(deleteDOMList, options.style || {});
  }

  /** 以下是废弃，但为了兼容而保留的方法 */

  /// 2019-12-06 Chorin:
  /// 此方法有问题，只能高亮最后一个元素，
  /// 为了兼容，故保留此方法，高亮请使用 `batchSetHighlight`方法
  highlightCells(cells) {
    this.highlight = new mxCellHighlight(this, "#ff0000", 2);
    cells.forEach((cell) => this.highlight.highlight(this.view.getState(cell)));
  }

  /// 2019-12-06 Chorin:
  /// 此方法有问题，并非清除，只会显示黑色边框
  ///  为了兼容，故保留此方法，清除高亮请使用 `batchClearHighlight`方法
  clearHighlightCells(cells) {
    this.highlight = new mxCellHighlight(this, "#000000", 2);
    cells.forEach((cell) => this.highlight.highlight(this.view.getState(cell)));
  }

  /** 兼容保留方法-END */
}

export { GraphBase, mxgraph, GraphBaseConstant };
