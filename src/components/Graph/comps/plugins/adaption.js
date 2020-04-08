import mxgraph from "../core/index.js";
import imgUrlFormate from "./imgUrlFormate";

const { mxImage, mxUtils, mxConstants } = mxgraph;
export default (graph, bgImg, bgDx, bgDy, hideBg) => {
  bgImg = JSON.parse(bgImg);
  const hasBg = bgImg.src;
  let bgWidth = bgImg.width;
  let bgHeight = bgImg.height;

  //假如无背景图，则用极值来处理
  if (!hasBg) {
    bgDx = 0;
    bgDy = 0;
    let maxX = 0,
      minX = 0;
    let maxY = 0,
      minY = 0;
    const cells = graph.model.getChildren(graph.getDefaultParent());
    if (!cells) return;
    cells.forEach(cell => {
      if (cell.vertex) {
        const { x, y, width, height } = cell.geometry;
        const mx = x + width;
        const my = y + height;

        maxX = Math.max(maxX, mx);
        minX = Math.min(minX, x);
        maxY = Math.max(maxY, my);
        minY = Math.min(minY, y);
      }
    });

    bgWidth = maxX - minX + 100;
    bgHeight = maxY - minY + 100;
  }

  const margin = 0;
  const cw = graph.container.clientWidth - margin;
  const ch = graph.container.clientHeight - margin;

  const scaleW = cw / bgWidth;
  const scaleH = ch / bgHeight;
  let scale = Math.min(scaleW, scaleH); //获取缩放比例

  //计算偏移量
  const dx = bgDx * scale + (margin + cw - bgWidth * scale) / 2;
  const dy = bgDy * scale + (margin + ch - bgHeight * scale) / 2;

  graph.view.scaleAndTranslate(scale, dx, dy);

  if (bgImg.src) {
    //   if (!hideBg) {
    graph.setBackgroundImage(new mxImage(bgImg.src, cw, ch));
  }
  // } else {
  //   graph.backgroundImage = null;
  // }
  graph.refresh();

  //手动对各元素进行缩放平移
  Object.values(graph.getModel().cells).forEach(cell => {
    if (cell) {
      let geo = graph.getCellGeometry(cell);
      if (geo) {
        geo = geo.clone();
        if (geo.relative) {
          if (geo.offset) {
            geo.offset.x *= scale;
            geo.offset.y *= scale;
          }
        } else {
          geo.x = parseFloat(geo.x) * scale + dx;
          geo.y = parseFloat(geo.y) * scale + dy;
        }
        // geo.scale(scaleW, scaleH, true);

        geo.width = parseFloat(geo.width) * scale;
        geo.height = parseFloat(geo.height) * scale;

        // Translates the source point
        if (geo.sourcePoint != null) {
          geo.sourcePoint.x = parseFloat(geo.sourcePoint.x) * scale + dx;
          geo.sourcePoint.y = parseFloat(geo.sourcePoint.y) * scale + dy;
        }

        // Translates the target point
        if (geo.targetPoint != null) {
          geo.targetPoint.x = parseFloat(geo.targetPoint.x) * scale + dx;
          geo.targetPoint.y = parseFloat(geo.targetPoint.y) * scale + dy;
        }

        // Translate the control points
        if (geo.points != null) {
          for (var i = 0; i < geo.points.length; i++) {
            if (geo.points[i] != null) {
              geo.points[i].x = parseFloat(geo.points[i].x) * scale + dx;
              geo.points[i].y = parseFloat(geo.points[i].y) * scale + dy;
            }
          }
        }

        const style = graph.getCellStyle(cell);
        //字体大小
        const fontSize = mxUtils.getValue(
          style,
          mxConstants.STYLE_FONTSIZE,
          mxConstants.DEFAULT_FONTSIZE
        );
        graph.setCellStyles(mxConstants.STYLE_FONTSIZE, fontSize * scale, [
          cell
        ]);

        if (cell.edge) {
          const strokeWidth = mxUtils.getValue(
            style,
            mxConstants.STYLE_STROKEWIDTH,
            1
          );
          graph.setCellStyles(
            mxConstants.STYLE_STROKEWIDTH,
            strokeWidth * scale,
            [cell]
          );
        }

        graph.getModel().setGeometry(cell, geo);
        if (_.get(cell, "isDrawSvg", 0) != 1) imgUrlFormate(cell);
      }
    }
  });
};
