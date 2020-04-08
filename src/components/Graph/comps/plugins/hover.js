import mxgraph from "../core/index.js";
const { mxEvent, mxUtils, mxRectangle } = mxgraph;

class mxIconSet {
  constructor(state) {
    this.images = [];

    const isKpi = _.get(state, "cell.data.isKpi", false);
    const isPort = _.get(state, "cell.data.isPort", false);
    if (isKpi || isPort) {
      return;
    }

    this.images.push(this.createArrow(state, "top"));
    this.images.push(this.createArrow(state, "left"));
    this.images.push(this.createArrow(state, "right"));
    this.images.push(this.createArrow(state, "bottom"));
  }

  createArrow(state, direction) {
    const graph = state.view.graph;
    const arrow = mxUtils.createImage(
      `static/mxgraph/images/arrow-${direction}.png`
    );
    arrow.style.position = "absolute";
    arrow.style.cursor = "pointer";
    arrow.style.width = "20px";
    arrow.style.height = "20px";
    arrow.style.zIndex = 999;

    let cloneX = 0;
    let cloneY = 0;

    switch (direction) {
      case "top":
        arrow.style.left = state.x + state.width / 2 - 10 + "px";
        arrow.style.top = state.y - 20 - 10 + "px";
        cloneX = 0;
        cloneY = -state.height - 40;
        break;
      case "left":
        arrow.style.left = state.x - 30 + "px";
        arrow.style.top = state.y + state.height / 2 - 10 + "px";
        cloneX = -state.width - 40;
        cloneY = 0;
        break;
      case "right":
        arrow.style.left = state.x + state.width + 10 + "px";
        arrow.style.top = state.y + state.height / 2 - 10 + "px";
        cloneX = state.width + 40;
        cloneY = 0;
        break;
      case "bottom":
        arrow.style.left = state.x + state.width / 2 - 10 + "px";
        arrow.style.top = state.y + state.height + 10 + "px";
        cloneX = 0;
        cloneY = state.height + 40;
        break;
      default:
        break;
    }

    mxUtils.setOpacity(arrow, 50);
    mxEvent.addGestureListeners(
      arrow,
      mxUtils.bind(this, function(evt) {
        const pt = mxUtils.convertPoint(
          graph.container,
          mxEvent.getClientX(evt),
          mxEvent.getClientY(evt)
        );
        // graph.connectionHandler.start(state, pt.x, pt.y);
        const cells = graph.moveCells([state.cell], cloneX, cloneY, true);

        // graph.connectCell(state.cell, cells[0], false);

        mxEvent.consume(evt);
      })
    );
    mxEvent.addListener(
      arrow,
      "mouseenter",
      mxUtils.bind(this, function(evt) {
        // Workaround for Firefox firing mouseenter on touchend
        if (mxEvent.isMouseEvent(evt)) {
          if (this.activeArrow != null && this.activeArrow != arrow) {
            mxUtils.setOpacity(this.activeArrow, this.inactiveOpacity);
          }

          state.view.graph.connectionHandler.constraintHandler.reset();
          mxUtils.setOpacity(arrow, 100);
          // this.activeArrow = arrow;
        }
      })
    );

    mxEvent.addListener(
      arrow,
      "mouseleave",
      mxUtils.bind(this, function(evt) {
        // Workaround for IE11 firing this event on touch
        if (!state.view.graph.isMouseDown) {
          mxUtils.setOpacity(arrow, 50);
        }
      })
    );
    state.view.graph.container.appendChild(arrow);
    return arrow;
  }

  destroy() {
    this.images.forEach(img => {
      img.parentNode.removeChild(img);
    });
    this.images = null;
  }
}

export default graph => {
  // 悬浮热区大小
  const iconTolerance = 40;
  // Shows icons if the mouse is over a cell
  graph.addMouseListener({
    currentState: null,
    currentIconSet: null,
    mouseDown(sender, me) {
      // Hides icons on mouse down
      if (this.currentState != null) {
        this.dragLeave(me.getEvent(), this.currentState);
        this.currentState = null;
      }
    },
    mouseMove(sender, me) {
      if (
        this.currentState != null &&
        (me.getState() == this.currentState || me.getState() == null)
      ) {
        var tol = iconTolerance;
        var tmp = new mxRectangle(
          me.getGraphX() - tol,
          me.getGraphY() - tol,
          2 * tol,
          2 * tol
        );

        if (mxUtils.intersects(tmp, this.currentState)) {
          return;
        }
      }

      var tmp = graph.view.getState(me.getCell());

      // Ignores everything but vertices
      if (
        graph.isMouseDown ||
        (tmp != null && !graph.getModel().isVertex(tmp.cell))
      ) {
        tmp = null;
      }

      if (tmp != this.currentState) {
        if (this.currentState != null) {
          this.dragLeave(me.getEvent(), this.currentState);
        }

        this.currentState = tmp;

        if (this.currentState != null) {
          this.dragEnter(me.getEvent(), this.currentState);
        }
      }
    },
    mouseUp(sender, me) {},
    dragEnter(evt, state) {
      if (this.currentIconSet == null) {
        this.currentIconSet = new mxIconSet(state);
      }
    },
    dragLeave(evt, state) {
      if (this.currentIconSet != null) {
        this.currentIconSet.destroy();
        this.currentIconSet = null;
      }
    }
  });
};
