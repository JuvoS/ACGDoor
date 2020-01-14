import * as THREE from "three";
import WEBGL from "./utils/WebGL";
import { createDev } from "./lib/dev";
import { createGround } from "./lib/ground";

import { initRender } from "./lib/render";
import { initScene } from "./lib/scene";
import { initGui } from "./lib/gui";
import { initCamera } from "./lib/camera";
import {
  initBasicLight,
  initAmbientLight,
  initPointLight,
  CreatePointLight
} from "./lib/light";
import { initControls } from "./lib/controls";
import { initMTLObj, initPointObj, initLineObj, initFaceObj } from "./lib/obj";
import "./utils/MTLLoader";
import "./utils/OBJLoader";
var MODOX = () => {};
var renderer, scene, camera, controls, gui, ambientLight, pointLight;

var Init = (id, devState) => {
  const bW = document.getElementById(id).offsetWidth;
  const bH = document.getElementById(id).offsetHeight;

  renderer = initRender(id, bW, bH);
  renderer.setClearAlpha(0.0);
  scene = initScene();
  camera = initCamera(bW, bH);
  ambientLight = initAmbientLight();
  scene.add(ambientLight);
  // pointLight = initPointLight();
  // scene.add(pointLight);
  // gui = initGui(ambientLight, pointLight);

  controls = initControls(camera, renderer);

  animate();
  if (devState) createDev(scene);

  window.addEventListener("resize", onWindowResize, false);
};

//窗口变动触发的函数
var onWindowResize = (bW, bH) => {
  camera.aspect = bW / bH;
  camera.updateProjectionMatrix();
  render();

  renderer.setSize(bW, bH);
};

var animate = () => {
  render();

  //更新相关位置
  // pointLight.position.y = gui.lightY;

  controls.update();

  requestAnimationFrame(animate);
};

var render = () => {
  renderer.render(scene, camera);
};

MODOX.prototype.APP = (id, devState) => {
  let WEBGLObj = new WEBGL();
  if (WEBGLObj.isWebGLAvailable()) {
    Init(id, devState);
  } else {
    var warning = WEBGLObj.getWebGLErrorMessage();
    document.getElementById(id).appendChild(warning);
  }
};
MODOX.prototype.scene = scene;

MODOX.prototype.createBox = box => {
  scene.add(box);
};

MODOX.prototype.createGround = () => {
  createGround(scene);
};

MODOX.prototype.CreatePointLight = (
  x,
  y,
  z,
  color = "#ffffff",
  intensity = 1.3
) => {
  scene.add(CreatePointLight(x, y, z, color, intensity));
};

MODOX.prototype.createObj = (objName, size, pos) => {
  // initMTLObj(scene, objName, size, pos);
  new THREE.MTLLoader().load(objName + ".mtl", function(materials) {
    // console.log(materials);
    materials.preload();
    new THREE.OBJLoader()
      .setMaterials(materials)
      .load(objName + ".obj", function(obj) {
        obj.scale.set(size, size, size);
        obj.position.set(pos.x, pos.y, pos.z);
        scene.add(obj);
      });
  });
};
MODOX.prototype.createPointObj = (objName, size, pos, sca, rot) => {
  initPointObj(scene, objName, size, pos, sca, rot);
};
MODOX.prototype.createLineObj = (objName, size, pos, sca, rot) => {
  initLineObj(scene, objName, size, pos, sca, rot);
};
MODOX.prototype.createFaceObj = (objName, size, pos, sca, rot) => {
  initFaceObj(scene, objName, size, pos, sca, rot);
};

export default MODOX;
