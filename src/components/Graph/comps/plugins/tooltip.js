import mxgraph from "../core/index.js";
const { mxUtils, mxGraph } = mxgraph;

export default graph => {
  graph.setTooltips(true);
  graph.getTooltip = function(state) {
    var cell = state.cell;
    var model = this.getModel();

    if (model.isEdge(cell)) {
      var source = this.getLabel(model.getTerminal(cell, true));
      var target = this.getLabel(model.getTerminal(cell, false));

      return source + " -> " + target;
    } else {
      const isDevicePort = _.get(cell, "data.isPort", false);
      if (isDevicePort) {
        return _.get(cell, "data.bindData.name", "");
      }
      return this.getLabel(cell);
    }
  };
};
