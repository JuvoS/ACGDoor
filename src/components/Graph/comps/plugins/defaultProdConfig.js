import mxgraph from "../core/index.js";
const {
  mxConstants,
  mxPerimeter,
  mxUtils,
  mxTooltipHandler,
  mxEventObject
} = mxgraph;

const primaryColor = "#0CBABD";

export default graph => {
  graph.setPanning(true);
  graph.setCellsMovable(false);
  graph.setCellsResizable(false);
  graph.setCellsDeletable(false);
  graph.setCellsBendable(false);
  graph.setCellsEditable(false);
  graph.setCellsDisconnectable(false);

  graph.setAllowDanglingEdges(false);
  graph.setDisconnectOnMove(false);

  graph.setHtmlLabels(true);

  graph.centerZoom = false;
  graph.panningHandler.useLeftButtonForPanning = true;

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
  style[mxConstants.STYLE_FONTCOLOR] = "#444";
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
  //   if (
  //     evt.target.localName === "svg" ||
  //     (evt.target.localName === "image" &&
  //       evt.target.parentElement.localName === "g")
  //   ) {
  //     if (up) {
  //       graph.zoomIn();
  //     } else {
  //       graph.zoomOut();
  //     }

  //     mxEvent.consume(evt);
  //   }
  // });

  mxTooltipHandler.prototype.show = function(tip, x, y) {
    console.log("TCL: mxTooltipHandler.prototype.show -> tip", tip);
    if (!this.destroyed && tip != null) {
      // Initializes the DOM nodes if required
      if (this.div == null) {
        this.init();
      }

      var origin = mxUtils.getScrollOrigin();

      this.div.style.zIndex = this.zIndex;

      let left = 0;
      //修正弹出框位置
      if (window.innerWidth < x + 12 + origin.x + 250) {
        left = x - 250 - 12;
      } else {
        left = x + 12 + origin.x;
      }

      this.div.style.left = left + "px";

      let top = 0;
      if (
        window.innerHeight <
        y + mxConstants.TOOLTIP_VERTICAL_OFFSET + origin.y + 200
      ) {
        top = y - 200 - mxConstants.TOOLTIP_VERTICAL_OFFSET - origin.y;
      } else {
        top = y + mxConstants.TOOLTIP_VERTICAL_OFFSET + origin.y;
      }

      this.div.style.top = top + "px";

      if (_.isString(tip)) {
        if (!mxUtils.isNode(tip)) {
          this.div.innerHTML = tip.replace(/\n/g, "<br>");
        } else {
          this.div.innerHTML = "";
          this.div.appendChild(tip);
        }

        this.div.style.visibility = "";
        mxUtils.fit(this.div);
      } else {
        this.graph.fireEvent(
          new mxEventObject("show-info", "cell", tip, "x", left, "y", top)
        );
      }
    }
  };

  mxTooltipHandler.prototype.hideTooltip = function() {
    if (this.div != null) {
      this.div.style.visibility = "hidden";
      this.div.innerHTML = "";
    }
    this.graph.fireEvent(new mxEventObject("hide-info"));
  };
};
