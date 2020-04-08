/**
 * 空调箱布局
 */
import mxgraph from "../../core/index.js";

const { mxImage } = mxgraph;
export default (graph, data, getResIcon) => {
  const {
    relations,
    id: rid,
    name: rname,
    resource_class_id,
    importanceKpi
  } = data;

  graph.getModel().beginUpdate();
  const root = graph.getDefaultParent();
  try {
    const bgWidth = window.innerWidth * 0.6; //水平基本宽度
    // const bgHeight = window.innerHeight - 64 - 100;

    let scale = bgWidth / 1152;
    const bgHeight = 648 * scale;

    //设置空调箱背景
    graph.setBackgroundImage(
      new mxImage("static/imgs/graph/bg/ahu.svg", bgWidth, bgHeight)
    );

    const fontColor = "#0cbabd";

    relations.forEach(relation => {
      const {
        id,
        name,
        serial,
        parentKeyName,
        importanceKpi
      } = relation.device;
      const shapeStyle = `shape=image;fontColor=${fontColor};noLabel=1;movable=1;html=1;verticalLabelPosition=bottom;verticalAlign=top;imageAspect=0;image=static/imgs/graph/device/${parentKeyName}.svg`;

      switch (parentKeyName) {
        case "humidity": //湿度传感器
          const v0 = graph.insertVertex(
            root,
            id,
            name,
            bgWidth * 0.307,
            bgHeight * 0.23,
            30 * scale,
            50 * scale,
            shapeStyle
          );
          v0.data = { bindData: relation.device };

          // const kpi0 = importanceKpi[0];
          // if (kpi0) {
          //   const k0 = graph.insertVertex(
          //     root,
          //     kpi0.id,
          //     graph.setSingleKpiPane(kpi0.kpi_type, kpi0.kpi_name, ""),
          //     bgWidth * 0.225,
          //     bgHeight * 0.245,
          //     100,
          //     30
          //   );
          //   k0.data = {
          //     isSingleKpi: true,
          //     bindData: { ...kpi0, rid: relation.device.id }
          //   };
          //   graph.clearBackStroke(k0);
          // }
          break;
        case "energy_meter": //能量计
          //   const v1 = graph.insertVertex(
          //     root,
          //     id,
          //     name,
          //     bgWidth * 0.75,
          //     bgHeight * 0.2,
          //     width * scale,
          //     height * scale,
          //     shapeStyle
          //   );
          //   v1.data = { bindData: relation.device };
          break;
        case "temperature": //温度计
          if (serial[serial.length - 1] == "1") {
            //送风温度传感器
            const v2 = graph.insertVertex(
              root,
              id,
              name,
              bgWidth * 0.714,
              bgHeight * 0.45,
              30 * scale,
              50 * scale,
              shapeStyle
            );
            v2.data = { bindData: relation.device };
            const kpi3 = importanceKpi[0];
            if (kpi3) {
              const { id, kpi_type, kpi_key, kpi_name } = kpi3;
              const k3 = graph.insertVertex(
                root,
                id,
                graph.setSingleKpiPane(kpi_type, "送风" + kpi_name, ""),
                bgWidth * 0.67,
                bgHeight * 0.37,
                100,
                30
              );
              k3.data = {
                isSingleKpi: true,
                bindData: {
                  ...kpi3,
                  kpi_name: "送风温度",
                  rid: relation.device.id
                }
              };
              graph.clearBackStroke(k3);
            }
          } else if (serial[serial.length - 1] == "2") {
            //回风温度传感器
            const v3 = graph.insertVertex(
              root,
              id,
              name,
              bgWidth * 0.346,
              bgHeight * 0.217,
              30 * scale,
              50 * scale,
              shapeStyle
            );
            v3.data = { bindData: relation.device };
            const kpi2 = importanceKpi[0];
            if (kpi2) {
              const { id, kpi_type, kpi_key, kpi_name } = kpi2;
              const k2 = graph.insertVertex(
                root,
                id,
                graph.setSingleKpiPane(kpi_type, "回风" + kpi_name, ""),
                bgWidth * 0.25,
                bgHeight * 0.13,
                100,
                30
              );
              k2.data = {
                isSingleKpi: true,
                bindData: {
                  ...kpi2,
                  kpi_name: "回风温度",
                  rid: relation.device.id
                }
              };
              graph.clearBackStroke(k2);
            }
          } else {
            //水管温度传感器
            const v4 = graph.insertVertex(
              root,
              id,
              name,
              bgWidth * 0.426,
              bgHeight * 0.8,
              (30 - 10) * scale,
              (50 - 10) * scale,
              shapeStyle
            );
            v4.data = { bindData: relation.device };
            const kpi4 = importanceKpi[0];
            if (kpi4) {
              const { id, kpi_type, kpi_key, kpi_name } = kpi4;
              const k4 = graph.insertVertex(
                root,
                id,
                graph.setSingleKpiPane(kpi_type, "水管" + kpi_name, ""),
                bgWidth * 0.345,
                bgHeight * 0.8,
                100,
                30
              );
              k4.data = {
                isSingleKpi: true,
                bindData: {
                  ...kpi4,
                  kpi_name: "水管温度",
                  rid: relation.device.id
                }
              };
              graph.clearBackStroke(k4);
            }
          }
          break;
        case "coo":
          //二氧化碳
          const v5 = graph.insertVertex(
            root,
            id,
            name,
            bgWidth * 0.382,
            bgHeight * 0.2,
            30 * scale,
            50 * scale,
            shapeStyle
          );
          v5.data = { bindData: relation.device };
          const kpi1 = importanceKpi[0];
          if (kpi1) {
            const { id, kpi_type, kpi_key, kpi_name } = kpi1;
            const k1 = graph.insertVertex(
              root,
              id,
              graph.setSingleKpiPane(kpi_type, kpi_name, ""),
              bgWidth * 0.34,
              bgHeight * 0.1,
              100,
              30
            );
            k1.data = {
              isSingleKpi: true,
              bindData: { ...kpi1, rid: relation.device.id }
            };
            graph.clearBackStroke(k1);
          }
          break;
        case "pressure":
          //静压计
          const v6 = graph.insertVertex(
            root,
            id,
            name,
            bgWidth * 0.84,
            bgHeight * 0.42,
            20 * scale,
            50 * scale,
            shapeStyle
          );
          v6.data = { bindData: relation.device };
          const kpi6 = importanceKpi[0];
          if (kpi6) {
            const { id, kpi_type, kpi_key, kpi_name } = kpi6;
            const k6 = graph.insertVertex(
              root,
              id,
              graph.setSingleKpiPane(kpi_type, kpi_name, ""),
              bgWidth * 0.8,
              bgHeight * 0.34,
              100,
              30
            );
            k6.data = {
              isSingleKpi: true,
              bindData: { ...kpi6, rid: relation.device.id }
            };
            graph.clearBackStroke(k6);
          }
          break;
        case "water_valve":
          //水阀
          let style = shapeStyle + ";rotation=-90;";
          const v7 = graph.insertVertex(
            root,
            id,
            name,
            bgWidth * 0.43,
            bgHeight * 0.75,
            30 * scale,
            30 * scale,
            style
          );
          v7.data = { bindData: relation.device };
          const kpi7 = _.find(importanceKpi, { kpi_type: "PM" });
          if (kpi7) {
            const { id, kpi_type, kpi_key, kpi_name } = kpi7;
            const k7 = graph.insertVertex(
              root,
              id,
              graph.setSingleKpiPane(kpi_type, kpi_name, ""),
              bgWidth * 0.45,
              bgHeight * 0.75,
              100,
              30
            );
            k7.data = {
              isSingleKpi: true,
              bindData: {
                ...kpi7,
                kpi_name: "水阀开度",
                rid: relation.device.id
              }
            };
            graph.clearBackStroke(k7);
          }
          const kpi7ctm = _.find(importanceKpi, { kpi_type: "CTM" });
          if (kpi7ctm) {
            const { id, kpi_type, kpi_key, kpi_name } = kpi7ctm;
            const k7ctm = graph.insertVertex(
              root,
              id,
              graph.setSingleKpiPane(kpi_type, kpi_name, ""),
              bgWidth * 0.45,
              bgHeight * 0.75,
              100,
              30
            );
            k7ctm.data = {
              isSingleBtn: true,
              bindData: {
                ...kpi7ctm,
                resourceClassId: relation.device.resource_class_id,
                rid: relation.device.id,
                label: "冷水阀开度"
              }
            };
            graph.model.setVisible(k7ctm, false);
          }
          break;
        case "air_valve":
          let style2 = shapeStyle + ";opacity=0;";
          //风阀
          if (serial[serial.length - 1] == "1") {
            //送风
            const v8 = graph.insertVertex(
              root,
              id,
              name,
              bgWidth * 0.15,
              bgHeight * 0.75,

              100 * scale,
              100 * scale,
              style2
            );
            v8.data = { bindData: relation.device };
            const kpi8 = _.find(importanceKpi, { kpi_type: "PM" });
            if (kpi8) {
              const { id, kpi_type, kpi_key, kpi_name } = kpi8;
              const k8 = graph.insertVertex(
                root,
                id,
                graph.setSingleKpiPane(kpi_type, kpi_name, ""),
                bgWidth * 0.14,
                bgHeight * 0.72,
                100,
                30
              );
              k8.data = {
                isSingleKpi: true,
                bindData: {
                  ...kpi8,
                  kpi_name: "新风风阀开度",
                  rid: relation.device.id
                }
              };
              graph.clearBackStroke(k8);
            }
            const kpi8ctm = _.find(importanceKpi, { kpi_type: "CTM" });
            if (kpi8ctm) {
              const { id, kpi_type, kpi_key, kpi_name } = kpi8ctm;
              const k8ctm = graph.insertVertex(
                root,
                id,
                graph.setSingleKpiPane(kpi_type, kpi_name, ""),
                bgWidth * 0.45,
                bgHeight * 0.75,
                100,
                30
              );
              k8ctm.data = {
                isSingleBtn: true,
                bindData: {
                  ...kpi8ctm,
                  resourceClassId: relation.device.resource_class_id,
                  rid: relation.device.id,
                  label: "新风阀开度"
                }
              };
              graph.model.setVisible(k8ctm, false);
            }
          } else {
            //排风
            const v9 = graph.insertVertex(
              root,
              id,
              name,
              bgWidth * 0.15,
              bgHeight * 0.4,
              100 * scale,
              100 * scale,
              style2
            );
            v9.data = { bindData: relation.device };
            const kpi9 = _.find(importanceKpi, { kpi_type: "PM" });
            if (kpi9) {
              const { id, kpi_type, kpi_key, kpi_name } = kpi9;
              const k9 = graph.insertVertex(
                root,
                id,
                graph.setSingleKpiPane(kpi_type, kpi_name, ""),
                bgWidth * 0.14,
                bgHeight * 0.4,
                100,
                30
              );
              k9.data = {
                isSingleKpi: true,
                bindData: {
                  ...kpi9,
                  kpi_name: "排风风阀开度",
                  rid: relation.device.id
                }
              };
              graph.clearBackStroke(k9);
            }
            const kpi9ctm = _.find(importanceKpi, { kpi_type: "CTM" });
            if (kpi9ctm) {
              const { id, kpi_type, kpi_key, kpi_name } = kpi9ctm;
              const k9ctm = graph.insertVertex(
                root,
                id,
                graph.setSingleKpiPane(kpi_type, kpi_name, ""),
                bgWidth * 0.45,
                bgHeight * 0.75,
                100,
                30
              );
              k9ctm.data = {
                isSingleBtn: true,
                bindData: {
                  ...kpi9ctm,
                  resourceClassId: relation.device.resource_class_id,
                  rid: relation.device.id,
                  label: "排风阀开度"
                }
              };
              graph.model.setVisible(k9ctm, false);
            }
          }

          break;
        case "fan":
          //风机
          let style1 = shapeStyle + ";opacity=0;";
          const v10 = graph.insertVertex(
            root,
            id,
            name,
            bgWidth * 0.5,
            bgHeight * 0.65,
            100 * scale,
            100 * scale,
            style1
          );
          v10.data = { bindData: relation.device };
          const kpi10 = _.find(importanceKpi, {
            kpi_type: "PM",
            kpi_key: "frequency_feedback"
          });
          if (kpi10) {
            const { id, kpi_type, kpi_key, kpi_name } = kpi10;
            const k10 = graph.insertVertex(
              root,
              id,
              graph.setSingleKpiPane(kpi_type, "风机" + kpi_name, ""),
              bgWidth * 0.5,
              bgHeight * 0.64,
              100,
              30
            );
            k10.data = {
              isSingleKpi: true,
              bindData: {
                ...kpi10,
                kpi_name: "风机频率",
                rid: relation.device.id
              }
            };
            graph.clearBackStroke(k10);
          }
          const kpi10ctm = _.find(importanceKpi, {
            kpi_type: "CTM",
            kpi_key: "frequency_control"
          });
          if (kpi10ctm) {
            const { id, kpi_type, kpi_key, kpi_name } = kpi10ctm;
            const k10ctm = graph.insertVertex(
              root,
              id,
              graph.setSingleKpiPane(kpi_type, kpi_name, ""),
              bgWidth * 0.45,
              bgHeight * 0.75,
              100,
              30
            );
            k10ctm.data = {
              isSingleBtn: true,
              bindData: {
                ...kpi10ctm,
                resourceClassId: relation.device.resource_class_id,
                rid: relation.device.id,
                label: "风机频率"
              }
            };
            graph.model.setVisible(k10ctm, false);
          }

          //风机控制
          const kpi11ctm = _.find(importanceKpi, {
            kpi_type: "CTM",
            kpi_key: "open_close"
          });
          if (kpi11ctm) {
            const { id, kpi_type, kpi_key, kpi_name } = kpi11ctm;
            const k11ctm = graph.insertVertex(
              root,
              id,
              graph.setSingleKpiPane(kpi_type, "风机开关", ""),
              bgWidth * 0.45,
              bgHeight * 0.75,
              100,
              30
            );
            k11ctm.data = {
              isSingleBtn: true,
              isSwitch: true,
              styleKey: "fan",
              bindData: {
                ...kpi11ctm,
                resourceClassId: relation.device.resource_class_id,
                rid: relation.device.id,
                label: "风机开关"
              }
            };
            graph.model.setVisible(k11ctm, false);
          }
          break;
        default:
          break;
      }
    });

    //空调机开关
    const ctm = _.find(importanceKpi, { kpi_type: "CTM" });
    if (ctm) {
      const { id, kpi_type, kpi_key, kpi_name } = ctm;
      const cell = graph.insertVertex(
        root,
        id,
        graph.setSingleKpiPane(kpi_type, kpi_name, ""),
        bgWidth * 0.45,
        bgHeight * 0.75,
        100,
        30
      );
      cell.data = {
        isSingleBtn: true,
        isSwitch: true,
        styleKey: "ahu",
        bindData: {
          ...ctm,
          resourceClassId: resource_class_id,
          rid: rid,
          label: "空调箱开关"
        }
      };
      graph.model.setVisible(cell, false);
    }
  } finally {
    graph.getModel().endUpdate();
  }
};
