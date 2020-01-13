import * as THREE from "three";
export function initCamera(bW, bH) {
  let camera = new THREE.PerspectiveCamera(45, bW / bH, 1, 4000);
  camera.position.set(0, 40, 100);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  return camera;
}
