/**
 * 根据模板组态布局
 */
import mxgraph from "../../core/index.js";
const { mxImage, mxConstants } = mxgraph;

import DataCook from "@/utils/data-cook";

//设置指标信息
let setSingleKpi = (graph, cell, relaCell, type, title, val) => {
  graph.clearBackStroke(cell);
  graph.model.setValue(
    cell,
    graph.setSingleKpiPane(type, title, DataCook.getNonNull(val, "-"))
  );
  graph.setCellStyles(mxConstants.STYLE_WHITE_SPACE, "nowrap");

  cell.isSingleBox = true;
  cell.singleId = relaCell.id;
  cell.singleKpiKey = cell.data.kpiKey;
  cell.data.serialTxt = relaCell.name;
  cell.data.id = relaCell.id;
};

let setImportantKpi = (graph, cells, kpis, relaCellData) => {
  let cellArr = cells;
  cellArr.forEach(ele => {
    let kpiObj = _.find(kpis, { kpi_key: _.get(ele, "cell.data.kpiKey", "") });
    let kpiType = _.get(ele, "cell.data.kpiType", "");
    if (kpiType == "CTM") {
      ele.cell.isSingleBtn = true;
      ele.cell.singleId = relaCellData.id;
      ele.cell.data.serialTxt = relaCellData.name;
      ele.cell.data.id = relaCellData.id;
    } else if (kpiObj) {
      graph.model.setVisible(ele.cell, true);
      setSingleKpi(graph, ele.cell, relaCellData, kpiType, kpiObj.kpi_name, "");
    }
  });
};

//设置单设备实例指标模板
let setSingleInstance = (graph, data) => {
  let cellsModel = graph.getModel().cells;
  let modelArr = [];
  let singleArr = [];
  _.values(cellsModel).forEach(ele => {
    if (_.get(ele, "data.isSingleKpi", false))
      singleArr.push({ cell: ele, singleSerial: data.serial });
    if (ele.data && !_.get(ele, "data.isSingleKpi", false)) modelArr.push(ele);
  });

  modelArr.forEach(ele => {
    delete ele.serial;
    ele.data = { ...data, bindData: data };
    ele.id = data.id;
    if (singleArr.length > 0)
      singleArr.forEach(el => {
        graph.model.setVisible(el.cell, false);

        let kpiType = _.get(el, "cell.data.kpiType", "");
        let kpiObj = _.get(el, "cell.data.kpiInfo", "");
        if (kpiType == "CTM") {
          el.cell.isSingleBtn = true;
          el.cell.singleId = ele.data.id;
          el.cell.data.serialTxt = ele.data.serial;
          el.cell.data.id = ele.data.id;
        } else if (kpiObj) {
          graph.model.setVisible(el.cell, true);
          setSingleKpi(graph, el.cell, ele.data, kpiType, kpiObj.kpiName, "");
        }
      });
  });
};

//设置多设备实例指标模板
let setDoubleInstance = (graph, data) => {
  const { relations } = data;
  let relaData = [];
  _.forEach(relations, o => {
    relaData.push(o.device);
  });

  let relaGroups = _.groupBy(relaData, "parentKeyName");
  let cellsModel = graph.getModel().cells;
  let cellsGroups = _.groupBy(cellsModel, "data.keyName");
  let singleArr = [];
  _.values(cellsModel).forEach(ele => {
    if (_.get(ele, "data.isSingleKpi", false))
      singleArr.push({ cell: ele, singleSerial: ele.data.serialTxt });
  });
  singleArr.forEach(ele => {
    graph.model.setVisible(ele.cell, false);
  });
  _.keys(relaGroups).forEach(ele => {
    let orderData = _.orderBy(relaGroups[ele], "serial");
    _.orderBy(
      _.forEach(cellsGroups[ele], o => {
        return (o.serial = _.get(o, "data.serial"));
      }),
      "serial"
    ).forEach((el, index) => {
      let singleCells = _.filter(singleArr, { singleSerial: el.serial });

      delete el.serial;
      el.data = { bindData: orderData[index], ...orderData[index] };
      if (orderData[index].name) el.data.name = orderData[index].name || "-";
      el.id = orderData[index].id;
      if (singleCells.length > 0)
        setImportantKpi(graph, singleCells, el.data.importanceKpi, el.data);
    });
  });
  setDoubleSelf(graph, data, singleArr);
};

let setDoubleSelf = (graph, data, kpiArr) => {
  let parentKeyName = _.get(data, "parentKeyName", "");
  let cellsModel = graph.getModel().cells;
  let modelArr = [];
  _.values(cellsModel).forEach(ele => {
    if (_.get(ele, "data.keyName", "") == parentKeyName)
      modelArr.push({ cell: ele, singleSerial: ele.data.serial });
  });

  modelArr.forEach(ele => {
    graph.model.setVisible(ele.cell, false);
    let tmp = _.find(kpiArr, { singleSerial: ele.singleSerial });

    delete ele.serial;
    ele.data = { ...data, bindData: data };
    ele.id = data.id;
    if (tmp) {
      graph.model.setVisible(tmp.cell, false);

      let kpiType = _.get(tmp, "cell.data.kpiType", "");
      let kpiObj = _.get(tmp, "cell.data.kpiInfo", "");
      if (kpiType == "CTM") {
        tmp.cell.isSingleBtn = true;
        tmp.cell.singleId = ele.data.id;
        tmp.cell.data.serialTxt = ele.data.serial;
        tmp.cell.data.id = ele.data.id;
      } else if (kpiObj) {
        graph.model.setVisible(tmp.cell, true);
        setSingleKpi(graph, tmp.cell, ele.data, kpiType, kpiObj.kpiName, "");
      }
    }
  });
};

export default (graph, data, fileData) => {
  graph.loadXML(fileData);

  let isSingleChild = false;
  let cellsModel = graph.getModel().cells;
  _.values(cellsModel).forEach(ele => {
    if (!ele.parent && _.get(ele, "isSingleChild", false)) isSingleChild = true;
  });
  if (isSingleChild) return setSingleInstance(graph, data);
  return setDoubleInstance(graph, data);
};
