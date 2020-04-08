import mxgraph from "../core/index.js";
const {
  mxHierarchicalLayout,
  mxRadialTreeLayout,
  mxCompactTreeLayout,
  mxFastOrganicLayout,
  mxCircleLayout,
  mxConstants
} = mxgraph;

function execute(graph, type) {
  switch (type) {
    case "horizontalFlow":
      var layout = new mxHierarchicalLayout(graph, mxConstants.DIRECTION_WEST);
      var selectionCells = graph.getSelectionCells();
      layout.execute(
        graph.getDefaultParent(),
        selectionCells.length == 0 ? null : selectionCells
      );
      break;
    case "verticalFlow":
      var layout = new mxHierarchicalLayout(graph, mxConstants.DIRECTION_NORTH);
      var selectionCells = graph.getSelectionCells();
      layout.execute(
        graph.getDefaultParent(),
        selectionCells.length == 0 ? null : selectionCells
      );
      break;
    case "horizontalTree":
      var tmp = graph.getSelectionCell();
      var roots = null;

      if (tmp == null || graph.getModel().getChildCount(tmp) == 0) {
        if (graph.getModel().getEdgeCount(tmp) == 0) {
          roots = graph.findTreeRoots(graph.getDefaultParent());
        }
      } else {
        roots = graph.findTreeRoots(tmp);
      }

      if (roots != null && roots.length > 0) {
        tmp = roots[0];
      }

      if (tmp != null) {
        var layout = new mxCompactTreeLayout(graph, true);
        layout.edgeRouting = false;
        layout.levelDistance = 30;

        layout.execute(graph.getDefaultParent(), tmp);
      }
      break;

    case "verticalTree":
      var tmp = graph.getSelectionCell();
      var roots = null;

      if (tmp == null || graph.getModel().getChildCount(tmp) == 0) {
        if (graph.getModel().getEdgeCount(tmp) == 0) {
          roots = graph.findTreeRoots(graph.getDefaultParent());
        }
      } else {
        roots = graph.findTreeRoots(tmp);
      }

      if (roots != null && roots.length > 0) {
        tmp = roots[0];
      }

      if (tmp != null) {
        var layout = new mxCompactTreeLayout(graph, false);
        layout.edgeRouting = false;
        layout.levelDistance = 30;

        layout.execute(graph.getDefaultParent(), tmp);
      }
      break;

    case "circle":
      var layout = new mxCircleLayout(graph);
      var tmp = graph.getSelectionCell();
      if (tmp == null || graph.getModel().getChildCount(tmp) == 0) {
        tmp = graph.getDefaultParent();
      }
      layout.execute(tmp);

      if (graph.getModel().isVertex(tmp)) {
        graph.updateGroupBounds([tmp], graph.gridSize * 2, true);
      }
      break;
    default:
      break;
  }
}

export default {
  execute
};
