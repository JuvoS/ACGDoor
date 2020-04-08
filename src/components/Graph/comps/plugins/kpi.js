import mxgraph from "../core/index.js";
const {
  mxEvent,
  mxEdgeHandler,
  mxGuide,
  mxConstants,
  mxConnectionHandler,
  mxEdgeSegmentHandler,
  mxConnectionConstraint,
  mxGraph
} = mxgraph;

export default (graph, enable) => {
  // Overrides method to provide a cell label in the display
  graph.convertValueToString = function(cell) {
    if (cached && cell.div != null) {
      // Uses cached label
      return cell.div;
    } else if (
      mxUtils.isNode(cell.value) &&
      cell.value.nodeName.toLowerCase() == "userobject"
    ) {
      // Returns a DOM for the label
      var div = document.createElement("div");
      div.innerHTML = cell.getAttribute("label");
      mxUtils.br(div);

      var checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");

      if (cell.getAttribute("checked") == "true") {
        checkbox.setAttribute("checked", "checked");
        checkbox.defaultChecked = true;
      }

      // Writes back to cell if checkbox is clicked
      mxEvent.addListener(
        checkbox,
        mxClient.IS_QUIRKS ? "click" : "change",
        function(evt) {
          var elt = cell.value.cloneNode(true);
          elt.setAttribute("checked", checkbox.checked ? "true" : "false");

          graph.model.setValue(cell, elt);
        }
      );

      div.appendChild(checkbox);

      if (cached) {
        // Caches label
        cell.div = div;
      }

      return div;
    }

    return "";
  };
};
