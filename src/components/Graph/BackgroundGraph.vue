<template>
  <div class="background-graph">
    <div class="topo" ref="topo"></div>
  </div>
</template>
<script>
/**
 * ##楼层背景图##
 *  1. onlyHideCells与onlyShowCells 方法会遍历所有cell，若场景中可使用hideCells与showCells则尽量使用
 *  2. 变更有效的floorId，将会触发重新渲染拓扑图
 *
 * **Props**
 *  + floorId; 楼层ID
 *  + isAutomation; 自动操作，开启自动操作后更改floorId 会自动加载拓扑图， 默认开启。
 *
 * **API**
 * + load; 加载并渲染拓扑图，当isAutomation为false时有效
 * + getGraphContext; 获取graph环境
 * + onlyHideCells; 仅隐藏指定类型元素，其他类型显示
 * + onlyShowCells; 仅显示指定类型元素，其他类型隐藏
 * + hideCells; 隐藏指定类型元素
 * + showCells; 呈现指定类型元素
 * + locateCellsByType; 定位指定类型元素
 * + locateCellsById; 定位指定元素实例
 * + addCells; 添加元素
 * + removeCells; 删除元素
 * + fliterCells; 过滤元素, 用此方法可提高性能，适用于显示后不再变动组态图
 *                    此方法在渲染视图前介入进行过滤，故需要在更改floorId或调用load()前调用
 *
 * **Event**
 * + on-ready; 拓扑图加载完毕
 * + on-load; 开始加载拓扑图
 * 1
 * @author Chorin <xiaolinxuan@foxmail.com>
 * @date 2019-11-01
 */
import Graph from "@components/graph/lib/comps/core/PreviewGraph";
import DataCook from "@/utils/data-cook";
import Performance from "@/utils/performance";
const topoCache = {};
export default {
  name: "BackgroundGraph",
  components: {},
  props: {
    floorId: {
      type: String,
      default: ""
    },
    isAutomation: {
      type: Boolean,
      default: true
    },
    options: {
      type: Object,
      default: ()=>{
        return {};
      },
    },
  },
  watch: {
    floorId(v) {
      if(this.isAutomation && v){ 
        let options = Object.assign(this.options, {floorId: v});
        this.initView(options);
      }
    }
  },
  data() {
    return {
      graphContext: {},
      currentTopoXMLString: "",
      typeMap: {}
    };
  },
  methods: {
    /**
     * 手动加载
     * @param {Obejct} options
     * @param {Obejct} [options.floorId=]
     * @param {Obejct} [options.filterOptions=]  过滤参数
     * @param {Array} [options.filterOptions.onlyExclude=]  仅排除
     * @param {Array} [options.filterOptions.onlyInclude=]  仅包含
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-06
     */
    load(options = {}) {
      if (this.isAutomation) {
        return;
      }
      this.initView(options);
    },

    /**
     * 初始化页面
     */
    initView(options) {
      this.renderTopo(options);
    },

    /**
     * 渲染拓扑图
     */
    renderTopo(options) {
      this.$emit("on-load");
      let floorId = options.floorId;
      let graphContext = this.getGraphContext();
      this.typeMap = {};
      this.getFloorTopo(floorId).then(({ topoXML }) => {
        let end = Performance.startExecute("renderTopo");
        graphContext.loadXML(topoXML, options);
        this.currentTopoXMLString = topoXML;
        end();
        setTimeout(() => {
          this.$emit("on-ready");
        }, 50);
      });
    },

    /**
     * 获取graph环境
     */
    getGraphContext() {
      let graphContext = {};
      if (this.graphContext instanceof Graph) {
        graphContext = this.graphContext;
      } else {
        let topoDOM = this.$refs.topo;
        graphContext = new Graph(topoDOM);
        this.graphContext = graphContext;
      }
      return graphContext;
    },

    /**
     * 获取设备模型列表
     * @returns {ModelMap}  {ID: Model, ...}
     * 获取设备模型列表
     */
    getDeviceModelList() {
      let modelMap = {};
      let cells = this.getGraphContext().getModel().cells;
      for (let key in cells) {
        let cell = cells[key];
        if (cell.geometry) {
          //获取底图
          modelMap[cell.id] = {
            id: cell.id,
            name: cell.value || "",
            x: cell.geometry.x,
            y: cell.geometry.y
          };
        }
      }
      return modelMap;
    },

    /**
     * 设置cell状态
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-05
     */
    setCellVisible(cellList, visible) {
      let graphContext = this.getGraphContext();
      let model = graphContext.model;
      let cells = model.cells;
      for (let i in cellList) {
        model.setVisible(cellList[i], visible);
      }
    },

    /**
     * 获取楼层拓扑图
     * @returns {Promise<Object[]>}
     */
    async getFloorTopo(floorId) {
      let topo = {};
      await this.$http({
        method: "post",
        url: "resource/v1/topoFiles/list",
        data: {
          searchParas: {
            conditions: [
              {
                name: "resourceId",
                op: "eq",
                value: floorId
              }
            ]
          }
        },
        showSpin: false
      }).then(result => {
        if (result) {
          topo = result.list[0] || {};
        }
      });

      return { topo, topoXML: topo.fileData };
    },

    /**
     * 获取cell列表
     * @returns {Object}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-05
     */
    getCellMap() {
      let graphContext = this.getGraphContext();
      let model = graphContext.model;
      let cells = model.cells;
      return cells || {};
    },

    /**
     * 类型Map  {type: [ResourceId:{}]}
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-05
     */
    getTypeMap() {
      if (Object.keys(this.typeMap).length === 0) {
        let cellMap = this.getCellMap();
        let map = {};
        for (let i in cellMap) {
          let cell = cellMap[i];
          if (cell.data && cell.data.bindData) {
            let type = cell.data.bindData.type;
            map[type] = map[type] || [];
            map[type].push(cell);
          }
        }
        this.typeMap = map;
      }
      return this.typeMap;
    },

    /**
     * 通过类型获取cell列表
     * @param {Array} typeList
     * @returns {Object[]}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-05
     */
    getCellListByTypeList(typeList) {
      let typeMap = this.getTypeMap();
      let targetCellList = [];
      for (let i in typeList) {
        let type = typeList[i];
        if (type in typeMap) {
          targetCellList.push(...typeMap[type]);
        }
      }
      return targetCellList;
    },

    /**
     * 通过ID获取cell列表
     * @param {Array} idList
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-05
     */
    getCellListByIdList(idList) {
      let cellMap = this.getCellMap();
      let targetCellList = [];
      for (let i in idList) {
        idList[i] in cellMap && targetCellList.push(cellMap[idList[i]]);
      }
      return targetCellList;
    },

    /**
     * 给设备设置高亮
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-03
     */
    setHighlight(resourceIdList) {
      this.getGraphContext().batchSetHighlight(
        this.getCellListByIdList(resourceIdList)
      );
    },

    /**
     * 给设备设置高亮
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-03
     */
    clearHighlight(resourceIdList) {
      this.getGraphContext().batchClearHighlight(
        this.getCellListByIdList(resourceIdList)
      );
    },


    /**
     * 仅隐藏
     * @param {Array} typeList
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-05
     */
    onlyHideCells(typeList) {
      let allTypeList = Object.keys(this.getTypeMap());
      let showTypeList = DataCook.getRelativeComplement(allTypeList, typeList);
      this.showCells(showTypeList);
      this.hideCells(typeList);
    },

    /**
     * 仅显示
     * @param {Array} typeList
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-05
     */
    onlyShowCells(typeList) {
      let allTypeList = Object.keys(this.getTypeMap());
      let hideTypeList = DataCook.getRelativeComplement(allTypeList, typeList);
      this.showCells(typeList);
      this.hideCells(hideTypeList);
    },

    /**
     * 隐藏指定类型元素
     * @param {Array} typeList
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-05
     */
    hideCells(typeList) {
      this.setCellVisible(this.getCellListByTypeList(typeList), false);
    },

    /**
     * 显示指定元素
     * @param {Array} typeList
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-05
     */
    showCells(typeList) {
      this.setCellVisible(this.getCellListByTypeList(typeList), true);
    },

    /**
     * 定位指定元素
     * @param {Array} typeList
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-05
     */
    locateCellsByType(typeList) {
      this.getGraphContext().batchSetHighlight(
        this.getCellListByTypeList(typeList)
      );
    },

    /**
     * 定位指定ID
     * @param {Array} idList ID数组
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-05
     */
    locateCellsById(idList) {
      this.setHighlight(idList);
    },

    /**
     * 添加元素
     * @param {Object[]} cellList cell列表
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-05
     */
    addCells(cellList) {
      this.getGraphContext().batchAddCells(cellList);
    },

    /**
     * 删除元素
     * @param {Object[]} resourceIdList
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-05
     */
    removeCells(resourceIdList) {
      this.getGraphContext().batchRemoveCells(
        this.getCellListByIdList(resourceIdList)
      );
    },

    /**
     * //FIXME: 仅展示的情况下，启用以提高性能
     * 转成图片
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-03
     */
    toImage() {
      let node = this.$refs.topo;
      let svgDOM = node.getElementsByTagName("svg")[0];
      svgDOM.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      let str = svgDOM.outerHTML;
      console.log("####str", str);
      var image = new Image();
      image.crossOrigin = "Anonymous";
      image.src =
        "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(str)));
      node.appendChild(image);
      console.log("#### image.src", image.src);
    }
  }
};
</script>
<style lang='less' scoped>
.background-graph {
  .topo {
    width: 100%;
    height: 100vh;
  }
}
</style> 