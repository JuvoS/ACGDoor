<template>
  <div id="relation"></div>
</template>
<script>
import * as d3 from "d3";
export default {
  mounted() {
    const relationCell = {
      name: "牵头单位：研发一部",
      title: "研发一部产品设计部4月第一周工作计划",
      children: [],
      relation: [],
      info: {
        type: "推进中",
        name: "牵头单位：研发一部",
        person: "王雷雷、李婷、肖凯炜、李佳",
        with: "徐婷、王佳",
        finishTime: "2021-05-06",
      },
    };
    const relationBasicData = {
      name: "牵头单位：研发一部",
      title: "研发一部产品设计部4月第一周工作计划",
      children: [
        {
          name: "牵头单位：研发二部",
          title: "研发一部产品设计部4月第一周工作计划",
          children: [
            {
              name: "牵头单位：研发三部",
              title: "研发一部产品设计部4月第一周工作计划",
              children: [
                {
                  name: "牵头单位：研发四部",
                  title: "研发一部产品设计部4月第一周工作计划",
                  children: [relationCell, relationCell],
                  relation: [
                    {
                      name: "牵头单位：工程项目组",
                      task: "关联任务：完成新建公务机棚项目结算",
                    },
                    {
                      name: "牵头单位：工程项目组",
                      task: "关联任务：完成新建公务机棚项目结算",
                    },
                  ],
                  info: {
                    type: "推进中",
                    name: "牵头单位：研发一部",
                    person: "王雷雷、李婷、肖凯炜、李佳",
                    with: "徐婷、王佳",
                    finishTime: "2021-05-06",
                  },
                },
              ],
              relation: [],
              info: {
                type: "推进中",
                name: "牵头单位：研发一部",
                person: "王雷雷、李婷、肖凯炜、李佳",
                with: "徐婷、王佳",
                finishTime: "2021-05-06",
              },
            },
            {
              name: "牵头单位：研发一部",
              title: "研发一部产品设计部4月第一周工作计划",
              children: [],
              relation: [],
              info: {
                type: "推进中",
                name: "牵头单位：研发一部",
                person: "王雷雷、李婷、肖凯炜、李佳",
                with: "徐婷、王佳",
                finishTime: "2021-05-06",
              },
            },
          ],
          relation: [
            {
              name: "牵头单位：工程项目组",
              task: "关联任务：完成新建公务机棚项目结算",
            },
            {
              name: "牵头单位：工程项目组",
              task: "关联任务：完成新建公务机棚项目结算",
            },
            {
              name: "牵头单位：工程项目组",
              task: "关联任务：完成新建公务机棚项目结算",
            },
          ],
          info: {
            type: "推进中",
            name: "牵头单位：研发一部",
            person: "王雷雷、李婷、肖凯炜、李佳",
            with: "徐婷、王佳",
            finishTime: "2021-05-06",
          },
        },
        {
          name: "牵头单位：研发09部",
          title: "研发一部产品设计部4月第一周工作计划",
          children: [
            {
              name: "牵头单位：研发08部",
              title: "研发一部产品设计部4月第一周工作计划",
              children: [
                relationCell,
                {
                  name: "牵头单位：研发07部",
                  title: "研发一部产品设计部4月第一周工作计划",
                  children: [],
                  relation: [],
                  info: {
                    type: "推进中",
                    name: "牵头单位：研发一部",
                    person: "王雷雷、李婷、肖凯炜、李佳",
                    with: "徐婷、王佳",
                    finishTime: "2021-05-06",
                  },
                },
              ],
              relation: [
                {
                  name: "牵头单位：工程项目组",
                  task: "关联任务：完成新建公务机棚项目结算",
                },
              ],
              info: {
                type: "推进中",
                name: "牵头单位：研发一部",
                person: "王雷雷、李婷、肖凯炜、李佳",
                with: "徐婷、王佳",
                finishTime: "2021-05-06",
              },
            },
            {
              name: "牵头单位：研发一部",
              title: "研发一部产品设计部4月第一周工作计划",
              children: [],
              relation: [],
              info: {
                type: "推进中",
                name: "牵头单位：研发一部",
                person: "王雷雷、李婷、肖凯炜、李佳",
                with: "徐婷、王佳",
                finishTime: "2021-05-06",
              },
            },
          ],
          relation: [],
          info: {
            type: "推进中",
            name: "牵头单位：研发一部",
            person: "王雷雷、李婷、肖凯炜、李佳",
            with: "徐婷、王佳",
            finishTime: "2021-05-06",
          },
        },
        {
          name: "牵头单位：研发09部",
          title: "研发一部产品设计部4月第一周工作计划",
          children: [
            {
              name: "牵头单位：研发08部",
              title: "研发一部产品设计部4月第一周工作计划",
              children: [],
              relation: [],
              info: {
                type: "推进中",
                name: "牵头单位：研发一部",
                person: "王雷雷、李婷、肖凯炜、李佳",
                with: "徐婷、王佳",
                finishTime: "2021-05-06",
              },
            },
            {
              name: "牵头单位：研发一部",
              title: "研发一部产品设计部4月第一周工作计划",
              children: [],
              relation: [],
              info: {
                type: "推进中",
                name: "牵头单位：研发一部",
                person: "王雷雷、李婷、肖凯炜、李佳",
                with: "徐婷、王佳",
                finishTime: "2021-05-06",
              },
            },
          ],
          relation: [],
          info: {
            type: "推进中",
            name: "牵头单位：研发一部",
            person: "王雷雷、李婷、肖凯炜、李佳",
            with: "徐婷、王佳",
            finishTime: "2021-05-06",
          },
        },
        {
          name: "承办人员：研发09部、研发二部",
          title: "子任务：研发一部产品设计部4月第一周",
          children: [],
          relation: [],
          info: {
            type: "推进中",
            name: "牵头单位：研发一部",
            person: "王雷雷、李婷、肖凯炜、李佳",
            with: "徐婷、王佳",
            finishTime: "2021-05-06",
          },
        },
      ],
      relation: [
        {
          name: "牵头单位：工程项目组",
          task: "关联任务：完成新建公务机棚项目结算",
        },
        {
          name: "牵头单位：工程项目组",
          task: "关联任务：完成新建公务机棚项目结算",
        },
      ],
      info: {
        type: "推进中",
        name: "牵头单位：研发一部",
        person: "王雷雷、李婷、肖凯炜、李佳",
        with: "徐婷、王佳",
        finishTime: "2021-05-06",
      },
    };

    const fontSize = 12;
    const minCellWidth = 240;
    const scaleRange = [0.2, 4];
    const NODE_SIZE = [60, 360]; //节点间距(高/水平)
    const textPadding = 5; //文字与方框间距,注：固定值5
    const rectMinWidth = 50; //节点方框默认最小，
    const circleR = 5; //圆圈半径
    const textSpace = 15; //多行文字间距

    /******************************* */

    /**
     * 数组深度计算
     * */
    function fetchDepth(obj) {
      let depthNum = 0;
      function treeDepthGrade(obj, level = 0) {
        depthNum = Math.max(depthNum, level);
        if (obj.children.length > 0) {
          obj.children.forEach((v, i) => {
            treeDepthGrade(v, level + 1);
          });
        }
      }
      treeDepthGrade(obj);

      return depthNum;
    }

    /**
     * UUID生成
     * */
    function uuid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }

      return (
        s4() +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        s4() +
        s4()
      );
    }
    /*********************** */

    let treeContainer;
    const relationData = relationBasicData;

    function initTree() {
      const margin = { top: 0, right: 0, bottom: 0, left: 0 };
      const treeWidth = document.getElementById("relation").offsetWidth; //tree容器宽
      const treeHeight = document.getElementById("relation").offsetHeight; //tree容器高
      const centralX = treeWidth / 2;
      const centralY = treeHeight / 2;

      //svg标签
      const svg = d3
        .select("#relation")
        .append("svg")
        .attr("class", "tree-svg")
        .attr("width", treeWidth)
        .attr("height", treeHeight)
        .attr("font-size", fontSize);

      //g标签
      treeContainer = svg
        .append("g")
        .attr("class", "container")
        .attr("transform", `translate(${margin.left},${margin.top}) scale(1)`);

      const zoom = d3
        .zoom()
        .scaleExtent(scaleRange)
        .on("zoom", function() {
          return treeContainer.attr("transform", d3.event.transform);
        });
      //动画持续时间
      treeContainer
        .transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity);
      svg.call(zoom);

      initTreeCell(relationData, { x: centralX, y: centralY });
    }

    function updateTree(source, { x, y }) {
      const treeNodeSize = d3
        .tree()
        .nodeSize(NODE_SIZE)
        .separation((a, b) => {
          let result =
            a.parent === b.parent && !a.children && !b.children ? 1 : 2;
          if (result > 1) {
            let length = 0;
            length = a.children ? length + a.children.length : length;
            length = b.children ? length + b.children.length : length;
            let relationLens = 0;
            const aR = a.data && a.data.relation ? a.data.relation.length : 0;
            const bR = b.data && b.data.relation ? b.data.relation.length : 0;
            relationLens = aR + bR;
            result = length / 2 + 1.5 + relationLens / 2;
          }
          return result;
        });
      const tree = treeNodeSize(rootRelation);

      const nodes = tree.descendants(); //返回后代节点数组，第一个节点为自身，然后依次为所有子节点的拓扑排序
      const links = tree.links(); //返回当前 node 的 links 数组, 其中每个 link 定义了 source父节点, target 子节点属性。
      nodes.forEach((d) => {
        //左右2部分，设置以中心点为圆点(默认左上角为远点)
        d.y = (d.y ? d.y : 0) + y - rootNodeLength / 2;
        d.x = (d.x ? d.x : 0) + x - rootNodeLength / 3;
      });
      const className = `rgNode`;

      //根据class名称获取左或者右的g节点，达到分块更新
      const node = treeContainer
        .selectAll(`g.${className}`)
        .data(nodes, (d) => d.id);

      //新增节点，tree会根据数据内的children扩展相关节点
      const nodeEnter = node
        .enter()
        .append("g")
        .attr("id", (d) => `g${d.id}`)
        .attr("class", className)
        .attr("transform", (d) => `translate(${source.y0},${source.x0})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0);

      nodeEnter.each((d) => {
        if (d.depth > 0) {
          //非根节点且无子节点
          drawText(`g${d.id}`); //画文本

          if (d.data.relation) {
            d.data.relation.forEach((ele) => {
              drawTsText(`g${d.id}`, ele); //画子文本
            });
          }
          drawRect(`g${d.id}`); //画方框
        }
        if (d.depth > 0 && d._children) {
          //非根节点且有子节点
          let xDistance = minCellWidth;

          const circle = drawCircle(`g${d.id}`, circleR); //画圆圈
          circle
            .attr("transform", `translate(${xDistance},0)`)
            .on("click", (d) => {
              d.depth !== 0 && clickNode(d, { x, y }); //根节点不执行点击事件
            }); //修改圆圈属性
        }
      });

      // 更新节点：节点enter和exit时都会触发tree更新
      const nodeUpdate = node
        .merge(nodeEnter)
        .transition()
        .duration(750)
        .attr("transform", (d) => `translate(${d.y - rectMinWidth / 2},${d.x})`)
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1);

      // 移除节点:tree移除掉数据内不包含的节点(即，children = false)
      const nodeExit = node
        .exit()
        .transition()
        .duration(750)
        .remove()
        .attr("transform", (d) => `translate(${source.y},${source.x})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0);

      createLineLink(links, source, className);

      // Stash the old positions for transition.
      rootRelation.eachBefore((d) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    function createLineLink(links, source, className) {
      // Update the links 根据 className来实现分块更新
      const link = treeContainer
        .selectAll(`path.${className}`)
        .data(links, (d) => d.target.id);

      // Enter any new links at the parent's previous position.
      //insert是在g标签前面插入，防止连接线挡住G节点内容
      const linkEnter = link
        .enter()
        .insert("path", "g")
        .attr("class", className)
        .attr("d", (d) => {
          const o = { x: source.x0, y: source.y0 };
          return diagonal({ source: o, target: o });
        })
        .attr("fill", "none")
        .attr("stroke-width", 1)
        .attr("stroke", "#dddddd");
      // .attr("stroke-dasharray", "5, 5");

      // Transition links to their new position.
      link
        .merge(linkEnter)
        .transition()
        .duration(750)
        .attr("d", diagonal);

      // Transition exiting nodes to the parent's new position.
      link
        .exit()
        .transition()
        .duration(750)
        .remove()
        .attr("d", (d) => {
          const o = { x: source.x, y: source.y };
          return diagonal({ source: o, target: o });
        });
    }

    //点击某个节点
    function clickNode(d, pointXY) {
      if (!d._children && !d.children) {
        //无子节点
        return;
      }
      //根据当前节点是否有children来判断是展开还是收缩，true收缩，false展开
      //tree会根据节点内是否有children来向下扩展
      d.children = d.children ? null : d._children;
      d3.select(`#g${d.id} .node-circle .node-circle-vertical`)
        .transition()
        .duration(750)
        .attr("stroke-width", d.children ? 0 : 1); //控制节点伸缩时的标识圆圈
      updateTree(d, pointXY);
    }

    //画连接线
    function diagonal({ source, target }) {
      let s = source,
        d = target;
      return `M ${s.y} ${s.x}
                L ${(s.y + d.y) / 2} ${s.x},
                L ${(s.y + d.y) / 2} ${d.x},
                ${d.y} ${d.x}`;
    }

    //画文本
    function drawText(id) {
      d3.select(`#${id}`)
        .append("text")
        .attr("y", 0)
        .attr("x", 0)
        .attr("text-anchor", "start")
        .style("font-size", fontSize)
        .text((d) => d.data.name);

      return d3
        .select(`#${id}`)
        .append("text")
        .attr("y", fontSize + 10)
        .attr("x", 0)
        .attr("text-anchor", "start")
        .style("font-size", fontSize)
        .attr("fill", "#333")
        .text((d) => d.data.title);
    }
    //画子文本
    function drawTsText(id, info) {
      let realh = document.getElementById(id).getBBox().height;
      let realX = document.getElementById(id).getBBox().x;
      let realY = document.getElementById(id).getBBox().y;
      const rgNode = d3
        .select(`#${id}`)
        .append("g")
        .attr("id", (d) => `rg${d.id}`)
        .attr(
          "transform",
          (d) => `translate(${realX + 60},${realY + realh + 30})`
        );

      rgNode
        .append("rect", "text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", minCellWidth)
        .attr("height", 55)
        .attr("rx", 2) //圆角
        .attr("class", "tree-cell")
        .style("fill", "#ffffff");
      rgNode
        .append("text")
        .attr("x", 10)
        .attr("y", 20)
        .attr("fill", "#333")
        .text(info.name);
      rgNode
        .append("text")
        .attr("x", 10)
        .attr("y", fontSize + 30)
        .attr("fill", "#333")
        .text(info.task);
    }

    //画方框阴影
    function drawFilter(id) {
      return d3
        .select(`#${id}`)
        .insert("defs", "rect")
        .append("filter")
        .attr("id", `f${id}`)
        .attr("x", 0)
        .attr("y", 0)
        .append("feGaussianBlur")
        .attr("in", "SourceGraphic")
        .attr("stdDeviation", "5");
    }
    //画方框
    function drawRect(id) {
      let realw = document.getElementById(id).getBBox().width + 20; //获取g实际宽度后，设置rect宽度
      let realh = document.getElementById(id).getBBox().height;

      const rectNode = d3.select(`#${id}`);
      rectNode
        .insert("rect", "text")
        .attr("x", -10)
        .attr("y", -20)
        .attr("width", minCellWidth)
        .attr("height", 55)
        .attr("rx", 2) //圆角
        .attr("class", "tree-cell")
        .style("fill", "#ffffff");

      // 左侧竖条
      rectNode
        .append("svg:rect")
        .attr("width", 2)
        .attr("height", 55)
        .attr("x", -10)
        .attr("y", -20)
        .attr("fill", "#2196f3");

      // 状态灯
      rectNode
        .append("circle")
        .attr("r", 5)
        .attr("cx", minCellWidth - 20)
        .attr("cy", -10)
        .attr("fill", "#4caf50");
    }

    //画circle
    function drawCircle(id, radius) {
      let gMark = d3
        .select(`#${id}`)
        .append("g")
        .attr("class", "node-circle")
        .attr("stroke", "#ffa500")
        .attr("stroke-width", 1);

      gMark
        .append("circle")
        .attr("fill", "none")
        .attr("r", (d) => (d.depth === 0 ? 0 : radius)) //根节点不设置圆圈
        .attr("fill", "#ffffff");
      let padding = radius - 2;
      gMark.append("path").attr("d", `m -${padding} 0 l ${2 * padding} 0`); //横线

      gMark
        .append("path") //竖线，根据展开/收缩动态控制显示
        .attr("d", `m 0 -${padding} l 0 ${2 * padding}`)
        .attr("stroke-width", 0)
        .attr("class", "node-circle-vertical");
      return gMark;
    }

    //末 节点 边框颜色
    function getRectStorke(name) {
      switch (name) {
        case "推进中":
          return "green";
        case "供应商":
          return "skyblue";
        case "合伙人":
          return "#FF9800";
        default:
          return "gray";
      }
    }

    let rootNodeLength;
    function createTreeRootNode(container, { x, y }, info) {
      const rootNode = container
        .append("g")
        .attr("id", "treeRoot")
        .attr("transform", `translate(${x},${y})`);
      const title = rootNode
        .append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("font-size", fontSize)
        .text(info.name);
      rootNode
        .append("text")
        .attr("x", 0)
        .attr("y", fontSize + 10)
        .attr("font-size", fontSize)
        .text(info.title);

      const rootNodeLens = info.name.length * fontSize + 30;
      //   const cellWidth =
      //     rootNodeLens > minCellWidth ? rootNodeLens : minCellWidth;

      let realw = document.getElementById("treeRoot").getBBox().width + 20; //获取g实际宽度后，设置rect宽度
      const cellWidth = realw;
      rootNodeLength = cellWidth;
      rootNode
        .insert("rect", "text")
        .attr("class", "tree-cell")
        .attr("width", cellWidth)
        .attr("height", 55)
        .attr("x", -10)
        .attr("y", -20)
        .attr("fill", "#fff")
        .attr("rx", 2); //圆角

      // 左侧竖条
      rootNode
        .append("svg:rect")
        .attr("class", "tree-cell")
        .attr("width", 2)
        .attr("height", 55)
        .attr("x", -10)
        .attr("y", -20)
        .attr("fill", "#2196f3");

      // 状态灯
      rootNode
        .append("circle")
        .attr("r", 5)
        .attr("cx", cellWidth - 20)
        .attr("cy", -10)
        .attr("fill", "#4caf50");

      // 帽子标签
      rootNode
        .append("text")
        .attr("x", -8)
        .attr("y", -16)
        .attr("fill", "#ff0")
        .style("transform", "rotate(-30deg)")
        .attr("font-size", 24)
        .text("👑");
    }

    function createTreeChildCell(container, { x, y }, info) {
      const cellNode = container
        .append("g")
        .attr("transform", `translate(${x},${y})`);
      const cellNodeLens = info.name.length * fontSize + 30;
      const cellWidth =
        cellNodeLens > minCellWidth ? cellNodeLens : minCellWidth;
      cellNode
        .append("svg:rect")
        .attr("class", "tree-cell")
        .attr("width", cellWidth)
        .attr("height", 55)
        .attr("x", -10)
        .attr("y", -20)
        .attr("fill", "#fff")
        .attr("rx", 2); //圆角

      // 左侧竖条
      cellNode
        .append("svg:rect")
        .attr("class", "tree-cell")
        .attr("width", 2)
        .attr("height", 55)
        .attr("x", -10)
        .attr("y", -20)
        .attr("fill", "#2196f3");

      // 状态灯
      cellNode
        .append("circle")
        .attr("r", 5)
        .attr("cx", cellWidth - 20)
        .attr("cy", -10)
        .attr("fill", "#4caf50");

      // 帽子标签
      cellNode
        .append("text")
        .attr("x", -8)
        .attr("y", -16)
        .attr("fill", "#ff0")
        .style("transform", "rotate(-30deg)")
        .attr("font-size", 24)
        .text("👑");
      cellNode
        .append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("font-size", fontSize)
        .text(info.name);
      cellNode
        .append("text")
        .attr("x", 0)
        .attr("y", fontSize + 10)
        .attr("font-size", fontSize)
        .text(info.title);
    }

    let rootRelation;
    function initTreeCell(treeRelation, { x, y }) {
      createTreeRootNode(
        treeContainer,
        { x: centralX / 2, y: centralY },
        relationData
      );
      const temp = d3.hierarchy(treeRelation);
      temp.x0 = x;
      temp.y0 = y;
      temp.descendants().forEach((d) => {
        d._children = d.children; //添加_children属性，用于实现点击收缩及展开功能
        d.id = "cell" + uuid(); //绑定唯一标识ID
      });
      rootRelation = temp;
      //   this.update(temp, {
      //     x: this.centralPoint[0],
      //     y: this.centralPoint[1],
      //   });
      updateTree(temp, { x, y });
    }

    initTree();
  },
};
</script>
<style>
#relation {
  width: 100%;
  height: 100%;
}
.tree-cell {
  background: #ffffff;
  color: #333333;
  -webkit-filter: drop-shadow(0 0 5px rgb(128 145 165 / 40%));
  /* filter: url(#drop-shadow); */
}
</style>
