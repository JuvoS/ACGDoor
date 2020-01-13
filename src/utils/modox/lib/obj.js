import * as THREE from "three";
import "../utils/STLLoader";
import "../utils/MTLLoader";
import "../utils/OBJLoader";
export function initObj(scene, name, size, pos) {
  // 没有材质
  // new OBJLoader().load(name + ".obj", function(obj) {
  //     obj.scale.set(10, 10, 10);
  //     obj.position.set(-10, 0, 0);
  //     obj.children.forEach(function(e) {
  //         e.castShadow = true;
  //     }); // 设置阴影
  //     scene.add(obj);
  // });
  // 有材质
  new THREE.MTLLoader().load(name + ".mtl", function(materials) {
    // console.log(materials);
    materials.preload();
    new THREE.OBJLoader()
      .setMaterials(materials)
      .load(name + ".obj", function(obj) {
        obj.scale.set(size, size, size);
        obj.position.set(pos.x, pos.y, pos.z);
        scene.add(obj);
      });
  });
}

//使用canvas生成粒子的纹理
function generateSprite() {
  var canvas = document.createElement("canvas");
  canvas.width = 16;
  canvas.height = 16;

  var context = canvas.getContext("2d");
  var gradient = context.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    0,
    canvas.width / 2,
    canvas.height / 2,
    canvas.width / 2
  );
  gradient.addColorStop(0, "rgba(255,0,0,1)");
  gradient.addColorStop(0.2, "rgba(0,255,255,1)");
  gradient.addColorStop(0.4, "rgba(0,0,64,1)");
  gradient.addColorStop(1, "rgba(0,0,0,1)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  var texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}
export function initPointObj(scene, name, pos, sca, rot) {
  new THREE.STLLoader().load(name + ".stl", function(geometry) {
    //创建点纹理
    var material = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.1,
      opacity: 0.6,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      map: generateSprite()
    });

    let mesh = new THREE.Points(geometry, material);
    // mesh.rotation.x = -0.5 ; //将模型摆正
    // mesh.rotation.z = -0.5 * Math.PI; //将模型摆正
    // mesh.rotation.z = Math.PI; //将模型摆正
    mesh.rotation.set(rot.x * Math.PI, rot.y * Math.PI, rot.z * Math.PI); //缩放
    mesh.scale.set(sca.x, sca.y, sca.z); //缩放
    mesh.position.set(pos.x, pos.y, pos.z);
    geometry.center(); //居中显示
    scene.add(mesh);
  });
}

export function initLineObj(scene, name, pos, sca, rot) {
  new THREE.STLLoader().load(name + ".stl", function(geometry) {
    //创建线纹理
    //生成一个基础材质，即赋予几何体一种简单的颜色或者线框
    let wireFrameMat = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    //看来基础材质在此处的作用是线框
    wireFrameMat.wireframe = true;
    let mesh = new THREE.Mesh(geometry, wireFrameMat);
    mesh.rotation.set(rot.x * Math.PI, rot.y * Math.PI, rot.z * Math.PI); //缩放
    mesh.scale.set(sca.x, sca.y, sca.z); //缩放
    mesh.position.set(pos.x, pos.y, pos.z);
    geometry.center(); //居中显示
    scene.add(mesh);
  });
}
export function initFaceObj(scene, name, pos, sca, rot) {
  new THREE.STLLoader().load(name + ".stl", function(geometry) {
    //创建实体纹理
    let mat = new THREE.MeshLambertMaterial({ color: 0x00ffff });
    let mesh = new THREE.Mesh(geometry, mat);
    mesh.rotation.set(rot.x * Math.PI, rot.y * Math.PI, rot.z * Math.PI); //缩放
    mesh.scale.set(sca.x, sca.y, sca.z); //缩放
    mesh.position.set(pos.x, pos.y, pos.z);
    geometry.center(); //居中显示
    scene.add(mesh);
  });
}
