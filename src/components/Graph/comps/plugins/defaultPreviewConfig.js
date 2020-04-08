import mxgraph from "../core/index.js";
const { mxConstants, mxPerimeter, mxGraph, mxEdgeHandler } = mxgraph;

const primaryColor = "#0CBABD";

export default (graph, isDark) => {
  graph.setPanning(true);
  graph.setEnabled(false);
  graph.setCellsMovable(false);
  graph.setCellsResizable(false);
  graph.setCellsDeletable(false);
  graph.setCellsBendable(false);
  graph.setCellsEditable(false);
  graph.setCellsDisconnectable(true);
  graph.setConnectableEdges(false);

  graph.setHtmlLabels(true);

  graph.setAllowDanglingEdges(false);
  graph.setDisconnectOnMove(false);

  graph.isCellLocked = function(cell) {
    return true;
  };
  // mxGraph.prototype.keepEdgesInBackground = true;
  // graph.centerZoom = true;
  graph.panningHandler.useLeftButtonForPanning = true;

  //选择线，两端元素也高亮
  // mxEdgeHandler.prototype.parentHighlightEnabled = true;

  mxConstants.VERTEX_SELECTION_COLOR = "#FF0000";
  mxConstants.VERTEX_SELECTION_STROKEWIDTH = 2;
  mxConstants.EDGE_SELECTION_COLOR = "#FF0000";
  mxConstants.EDGE_SELECTION_STROKEWIDTH = 2;

  // Creates the default style for vertices
  var style = [];
  style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
  style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
  style[mxConstants.STYLE_STROKECOLOR] = primaryColor;
  style[mxConstants.STYLE_ROUNDED] = true;
  style[mxConstants.STYLE_FILLCOLOR] = "#fff";
  // style[mxConstants.STYLE_GRADIENTCOLOR] = "#efefef";
  style[mxConstants.STYLE_FONTCOLOR] = isDark ? "#efefef" : "#444";
  style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
  style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
  style[mxConstants.STYLE_FONTSIZE] = "12";
  style[mxConstants.STYLE_FONTSTYLE] = 0;
  style[mxConstants.STYLE_ROTATABLE] = 0; //禁止旋转

  graph.getStylesheet().putDefaultVertexStyle(style);

  // Creates the default style for edges
  style = [];
  style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_CONNECTOR;
  style[mxConstants.STYLE_STROKECOLOR] = primaryColor;
  style[mxConstants.STYLE_STROKEWIDTH] = 2;
  style[mxConstants.STYLE_ROUNDED] = true;
  style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
  style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
  style[mxConstants.STYLE_EDGE] = mxConstants.EDGESTYLE_ORTHOGONAL;
  style[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_CLASSIC;
  style[mxConstants.STYLE_FONTSIZE] = "12";
  style[mxConstants.STYLE_FONTCOLOR] = "#333";
  style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = "#b2dfdb";
  graph.getStylesheet().putDefaultEdgeStyle(style);

  // mxEvent.addMouseWheelListener(function(evt, up) {
  //   console.log("TCL: evt", evt);
  //   if (
  //     evt.target.localName === "svg" ||
  //     evt.target.parentElement.localName === "g"
  //   ) {
  //     if (up) {
  //       graph.zoomIn();
  //     } else {
  //       graph.zoomOut();
  //     }

  //     mxEvent.consume(evt);
  //   }
  // });
};
