import * as THREE from "three";
export function createDev(scene) {
    //辅助工具
    var helper = new THREE.AxisHelper(10);
    scene.add(helper);

    // 创建一个立方体
    //    v6----- v5
    //   /|      /|
    //  v1------v0|
    //  | |     | |
    //  | |v7---|-|v4
    //  |/      |/
    //  v2------v3

    //立方体
    var cubeGeometry = new THREE.CubeGeometry(10, 10, 10);

    var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ffff });

    let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = 5;
    cube.position.y = 5;
    cube.position.z = -5;

    //告诉立方体需要投射阴影
    cube.castShadow = true;

    scene.add(cube);

    //底部平面
    var planeGeometry = new THREE.PlaneGeometry(100, 100);
    var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xaaaaaa });

    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = -0;

    //告诉底部平面需要接收阴影
    plane.receiveShadow = true;

    scene.add(plane);
}