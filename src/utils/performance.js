/**
 * 性能工具
 * 1. 计算方法执行时间
 * @returns {void}
 * @author JuvoS <704921698@qq.com>
 */
import Timer from "./timer";
class Performance {
  /**
   * 计算情况
   * @returns {Function}  执行返回值获取时间信息
   * @author JuvoS <704921698@qq.com>
   */
  startExecute(name = "") {
    let timer = Timer.start();
    let usedJSHeapSize = this.getMemoryInfo().usedJSHeapSize;
    return () => {
      let executeTime = timer.stop();
      let endMemoryInfo = this.getMemoryInfo();
      console.log(
        "%cPerformance%c \n1. 执行方法：%c%s%c\n2. 执行耗时： %c%sms%c \n3. 内存波动：%sB \n4. 已分配内存： %sMB \n5. 已使用内存：%sMB \n6. 剩余内存： %sMB",
        "padding: 2px 4px 2px 4px; background-color: #4caf50; color: #fff; border-radius: 4px;",
        "",
        "color: #ff6f00",
        name,
        "",
        "color: #ff6f00",
        executeTime,
        "",
        endMemoryInfo.usedJSHeapSize - usedJSHeapSize,
        this.toMBSize(endMemoryInfo.jsHeapSizeLimit),
        this.toMBSize(endMemoryInfo.usedJSHeapSize),
        this.toMBSize(endMemoryInfo.totalJSHeapSize)
      );
    };
  }

  /**
   * 获取内存信息
   * @returns {void}
   * @author JuvoS <704921698@qq.com>
   */
  getMemoryInfo() {
    let memoryInfo = {};
    if (window.performance && window.performance.memory) {
      memoryInfo = window.performance.memory;
    }
    return memoryInfo;
  }

  /**
   * 遍历内存信息
   * @returns {void}
   * @author JuvoS <704921698@qq.com>
   */
  ergodicMemoryInfo() {
    let memoryInfo = {};
    if (window.performance && window.performance.memory) {
      memoryInfo = window.performance.memory;
    }
    var props = "";
    for (let p in memoryInfo) {
      if (typeof memoryInfo[p] == "function") {
        memoryInfo[p]();
      } else {
        props += p + "=" + this.toBaseSize(memoryInfo[p]) + "\t";
      }
    }
    return props;
  }

  /**
   * 转化为基础单位
   * @returns {void}
   * @author JuvoS <704921698@qq.com>
   */
  toBaseSize(limit) {
    var size = "";
    if (limit < 0.1 * 1024) {
      //小于0.1KB，则转化成B
      size = limit.toFixed(2) + "B";
    } else if (limit < 0.1 * 1024 * 1024) {
      //小于0.1MB，则转化成KB
      size = (limit / 1024).toFixed(2) + "KB";
    } else if (limit < 0.1 * 1024 * 1024 * 1024) {
      //小于0.1GB，则转化成MB
      size = (limit / (1024 * 1024)).toFixed(2) + "MB";
    } else {
      //其他转化成GB
      size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    }

    var sizeStr = size + ""; //转成字符串
    var index = sizeStr.indexOf("."); //获取小数点处的索引
    var dou = sizeStr.substr(index + 1, 2); //获取小数点后两位的值
    if (dou == "00") {
      //判断后两位是否为00，如果是则删除00
      return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
    }
    return size;
  }
  /**
   * 转化为MB
   * @returns {void}
   * @author JuvoS <704921698@qq.com>
   */
  toMBSize(byteSize) {
    return (byteSize / (1024 * 1024)).toFixed(1);
  }
}

export default new Performance();
