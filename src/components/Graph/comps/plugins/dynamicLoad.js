import tempLayout from "./layout/tempLayout";
import networkLayout from "./layout/networkLayout";
import relationLayout from "./layout/relationLayout";

let resClasses = [];

//根据扩展类类型获取图标
const getResIcon = type => {
  const res = _.find(resClasses, { keyName: type });
  if (res) {
    return {
      icon: res.icon || "static/imgs/graph/default.svg",
      width: res.topoWidth || 30,
      height: res.topoHeight || 30
    };
  } else {
    return {
      icon: "static/imgs/graph/default.svg",
      width: 30,
      height: 30
    };
  }
};

export default (graph, data, rcs, state = false, fileObj) => {
  if (resClasses.length === 0) resClasses = rcs;
  graph.clear();

  if (!state) {
    //dolayout
    const { keyName } = data;
    switch (keyName) {
      case "stack_switch1": //堆叠交换机
        networkLayout(graph, data, getResIcon);
        break;
      default:
        relationLayout(graph, data, getResIcon);
        break;
    }
  } else {
    tempLayout(graph, data, fileObj.fileData);
  }

  graph.refresh();
};
