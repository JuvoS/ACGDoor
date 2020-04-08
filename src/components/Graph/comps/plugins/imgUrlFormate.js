import config from "@/config";
const imgURL = config.url;

export default cell => {
  let cellShapeType = _.get(cell, "style", "");
  if (cellShapeType && cellShapeType.substr(0, 11) == "shape=image") {
    let urlObj = _.split(cellShapeType, ";image=");
    let urlSecond = _.get(urlObj, "[1]", "");
    let endStrObj = _.split(urlSecond, "/fdfs/");
    if (endStrObj.length > 1)
      cell.style =
        _.get(urlObj, "[0]", "") +
        ";image=" +
        imgURL +
        "/fdfs/" +
        _.get(endStrObj, "[1]", "");
  }

  return cell;
};
