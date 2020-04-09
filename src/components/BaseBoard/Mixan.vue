<template>
  <div class="mixan">
    <div class="mixan-pane">
      <div class="mixan-pane-logo">
        <div class="mixan-pane-logo-pic">
          <img src="images/mas.png" />
        </div>
        <div class="mixan-pane-logo-title">MIXAN</div>
      </div>
      <div class="mixan-pane-wrapper">
        <div class="mixan-pane-wrapper-item">
          <div class="mixan-pane-wrapper-item-label">PS</div>
          <i class="mixan-pane-wrapper-item-lb"></i>
          <i class="mixan-pane-wrapper-item-rt"></i>
        </div>
        <div class="mixan-pane-wrapper-item">
          <div class="mixan-pane-wrapper-item-label">PS</div>
          <i class="mixan-pane-wrapper-item-lb"></i>
          <i class="mixan-pane-wrapper-item-rt"></i>
        </div>
        <div class="mixan-pane-wrapper-item">
          <div class="mixan-pane-wrapper-item-label">PS</div>
          <i class="mixan-pane-wrapper-item-lb"></i>
          <i class="mixan-pane-wrapper-item-rt"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.mixan {
  width: 100%;
  height: 100%;
  background: #56ab2f;
  // background: linear-gradient(
  //   to top right,
  //   rgb(86, 171, 47),
  //   rgb(168, 224, 99)
  // );
  background: linear-gradient(to top right, #021350, #9f32b3);
  display: flex;
  justify-content: center;
  align-items: center;
  &-pane {
    display: flex;
    flex-direction: column;
    align-items: center;
    &-logo {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
      &-pic {
        border-radius: 5px;
        height: 50px;
        width: 50px;
        overflow: hidden;
        margin-bottom: 8px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &-title {
        font-size: 30px;
        // font-weight: 600;
        color: #ffffff;
      }
    }
    &-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: center;
      &-item {
        margin-right: 30px;
        position: relative;
        &-label {
          height: 30px;
          width: 30px;
          overflow: hidden;
          border-radius: 5px;
          background: #000;
          color: #ffffff;
          text-align: center;
          line-height: 30px;
        }
        &-lb {
          content: "";
          position: absolute;
          width: 30px;
          height: 30px;
          border-radius: 10px;
          left: 0;
          top: 0;
          box-shadow: -10px 10px 12px -6px rgba(30, 189, 247, 0.87);
        }
        &-rt {
          content: "";
          position: absolute;
          width: 30px;
          height: 30px;
          border-radius: 10px;
          right: 0;
          bottom: 0;
          box-shadow: 10px -10px 12px -6px rgba(30, 189, 247, 0.87);
        }
      }
      &-item::before {
        content: "";
        position: absolute;
        width: 30px;
        height: 30px;
        left: 0;
        top: 0;
        box-shadow: 10px 5px 18px -6px rgba(30, 189, 247, 0.87);
      }
      &-item::after {
        content: "";
        position: absolute;
        width: 30px;
        height: 30px;
        right: 0;
        bottom: 0;
        box-shadow: -10px -5px 18px -6px rgba(30, 189, 247, 0.87);
      }
      &-item:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>