/**
 * 堆叠交换机网络拓扑布局算法
 */
export default (graph, data, getResIcon) => {
  const { relations } = data;
  graph.getModel().beginUpdate();
  const root = graph.getDefaultParent();
  try {
    const baseW = (window.innerWidth - 100) / 4; //水平基本宽度
    const baseGap = 50; //垂直基本高度
    const basePortSize = 25; //端子尺寸
    const baseOffset = 110; //端子跟设备之间的基本距离
    let verHeight = 50;
    let lastCell = null;
    let edgesArr = [];

    const edgeStyle = `shape=none;noLabel=1;rounded=0;curved=0;startArrow=none;endArrow=none;html=1;edgeStyle=straight;strokeWidth=2;`;

    const devices = _.orderBy(relations, v => v.device.serial);
    devices.forEach(relation => {
      const { id, name, serial, parentKeyName } = relation.device;
      const { icon, width, height } = getResIcon(parentKeyName);
      const shapeStyle =
        "shape=image;movable=1;html=1;verticalLabelPosition=bottom;verticalAlign=top;imageAspect=0;image=" +
        icon;

      let namearr = serial.split("|");
      console.log("TCL: namearr", namearr);
      const v1 = graph.insertVertex(
        root,
        id,
        serial,
        baseW * 2,
        verHeight,
        width,
        height,
        shapeStyle
      );
      v1.data = { bindData: relation.device };
      verHeight += baseOffset + baseGap;
      if (lastCell) {
        let edge = graph.insertEdge(
          root,
          null,
          serial,
          lastCell,
          v1,
          edgeStyle
        );
        edgesArr.push(edge);
      }

      lastCell = v1;
    });

    //线置底
    graph.orderCells(true, edgesArr);
  } finally {
    graph.getModel().endUpdate();
  }
};
