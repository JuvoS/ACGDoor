import mxgraph from "../core/index.js";
const {
    mxPoint,
    mxRectangle,
    mxRectangleShape,
    mxEvent,
    mxUtils,
    mxConstants,
    mxPolyline,
    mxGraphHandler,
    mxConnectionHandler,
    mxMouseEvent
} = mxgraph;

const minGridSize = 4,
    gridSteps = 4,
    gridImage =
    "data:image/gif;base64,R0lGODlhCgAKAJEAAAAAAP///8zMzP///yH5BAEAAAMALAAAAAAKAAoAAAIJ1I6py+0Po2wFADs=",
    gridBasicColor = "#e0e0e0";

const getBackgroundPageBounds = graph => {
    var gb = graph.view.getGraphBounds();

    var x = gb.width > 0 ? gb.x / graph.view.scale - graph.view.translate.x : 0;
    var y = gb.height > 0 ? gb.y / graph.view.scale - graph.view.translate.y : 0;
    var w = gb.width / graph.view.scale;
    var h = gb.height / graph.view.scale;

    var fmt = graph.pageFormat;
    var ps = graph.pageScale;

    var pw = fmt.width * ps;
    var ph = fmt.height * ps;

    var x0 = Math.floor(Math.min(0, x) / pw);
    var y0 = Math.floor(Math.min(0, y) / ph);
    var xe = Math.ceil(Math.max(1, x + w) / pw);
    var ye = Math.ceil(Math.max(1, y + h) / ph);

    var rows = xe - x0;
    var cols = ye - y0;

    var bounds = new mxRectangle(
        graph.view.scale * (graph.view.translate.x + x0 * pw),
        graph.view.scale * (graph.view.translate.y + y0 * ph),
        graph.view.scale * rows * pw,
        graph.view.scale * cols * ph
    );

    return bounds;
};

const validateBackgroundStyles = graph => {
    var color =
        graph.background == null || graph.background == mxConstants.NONE ?
        graph.defaultPageBackgroundColor :
        graph.background;
    var gridColor =
        color != null && gridBasicColor != color.toLowerCase() ?
        gridBasicColor :
        "#ccc";
    var image = "none";
    var position = "";

    if (graph.isGridEnabled()) {
        var phase = 10;

        image = unescape(encodeURIComponent(createSvgGrid(gridColor, graph)));
        image = window.btoa ? btoa(image) : Base64.encode(image, true);
        image = "url(" + "data:image/svg+xml;base64," + image + ")";
        phase = graph.gridSize * graph.view.scale * gridSteps;

        var x0 = 0;
        var y0 = 0;

        if (graph.view.backgroundPageShape != null) {
            var bds = getBackgroundPageBounds(graph);

            x0 = 1 + bds.x;
            y0 = 1 + bds.y;
        }

        position = -Math.round(
                phase -
                mxUtils.mod(graph.view.translate.x * graph.view.scale - x0, phase)
            ) +
            "px " +
            -Math.round(
                phase -
                mxUtils.mod(graph.view.translate.y * graph.view.scale - y0, phase)
            ) +
            "px";
    }

    var canvas = graph.view.canvas;

    if (canvas.ownerSVGElement != null) {
        canvas = canvas.ownerSVGElement;
    }

    if (graph.view.backgroundPageShape != null) {
        graph.view.backgroundPageShape.node.style.backgroundPosition = position;
        graph.view.backgroundPageShape.node.style.backgroundImage = image;
        graph.view.backgroundPageShape.node.style.backgroundColor = color;
        canvas.style.backgroundImage = "none";
        canvas.style.backgroundColor = "";
    } else {
        canvas.style.backgroundPosition = position;
        canvas.style.backgroundColor = color;
        canvas.style.backgroundImage = image;
    }
};
const createSvgGrid = (color, graph) => {
    var tmp = graph.gridSize * graph.view.scale;

    while (tmp < minGridSize) {
        tmp *= 2;
    }

    var tmp2 = gridSteps * tmp;
    var d = [];

    for (var i = 1; i < gridSteps; i++) {
        var tmp3 = i * tmp;
        d.push(
            "M 0 " +
            tmp3 +
            " L " +
            tmp2 +
            " " +
            tmp3 +
            " M " +
            tmp3 +
            " 0 L " +
            tmp3 +
            " " +
            tmp2
        );
    }

    var size = tmp2;
    var svg =
        '<svg width="' +
        size +
        '" height="' +
        size +
        '" xmlns="' +
        mxConstants.NS_SVG +
        '">' +
        '<defs><pattern id="grid" width="' +
        tmp2 +
        '" height="' +
        tmp2 +
        '" patternUnits="userSpaceOnUse">' +
        '<path d="' +
        d.join(" ") +
        '" fill="none" stroke="' +
        color +
        '" opacity="0.2" stroke-width="1"/>' +
        '<path d="M ' +
        tmp2 +
        " 0 L 0 0 0 " +
        tmp2 +
        '" fill="none" stroke="' +
        color +
        '" stroke-width="1"/>' +
        '</pattern></defs><rect width="100%" height="100%" fill="url(#grid)"/></svg>';

    return svg;
};

export default graph => {
    graph.view.validateBackgroundPage = function() {
        if (graph.pageVisible) {
            var bounds = getBackgroundPageBounds(graph);
            if (graph.view.backgroundPageShape == null) {
                var firstChild = graph.container.firstChild;
                while (
                    firstChild != null &&
                    firstChild.nodeType != mxConstants.NODETYPE_ELEMENT
                ) {
                    firstChild = firstChild.nextSibling;
                }
                if (firstChild != null) {
                    graph.view.backgroundPageShape = new mxRectangleShape(
                        getBackgroundPageBounds(graph),
                        "#ffffff",
                        graph.defaultPageBorderColor
                    );
                    graph.view.backgroundPageShape.scale = 1;
                    graph.view.backgroundPageShape.dialect =
                        mxConstants.DIALECT_STRICTHTML;
                    graph.view.backgroundPageShape.init(graph.container);
                    firstChild.style.position = "absolute";
                    graph.container.insertBefore(
                        graph.view.backgroundPageShape.node,
                        firstChild
                    );
                    graph.view.backgroundPageShape.redraw();
                    graph.view.backgroundPageShape.node.className = "geBackgroundPage";

                    mxEvent.addListener(
                        graph.view.backgroundPageShape.node,
                        "dblclick",
                        mxUtils.bind(this, function(evt) {
                            graph.dblClick(evt);
                        })
                    );
                    mxEvent.addGestureListeners(
                        graph.view.backgroundPageShape.node,
                        mxUtils.bind(this, function(evt) {
                            graph.fireMouseEvent(mxEvent.MOUSE_DOWN, new mxMouseEvent(evt));
                        }),
                        mxUtils.bind(this, function(evt) {
                            if (
                                graph.tooltipHandler != null &&
                                graph.tooltipHandler.isHideOnHover()
                            ) {
                                graph.tooltipHandler.hide();
                            }

                            if (graph.isMouseDown && !mxEvent.isConsumed(evt)) {
                                graph.fireMouseEvent(mxEvent.MOUSE_MOVE, new mxMouseEvent(evt));
                            }
                        }),
                        mxUtils.bind(this, function(evt) {
                            graph.fireMouseEvent(mxEvent.MOUSE_UP, new mxMouseEvent(evt));
                        })
                    );
                } else {
                    graph.view.backgroundPageShape.scale = 1;
                    graph.view.backgroundPageShape.bounds = bounds;
                    graph.view.backgroundPageShape.redraw();
                }
            } else {
                graph.view.backgroundPageShape.scale = 1;
                graph.view.backgroundPageShape.bounds = bounds;
                graph.view.backgroundPageShape.redraw();
            }
        } else if (graph.view.backgroundPageShape != null) {
            graph.view.backgroundPageShape.destroy();
            graph.view.backgroundPageShape = null;
        }

        validateBackgroundStyles(graph);
    };

    var graphPanGraph = graph.panGraph;
    graph.panGraph = function(dx, dy) {
        graphPanGraph.apply(this, arguments);

        if (
            this.dialect != mxConstants.DIALECT_SVG &&
            this.view.backgroundPageShape != null &&
            (!this.useScrollbarsForPanning || !mxUtils.hasScrollbars(this.container))
        ) {
            this.view.backgroundPageShape.node.style.marginLeft = dx + "px";
            this.view.backgroundPageShape.node.style.marginTop = dy + "px";
        }
    };
    // console.log(object);
};