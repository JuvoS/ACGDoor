<template>
  <div id="relation"></div>
</template>
<script>
import * as d3 from "d3";
export default {
  mounted() {
    const fontSize = 12;
    const scaleRange = [0.2, 4];

    const relationBasicData = {
      name: "牵头单位：研发一部",
      title: "研发一部产品设计部4月第一周工作计划",
      children: [
        {
          name: "牵头单位：研发二部A",
          title: "研发一部产品设计部4月第一周工作计划",
          children: [
            {
              name: "牵头单位：研发三B",
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

    function initTree() {
      const treeContainer = initBasicContainer();

      const treeList = formatTreeList(relationBasicData, 0, {
        x: 100,
        y: 100,
      });

      const temp = d3.hierarchy(treeList);
      temp.descendants().forEach((d) => {
        d._children = d.children; //添加_children属性，用于实现点击收缩及展开功能
        d.id = "cell" + uuid(); //绑定唯一标识ID
      });

      console.log(treeList, temp);

      const treeNodeSize = d3
        .tree()
        .nodeSize([60, 400])
        .separation((a, b) => {
          let result =
            a.parent === b.parent && !a.children && !b.children ? 1 : 2;
          if (result > 1) {
            let length = 0,
              relationLens = 0;
            length =
              (a.children ? a.children.length : 0) +
              (b.children ? b.children.length : 0);
            const aR = a.data && a.data.relation ? a.data.relation.length : 0;
            const bR = b.data && b.data.relation ? b.data.relation.length : 0;
            relationLens = aR + bR;
            result = length / 2 + 1.5 + relationLens / 2;
          }
          return result;
        });
      const tree = treeNodeSize(temp);
      const nodes = tree.descendants();
      const links = tree.links();

      console.log("nodes ->", nodes);

      const className = `rgNode`;

      //根据class名称获取左或者右的g节点，达到分块更新
      const node = treeContainer
        .selectAll(`g.${className}`)
        .data(nodes, (d) => d.id);

      const nodeEnter = node
        .enter()
        .append("g")
        .attr("id", (d) => `g${d.id}`)
        .attr("class", className)
        .attr("transform", (d) => `translate(${100},${100})`);
      // .attr("fill-opacity", 0)
      // .attr("stroke-opacity", 0);

      nodeEnter.each((d) => {
        // if (d.depth > 0) {
        //非根节点且无子节点
        // d3.select(`#g${d.id}`)
        //   .append("text")
        //   .attr("y", 0)
        //   .attr("x", 0)
        //   .attr("text-anchor", "start")
        //   .style("font-size", fontSize)
        //   .text((d) => d.data.name);
        createTreeChildCell(
          d3.select(`#g${d.id}`),
          { x: d.y + 100 * d.depth, y: d.x },
          d.data
        );

        if (d.children) {
          d.children.forEach((ele) => {
            createLineLink(
              d.id,
              { x: d.x, y: d.y + 280 },
              { x: ele.x, y: ele.y + 100 }
            );
          });
        }
        if (d.data.relation) {
          const relationGroup = d3.select(`#g${d.id}`).append("g");
          d.data.relation.forEach((ele, index) => {
            const relaX = d.y + 100 + 50;
            const relaY = d.x + 100 * d.depth + (index + 1) * 70;
            relationGroup;
            createLineDash(
              d.id,
              { x: d.x + 120, y: d.y },
              { x: relaX, y: relaY }
            );

            createTreeChildCell(
              relationGroup,
              { x: relaX, y: relaY },
              {
                name: ele.name,
                title: ele.task,
              }
            );
          });
        }
        // }
      });
    }
    let treeWidth, treeHeight;
    function initBasicContainer() {
      const treeContainerId = "relation";
      const margin = { top: 0, right: 0, bottom: 0, left: 0 };

      const basicContainer = document.getElementById(treeContainerId);
      //tree容器宽
      treeWidth = basicContainer.offsetWidth - margin.left - margin.right;
      //tree容器高
      treeHeight = basicContainer.offsetHeight - margin.top - margin.bottom;
      // 中心点XY
      const centralX = treeWidth / 2 + margin.left;
      const centralY = treeHeight / 2 + margin.top;

      //svg标签
      const treeSvg = createTreeSvg(treeWidth, treeHeight, fontSize);
      const treeContainer = treeSvg
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
      treeSvg.call(zoom);

      return treeContainer;
    }

    function createTreeSvg(width, height, fontSize) {
      return d3
        .select("#relation")
        .append("svg")
        .attr("class", "tree-svg")
        .attr("width", width)
        .attr("height", height)
        .attr("font-size", fontSize)
        .attr("fill", "#555");
    }

    function createLineLink(id, { x, y }, line) {
      d3.select(`#g${id}`)
        .insert("path", "g")
        .attr("class", (d) => `rg${id}`)
        .attr("d", (d) => {
          return `M ${y} ${x}
                L ${line.y} ${line.x}
                ${line.y} ${line.x}`;
        })
        .attr("fill", "none")
        .attr("stroke-width", 1)
        .attr("stroke", "#dddddd");
    }
    function createLineDash(id, { x, y }, line) {
      d3.select(`#g${id}`)
        .insert("path", "g")
        .attr("class", (d) => `rg${id}`)
        .attr("d", (d) => {
          return `M ${x} ${y}
                L ${x} ${line.y}
                L ${line.x} ${line.y}
                ${line.x} ${line.y}`;
        })
        .attr("fill", "none")
        .attr("stroke-width", 1)
        .attr("stroke", "#dddddd")
        .attr("stroke-dasharray", "5, 5");
    }
    const cellWidth = 300;
    const cellHeight = 60;
    let maxDepth = 0;
    function formatTreeList(obj, level, { x, y }) {
      const temp = obj;
      const levelNum = level + 1;
      temp.x = levelNum * cellWidth;
      temp.y = y;
      temp.level = levelNum;
      temp.childNum = temp.children ? temp.children.length : 0;
      temp.relationNum = temp.relation ? temp.relation.length : 0;
      temp.children.forEach((ele, index) => {
        ele = formatTreeList(ele, levelNum, {
          x: temp.x,
          y: cellHeight * index + y,
        });
      });

      maxDepth = Math.max(maxDepth, temp.childNum + temp.relationNum);

      return temp;
    }

    initTree();

    function createTreeChildCell(container, { x, y }, info) {
      const cellNode = container
        .append("g")
        .attr("transform", `translate(${x},${y})`);
      const cellNodeLens = info.name.length * fontSize + 30;
      const cellWidth = cellNodeLens > 300 ? cellNodeLens : 300;
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
  },
};
</script>
<style>
#relation {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.tree-cell {
  background: #ffffff;
  color: #333333;
  -webkit-filter: drop-shadow(0 0 5px rgb(128 145 165 / 40%));
  /* filter: url(#drop-shadow); */
}
</style>
