/**
 * 计时器
 *
 * @author Juvos <704921698@qq.com>
 */
class Timer {
  /**
   * 延时操作
   * @returns {void}
   * @author Juvos <704921698@qq.com>
   */
  timeout(interval) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, interval);
    });
  }

  /**
   * 等待代码片段执行完毕后再执行
   * @returns {void}
   * @author Juvos <704921698@qq.com>
   */
  inTheEnd() {
    return this.timeout(0);
  }

  /**
   * 循环定时, 执行回调后再继续下一轮循环
   * @param {Number} interval 执行间隔
   * @param {Function} [callback] 回调
   * @returns {Object}
   * @author Juvos <704921698@qq.com>
   */
  interval(interval, callback) {
    this.timeout(interval).then(() => {
      typeof callback === "function" &&
        callback() !== false &&
        this.interval(interval, callback);
    });
    return { then: c => (callback = c) };
  }

  /**
   * 计时，单位毫秒
   * @returns {void}
   * @author Juvos <704921698@qq.com>
   */
  start() {
    let startDate = new Date();
    return {
      stop() {
        let stopDate = new Date();
        return stopDate.getTime() - startDate.getTime();
      }
    };
  }
}

export default new Timer();
