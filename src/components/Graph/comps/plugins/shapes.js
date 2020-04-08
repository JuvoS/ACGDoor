import mxgraph from "../core/index.js";
const {
  mxCellRenderer,
  mxArrowConnector,
  mxUtils,
  mxRectangle,
  mxVertexHandler,
  mxEdgeHandler,
  mxConstants,
  mxRectangleShape,
  mxStencilRegistry,
  mxCylinder,
  mxHandle
} = mxgraph;

// Link shape
function FixDevice() {
  mxRectangleShape.call(this);
  this.spacing = 0;
  this.fill = "red";
}
mxUtils.extend(FixDevice, mxRectangleShape);
FixDevice.prototype.constraints = null;
// Registers the link shape
mxCellRenderer.registerShape("fixDevice", FixDevice);

// Link shape
function LinkShape() {
  mxArrowConnector.call(this);
  this.spacing = 0;
}
mxUtils.extend(LinkShape, mxArrowConnector);
LinkShape.prototype.defaultWidth = 4;

LinkShape.prototype.isOpenEnded = function() {
  return true;
};

LinkShape.prototype.getEdgeWidth = function() {
  return (
    mxUtils.getNumber(this.style, "width", this.defaultWidth) +
    Math.max(0, this.strokewidth - 4)
  );
};

LinkShape.prototype.isArrowRounded = function() {
  return this.isRounded;
};

// Registers the link shape
mxCellRenderer.registerShape("link", LinkShape);

function Kpi() {
  mxRectangleShape.call(this);
  this.spacing = 0;
  this.fill = "red";
}
mxUtils.extend(Kpi, mxRectangleShape);
Kpi.prototype.constraints = null;
// Registers the link shape
mxCellRenderer.registerShape("kpi", Kpi);

// Cube Shape, supports size style
function CubeShape() {
  mxCylinder.call(this);
}
mxUtils.extend(CubeShape, mxCylinder);
CubeShape.prototype.size = 20;
CubeShape.prototype.darkOpacity = 0;
CubeShape.prototype.darkOpacity2 = 0;

CubeShape.prototype.paintVertexShape = function(c, x, y, w, h) {
  var s = Math.max(
    0,
    Math.min(
      w,
      Math.min(h, parseFloat(mxUtils.getValue(this.style, "size", this.size)))
    )
  );
  var op = Math.max(
    -1,
    Math.min(
      1,
      parseFloat(mxUtils.getValue(this.style, "darkOpacity", this.darkOpacity))
    )
  );
  var op2 = Math.max(
    -1,
    Math.min(
      1,
      parseFloat(
        mxUtils.getValue(this.style, "darkOpacity2", this.darkOpacity2)
      )
    )
  );
  c.translate(x, y);

  c.begin();
  c.moveTo(0, 0);
  c.lineTo(w - s, 0);
  c.lineTo(w, s);
  c.lineTo(w, h);
  c.lineTo(s, h);
  c.lineTo(0, h - s);
  c.lineTo(0, 0);
  c.close();
  c.end();
  c.fillAndStroke();

  if (!this.outline) {
    c.setShadow(false);

    if (op != 0) {
      c.setFillAlpha(Math.abs(op));
      c.setFillColor(op < 0 ? "#FFFFFF" : "#000000");
      c.begin();
      c.moveTo(0, 0);
      c.lineTo(w - s, 0);
      c.lineTo(w, s);
      c.lineTo(s, s);
      c.close();
      c.fill();
    }

    if (op2 != 0) {
      c.setFillAlpha(Math.abs(op2));
      c.setFillColor(op2 < 0 ? "#FFFFFF" : "#000000");
      c.begin();
      c.moveTo(0, 0);
      c.lineTo(s, s);
      c.lineTo(s, h);
      c.lineTo(0, h - s);
      c.close();
      c.fill();
    }

    c.begin();
    c.moveTo(s, h);
    c.lineTo(s, s);
    c.lineTo(0, 0);
    c.moveTo(s, s);
    c.lineTo(w, s);
    c.end();
    c.stroke();
  }
};
CubeShape.prototype.getLabelMargins = function(rect) {
  if (mxUtils.getValue(this.style, "boundedLbl", false)) {
    var s =
      parseFloat(mxUtils.getValue(this.style, "size", this.size)) * this.scale;

    return new mxRectangle(s, s, 0, 0);
  }

  return null;
};

mxCellRenderer.registerShape("cube", CubeShape);

function createHandle(
  state,
  keys,
  getPositionFn,
  setPositionFn,
  ignoreGrid,
  redrawEdges
) {
  var handle = new mxHandle(
    state,
    null,
    mxVertexHandler.prototype.secondaryHandleImage
  );

  handle.execute = function() {
    for (var i = 0; i < keys.length; i++) {
      this.copyStyle(keys[i]);
    }
  };

  handle.getPosition = getPositionFn;
  handle.setPosition = setPositionFn;
  handle.ignoreGrid = ignoreGrid != null ? ignoreGrid : true;

  // Overridden to update connected edges
  if (redrawEdges) {
    var positionChanged = handle.positionChanged;

    handle.positionChanged = function() {
      positionChanged.apply(this, arguments);

      // Redraws connected edges TODO: Include child edges
      state.view.invalidate(this.state.cell);
      state.view.validate();
    };
  }

  return handle;
}

function createEdgeHandle(state, keys, start, getPosition, setPosition) {
  return createHandle(
    state,
    keys,
    function(bounds) {
      var pts = state.absolutePoints;
      var n = pts.length - 1;

      var tr = state.view.translate;
      var s = state.view.scale;

      var p0 = start ? pts[0] : pts[n];
      var p1 = start ? pts[1] : pts[n - 1];
      var dx = start ? p1.x - p0.x : p1.x - p0.x;
      var dy = start ? p1.y - p0.y : p1.y - p0.y;

      var dist = Math.sqrt(dx * dx + dy * dy);

      var pt = getPosition.call(this, dist, dx / dist, dy / dist, p0, p1);

      return new mxPoint(pt.x / s - tr.x, pt.y / s - tr.y);
    },
    function(bounds, pt, me) {
      var pts = state.absolutePoints;
      var n = pts.length - 1;

      var tr = state.view.translate;
      var s = state.view.scale;

      var p0 = start ? pts[0] : pts[n];
      var p1 = start ? pts[1] : pts[n - 1];
      var dx = start ? p1.x - p0.x : p1.x - p0.x;
      var dy = start ? p1.y - p0.y : p1.y - p0.y;

      var dist = Math.sqrt(dx * dx + dy * dy);
      pt.x = (pt.x + tr.x) * s;
      pt.y = (pt.y + tr.y) * s;

      setPosition.call(this, dist, dx / dist, dy / dist, p0, p1, pt, me);
    }
  );
}

function createEdgeWidthHandle(state, start, spacing) {
  return createEdgeHandle(
    state,
    ["width"],
    start,
    function(dist, nx, ny, p0, p1) {
      var w = state.shape.getEdgeWidth() * state.view.scale + spacing;

      return new mxPoint(
        p0.x + (nx * dist) / 4 + (ny * w) / 2,
        p0.y + (ny * dist) / 4 - (nx * w) / 2
      );
    },
    function(dist, nx, ny, p0, p1, pt) {
      var w = Math.sqrt(
        mxUtils.ptSegDistSq(p0.x, p0.y, p1.x, p1.y, pt.x, pt.y)
      );
      state.style["width"] = Math.round(w * 2) / state.view.scale - spacing;
    }
  );
}

var handleFactory = {
  link: function(state) {
    var spacing = 10;

    return [
      createEdgeWidthHandle(state, true, spacing),
      createEdgeWidthHandle(state, false, spacing)
    ];
  }
};

// Graph.handleFactory = handleFactory;
mxVertexHandler.prototype.createCustomHandles = function() {
  // Not rotatable means locked
  if (this.state.view.graph.getSelectionCount() == 1) {
    if (this.graph.isCellRotatable(this.state.cell)) {
      // LATER: Make locked state independent of rotatable flag, fix toggle if default is false
      //if (this.graph.isCellResizable(this.state.cell) || this.graph.isCellMovable(this.state.cell))
      var name = this.state.style["shape"];

      if (
        mxCellRenderer.defaultShapes[name] == null &&
        mxStencilRegistry.getStencil(name) == null
      ) {
        name = mxConstants.SHAPE_RECTANGLE;
      }

      var fn = handleFactory[name];

      if (
        fn == null &&
        this.state.shape != null &&
        this.state.shape.isRoundable()
      ) {
        fn = handleFactory[mxConstants.SHAPE_RECTANGLE];
      }

      if (fn != null) {
        return fn(this.state);
      }
    }
  }

  return null;
};

mxEdgeHandler.prototype.createCustomHandles = function() {
  if (this.state.view.graph.getSelectionCount() == 1) {
    var name = this.state.style["shape"];

    if (
      mxCellRenderer.defaultShapes[name] == null &&
      mxStencilRegistry.getStencil(name) == null
    ) {
      name = mxConstants.SHAPE_CONNECTOR;
    }

    var fn = handleFactory[name];

    if (fn != null) {
      return fn(this.state);
    }
  }

  return null;
};
