import mxgraph from "../core/index.js";
const {
  mxConstants,
  mxGraphHandler,
  mxEdgeHandler,
  mxEvent,
  mxPerimeter,
  mxRubberband,
  mxImage,
  mxVertexHandler,
  mxCellState,
  mxEllipse,
  mxShape,
  mxConstraintHandler,
  mxGraph,
  mxPoint,
  mxConnectionConstraint
} = mxgraph;

const primaryColor = "#0CBABD";

export default (graph, isDark) => {
  // Enables rubberband selection
  new mxRubberband(graph);

  mxGraphHandler.prototype.guidesEnabled = true;
  // // Defines the guides to be red (default)
  mxConstants.GUIDE_COLOR = "#FF0000";

  // // Defines the guides to be 1 pixel (default)
  mxConstants.GUIDE_STROKEWIDTH = 1;

  graph.setHtmlLabels(true);

  mxGraph.prototype.recursiveResize = true;

  //是否允许单独的连线存在
  // graph.setAllowDanglingEdges(false);

  // mxGraph.prototype.keepEdgesInBackground = true;

  // Creates the default style for vertices
  var style = [];
  style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
  style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
  style[mxConstants.STYLE_STROKECOLOR] = primaryColor;
  style[mxConstants.STYLE_ROUNDED] = true;
  style[mxConstants.STYLE_FILLCOLOR] = isDark ? "#1c1c1c" : "#fff";
  // style[mxConstants.STYLE_GRADIENTCOLOR] = "#efefef";
  style[mxConstants.STYLE_FONTCOLOR] = isDark ? "#efefef" : "#444";
  style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
  style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
  style[mxConstants.STYLE_FONTSIZE] = "10";
  style[mxConstants.STYLE_FONTSTYLE] = 0;

  graph.getStylesheet().putDefaultVertexStyle(style);

  //设备组合样式
  style = [];
  style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
  style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
  style[mxConstants.STYLE_STROKECOLOR] = primaryColor;
  style[mxConstants.STYLE_ROUNDED] = false;
  style[mxConstants.STYLE_FILLCOLOR] = primaryColor;
  style[mxConstants.STYLE_FONTCOLOR] = "#444";
  style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
  style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
  style[mxConstants.STYLE_FONTSIZE] = "10";
  style[mxConstants.STYLE_FONTSTYLE] = 0;
  graph.getStylesheet().putCellStyle("devicePort", style);

  // // Creates the default style for edges
  style = [];
  style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_CONNECTOR;
  style[mxConstants.STYLE_STROKECOLOR] = primaryColor;
  style[mxConstants.STYLE_STROKEWIDTH] = 2;
  style[mxConstants.STYLE_GRADIENTCOLOR] = "#efefef";
  style[mxConstants.STYLE_ROUNDED] = true;
  style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
  style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
  style[mxConstants.STYLE_EDGE] = mxConstants.EDGESTYLE_ORTHOGONAL;
  style[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_CLASSIC;
  style[mxConstants.STYLE_FONTSIZE] = "12";
  style[mxConstants.STYLE_FONTCOLOR] = "#333";
  style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = "#b2dfdb";
  graph.getStylesheet().putDefaultEdgeStyle(style);

  graph.setConnectable(true);
  // 设置拖拽线的过程出现折线，默认为直线
  graph.connectionHandler.createEdgeState = () => {
    const edge = graph.createEdge();
    return new mxCellState(graph.view, edge, graph.getCellStyle(edge));
  };
  //auto navigate
  mxEdgeHandler.prototype.snapToTerminals = true;

  graph.setConnectableEdges(false);
  graph.setDisconnectOnMove(true);

  //group
  graph.recursiveResize = true;

  //拖拽元素时边框样式
  mxGraphHandler.prototype.previewColor = primaryColor;

  //缩放从中间开始
  graph.centerZoom = true;

  // graph.pageVisible = true;
  graph.pageBreaksVisible = true;
  graph.preferPageSize = true;

  //可以拖拽
  graph.setPanning(true);

  mxVertexHandler.prototype.livePreview = true;
  mxVertexHandler.prototype.rotationEnabled = true;

  var touchHandle = new mxImage(
    "static/mxgraph/images/handle-main.png",
    17,
    17
  );
  mxVertexHandler.prototype.handleImage = touchHandle;
  // mxVertexHandler.prototype.singleSizer = true;
  mxVertexHandler.prototype.rotationHandleVSpacing = -20;

  //旋转样式
  var rotateHandle = new mxImage(
    "static/mxgraph/images/handle-rotate.png",
    19,
    21
  );
  var vertexHandlerCreateSizerShape =
    mxVertexHandler.prototype.createSizerShape;
  mxVertexHandler.prototype.createSizerShape = function(
    bounds,
    index,
    fillColor
  ) {
    this.handleImage =
      index == mxEvent.ROTATION_HANDLE
        ? rotateHandle
        : index == mxEvent.LABEL_HANDLE
        ? this.secondaryHandleImage
        : this.handleImage;

    return vertexHandlerCreateSizerShape.apply(this, arguments);
  };

  // 禁止从节点中心拖拽出线条
  // graph.connectionHandler.isConnectableCell = () => false;
  // mxEdgeHandler.prototype.isConnectableCell = () => false;

  // Overridden to define per-shape connection points
  mxGraph.prototype.getAllConnectionConstraints = terminal => {
    if (terminal != null && terminal.shape != null) {
      //如果节点是选中状态则不呈现连接点
      if (graph.isCellSelected(terminal.cell)) {
        return null;
      } else {
        if (terminal.shape.stencil != null) {
          if (terminal.shape.stencil != null) {
            return terminal.shape.stencil.constraints;
          }
        } else if (terminal.shape.constraints != null) {
          return terminal.shape.constraints;
        }
      }
    }

    return null;
  };

  // Defines the default constraints for all shapes
  mxShape.prototype.constraints = [
    new mxConnectionConstraint(new mxPoint(0, 0), true),
    new mxConnectionConstraint(new mxPoint(0, 1), true),
    new mxConnectionConstraint(new mxPoint(1, 0), true),
    new mxConnectionConstraint(new mxPoint(1, 1), true),
    // new mxConnectionConstraint(new mxPoint(0.5, 0.5), true),
    new mxConnectionConstraint(new mxPoint(0.5, 0), true),
    // new mxConnectionConstraint(new mxPoint(0.75, 0), true),
    // new mxConnectionConstraint(new mxPoint(0, 0.25), true),
    new mxConnectionConstraint(new mxPoint(0, 0.5), true),
    // new mxConnectionConstraint(new mxPoint(0, 0.75), true),
    // new mxConnectionConstraint(new mxPoint(1, 0.25), true),
    new mxConnectionConstraint(new mxPoint(1, 0.5), true),
    // new mxConnectionConstraint(new mxPoint(1, 0.75), true),
    // new mxConnectionConstraint(new mxPoint(0.25, 1), true),
    new mxConnectionConstraint(new mxPoint(0.5, 1), true)
    // new mxConnectionConstraint(new mxPoint(0.75, 1), true)
  ];

  mxConstraintHandler.prototype.pointImage = new mxImage(
    "static/mxgraph/images/dot.gif",
    6,
    6
  );
  mxConstraintHandler.prototype.highlightColor = "#00ff00";

  //鼠标移动偏差量，设置过大会容易误操作
  mxConstraintHandler.prototype.getTolerance = function(me) {
    return 2;
  };

  //使用圆形代替方形
  mxConstraintHandler.prototype.createHighlightShape = function() {
    var hl = new mxEllipse(null, this.highlightColor, this.highlightColor, 0);
    hl.opacity = mxConstants.HIGHLIGHT_OPACITY;

    return hl;
  };

  mxVertexHandler.prototype.manageSizers = true;

  mxEdgeHandler.prototype.handleImage = new mxImage(
    "static/mxgraph/images/handle-main.png",
    17,
    17
  );

  //滚轮缩放
  // mxEvent.addMouseWheelListener(function(evt, up) {
  //   if (up) {
  //     graph.zoomIn();
  //   } else {
  //     graph.zoomOut();
  //   }

  //   mxEvent.consume(evt);
  // });
};
