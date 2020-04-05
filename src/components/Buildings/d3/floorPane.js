import * as d3 from "d3";
import { pointsArrFac, circleArrFac } from "./pointFunc";
import { leafStrArr } from "./leafStr";
import {
  treeLRoadArr,
  treeRoadArr,
  paneLArr,
  paneCArr,
  paneRArr,
  paneCover,
  spaceCover,
  lanAArr,
  lanBArr,
} from "./floorArr";

let FloorId = "";
let FloorPane = () => {};

FloorPane.prototype.init = (
  eleId,
  resource,
  overCallback,
  leaveCallback,
  clickCallback,
  dbClickCallback,
  groundCallback = () => {}
) => {
  if (!document.getElementById(eleId)) return;

  FloorId = eleId;
  const containerWidth = document.getElementById(eleId).offsetWidth;
  const containerHeight = document.getElementById(eleId).offsetHeight;
  const tipW = 25;
  const tipsW = 20;
  let tipmW = tipW - tipsW;

  let QRroomArr = _.filter(resource, { floorType: "Q" });
  let ARroomArr = _.filter(resource, { floorType: "T1" });
  let BRroomArr = _.filter(resource, { floorType: "T2" });
  let DRroomArr = _.sortBy(_.filter(resource, { floorType: "B" }), (o) => {
    return parseInt(o.floor);
  });
  let GRroomArr = _.filter(resource, { floorType: "G" });

  d3.select("#" + eleId)
    .selectAll()
    .exit()
    .remove();
  const svgEle = d3
    .select("#" + eleId)
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%");

  //楼层高度
  let upLength = ARroomArr.length;
  if (ARroomArr.length - BRroomArr.length < 0) upLength = BRroomArr.length;
  let roomLength = QRroomArr.length + upLength;
  let roomRealHeight = (containerHeight * 3) / 6 / roomLength;
  let spaceRealHeight = (containerHeight * 0.3) / 6 / DRroomArr.length;

  let droomIndex = 0;
  DRroomArr.forEach((ele) => {
    underMaker(svgEle.append("g"), ele, droomIndex);
    droomIndex++;
  });
  CreateDRCover();

  horizonMaker(svgEle.append("g"));

  gardenMaker(svgEle.append("g"));

  let qRoomY = QRroomArr.length * roomRealHeight;

  //T2
  let broomIndex = 0;
  BRroomArr.forEach((ele) => {
    bRMaker(svgEle.append("g"), ele, broomIndex);
    broomIndex++;
  });
  CreateBRCover();

  //裙楼
  let qroomIndex = 0;
  QRroomArr.forEach((ele) => {
    qunMaker(svgEle.append("g"), ele, qroomIndex);
    qroomIndex++;
  });
  CreateQRCover();

  //连廊
  let lroomIndex = 0;
  for (let i = 0; i < 4; i++) {
    let lroomEle = svgEle.append("g");
    lanMaker(lroomEle, {}, lroomIndex);
    lroomIndex++;
  }

  CreateLRCover();

  let aroomIndex = 0;
  ARroomArr.forEach((ele) => {
    let aroomEle = svgEle.append("g");
    aRMaker(aroomEle, ele, aroomIndex, qRoomY);
    aroomIndex++;
  });
  CreateARCover(qRoomY);

  //新春
  // svgEle
  //   .append("text")
  //   .text("新春快乐")
  //   .attr("fill", "#fce94e")
  //   .attr("stroke", "#fce94e")
  //   .attr("text-anchor", "middle")
  //   .attr("class", "spring-btitle")
  //   .attr("x", containerWidth * 0.35)
  //   .attr("y", containerHeight * 0.6 - (BRroomArr.length + 4) * roomRealHeight)
  //   .style("transform-origin", "50% 50%")
  //   .style("transform", "skewY(-9deg)");
  // svgEle
  //   .append("text")
  //   .text("天德广场")
  //   .attr("fill", "#fce94e")
  //   .attr("stroke", "#fce94e")
  //   .attr("class", "spring-atitle")
  //   .attr("x", containerWidth * 0.53)
  //   .attr("y", qRoomY - roomRealHeight)
  //   .style("transform-origin", "50% 50%")
  //   .style("transform", "skewY(18deg)");

  // d3.select("#Dui")
  //   .selectAll("g")
  //   .remove();
  // let DuiEle = svgEle.append("g").attr("id", "Dui");
  // DuiEle.append("g")
  //   .append("svg:image")
  //   .attr("href", "static/spring/duileft.png")
  //   .attr("x", containerWidth * 0.48 - 40)
  //   .attr("y", qRoomY - roomRealHeight)
  //   .attr("width", "40");
  // DuiEle.append("g")
  //   .append("svg:image")
  //   .attr("href", "static/spring/duiright.png")
  //   .attr("x", containerWidth * 0.67)
  //   .attr("y", qRoomY + roomRealHeight * 7)
  //   .attr("width", "40");

  // DuiEle.append("g")
  //   .append("svg:image")
  //   .attr("href", "static/spring/duileft.png")
  //   .attr("id", "BDuiL")
  //   .attr("x", containerWidth * 0.27)
  //   .attr("y", containerHeight * 0.6 - BRroomArr.length * roomRealHeight)
  //   .attr("width", "40");
  // DuiEle.append("g")
  //   .append("svg:image")
  //   .attr("href", "static/spring/duiright.png")
  //   .attr("id", "BDuiR")
  //   .attr("x", containerWidth * 0.42)
  //   .attr("y", containerHeight * 0.6 - (BRroomArr.length + 4) * roomRealHeight)
  //   .attr("width", "40");

  //T1
  //裙楼
  //T2封盖
  //连廊封盖
  //T1封盖
  //裙楼封盖
  //文字

  let roadTEle = svgEle.append("g");
  roadTreeMaker(roadTEle);

  // 缩放;
  // let zoomobj = d3.zoom().scaleExtent([0.25, 4]);
  // let zoom = zoomobj
  //     .on("zoom", function() {
  //         svgEle.selectAll("g").attr("transform", d3.event.transform);
  //     })
  //     .on("end", function() {});
  // svgEle.call(zoom).on("wheel", () => d3.event.preventDefault());

  //地下空间
  function underMaker(gEle, obj, index) {
    TipMaker(gEle, obj, spaceTPos(index));
    CreateBasicWall(gEle, obj, spaceLPos(index), "#16517f", "#7cd5ff");
    CreateBasicWall(gEle, obj, spacePos(index), "#16517f", "#7cd5ff");
    CreateBasicWall(gEle, obj, spaceRPos(index), "#16517f", "#7cd5ff");
  }

  //地平面
  function horizonMaker(gEle) {
    gEle.attr("id", "basicGround").on("click", function () {
      groundCallback();
    });
    gEle.append("polygon").attr("points", horizonLPos).attr("fill", "#14354d");
    gEle.append("polygon").attr("points", horizonPos).attr("fill", "#14354d");
    gEle.append("polygon").attr("points", horizonRPos).attr("fill", "#173d5a");
    let gardenObj = _.get(GRroomArr, "[0]", {});

    TipMaker(gEle, gardenObj, horizonTPos);

    gEle
      .append("polygon")
      .attr("points", horizonCover)
      .attr("fill", "#194362")
      .attr("stroke", "#2986b0")
      .attr("stroke-width", 0.1)
      .attr("class", "floor_" + gardenObj.id)
      .on("dblclick", function (event) {
        if (event) event.preventDefault();
        dbClickCallback(gardenObj);
      })
      .on("click", function () {
        clickCallback(gardenObj);
      })
      .on("mouseover", function () {
        d3.selectAll(".floor_" + gardenObj.id).select(function () {
          this.attributes.stroke.value = this.attributes.fill.value;
          this.attributes.fill.value = "#7cd5ff";
        });
        overCallback(gardenObj);
      })
      .on("mouseleave", function () {
        d3.selectAll(".floor_" + gardenObj.id).select(function () {
          this.attributes.fill.value = this.attributes.stroke.value;
          this.attributes.stroke.value = "#2986b0";
        });
        leaveCallback();
      });
  }
  function WHArrFac(width, height, arr) {
    let tmp = _.cloneDeep(arr);
    tmp.forEach((ele) => {
      ele.x = width * ele.x;
      ele.y = height * ele.y;
    });
    return tmp;
  }

  //花园
  function gardenMaker(gEle) {
    WHArrFac(containerWidth, containerHeight, treeLRoadArr).forEach((ele) => {
      CreateATree(gEle, ele.x, ele.y, 1);
    });
  }

  //连廊
  function lanMaker(gEle, obj, index) {
    CreateNoEventWall(gEle, lanPos(index), "#16517f");
  }

  //裙楼
  function qunMaker(gEle, obj, index) {
    TipMaker(gEle, obj, qunTPos(index));
    CreateBasicWall(gEle, obj, qunPos(index), "#16517f", "#7cd5ff");
    CreateBasicWall(gEle, obj, qunLPos(index), "#16517f", "#7cd5ff");
    CreateBasicWall(gEle, obj, qunRPos(index), "#16517f", "#7cd5ff");
    CreateBasicWall(gEle, obj, qunRBPos(index), "#16517f", "#7cd5ff");
    CreateBasicWall(gEle, obj, qunRLPos(index), "#16517f", "#7cd5ff");
  }

  //A栋
  function aRMaker(gEle, obj, index, qRoomY) {
    TipMaker(gEle, obj, aTPos(index, qRoomY));
    CreateBasicWall(gEle, obj, aRPos(index, qRoomY), "#16517f", "#7cd5ff");
    CreateBasicWall(gEle, obj, aRLPos(index, qRoomY), "#16517f", "#7cd5ff");
    CreateBasicWall(gEle, obj, aRRPos(index, qRoomY), "#16517f", "#7cd5ff");
  }

  //B栋
  function bRMaker(gEle, obj, index) {
    TipMaker(gEle, obj, bTPos(index));
    CreateBasicWall(gEle, obj, bRLPos(index), "#16517f", "#7cd5ff");
    CreateBasicWall(gEle, obj, bRPos(index), "#16517f", "#7cd5ff");
  }

  //行道树
  function roadTreeMaker(gEle) {
    _.reverse(WHArrFac(containerWidth, containerHeight, treeRoadArr)).forEach(
      (ele) => {
        CreateATree(gEle, ele.x, ele.y, 1);
      }
    );
  }

  //楼层单击选中小标记
  function TipMaker(gEle, obj, points) {
    if (!obj.id) obj.id = _.random();
    gEle
      .append("polygon")
      .attr("points", points)
      .attr("fill", "#7cd5ff")
      .attr("stroke", "#2986b0")
      .attr("stroke-width", 0.5)
      .attr("class", "tip_" + obj.id)
      .classed("tipId", true)
      .attr("opacity", 0);
  }

  //墙面形状创建
  function CreateBasicWall(gEle, obj, points, color, overColor) {
    if (!obj.id) obj.id = _.random();
    gEle
      .append("polygon")
      .attr("points", points)
      .attr("fill", color)
      .attr("stroke", "#2986b0")
      .attr("stroke-width", 0.5)
      .attr("class", "floor_" + obj.id)
      .on("dblclick", function () {
        dbClickCallback(obj); //双击事件
      })
      .on("click", function () {
        clickCallback(obj); //单击事件
      })
      .on("mouseover", function () {
        //鼠标覆盖事件
        d3.selectAll(".floor_" + obj.id).select(function () {
          this.attributes.stroke.value = this.attributes.fill.value;
          this.attributes.fill.value = overColor;
        });
        overCallback(obj);
      })
      .on("mouseleave", function () {
        //鼠标离开事件
        d3.selectAll(".floor_" + obj.id).select(function () {
          this.attributes.fill.value = this.attributes.stroke.value;
          this.attributes.stroke.value = "#2986b0";
        });
        leaveCallback();
      });
  }

  //无事件墙面形状创建
  function CreateNoEventWall(gEle, points, color) {
    gEle
      .append("polygon")
      .attr("points", points)
      .attr("fill", color)
      .attr("stroke", "#2986b0")
      .attr("stroke-width", 0.5);
  }

  //地下空间封盖创建
  function CreateDRCover() {
    svgEle
      .append("g")
      .append("polygon")
      .attr("points", spaceCoverPos())
      .attr("fill", "#296db0");
  }

  //裙楼封盖创建
  function CreateQRCover() {
    svgEle
      .append("g")
      .append("polygon")
      .attr("points", qunCover())
      .attr("fill", "#a5c7e0");
  }

  //连廊封盖创建
  function CreateLRCover() {
    svgEle
      .append("g")
      .append("polygon")
      .attr("points", lanCoverPos())
      .attr("fill", "#a5c7e0");
  }

  //T1封盖创建
  function CreateARCover(qRoomY) {
    let ACoverEle = svgEle.append("g");
    ACoverEle.append("polygon")
      .attr("points", aRCoverPos(qRoomY))
      .attr("fill", "#a5c7e0");
    ACoverEle.append("polygon")
      .attr("points", aRCoverWinL(qRoomY))
      .attr("fill", "#16517f")
      .attr("opacity", 0.6);
    ACoverEle.append("polygon")
      .attr("points", aRCoverWinC(qRoomY))
      .attr("fill", "#16517f")
      .attr("opacity", 0.6);
    ACoverEle.append("polygon")
      .attr("points", aRCoverWinB(qRoomY))
      .attr("fill", "#16517f")
      .attr("opacity", 0.6);
    ACoverEle.append("polygon")
      .attr("points", aRCoverWinE(qRoomY))
      .attr("fill", "#16517f")
      .attr("opacity", 0.6);
  }

  //T2封盖创建
  function CreateBRCover() {
    svgEle
      .append("g")
      .append("polygon")
      .attr("points", bRCoverPos())
      .attr("fill", "#a5c7e0")
      .attr("stroke", "#2986b0");
  }

  //地面选中 小标签
  function horizonTPos() {
    let hArr = [
      {
        x: containerWidth * 0.05 - tipsW,
        y: containerHeight * 0.56 + spaceRealHeight / 6,
      },
      {
        x: containerWidth * 0.05 - tipmW,
        y: containerHeight * 0.56 + spaceRealHeight / 2,
      },
      {
        x: containerWidth * 0.05 - tipsW,
        y: containerHeight * 0.56 + (spaceRealHeight / 6) * 5,
      },
      {
        x: containerWidth * 0.05 - tipW,
        y: containerHeight * 0.56 + spaceRealHeight / 2,
      },
    ];

    return pointsArrFac(hArr);
  }

  //地面左侧墙体
  function horizonLPos() {
    return pointsArrFac(WHArrFac(containerWidth, containerHeight, paneLArr));
  }

  //地面前侧墙体
  function horizonPos() {
    return pointsArrFac(WHArrFac(containerWidth, containerHeight, paneCArr));
  }

  //地面右侧墙体
  function horizonRPos() {
    return pointsArrFac(WHArrFac(containerWidth, containerHeight, paneRArr));
  }

  //地面封盖
  function horizonCover() {
    return pointsArrFac(WHArrFac(containerWidth, containerHeight, paneCover));
  }

  //地下空间标签
  function spaceTPos(index) {
    let sH = index * spaceRealHeight;
    let sHB = (index + 1) * spaceRealHeight;
    let sArr = [
      {
        x: containerWidth * 0.1 - tipsW,
        y: containerHeight * 0.64 + sH + spaceRealHeight / 6,
      },
      {
        x: containerWidth * 0.1 - tipmW,
        y: containerHeight * 0.64 + sH + spaceRealHeight / 2,
      },
      {
        x: containerWidth * 0.1 - tipsW,
        y: containerHeight * 0.64 + sHB - spaceRealHeight / 6,
      },

      {
        x: containerWidth * 0.1 - tipW,
        y: containerHeight * 0.64 + sH + spaceRealHeight / 2,
      },
    ];
    return pointsArrFac(sArr);
  }

  //地下空间左侧墙体
  function spaceLPos(index) {
    let sH = index * spaceRealHeight;
    let sHB = (index + 1) * spaceRealHeight;
    let sArr = [
      { x: containerWidth * 0.1, y: containerHeight * 0.64 + sH },
      { x: containerWidth * 0.25, y: containerHeight * 0.72 + sH },
      { x: containerWidth * 0.25, y: containerHeight * 0.72 + sHB },
      { x: containerWidth * 0.1, y: containerHeight * 0.64 + sHB },
    ];

    return pointsArrFac(sArr);
  }

  //地下空间前侧墙体
  function spacePos(index) {
    let sH = index * spaceRealHeight;
    let sHB = (index + 1) * spaceRealHeight;
    let sArr = [
      { x: containerWidth * 0.25, y: containerHeight * 0.72 + sH },
      { x: containerWidth * 0.75, y: containerHeight * 0.72 + sH },
      { x: containerWidth * 0.75, y: containerHeight * 0.72 + sHB },
      { x: containerWidth * 0.25, y: containerHeight * 0.72 + sHB },
    ];

    return pointsArrFac(sArr);
  }

  //地下空间右侧墙体
  function spaceRPos(index) {
    let sH = index * spaceRealHeight;
    let sHB = (index + 1) * spaceRealHeight;
    let sArr = [
      { x: containerWidth * 0.75, y: containerHeight * 0.72 + sH },
      { x: containerWidth * 0.9, y: containerHeight * 0.64 + sH },
      { x: containerWidth * 0.9, y: containerHeight * 0.64 + sHB },
      { x: containerWidth * 0.75, y: containerHeight * 0.72 + sHB },
    ];

    return pointsArrFac(sArr);
  }

  //地下空间封盖
  function spaceCoverPos() {
    return pointsArrFac(WHArrFac(containerWidth, containerHeight, spaceCover));
  }

  //连廊前侧墙体
  function lanPos(index) {
    let qH = -(index - 1) * roomRealHeight;
    let qHB = -index * roomRealHeight;
    let sArr = [
      { x: containerWidth * 0.42, y: containerHeight * 0.545 + qH },
      { x: containerWidth * 0.42, y: containerHeight * 0.545 + qH },
      { x: containerWidth * 0.46, y: containerHeight * 0.52 + qH },
      { x: containerWidth * 0.51, y: containerHeight * 0.555 + qH },
      { x: containerWidth * 0.51, y: containerHeight * 0.555 + qH },
    ];

    let bArr = [
      { x: containerWidth * 0.51, y: containerHeight * 0.555 + qHB },
      { x: containerWidth * 0.51, y: containerHeight * 0.555 + qHB },
      { x: containerWidth * 0.46, y: containerHeight * 0.52 + qHB },
      { x: containerWidth * 0.42, y: containerHeight * 0.545 + qHB },
      { x: containerWidth * 0.42, y: containerHeight * 0.545 + qHB },
    ];

    return circleArrFac(sArr) + circleArrFac(bArr);
  }

  //裙楼前侧墙体
  function qunPos(index) {
    let qH = -(index - 1) * roomRealHeight;
    let qHB = -index * roomRealHeight;
    let sArr = [
      { x: containerWidth * 0.48, y: containerHeight * 0.54 + qH },
      { x: containerWidth * 0.48, y: containerHeight * 0.54 + qH },
      { x: containerWidth * 0.54, y: containerHeight * 0.62 + qH },
      { x: containerWidth * 0.63, y: containerHeight * 0.64 + qH },
      { x: containerWidth * 0.67, y: containerHeight * 0.63 + qH },
      { x: containerWidth * 0.67, y: containerHeight * 0.63 + qH },
    ];
    let bArr = [
      { x: containerWidth * 0.67, y: containerHeight * 0.63 + qHB },
      { x: containerWidth * 0.67, y: containerHeight * 0.63 + qHB },
      { x: containerWidth * 0.63, y: containerHeight * 0.64 + qHB },
      { x: containerWidth * 0.54, y: containerHeight * 0.62 + qHB },
      { x: containerWidth * 0.48, y: containerHeight * 0.54 + qHB },
      { x: containerWidth * 0.48, y: containerHeight * 0.54 + qHB },
    ];

    return circleArrFac(sArr) + circleArrFac(bArr);
  }

  //裙楼小标签
  function qunTPos(index) {
    let qH = -(index - 1) * roomRealHeight;
    let qHB = -index * roomRealHeight;
    let sArr = [
      {
        x: containerWidth * 0.84 + tipsW,
        y: containerHeight * 0.55 + qH - roomRealHeight / 6,
      },
      {
        x: containerWidth * 0.84 + tipmW,
        y: containerHeight * 0.55 + qH - roomRealHeight / 2,
      },
      {
        x: containerWidth * 0.84 + tipsW,
        y: containerHeight * 0.55 + qHB + roomRealHeight / 6,
      },
      {
        x: containerWidth * 0.84 + tipW,
        y: containerHeight * 0.55 + qH - roomRealHeight / 2,
      },
    ];
    return pointsArrFac(sArr);
  }

  //裙楼左侧墙体
  function qunLPos(index) {
    let qH = -(index - 1) * roomRealHeight;
    let qHB = -index * roomRealHeight;
    let sArr = [
      { x: containerWidth * 0.67, y: containerHeight * 0.63 + qH },
      { x: containerWidth * 0.685, y: containerHeight * 0.615 + qH },
      { x: containerWidth * 0.685, y: containerHeight * 0.615 + qHB },
      { x: containerWidth * 0.67, y: containerHeight * 0.63 + qHB },
    ];
    return pointsArrFac(sArr);
  }

  //裙楼右侧墙体
  function qunRPos(index) {
    let qH = -(index - 1) * roomRealHeight;
    let qHB = -index * roomRealHeight;
    let sArr = [
      { x: containerWidth * 0.685, y: containerHeight * 0.615 + qH },
      { x: containerWidth * 0.705, y: containerHeight * 0.615 + qH },
      { x: containerWidth * 0.705, y: containerHeight * 0.615 + qHB },
      { x: containerWidth * 0.685, y: containerHeight * 0.615 + qHB },
    ];
    return pointsArrFac(sArr);
  }

  //裙楼右侧附加墙体
  function qunRBPos(index) {
    let qH = -(index - 1) * roomRealHeight;
    let qHB = -index * roomRealHeight;
    let sArr = [
      { x: containerWidth * 0.705, y: containerHeight * 0.615 + qH },
      { x: containerWidth * 0.73, y: containerHeight * 0.61 + qH },
      { x: containerWidth * 0.73, y: containerHeight * 0.61 + qHB },
      { x: containerWidth * 0.705, y: containerHeight * 0.615 + qHB },
    ];
    return pointsArrFac(sArr);
  }

  //裙楼右侧左部墙体
  function qunRLPos(index) {
    let qH = -(index - 1) * roomRealHeight;
    let qHB = -index * roomRealHeight;
    let sArr = [
      { x: containerWidth * 0.73, y: containerHeight * 0.61 + qH },
      { x: containerWidth * 0.84, y: containerHeight * 0.55 + qH },
      { x: containerWidth * 0.84, y: containerHeight * 0.55 + qHB },
      { x: containerWidth * 0.73, y: containerHeight * 0.61 + qHB },
    ];
    return pointsArrFac(sArr);
  }

  //裙楼封盖
  function qunCover() {
    let qH = -(QRroomArr.length - 1) * roomRealHeight;
    let sArr = [
      { x: containerWidth * 0.48, y: containerHeight * 0.54 + qH },
      { x: containerWidth * 0.48, y: containerHeight * 0.54 + qH },
      { x: containerWidth * 0.54, y: containerHeight * 0.62 + qH },
      { x: containerWidth * 0.63, y: containerHeight * 0.64 + qH },
      { x: containerWidth * 0.67, y: containerHeight * 0.63 + qH },
      { x: containerWidth * 0.67, y: containerHeight * 0.63 + qH },
    ];
    let bArr = [
      { x: containerWidth * 0.67, y: containerHeight * 0.63 + qH },
      { x: containerWidth * 0.685, y: containerHeight * 0.615 + qH },
      { x: containerWidth * 0.705, y: containerHeight * 0.615 + qH },
      { x: containerWidth * 0.73, y: containerHeight * 0.61 + qH },
      { x: containerWidth * 0.84, y: containerHeight * 0.55 + qH },
    ];
    let eArr = [
      { x: containerWidth * 0.84, y: containerHeight * 0.55 + qH },
      { x: containerWidth * 0.85, y: containerHeight * 0.5 + qH },
      { x: containerWidth * 0.8, y: containerHeight * 0.47 + qH },
      { x: containerWidth * 0.56, y: containerHeight * 0.47 + qH },
    ];
    return circleArrFac(sArr) + pointsArrFac(bArr) + circleArrFac(eArr);
  }

  //连廊封盖
  function lanCoverPos() {
    let qH = -3 * roomRealHeight;
    let sArr = [
      { x: containerWidth * 0.43, y: containerHeight * 0.555 + qH },
      { x: containerWidth * 0.47, y: containerHeight * 0.54 + qH },
      { x: containerWidth * 0.55, y: containerHeight * 0.55 + qH },
    ];

    let eArr = [
      { x: containerWidth * 0.51, y: containerHeight * 0.49 + qH },
      { x: containerWidth * 0.51, y: containerHeight * 0.49 + qH },
      { x: containerWidth * 0.45, y: containerHeight * 0.5 + qH },
      { x: containerWidth * 0.42, y: containerHeight * 0.52 + qH },
      { x: containerWidth * 0.42, y: containerHeight * 0.52 + qH },
    ];
    let aArr = [
      { x: containerWidth * 0.42, y: containerHeight * 0.545 + qH },
      { x: containerWidth * 0.42, y: containerHeight * 0.545 + qH },
      { x: containerWidth * 0.46, y: containerHeight * 0.52 + qH },
      { x: containerWidth * 0.51, y: containerHeight * 0.555 + qH },
      { x: containerWidth * 0.51, y: containerHeight * 0.555 + qH },
    ];
    let bArr = [
      { x: containerWidth * 0.42, y: containerHeight * 0.515 + qH },
      { x: containerWidth * 0.42, y: containerHeight * 0.54 + qH },
    ];
    let cArr = [
      { x: containerWidth * 0.51, y: containerHeight * 0.5 + qH },
      { x: containerWidth * 0.45, y: containerHeight * 0.51 + qH },
      { x: containerWidth * 0.42, y: containerHeight * 0.51 + qH },
    ];
    return circleArrFac(aArr) + circleArrFac(cArr) + circleArrFac(bArr);
  }

  //T1前侧墙体定位
  function aRPos(index, qRoomY) {
    let qH = -(index - 1) * roomRealHeight - qRoomY;
    let qHB = -index * roomRealHeight - qRoomY;
    let sArr = [
      { x: containerWidth * 0.48, y: containerHeight * 0.54 + qH },
      { x: containerWidth * 0.48, y: containerHeight * 0.54 + qH },
      { x: containerWidth * 0.54, y: containerHeight * 0.62 + qH },
      { x: containerWidth * 0.63, y: containerHeight * 0.64 + qH },
      { x: containerWidth * 0.67, y: containerHeight * 0.63 + qH },
      { x: containerWidth * 0.67, y: containerHeight * 0.63 + qH },
    ];
    let bArr = [
      { x: containerWidth * 0.67, y: containerHeight * 0.63 + qHB },
      { x: containerWidth * 0.67, y: containerHeight * 0.63 + qHB },
      { x: containerWidth * 0.63, y: containerHeight * 0.64 + qHB },
      { x: containerWidth * 0.54, y: containerHeight * 0.62 + qHB },
      { x: containerWidth * 0.48, y: containerHeight * 0.54 + qHB },
      { x: containerWidth * 0.48, y: containerHeight * 0.54 + qHB },
    ];
    return circleArrFac(sArr) + circleArrFac(bArr);
  }

  //T1小标签定位
  function aTPos(index, qRoomY) {
    let qH = -(index - 1) * roomRealHeight - qRoomY;
    let qHB = -index * roomRealHeight - qRoomY;
    let sArr = [
      {
        x: containerWidth * 0.48 - tipsW,
        y: containerHeight * 0.54 + qH - roomRealHeight / 6,
      },
      {
        x: containerWidth * 0.48 - tipmW,
        y: containerHeight * 0.54 + qH - roomRealHeight / 2,
      },
      {
        x: containerWidth * 0.48 - tipsW,
        y: containerHeight * 0.54 + qHB + roomRealHeight / 6,
      },
      {
        x: containerWidth * 0.48 - tipW,
        y: containerHeight * 0.54 + qH - roomRealHeight / 2,
      },
    ];
    return pointsArrFac(sArr);
  }

  //T1左侧墙体定位
  function aRLPos(index, qRoomY) {
    let qH = -(index - 1) * roomRealHeight - qRoomY;
    let qHB = -index * roomRealHeight - qRoomY;
    let sArr = [
      { x: containerWidth * 0.67, y: containerHeight * 0.63 + qH },
      { x: containerWidth * 0.685, y: containerHeight * 0.615 + qH },
      { x: containerWidth * 0.685, y: containerHeight * 0.615 + qHB },
      { x: containerWidth * 0.67, y: containerHeight * 0.63 + qHB },
    ];
    return pointsArrFac(sArr);
  }

  //T1右侧墙体定位
  function aRRPos(index, qRoomY) {
    let qH = -(index - 1) * roomRealHeight - qRoomY;
    let qHB = -index * roomRealHeight - qRoomY;
    let sArr = [
      { x: containerWidth * 0.685, y: containerHeight * 0.615 + qH },
      { x: containerWidth * 0.705, y: containerHeight * 0.615 + qH },
      { x: containerWidth * 0.705, y: containerHeight * 0.615 + qHB },
      { x: containerWidth * 0.685, y: containerHeight * 0.615 + qHB },
    ];
    return pointsArrFac(sArr);
  }

  //T1封盖定位
  function aRCoverPos(qRoomY) {
    let qH = -(ARroomArr.length - 1) * roomRealHeight - qRoomY;
    let sArr = [
      { x: containerWidth * 0.48, y: containerHeight * 0.54 + qH },
      { x: containerWidth * 0.48, y: containerHeight * 0.54 + qH },
      { x: containerWidth * 0.54, y: containerHeight * 0.62 + qH },
      { x: containerWidth * 0.63, y: containerHeight * 0.64 + qH },
      { x: containerWidth * 0.67, y: containerHeight * 0.63 + qH },
      { x: containerWidth * 0.67, y: containerHeight * 0.63 + qH },
    ];
    let tArr = [
      { x: containerWidth * 0.685, y: containerHeight * 0.615 + qH },
      { x: containerWidth * 0.705, y: containerHeight * 0.615 + qH },
    ];
    let bArr = [
      { x: containerWidth * 0.705, y: containerHeight * 0.615 + qH },
      { x: containerWidth * 0.67, y: containerHeight * 0.54 + qH },
      { x: containerWidth * 0.51, y: containerHeight * 0.525 + qH },
    ];
    let eArr = [
      { x: containerWidth * 0.505, y: containerHeight * 0.54 + qH },
      { x: containerWidth * 0.48, y: containerHeight * 0.54 + qH },
      { x: containerWidth * 0.48, y: containerHeight * 0.54 + qH },
    ];
    return (
      circleArrFac(sArr) +
      pointsArrFac(tArr) +
      circleArrFac(bArr) +
      pointsArrFac(eArr)
    );
  }

  //T1顶楼树立玻璃幕墙定位
  function aRCoverWinL(qRoomY) {
    let qH = -(ARroomArr.length - 1) * roomRealHeight - qRoomY;
    let coverWinH = 30;
    let sArr = [
      { x: containerWidth * 0.48, y: containerHeight * 0.54 + qH },
      { x: containerWidth * 0.48, y: containerHeight * 0.54 + qH },
      { x: containerWidth * 0.54, y: containerHeight * 0.62 + qH },
      { x: containerWidth * 0.63, y: containerHeight * 0.64 + qH },
      { x: containerWidth * 0.67, y: containerHeight * 0.63 + qH },
      { x: containerWidth * 0.67, y: containerHeight * 0.63 + qH },
    ];
    let bArr = [
      { x: containerWidth * 0.67, y: containerHeight * 0.63 + qH - coverWinH },
      { x: containerWidth * 0.67, y: containerHeight * 0.63 + qH - coverWinH },
      { x: containerWidth * 0.63, y: containerHeight * 0.64 + qH - coverWinH },
      { x: containerWidth * 0.54, y: containerHeight * 0.62 + qH - coverWinH },
      { x: containerWidth * 0.48, y: containerHeight * 0.54 + qH - coverWinH },
      { x: containerWidth * 0.48, y: containerHeight * 0.54 + qH - coverWinH },
    ];
    return circleArrFac(sArr) + circleArrFac(bArr);
  }

  //T1顶楼树立玻璃幕墙定位
  function aRCoverWinC(qRoomY) {
    let qH = -(ARroomArr.length - 1) * roomRealHeight - qRoomY;
    let coverWinH = 30;
    let sArr = [
      { x: containerWidth * 0.67, y: containerHeight * 0.63 + qH },
      { x: containerWidth * 0.685, y: containerHeight * 0.615 + qH },
      { x: containerWidth * 0.705, y: containerHeight * 0.615 + qH },
    ];
    let bArr = [
      {
        x: containerWidth * 0.705,
        y: containerHeight * 0.615 + qH - coverWinH,
      },
      {
        x: containerWidth * 0.685,
        y: containerHeight * 0.615 + qH - coverWinH,
      },
      { x: containerWidth * 0.67, y: containerHeight * 0.63 + qH - coverWinH },
    ];
    return pointsArrFac(sArr) + pointsArrFac(bArr);
  }

  //T1顶楼树立玻璃幕墙定位
  function aRCoverWinB(qRoomY) {
    let qH = -(ARroomArr.length - 1) * roomRealHeight - qRoomY;
    let coverWinH = 30;
    let sArr = [
      { x: containerWidth * 0.705, y: containerHeight * 0.615 + qH },
      { x: containerWidth * 0.67, y: containerHeight * 0.535 + qH },
      { x: containerWidth * 0.51, y: containerHeight * 0.525 + qH },
      { x: containerWidth * 0.515, y: containerHeight * 0.525 + qH },
    ];
    let bArr = [
      {
        x: containerWidth * 0.515,
        y: containerHeight * 0.525 + qH - coverWinH,
      },
      { x: containerWidth * 0.67, y: containerHeight * 0.535 + qH - coverWinH },
      {
        x: containerWidth * 0.705,
        y: containerHeight * 0.615 + qH - coverWinH,
      },
      {
        x: containerWidth * 0.705,
        y: containerHeight * 0.615 + qH - coverWinH,
      },
    ];
    return circleArrFac(sArr) + circleArrFac(bArr);
  }

  //T1顶楼树立玻璃幕墙定位
  function aRCoverWinE(qRoomY) {
    let qH = -(ARroomArr.length - 1) * roomRealHeight - qRoomY;
    let coverWinH = 30;
    let sArr = [
      { x: containerWidth * 0.515, y: containerHeight * 0.525 + qH },
      { x: containerWidth * 0.505, y: containerHeight * 0.54 + qH },
      { x: containerWidth * 0.48, y: containerHeight * 0.54 + qH },
      { x: containerWidth * 0.48, y: containerHeight * 0.54 + qH - coverWinH },
      { x: containerWidth * 0.505, y: containerHeight * 0.54 + qH - coverWinH },
      {
        x: containerWidth * 0.515,
        y: containerHeight * 0.525 + qH - coverWinH,
      },
    ];

    return pointsArrFac(sArr);
  }

  //T2小标签定位
  function bTPos(index) {
    let qH = -(index - 1) * roomRealHeight;
    let qHB = -index * roomRealHeight;
    let sArr = [
      {
        x: containerWidth * 0.26 - tipsW,
        y: containerHeight * 0.57 + qH - spaceRealHeight / 6,
      },
      {
        x: containerWidth * 0.26 - tipmW,
        y: containerHeight * 0.57 + qH - spaceRealHeight / 2,
      },
      {
        x: containerWidth * 0.26 - tipsW,
        y: containerHeight * 0.57 + qHB + spaceRealHeight / 6,
      },
      {
        x: containerWidth * 0.26 - tipW,
        y: containerHeight * 0.57 + qH - spaceRealHeight / 2,
      },
    ];
    return pointsArrFac(sArr);
  }

  //T2右侧左部墙体定位
  function bRLPos(index) {
    let qH = -(index - 1) * roomRealHeight;
    let qHB = -index * roomRealHeight;

    let pArr = [
      { x: containerWidth * 0.26, y: containerHeight * 0.57 + qH },
      { x: containerWidth * 0.28, y: containerHeight * 0.58 + qH },
      { x: containerWidth * 0.29, y: containerHeight * 0.6 + qH },
      { x: containerWidth * 0.29, y: containerHeight * 0.6 + qHB },
      { x: containerWidth * 0.28, y: containerHeight * 0.58 + qHB },
      { x: containerWidth * 0.26, y: containerHeight * 0.57 + qHB },
    ];
    return pointsArrFac(pArr);
  }

  //T2右侧墙体定位
  function bRPos(index) {
    let qH = -(index - 1) * roomRealHeight;
    let qHB = -index * roomRealHeight;
    let sArr = [
      { x: containerWidth * 0.29, y: containerHeight * 0.6 + qH },
      { x: containerWidth * 0.29, y: containerHeight * 0.6 + qH },
      { x: containerWidth * 0.34, y: containerHeight * 0.61 + qH },
      { x: containerWidth * 0.42, y: containerHeight * 0.56 + qH },
      { x: containerWidth * 0.42, y: containerHeight * 0.56 + qH },
    ];

    let bArr = [
      { x: containerWidth * 0.42, y: containerHeight * 0.56 + qHB },
      { x: containerWidth * 0.42, y: containerHeight * 0.56 + qHB },
      { x: containerWidth * 0.34, y: containerHeight * 0.61 + qHB },
      { x: containerWidth * 0.29, y: containerHeight * 0.6 + qHB },
      { x: containerWidth * 0.29, y: containerHeight * 0.6 + qHB },
    ];

    return circleArrFac(sArr) + circleArrFac(bArr);
  }

  //T2封盖定位
  function bRCoverPos() {
    let qH = -(BRroomArr.length - 1) * roomRealHeight;
    let sArr = [
      { x: containerWidth * 0.29, y: containerHeight * 0.6 + qH },
      { x: containerWidth * 0.29, y: containerHeight * 0.6 + qH },
      { x: containerWidth * 0.34, y: containerHeight * 0.61 + qH },
      { x: containerWidth * 0.42, y: containerHeight * 0.56 + qH },
    ];
    let tArr = [
      { x: containerWidth * 0.42, y: containerHeight * 0.56 + qH },
      { x: containerWidth * 0.4, y: containerHeight * 0.545 + qH },
      { x: containerWidth * 0.395, y: containerHeight * 0.535 + qH },
    ];
    let bArr = [
      { x: containerWidth * 0.395, y: containerHeight * 0.535 + qH },
      { x: containerWidth * 0.33, y: containerHeight * 0.53 + qH },
      { x: containerWidth * 0.26, y: containerHeight * 0.57 + qH },
    ];
    let pArr = [
      { x: containerWidth * 0.26, y: containerHeight * 0.57 + qH },
      { x: containerWidth * 0.28, y: containerHeight * 0.58 + qH },
      { x: containerWidth * 0.29, y: containerHeight * 0.6 + qH },
    ];
    return (
      pointsArrFac(pArr) +
      circleArrFac(sArr) +
      pointsArrFac(tArr) +
      circleArrFac(bArr)
    );
  }

  //创建树实例
  function CreateATree(basicEle, x, y, index) {
    let treeH = -(containerHeight / 6 / 6) * 3 + 5,
      treeW = 6;
    basicEle
      .append("polygon")
      .attr("points", basicTreeTrunkPos(x, y, treeH, treeW))
      .attr("fill", "#492805");

    basicEle
      .append("polygon")
      .attr("points", leafStrPos(x - 30, y + 10, treeH, treeW, index))
      .attr("fill", "#0" + randomWord(1) + "6" + randomWord(1) + "3b");
  }

  //树干定位
  function basicTreeTrunkPos(x, y, tH, tW) {
    let arr = [
      { x: x, y: y },
      { x: x, y: y + tH },
      { x: x + tW, y: y + tH },
      { x: x + tW, y: y },
    ];

    return pointsArrFac(arr);
  }

  //树叶定位
  function leafStrPos(x, y, tH, tW, index) {
    let mx = x + tW / 3;
    let arr = [];
    spliceLeaf(leafStrArr[index]).forEach((ele) => {
      arr.push({
        x: parseFloat(ele.x) + mx,
        y: y + tH - 25 + parseFloat(ele.y),
      });
    });
    return pointsArrFac(arr);
  }

  //叶片切割
  function spliceLeaf(str) {
    let strArr = str.split(" ");
    let aArr = [];
    strArr.forEach((ele) => {
      let tmp = ele.split(",");
      aArr.push({ x: tmp[0], y: tmp[1] });
    });
    return aArr;
  }

  //随机字符串
  function randomWord(range) {
    let str = "",
      arr = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
      ];

    for (let i = 0; i < range; i++) {
      let pos = Math.round(Math.random() * (arr.length - 1));
      str += arr[pos];
    }
    return str;
  }
};

FloorPane.prototype.changeFloorColor = (id, color) => {
  return d3
    .select("#" + FloorId)
    .selectAll(".floor_" + id)
    .attr("fill", color);
};
FloorPane.prototype.setTipOpacity = (id, opacity) => {
  return d3
    .select("#" + FloorId)
    .selectAll(".tip_" + id)
    .attr("opacity", opacity);
};

export default FloorPane;
