import mxgraph from "../core/index.js";
import UID from "@tools/util/lib/uid";
const { mxDragSource, mxEvent, mxUtils, mxCell, mxGeometry, mxPoint } = mxgraph;

function insert(graph, dom, target, x, y) {
  const label = dom.getAttribute("label");
  const resourceClassId = dom.getAttribute("resourceClassId");
  const keyName = dom.getAttribute("keyName");
  const tableName = dom.getAttribute("tableName");
  const width = Number(dom.getAttribute("width") || 30);
  const height = Number(dom.getAttribute("height") || 30);
  const type = dom.getAttribute("type"); //cell类型 节点还是边
  const itemType = dom.getAttribute("itemType"); //节点类型
  let shapeStyle = dom.getAttribute("shapeStyle");
  let rank = dom.getAttribute("rank");

  const imgSrc = dom.getAttribute("img");
  if (type === "vertex" && !shapeStyle && imgSrc) {
    shapeStyle =
      "shape=image;html=1;verticalLabelPosition=bottom;verticalAlign=top;imageAspect=0;image=" +
      imgSrc;
  }

  const data = {
    label,
    keyName,
    tableName,
    type,
    itemType,
    resourceClassId,
    isExtendClass: rank == "2"
  };

  const parent = graph.getDefaultParent();

  if (type === "vertex") {
    const vertex = graph.insertVertex(
      parent,
      UID(2),
      label,
      x,
      y,
      width,
      height,
      shapeStyle
    );
    vertex.data = data;
  } else if (type === "edge") {
    let edgeStyle = shapeStyle || "strokeWidth=6;endArrow=none;html=1;";
    var cell = new mxCell(
      label,
      new mxGeometry(0, 0, width, height),
      edgeStyle
    );
    cell.geometry.setTerminalPoint(new mxPoint(x, y), true);
    cell.geometry.setTerminalPoint(new mxPoint(x + width, y + height), false);
    cell.geometry.relative = true;
    cell.edge = true;
    cell.data = data;
    graph.addCells([cell]);
  }
}

export default (graph, ele) => {
  const dropValidate = function(evt) {
    const x = mxEvent.getClientX(evt);
    const y = mxEvent.getClientY(evt);
    // 获取 x,y 所在的元素
    const elt = document.elementFromPoint(x, y);
    // 如果鼠标落在graph容器
    if (mxUtils.isAncestorNode(graph.container, elt)) {
      return graph;
    }
    // 鼠标落在其他地方
    return null;
  };

  // drop成功后新建一个元素
  const dropSuccessCb = function(graph, evt, target, x, y) {
    insert(graph, this.element, target, x, y);
  };

  mxDragSource.removeDragElement;

  const width = Number(ele.getAttribute("width") || 32);
  const height = Number(ele.getAttribute("height") || 32);
  const dragElt = document.createElement("div");
  dragElt.setAttribute(
    "style",
    `border: 1px dashed #0CBABD; width: ${width}px; height: ${height}px;`
  );

  const ds = mxUtils.makeDraggable(
    ele,
    dropValidate,
    dropSuccessCb,
    dragElt,
    0,
    0,
    // -25,
    // -25,
    null,
    true
  );

  // Restores original drag icon while outside of graph
  ds.createDragElement = mxDragSource.prototype.createDragElement;
};
