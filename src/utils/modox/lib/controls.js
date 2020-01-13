import * as THREE from "three";
import "../utils/OrbitControls";

//用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放
export function initControls(camera, renderer) {
  let controls = new THREE.OrbitControls(camera, renderer.domElement);

  // 如果使用animate方法时，将此函数删除
  //controls.addEventListener( 'change', render );
  // 使动画循环使用时阻尼或自转 意思是否有惯性
  controls.enableDamping = true;
  //动态阻尼系数 就是鼠标拖拽旋转灵敏度
  //controls.dampingFactor = 0.25;
  //是否可以缩放
  controls.enableZoom = true;
  //是否自动旋转
  controls.autoRotate = true;
  //设置相机距离原点的最远距离
  controls.minDistance = 10;
  //设置相机距离原点的最远距离
  controls.maxDistance = 4000;
  //是否开启右键拖拽
  controls.enablePan = true;

  return controls;
}
