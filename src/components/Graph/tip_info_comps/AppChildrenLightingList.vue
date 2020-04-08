<template>
  <ChildrenLightingList
    class="app-children-lighting-list-root"
    :childrenList="childrenList"
    :parentResource="parentResource"
    :alarmIntro="alarmIntro"
  />
</template>
<script>
import ChildrenLightingList from "./ChildrenLightingList";
/**
 * ##移动端设备控制面板##
 *
 * **Props**
 *
 * **API**
 *
 * **Event**
 *
 * @author Chorin <xiaolinxuan@foxmail.com>
 * @date 2020-01-19
 */
export default {
  name: "AppChildrenLightingList",
  components: {
    ChildrenLightingList
  },
  props: {
    childrenList: {
      type: Array,
      default: () => []
    },
    parentResource: {
      type: Object,
      default: () => {
        return {};
      }
    },
    alarmIntro: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="less">
.app-children-lighting-list-root {
  &.children-lighting-list {
    color: #ffffff;
    .box-item {
      padding: 4px 0;
    }
    .children-list {
      min-width: 0;
      .name {
        width: calc(100% - 100px) !important;
      }
      .context {
        float: right;
        min-width: 0;
        .children-opreation {
          margin: 0;
          width: 90px;
        }
      }
      .more {
        display: none;
      }
    }
  }
}

.children-device-view .children-content {
  overflow-y: hidden !important;
}
</style>
