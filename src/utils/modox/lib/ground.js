import * as THREE from "three";
export function createGround(scene) {
    // //辅助工具
    // var helper = new THREE.AxisHelper(10);
    // scene.add(helper);

    //底部平面
    var planeGeometry = new THREE.PlaneGeometry(100, 100);
    var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xfefefe });

    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = -0;
    // plane.position.z = -50;

    //告诉底部平面需要接收阴影
    plane.receiveShadow = true;

    scene.add(plane);
}