import mxgraph from "../core/index.js";
const {
    mxEvent,

} = mxgraph;
export default graph => {
    graph.isCellFoldable = function(cell) {
        if (!cell) return false;
        var state = this.view.getState(cell);
        var style = (state != null) ? state.style : this.getCellStyle(cell);
        let collapsible = _.get(style, "collapsible", '0')

        return this.foldingEnabled && (collapsible == '1');
    };


}