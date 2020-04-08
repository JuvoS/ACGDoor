/**
 * 关系拓扑布局算法
 */

export default (graph, data, getResIcon) => {
  const { id, name, serial, parentKeyName, relations: rbt } = data;
  const relations = _.orderBy(rbt, v => v.device.serial);

  const item = { id, name, serial, parentKeyName };

  graph.getModel().beginUpdate();
  const root = graph.getDefaultParent();
  try {
    const baseW = (window.innerWidth - 100) / 4; //水平基本宽度
    const baseGap = 50; //垂直基本高度
    const basePortSize = 25; //端子尺寸
    const baseOffset = 150; //端子跟设备之间的基本距离

    const { icon, width, height } = getResIcon(item.parentKeyName);
    const shapeStyle =
      "shape=image;html=1;labelPosition=left;verticalLabelPosition=middle;align=right;verticalAlign=middle;imageAspect=0;image=" +
      icon;

    let totalH = window.innerHeight - 64; //减去顶部菜单高度
    let heightGap = Math.max(baseGap, (totalH - 100) / (relations.length + 1));

    const main = graph.insertVertex(
      root,
      item.id,
      item.label || item.name,
      baseW - 50,
      (heightGap * (relations.length + 1) - height) / 2,
      width,
      height,
      shapeStyle
    );
    main.data = { bindData: item };

    const edgeStyle = `shape=none;noLabel=1;rounded=0;curved=0;startArrow=none;endArrow=none;html=1;edgeStyle=straight;strokeWidth=2;`;
    let edges = [];
    let devices = [];
    let fromPorts = [];
    relations.forEach(({ fromPort, toPort, device }, i) => {
      let v1, v2;
      if (fromPort) {
        const { icon } = getResIcon(fromPort.parentKeyName);
        const shapeStyle =
          "shape=image;movable=1;html=1;verticalLabelPosition=bottom;verticalAlign=top;imageAspect=0;image=" +
          icon;
        const label =
          (fromPort.label || fromPort.name) +
          (fromPort.commandName ? `[${fromPort.commandName}]` : "");

        v1 = graph.model.getCell(fromPort.id);
        if (!v1) {
          v1 = graph.insertVertex(
            root,
            fromPort.id,
            label,
            baseW + baseOffset,
            heightGap + heightGap * i - basePortSize / 2,
            basePortSize,
            basePortSize,
            shapeStyle
          );
          fromPorts.push(v1);
        }

        const e1 = graph.insertEdge(root, null, "", main, v1, edgeStyle);
        edges.push(e1);
      }

      if (toPort) {
        const { icon } = getResIcon(fromPort.parentKeyName);
        const shapeStyle =
          "shape=image;movable=1;html=1;verticalLabelPosition=bottom;verticalAlign=top;imageAspect=0;image=" +
          icon;
        v2 = graph.model.getCell(toPort.id);
        if (!v2) {
          const label =
            (toPort.label || toPort.name) +
            (toPort.commandName ? `[${toPort.commandName}]` : "");

          v2 = graph.insertVertex(
            root,
            toPort.id,
            label,
            baseW * 2.5,
            heightGap + heightGap * i - basePortSize / 2,
            basePortSize,
            basePortSize,
            shapeStyle
          );
        }

        if (fromPort) {
          const e2 = graph.insertEdge(root, null, "", v1, v2, edgeStyle);
          edges.push(e2);
        }
      }

      if (_.get(device, "id", "")) {
        const { icon, width, height } = getResIcon(device.parentKeyName);
        const shapeStyle =
          "shape=image;movable=1;html=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;imageAspect=0;image=" +
          icon;
        let v3 = graph.model.getCell(device.id);
        let h = Math.min(baseGap, height);
        let w = (width / height) * h;
        if (!v3) {
          v3 = graph.insertVertex(
            root,
            device.id,
            device.label || device.name,
            baseW * 2.5 + baseOffset,
            heightGap + heightGap * i - h / 2,
            w,
            h,
            shapeStyle
          );
          v3.data = { bindData: device };
          devices.push(v3);
        }
        if (toPort) {
          const e3 = graph.insertEdge(root, null, "", v2, v3, edgeStyle);
          edges.push(e3);
        } else {
          const e3 = graph.insertEdge(root, null, "", main, v3, edgeStyle);
          edges.push(e3);
        }
      }
    });

    //from端子位置调整
    fromPorts.forEach(port => {
      const edges = graph.getOutgoingEdges(port);
      if (edges.length > 1) {
        const first = _.get(edges[0], "target.geometry", {});
        const last = _.get(edges[edges.length - 1], "target.geometry", {});
        let geo = graph.getCellGeometry(port);
        if (geo) {
          geo = geo.clone();
          geo.y = (first.y + last.y) * 0.5;
          graph.getModel().setGeometry(port, geo);
        }
      }
    });

    //设备位置调整
    devices.forEach(device => {
      const edges = graph.getIncomingEdges(device);
      if (edges.length > 1) {
        const first = _.get(edges[0], "source.geometry", {});
        const last = _.get(edges[edges.length - 1], "source.geometry", {});
        let geo = graph.getCellGeometry(device);
        if (geo) {
          geo = geo.clone();
          geo.y = (first.y + last.y) * 0.5;
          graph.getModel().setGeometry(device, geo);
        }
      }
    });

    //main位置调整
    const mainEdges = graph.getOutgoingEdges(main);
    if (mainEdges.length > 1) {
      const first = _.get(mainEdges[0], "source.geometry", {});
      const last = _.get(
        mainEdges[mainEdges.length - 1],
        "source.geometry",
        {}
      );
      let geo = graph.getCellGeometry(main);
      if (geo) {
        geo = geo.clone();
        geo.y = (first.y + last.y) * 0.5;
        graph.getModel().setGeometry(main, geo);
      }
    }

    //线置底
    graph.orderCells(true, edges);
  } finally {
    graph.getModel().endUpdate();
  }
};
