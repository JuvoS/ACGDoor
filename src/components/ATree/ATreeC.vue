<template>
  <div id="product_tree">
    <div id="relationLightState"></div>
    <div id="relationLineState"></div>
  </div>
</template>
<script>
import * as d3 from "d3";
export default {
  mounted() {
    const relationBasicData = {
      name: "牵头单位：研发一部",
      title: "研发一部产品设计部4月第一周工作计划",
      children: [
        {
          name: "牵头单位：研发二部",
          title: "研发一部产品设计部4月第一周工作计划",
          children: [],
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
          children: [],
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
      color: 1,
      light: 3,
    };

    const fontSize = 12;
    const minCellWidth = 270;
    const scaleRange = [0.2, 4];
    const NODE_SIZE = [70, 390]; //节点间距(高/水平)
    const circleR = 5; //圆圈半径
    const durationTime = 350;

    /******************************* */

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

    const MAX_NAME_LENS = 20;
    function maxWordsFixed(word) {
      const temp = word + "";
      return temp.length > MAX_NAME_LENS
        ? temp.substring(0, MAX_NAME_LENS) + "···"
        : temp;
    }

    function maxScale(aW, bW) {
      if (aW < bW) {
        return aW / bW;
      } else {
        return 1;
      }
    }
    /*********************** */

    let treeContainer;
    const treeContainerId = "product_tree";
    let treeSvg;
    let relationData;
    function initTree(basicData) {
      relationData = basicData;
      const basicContainer = document.getElementById(treeContainerId);
      //tree容器宽
      const treeWidth = basicContainer.offsetWidth;
      //tree容器高
      const treeHeight = basicContainer.offsetHeight;

      //svg标签
      treeSvg = createTreeSvg(treeWidth, treeHeight, fontSize);
      treeContainer = treeSvg
        .append("g")
        .attr("class", "container")
        .attr("id", "relationTreeContainer");

      initTreeCell(relationData, {
        x: treeHeight / 2,
        y: treeWidth / 2,
      });

      const zoom = d3
        .zoom()
        .scaleExtent(scaleRange)
        .on("zoom", function() {
          return treeContainer.attr("transform", d3.event.transform);
        });

      let wScale = maxScale(treeWidth, maxX - minX);
      let hScale = maxScale(treeHeight, maxY - minY);
      let treeWidthScale = wScale > hScale ? hScale : wScale;
      let transY =
        minY < 0
          ? -minY
          : maxY - treeHeight > 0
          ? -((maxY - treeHeight) * treeWidthScale)
          : 0;

      //动画持续时间
      treeSvg
        .transition()
        .duration(durationTime)
        .call(
          zoom.transform,
          d3.zoomIdentity.translate(0, transY).scale(treeWidthScale)
        );

      treeSvg.call(zoom);

      initLegend();
    }

    function createTreeSvg(width, height, fontSize) {
      return d3
        .select(`#${treeContainerId}`)
        .append("svg")
        .attr("class", "tree-svg")
        .attr("width", width)
        .attr("height", height)
        .attr("font-size", fontSize);
    }

    function formatTreeNodes() {
      const treeNodeSize = d3
        .tree()
        .nodeSize(NODE_SIZE)
        .separation((a, b) => {
          let result =
            a.parent === b.parent &&
            !a.children &&
            !b.children &&
            !a.data.relation &&
            !b.data.relation
              ? 1
              : 2;
          if (result > 1) {
            let relationLens = 1;
            let aChildLens = 0;
            let bChildLens = 0;
            if (a.children) {
              aChildLens = a.children.length;
            } else if (a._children) {
              aChildLens = a._children.length + 1;
            }
            if (b.children) {
              bChildLens = b.children.length;
            } else if (b._children) {
              bChildLens = b._children.length;
            }
            let length = aChildLens + bChildLens;
            let aR = a.data && a.data.relation ? a.data.relation.length : 0;
            let bR = b.data && b.data.relation ? b.data.relation.length : 0;
            if (aR !== bR) {
              bR = bR + (bR / (bR > 5 ? 2 : 3)) * 0.25;
              aR = aR / (aR > 5 ? 3 : 2);
              if (aR == 0) aR = 1;
              if (bR == 0) bR = 1;
            }

            relationLens = relationLens + aR + bR;
            result = length / 2 + relationLens;
          }
          return result;
        });
      return treeNodeSize(rootRelation);
    }

    let isRemoving = false;
    let minX = 0,
      minY = 0,
      maxX = 0,
      maxY = 0;
    function fetchRelationLens(d) {
      return d.data ? (d.data.relation ? d.data.relation.length : 0) : 0;
    }
    function updateTree(source, { x, y }) {
      const tree = formatTreeNodes();
      const nodes = tree.descendants(); //返回后代节点数组，第一个节点为自身，然后依次为所有子节点的拓扑排序
      const links = tree.links(); //返回当前 node 的 links 数组, 其中每个 link 定义了 source父节点, target 子节点属性。
      nodes.forEach((d) => {
        d.y = (d.y ? d.y : 0) + y;
        d.x = (d.x ? d.x : 0) + x;

        minX = Math.min(minX, d.y);
        minY = Math.min(minY, d.x);
        maxX = Math.max(maxX, d.y);
        maxY = Math.max(maxY, d.x + fetchRelationLens(d) * 70);
      });
      maxX += 400;
      maxY += 70;

      const className = `rgNode`;
      const node = treeContainer
        .selectAll(`g.${className}`)
        .data(nodes, (d) => d.id);

      //新增节点，tree会根据数据内的children扩展相关节点
      const nodeEnter = node
        .enter()
        .append("g")
        .attr("id", (d) => `g${d.id}`)
        .attr("class", className)
        .attr("transform", () => `translate(${source.y0},${source.x0})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0);

      nodeEnter.each((d) => {
        createTreeChildCell(d, { x, y });
      });

      // 更新节点：节点enter和exit时都会触发tree更新
      node
        .merge(nodeEnter)
        .transition()
        .duration(durationTime)
        .attr("transform", (d) => `translate(${d.y - minCellWidth / 2},${d.x})`)
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1);

      // 移除节点:tree移除掉数据内不包含的节点(即，children = false)
      node
        .exit()
        .transition()
        .duration(durationTime)
        .remove()
        .attr("transform", () => `translate(${source.y},${source.x})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0);

      createLineLink(links, source, className);

      // 位置变换
      rootRelation.eachBefore((d) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    function createLineLink(links, source, className) {
      // 根据 className来实现分块更新
      const link = treeContainer
        .selectAll(`path.${className}`)
        .data(links, (d) => d.target.id);

      //insert是在g标签前面插入，防止连接线挡住G节点内容
      const linkEnter = link
        .enter()
        .insert("path", "g")
        .attr("class", className)
        .attr("d", (d) => {
          const o = { x: source.x0 + minCellWidth / 2, y: source.y0 };
          return diagonal({ source: o, target: o });
        })
        .attr("fill", "none")
        .attr("stroke-width", 1)
        .attr("stroke", "#dddddd");

      link
        .merge(linkEnter)
        .transition()
        .duration(durationTime)
        .attr("d", diagonal);
      link
        .exit()
        .transition()
        .duration(durationTime)
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
        .duration(durationTime)
        .attr("stroke-width", d.children ? 0 : 1); //控制节点伸缩时的标识圆圈
      d3.selectAll(`.rg${d.id}`)
        .transition()
        .duration(durationTime)
        .style("display", d.children ? "" : "none");
      isRemoving = true;
      updateTree(d, pointXY);
      setTimeout(() => {
        isRemoving = false;
      }, durationTime);
    }

    function createLineDash(id, { x, y }, line) {
      d3.select(`#${id}`)
        .insert("path", "g")
        .attr("class", (d) => `rg${d.id}`)
        .attr("id", (d) => `dash${d.id}`)
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
    function drawText(container) {
      container
        .append("text")
        .attr("y", 0)
        .attr("x", 0)
        .attr("text-anchor", "start")
        .style("font-size", fontSize)
        .text((d) => maxWordsFixed("承办单位：" + d.data.name));

      const textNode = container
        .append("text")
        .attr("y", fontSize + 10)
        .attr("x", 0)
        .attr("text-anchor", "start")
        .style("font-size", fontSize)
        .style("cursor", "pointer")
        .attr("fill", "#333")
        .text((d) => maxWordsFixed(d.data.title))
        .on("mouseover", () => {
          textNode.attr("fill", "#2196f3");
        })
        .on("mouseleave", () => {
          textNode.attr("fill", "#333");
        })
        .on("click", (d) => {
          openTask(d.data.taskId, d.data.title);
        });
    }
    //画子文本
    function drawTsText(id, info) {
      let realh = document.getElementById(id).getBBox().height;
      let realX = document.getElementById(id).getBBox().x;
      let realY = document.getElementById(id).getBBox().y;
      const rgNode = d3
        .select(`#${id}`)
        .append("g")
        .attr("class", (d) => `rg${d.id}`)
        .attr(
          "transform",
          (d) => `translate(${realX + 40},${realY + realh + 30})`
        );

      createLineDash(
        id,
        { x: realX + 20, y: realY + 55 },
        { x: realX + 60, y: realY + realh + 50 }
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
        .text(maxWordsFixed("承办单位：" + info.name));
      rgNode
        .append("text")
        .attr("x", 10)
        .attr("y", fontSize + 30)
        .attr("fill", "#333")
        .text(maxWordsFixed(info.task));
    }

    //画方框
    function drawRect(rectNode) {
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
        .attr("fill", (d) => fetchLightColor(d.data.info.type));

      // 状态灯
      rectNode
        .append("circle")
        .attr("r", 5)
        .attr("cx", minCellWidth - 20)
        .attr("cy", -10)
        .attr("fill", (d) => fetchLightColor(d.data.info.type));
    }

    function fetchLightColor(colorType) {
      const type = colorType + "";
      if (type.indexOf("blue") > -1) {
        return "#2196f3";
      }
      if (type.indexOf("red") > -1) {
        return "#f44336";
      }
      if (type.indexOf("orange") > -1) {
        return "#ff9800";
      }
      if (type.indexOf("green") > -1) {
        return "#4caf50";
      }

      return "#2196f3";
    }

    //画circle
    function drawCircle(id, radius) {
      let gMark = d3
        .select(`#${id}`)
        .append("g")
        .attr("class", "node-circle")
        .attr("stroke", "#333")
        .attr("stroke-width", 1);

      gMark
        .append("circle")
        .attr("class", "tree-cell")
        .attr("fill", "none")
        .attr("r", (d) => (d.depth === 0 ? 0 : radius)) //根节点不设置圆圈
        .attr("fill", "#ffffff");
      let padding = radius - 2;
      gMark
        .append("path")
        .attr("stroke", "#ccc")
        .attr("d", `m -${padding} 0 l ${2 * padding} 0`); //横线

      gMark
        .append("path") //竖线，根据展开/收缩动态控制显示
        .attr("d", `m 0 -${padding} l 0 ${2 * padding}`)
        .attr("stroke", "#ccc")
        .attr("stroke-width", 0)
        .attr("class", "node-circle-vertical");
      return gMark;
    }

    function createTreeChildCell(d, { x, y }) {
      const rectNode = d3.select(`#g${d.id}`).append("g");
      drawRect(rectNode); //画方框
      drawText(rectNode); //画文本
      let flag = false;
      rectNode
        .on("mouseover", (d) => {
          if (!flag && !isRemoving) {
            d3.selectAll(".treeTips").remove();
            const treeTips = initTreeTips(treeContainer);
            const container = document.getElementById(treeContainerId);
            const clientX = d3.event.clientX;

            const tipX =
              container.offsetWidth - clientX + 20 > 240
                ? d.y + minCellWidth / 2
                : d.y - 240 - minCellWidth / 2 - 20;

            treeTips.attr("transform", `translate(${tipX},${d.x - 20})`);
            treeTips.select("#tip-title").text(maxWordsFixed("" + d.data.name));
            appendTipInfo(d);
            treeTips.style("display", null);
            flag = true;

            d3.selectAll(`#dash${d.id}`).classed("link-flow-out", true);
          }
        })
        .on("mouseout", (d) => {
          flag = false;
          d3.selectAll(".treeTips").remove();
          d3.selectAll(`#dash${d.id}`).classed("link-flow-out", false);
        });

      if (d.data.relation) {
        d.data.relation.forEach((ele) => {
          drawTsText(`g${d.id}`, ele); //画子文本
        });
      }

      if (d.depth === 0) {
        // 帽子标签
        rectNode
          .append("text")
          .attr("x", -8)
          .attr("y", -16)
          .attr("fill", "#ff0")
          .style("transform", "rotate(-30deg)")
          .attr("font-size", 24)
          .text("👑");
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
    }

    let rootRelation;
    function initTreeCell(treeRelation, { x, y }) {
      const temp = d3.hierarchy(treeRelation);
      temp.x0 = x;
      temp.y0 = y;
      temp.descendants().forEach((d) => {
        d._children = d.children; //添加_children属性，用于实现点击收缩及展开功能
        d.id = "cell" + uuid(); //绑定唯一标识ID
      });
      rootRelation = temp;

      updateTree(temp, { x, y });
    }

    /**
     * 数组深度计算
     * */
    function fetchDepth(obj) {
      let depthNum = 0;
      function treeDepthGrade(obj, level = 0) {
        depthNum = Math.max(depthNum, level);
        if (obj.children && obj.children.length > 0) {
          obj.children.forEach((v, i) => {
            treeDepthGrade(v, level + 1);
          });
        }
      }
      treeDepthGrade(obj);

      return depthNum;
    }

    function initTreeTips(container) {
      const tipNode = container
        .append("g")
        .attr("class", "treeTips")
        .style("display", "none");

      tipNode
        .append("rect", "text")
        .attr("id", "treeTipsPane")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 240)
        .attr("height", 165)
        .attr("rx", 2) //圆角
        .attr("class", "tree-cell")
        .style("fill", "#ffffff");

      tipNode
        .append("path", "text")
        .attr("x", 0)
        .attr("y", 30)
        .attr("d", `M 0 30 ,L 240 30 ,240 30`)
        .attr("stroke-width", 1)
        .attr("stroke", "#eee");

      tipNode
        .append("text")
        .attr("id", "tip-title")
        .attr("x", 8)
        .attr("y", 20)
        .text("标题");

      tipNode.append("g").attr("id", "tip-info");

      return tipNode;
    }

    function appendTipInfo(d) {
      d3.select("#tip-info")
        .selectAll("text")
        .remove();

      d3.select("#treeTipsPane")
        .attr("width", 240)
        .attr("height", 165);

      const tipState = d3
        .select("#tip-info")
        .append("g")
        .attr("x", 8)
        .attr("y", 50);
      tipState
        .append("text")
        .attr("x", 8)
        .attr("y", 50)
        .attr("fill", "#333")
        .text("当前任务状态");
      tipState
        .append("circle")
        .attr("r", 5)
        .attr("cx", 90)
        .attr("cy", 45)
        .attr("fill", fetchLightColor(d.data.info.type));
      tipState
        .append("text")
        .attr("x", 102)
        .attr("y", 50)
        .attr("fill", "#333")
        .text(`${d.data.stateTitle}`);
      const info = d.data.info;
      let tipIndex = 1;
      appendTipCell(
        8,
        50 + 25 * tipIndex,
        `牵头单位：${maxWordsFixed(info.name ? info.name : "-")}`
      );
      tipIndex++;
      const personArr = dealPersonName(info.person);
      personArr.forEach((ele, index) => {
        if (index === 0) {
          appendTipCell(8, 50 + 25 * tipIndex, `承办人员：${ele ? ele : "-"}`);
          tipIndex++;
        }

        if (index === 1) {
          appendTipCell(65, 50 + 25 * tipIndex - 8, `${ele ? ele : "-"}`);
          tipIndex++;
        }
      });

      const withArr = dealPersonName(info.with);
      withArr.forEach((ele, index) => {
        if (index === 0) {
          appendTipCell(
            8,
            50 + 25 * tipIndex - 8,
            `协办人员：${ele ? ele : "-"}`
          );
          tipIndex++;
        }

        if (index === 1) {
          appendTipCell(65, 50 + 25 * tipIndex - 16, `${ele ? ele : "-"}`);
          tipIndex++;
        }
      });

      appendTipCell(
        8,
        50 + 25 * tipIndex - 10,
        `完成时间：${info.finishTime ? info.finishTime : "-"}`
      );

      d3.select("#treeTipsPane")
        .attr("width", 240)
        .attr(
          "height",
          document.getElementById("tip-info").getBBox().height + 50
        );
    }

    function appendTipCell(x, y, text) {
      d3.select("#tip-info")
        .append("text")
        .attr("x", x)
        .attr("y", y)
        .attr("fill", "#333")
        .text(text);
    }

    function chunk(array, size) {
      let [start, end, result] = [null, null, []];
      for (let i = 0; i < Math.ceil(array.length / size); i++) {
        start = i * size;
        end = start + size;
        result.push(array.slice(start, end));
      }
      return result;
    }

    function dealPersonName(person) {
      const temp = person + "";
      const personArr = chunk(temp.split(","), 3);
      let textArr = [];
      personArr.forEach((ele) => {
        textArr.push(ele.join(","));
      });

      if (textArr.length > 2) {
        textArr = chunk(textArr, 2);
        let tempArr = textArr[0];
        tempArr[1] = tempArr[1] + "···";
        return tempArr;
      } else {
        return textArr;
      }
    }

    /**
     * 初始化图例
     */
    function initLegend() {
      const legendLineId = "relationLineState";
      const legendLightId = "relationLightState";
      const legendSvg = d3
        .select(`#${legendLineId}`)
        .append("svg")
        .attr("width", 240)
        .attr("height", 20)
        .attr("font-size", 12);
      const legendLight = d3
        .select(`#${legendLightId}`)
        .append("svg")
        .attr("height", 15)
        .attr("font-size", 12);

      initLegendLight(legendLight);
      initLegendLine(legendSvg);
    }

    /**
     * 初始化图例标识灯
     * @param legendLight
     */
    function initLegendLight(legendLight) {
      const lineY = 6;
      const textY = 10;

      const lightGroup = legendLight.append("g");
      const arr = [
        { name: "正常推进", color: "#4caf50" },
        { name: "进展缓慢/已超期", color: "#f44336" },
        { name: "即将超期", color: "#ff9800" },
        { name: "已完成", color: "#2196f3" },
      ];

      let posX = 6;
      arr.forEach((ele) => {
        const lightCell = lightGroup.append("g");
        lightCell
          .append("circle")
          .attr("r", 5)
          .attr("cx", posX)
          .attr("cy", lineY)
          .attr("fill", ele.color);
        lightCell
          .append("text")
          .attr("x", posX + 8)
          .attr("y", textY)
          .attr("fill", "#6e6e6e")
          .text(ele.name);

        posX += 10 + ele.name.length * 12 + 15;
      });
      legendLight.attr("width", posX - 15);
    }

    /**
     * 初始化图例线条
     * @param legendSvg
     */
    function initLegendLine(legendSvg) {
      const lineY = 10;
      const textY = 15;
      const lineCellWidth = 120;
      const lineWidth = 60;

      const legendLine = legendSvg.append("g");
      legendLine
        .append("path")
        .attr(
          "d",
          `M ${0} ${lineY}
                  L ${lineWidth} ${lineY}
                  ${lineWidth} ${lineY}`
        )
        .attr("stroke-width", 1)
        .attr("stroke", "#dddddd");
      legendLine
        .append("text")
        .attr("x", lineWidth + 4)
        .attr("y", textY)
        .attr("fill", "#6e6e6e")
        .text("子任务");
      legendLine
        .append("path")
        .attr(
          "d",
          `M ${lineCellWidth} ${lineY}
                  L ${lineCellWidth + lineWidth} ${lineY}
                  ${lineCellWidth + lineWidth} ${lineY}`
        )
        .attr("stroke-width", 1)
        .attr("stroke", "#dddddd")
        .attr("stroke-dasharray", "5, 5");
      legendLine
        .append("text")
        .attr("x", lineCellWidth + lineWidth + 4)
        .attr("y", textY)
        .attr("fill", "#6e6e6e")
        .text("关联任务");
    }

    initTree(relationBasicData);
  },
};
</script>
<style>
#product_tree {
  width: 100%;
  height: 100%;
}
#relationLineState {
  position: absolute;
  top: 20px;
  right: 0;
  height: 30px;
  background: #ffffff;
}
#relationLightState {
  position: absolute;
  top: 0;
  right: 0;
  height: 20px;
  background: #ffffff;
}
.tree-cell {
  background: #ffffff;
  color: #333333;
  -webkit-filter: drop-shadow(0 0 5px rgb(128 145 165 / 40%));
  /* filter: url(#drop-shadow); */
}

.link-flow-in {
  stroke-dasharray: 8;
  -webkit-animation: dash-line 30s linear infinite;
  animation: dash-line 30s linear infinite;
}
.link-flow-out {
  stroke: #2196f3;
  stroke-dasharray: 8;
  animation: dash-line 20s linear infinite reverse;
}
@-webkit-keyframes dash-line {
  to {
    stroke-dashoffset: 1000;
  }
}
@keyframes dash-line {
  to {
    stroke-dashoffset: 1000;
  }
}
</style>
