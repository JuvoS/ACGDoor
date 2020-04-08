import BaseBusinessSupport from "@/views/common/baseClass/BaseBusinessSupport";
export default class TipInfoBase extends BaseBusinessSupport {

    /**
     * 获取资源类列表
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-11-02
     */
    getResourceClassList(){
      return this.vm.$store.state.resClass.list;
    }

    /**
     * 获取子设备名称最长宽度，用来动态分配子设备宽度名称
     * 子设备名称最长14个字符
     * @param {Object[]} childrenList 子设备列表
     * @param {Object} childrenList[].resourceData 子设备资源信息
     * @param {String} childrenList[].resourceData.name 子设备名称
     * @returns {Number}  最长宽度
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-10-24
     */
    childrenNameMaxWidth(childrenList) {
      let maxLength = 0;
      childrenList.forEach(children => {
        let nameLength = children.resourceData.name.length;
        if (nameLength > maxLength) {
          maxLength = nameLength;
        }
      });
      let maxWidth = 36 + maxLength * 14;

      return maxWidth > 180 ? 180 : maxWidth;
    }
    /**
     * 获取资源类
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2020-01-02
     */
    getResourceClassByKey(key){
      let resourcesClass = _.find(this.getResourceClassList(), { keyName: key }) ||{};
      return resourcesClass;
    }

    /**
     * 获取资源类
     * @param {String} resourceClassId 资源类ID
     * @returns {Object} 资源类信息
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-10-28
     */
    getResourceClass(resourceClassId){
      resourceClassId = parseInt(resourceClassId);
      let resourcesClass = _.find(this.getResourceClassList(), { id: resourceClassId })  ||{};
      return resourcesClass;
    }
      
    /**
     * 获取扩展类
     * @param {String} 资源类ID
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-10-12
     */
    getBaseResouceClass(resourceClassId) {
      resourceClassId = parseInt(resourceClassId);
      let resourcesClass = this.getResourceClass(resourceClassId);
      let baseResources = this.getResourceClass(resourcesClass.parentId);
      return baseResources;
    }

    /**
     * 获取资源的ICON, 优先用复用类的ICON，若没有则使用扩展类的
     * @param {String} 资源类ID
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-09-23
     */
    getResourceIcon(resourceClassId) {
      if (typeof this.resourceIconCache == "undefined") {
        this.resourceIconCache = {};
      }
      let icon = this.resourceIconCache[resourceClassId];
      if (!icon) {
        let resourceClass = this.getResourceClass(resourceClassId);
        icon = resourceClass.icon;
        if(!icon){
          icon = this.getResourceClass(resourceClass.parentId).icon;
        }
        this.resourceIconCache[resourceClassId] = icon;
      }
      return icon;
    }
  
}
