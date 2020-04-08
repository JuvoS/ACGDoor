import mxgraph from "../core/index.js";
const { mxEvent, mxUtils, mxKeyHandler, mxEventObject, mxConstants, mxStackLayout } = mxgraph;

const keyBinds = [
    { bindType: "bindKey", shortCut: "DELETE", shortCode: 8 },
    { bindType: "bindKey", shortCut: "ENTER", shortCode: 13 }
];

let isBind = false;
let keyHandler = null;
//启用方向键移动选中元素
const arrowMove = graph => {
    isBind = true;
    var nudge = function(keyCode) {
        if (!graph.isSelectionEmpty()) {
            var dx = 0;
            var dy = 0;

            if (keyCode == 37) {
                dx = -1;
            } else if (keyCode == 38) {
                dy = -1;
            } else if (keyCode == 39) {
                dx = 1;
            } else if (keyCode == 40) {
                dy = 1;
            }

            graph.moveCells(graph.getSelectionCells(), dx, dy);
        }
    };

    keyHandler.enter = function() {};

    keyHandler.bindKey(37, function() {
        nudge(37);
    });

    keyHandler.bindKey(38, function() {
        nudge(38);
    });

    keyHandler.bindKey(39, function() {
        nudge(39);
    });

    keyHandler.bindKey(40, function() {
        nudge(40);
    });
};

const deleteHandler = graph => {
    keyHandler.bindKey(8, function() {
        graph.deleteCells();
    });
};

const doHandler = graph => {
    keyHandler.bindControlKey(65, function() {
        // console.log("ctrl + a");
        graph.selectAll();
    });

    keyHandler.bindControlShiftKey(83, function() {
        // console.log("ctrl +  shift +s");
        graph.save();
    });

    keyHandler.bindControlKey(71, function() {
        // console.log("ctrl + g");
        graph.group();
    });

    keyHandler.bindControlShiftKey(71, function() {
        // console.log("ctrl + shift + g");
        graph.ungroup();
    });

    keyHandler.bindControlKey(219, function() {
        // console.log("ctrl + {");
        // let cellsForChange = graph.getSelectionCellsForChanges();
        let selectCells = graph.getSelectionCells();
        // console.log("cells ->", selectCells);
        if (selectCells) graph.cellsOrdered(selectCells, true);
    });

    keyHandler.bindControlShiftKey(219, function() {
        // console.log("ctrl + shift + {");
        graph.orderCells(true);
    });

    keyHandler.bindControlKey(221, function() {
        // console.log("ctrl + }");
        graph.orderCells(false);
    });

    keyHandler.bindControlKey(90, function() {
        // console.log("ctrl + z");
        graph.undo();
    });
    keyHandler.bindControlShiftKey(90, function() {
        // console.log("ctrl + shift + z");
        graph.redo();
    });
};

export default graph => {
    if (keyHandler) keyHandler.destroy();
    keyHandler = new mxKeyHandler(graph);
    graph.container.focus();

    arrowMove(graph);
    deleteHandler(graph);
    doHandler(graph);

};