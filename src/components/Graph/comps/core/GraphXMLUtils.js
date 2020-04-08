/**
 * Graph XML 工具
 * @returns {void}
 * @author Chorin <xiaolinxuan@foxmail.com>
 * @date 2019-12-12
 */
// import DataCook from "@/utils/data-cook";
class GraphXMLUtils {
  /**
   * 获取mxCellDOM的data
   * @param {Object} mxCellDOM
   * @returns {void}
   * @author Chorin <xiaolinxuan@foxmail.com>
   * @date 2019-12-12
   */
  getData(mxCellDOM) {
    let dataString =
      (mxCellDOM.attributes &&
        mxCellDOM.attributes.data &&
        mxCellDOM.attributes.data.value) ||
      "{}";
    let data = JSON.parse(dataString);
    data.bindData = data.bindData || { type: "default" };
    data.keyName = data.keyName || "default";
    return data;
  }

  /**
   * 获取XML节点列表
   * 1. 过滤条件以 data.type or data.keyName 进行判断
   * @param {Object} xmlDocument xml文档对象
   * @param {Object} [options=]
   * @param {Array} options.onlyExclude 仅删除元素的keyName数组
   * @param {Array} options.onlyInclude 仅保留元素的keyName数组
   * @returns {Object[]} DOMList
   * @author Chorin <xiaolinxuan@foxmail.com>
   * @date 2019-12-12
   */
  getMXCellDOMList(xmlDocument, options) {
    let mxCellList = xmlDocument.getElementsByTagName("mxCell");
    let xmlDOMList = [];

    /// 预处理，判断是onlyExclude还是onlyInclude
    /// 当 onlyExclude 与 onlyInclude同时存在时以onlyExclude为主
    let { onlyExclude, onlyInclude } = Object.assign(
      { onlyExclude: [], onlyInclude: [] },
      options
    );
    if (onlyExclude.length === 0 && onlyInclude.length === 0) {
      return mxCellList;
    }

    let isOnlyExclude = onlyExclude.length > 0;
    // let keyMap = DataCook.listToMap(isOnlyExclude ? onlyExclude : onlyInclude);
    // for (let i in mxCellList) {
    //     let mxCell = mxCellList[i];
    //     let data = this.getData(mxCell);

    //     if (isOnlyExclude) {
    //         if (data.bindData.type in keyMap || data.keyName in keyMap) {
    //             mxCell.parentNode && xmlDOMList.push(mxCell);
    //         }
    //     } else {
    //         if (!(data.bindData.type in keyMap) && !(data.keyName in keyMap)) {
    //             mxCell.parentNode && xmlDOMList.push(mxCell);
    //         }
    //     }
    // }
    return xmlDOMList;
  }

  /**
   * 批量删除XML DOM 节点
   * @param {Object []} domList 目标节点列表
   * @returns {void}
   * @author Chorin <xiaolinxuan@foxmail.com>
   * @date 2019-12-12
   */
  batchDeleteXMLDOM(domList = []) {
    for (let i in domList) {
      let dom = domList[i];
      /// id 为0或1的为文档根节点，允许删除
      if (dom.id === "1" || dom.id === "0") {
        continue;
      }
      dom.parentNode && dom.parentNode.removeChild(dom);
    }
  }

  /**
   * 批量设置样式
   * @param {Object []} domList 目标节点列表
   * @param {Object} styleMap SVG/Canvas style 样式对象,
   * @returns {void}
   * @author Chorin <xiaolinxuan@foxmail.com>
   * @date 2019-12-12
   */
  batchSettingXMLStyle(domList = [], styleMap = {}) {
    for (let i in domList) {
      let dom = domList[i];
      let style = (dom.attributes && dom.attributes.style) || {};
      // style.value = style.value + DataCook.mapToKVString(styleMap);
    }
  }
}

export default new GraphXMLUtils();
