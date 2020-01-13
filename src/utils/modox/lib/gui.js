import * as THREE from "three";
import dat from "dat.gui";
export function initGui(ambientLight, pointLight) {
    //声明一个保存需求修改的相关数据的对象
    let gui = {
        ambientLight: "#111111", //环境光源
        pointLight: "#ffffff", //点光源
        lightY: 30, //灯光y轴的位置
        distance: 0, //点光源距离
        intensity: 1, //灯光强度
        visible: true //是否可见
    };
    var datGui = new dat.GUI();
    //将设置属性添加到gui当中，gui.add(对象，属性，最小值，最大值）
    datGui.addColor(gui, "ambientLight").onChange(function(e) {
        ambientLight.color = new THREE.Color(e);
    });
    datGui.addColor(gui, "pointLight").onChange(function(e) {
        pointLight.color = new THREE.Color(e);
    });
    datGui.add(gui, "lightY", 0, 100);
    datGui.add(gui, "distance", 0, 100).onChange(function(e) {
        pointLight.distance = e;
    });
    datGui.add(gui, "intensity", 0, 5).onChange(function(e) {
        pointLight.intensity = e;
    });
    datGui.add(gui, "visible").onChange(function(e) {
        pointLight.visible = e;
    });

    return gui;
}