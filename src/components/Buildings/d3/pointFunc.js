//贝塞尔计算
let bezierNodes = (t, arr) => {
  var x = 0,
    y = 0,
    bezierCtrlNodesArr = arr,
    n = bezierCtrlNodesArr.length - 1;
  arr.forEach(function(item, index) {
    if (!index) {
      x += item.x * Math.pow(1 - t, n - index) * Math.pow(t, index);
      y += item.y * Math.pow(1 - t, n - index) * Math.pow(t, index);
    } else {
      x +=
        (factorial(n) / factorial(index) / factorial(n - index)) *
        item.x *
        Math.pow(1 - t, n - index) *
        Math.pow(t, index);
      y +=
        (factorial(n) / factorial(index) / factorial(n - index)) *
        item.y *
        Math.pow(1 - t, n - index) *
        Math.pow(t, index);
    }
  });
  return {
    x: x,
    y: y
  };
};
//递归阶乘
let factorial = num => {
  //递归阶乘
  if (num <= 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
};

//点组返回
let pointsArrFac = arr => {
  let txt = "";
  arr.forEach(ele => {
    let { x, y } = ele;
    txt += x + "," + y + " ";
  });
  return txt;
};
let circleArrFac = arr => {
  let bezierArr = [];
  for (let i = 0; i < 1; i += 0.01) {
    bezierArr.push(bezierNodes(i, arr));
  }

  return pointsArrFac(bezierArr);
};
let reCircleArrFac = arr => {
  let bezierArr = [];
  arr.reverse();
  for (let i = 0; i < 1; i += 0.01) {
    bezierArr.push(bezierNodes(i, arr));
  }

  return pointsArrFac(bezierArr);
};
//矩形点组返回
let polygonArrFac = (top, bottom) => {
  let bezierTopArr = [],
    bezierBottomArr = [];
  for (let i = 0; i < 1; i += 0.01) {
    bezierTopArr.push(bezierNodes(i, top));
    bezierBottomArr.push(bezierNodes(i, bottom));
  }

  return pointsArrFac(bezierTopArr) + pointsArrFac(bezierBottomArr);
};

//宽高数组倍率返回
let WHArrFac = (width, height, arr) => {
  let tmp = _.cloneDeep(arr);
  tmp.forEach(ele => {
    ele.x = width * ele.x;
    ele.y = height * ele.y;
  });
  return tmp;
};

//宽高数组倍率增加数返回
let WHAddArrFac = (width, height, arr, wNum, hNum) => {
  arr.forEach(ele => {
    ele.x = parseFloat(Number(width * ele.x) + Number(wNum));
    ele.y = parseFloat(Number(height * ele.y) + Number(hNum));
  });
  return arr;
};

export {
  bezierNodes,
  pointsArrFac,
  polygonArrFac,
  circleArrFac,
  reCircleArrFac,
  WHArrFac,
  WHAddArrFac
};
