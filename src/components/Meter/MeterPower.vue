<template>
  <div class="power" :id="'power'+id"></div>
</template>
<script>
import * as d3 from "d3";
export default {
  props: {
    id: {
      type: String,
      default: ""
    },
    border: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 1000000
    },
    majorTicks: {
      type: Number,
      default: 9
    },
    minorTicks: {
      type: Number,
      default: 7
    },
    duration: {
      type: Number,
      default: 500
    },
    meterValue: {
      type: Number,
      default: 75
    }
  },
  components: {},
  data() {
    return {
      config: {},
      basicSize: 0.8,
      shellFill: "#7e8992",
      shellStroke: "#d4d6d4",
      innerFill: "#eeefef",
      innerStroke: "#ffffff",
      poyFill: "#747378",
      poyStroke: "#c2c0c1",
      maxTickStroke: "#5f5e5d",
      minTickStroke: "#666",
      pointerCircle: "#00BCD4",
      indicaColor: "#333",
      meterColor: "#757575",
      useRangeColor: "#5f5e5d",
      indicaNumFill: "#111",
      indicaNumColor: "#fff",

      basicAddNum: 100000000,
      basicAddCount: 8
    };
  },
  computed: {
    theme() {
      return this.$ls.get("THEME");
    }
  },
  watch: {
    meterValue(v) {
      d3.select("#num" + this.id).text(v + "kw·h");

      let basicNum = (this.basicAddNum + v)
        .toString()
        .substring(1)
        .split("");

      basicNum.forEach((ele, i) => {
        d3.select("#powerNum" + this.id + i).text(ele);
      });
    }
  },
  mounted() {
    this.config = {
      size: 300,
      min: this.min,
      max: this.max,
      majorTicks: this.majorTicks,
      minorTicks: this.minorTicks,
      duration: this.duration,
      value: this.meterValue
    };
    if (this.theme == "dark") {
      this.shellFill = "#7e8992";
      this.shellStroke = "#d4d6d4";
      this.innerFill = "#eeefef";
      this.innerStroke = "#ffffff";
      this.poyFill = "#747378";
      this.poyStroke = "#c2c0c1";
      this.maxTickStroke = "#5f5e5d";
      this.minTickStroke = "#666";
      this.pointerCircle = "#00BCD4";
      this.indicaColor = "#333";
      this.meterColor = "#757575";
      this.useRangeColor = "#ccc";
      this.indicaNumFill = "#f0eade";
      this.indicaNumColor = "#1d1d1d";
    }
    this.initMeter();
  },
  methods: {
    initMeter() {
      let config = this.config;

      if (
        document.getElementById("power" + this.id).offsetWidth != 0 &&
        document.getElementById("power" + this.id).offsetHeight != 0
      ) {
        this.basicSize =
          Math.min(
            document.getElementById("power" + this.id).offsetWidth,
            document.getElementById("power" + this.id).offsetHeight
          ) / config.size;
      } else {
        this.basicSize =
          Math.max(
            (document.getElementById("power" + this.id).offsetWidth / 4) * 3,
            document.getElementById("power" + this.id).offsetHeight
          ) / config.size;
      }

      config.size = config.size * this.basicSize;
      let {
        size,
        cx,
        cy,
        radius,
        range,
        min,
        max,
        minorTicks,
        majorTicks,
        duration,
        value,
        greenZones
      } = this.setConfig(config);

      let self = this; //添加上下文
      let panel = d3
        .select("#power" + this.id)
        .append("svg")
        .attr("class", "gauge" + this.id) //添加类名gauge
        .attr("width", size) //设置svg宽度
        .attr("height", size); //设置svg高度

      let ax = config.size * this.basicSize;

      let startXP = 20 * this.basicSize;
      let startYP = 20 * this.basicSize;

      let endXP = size - 20;
      let endYP = 100 * this.basicSize;

      if (this.border) {
        panel
          .append("polygon")
          .attr(
            "points",
            `0,0 ` + size + `,0  ` + size + `,` + size + ` 0,` + size
          )
          .attr("stroke", this.shellStroke)
          .attr("fill", this.shellFill)
          .attr("stroke-width", 4);

        panel
          .append("polygon")
          .attr(
            "points",
            startXP +
              `,` +
              startYP +
              ` ` +
              endXP +
              `,` +
              startYP +
              `  ` +
              endXP +
              `,` +
              endXP +
              ` ` +
              startXP +
              `,` +
              endXP
          )
          .attr("stroke", this.innerStroke)
          .attr("fill", this.innerFill)
          .attr("stroke-width", 0);
      }

      panel
        .append("polygon")
        .attr(
          "points",
          startXP +
            `,` +
            startXP +
            ` ` +
            endXP +
            `,` +
            startYP +
            `  ` +
            endXP +
            `,` +
            endYP +
            ` ` +
            startXP +
            `,` +
            endYP
        )
        .attr("stroke", this.poyStroke)
        .attr("fill", this.poyFill)
        .attr("stroke-width", 4);

      let powerNumPane = panel.append("g");
      this.buildPolygonPath(
        powerNumPane,
        startXP + 4,
        endXP - 4,
        startYP,
        endYP,
        this.meterValue
      );

      let degreePane = panel.append("g");

      let fontSize = Math.round(size / 9);

      let deltaSize = Math.round(size / 16);
      let majorDelta = range / (majorTicks - 1);
      {
        for (let major = min; major <= max; major += majorDelta) {
          let minorDelta = majorDelta / minorTicks;
          for (
            let minor = major + minorDelta;
            minor < Math.min(major + majorDelta, max);
            minor += minorDelta
          ) {
            let point1 = this.valueToPoint(minor, config, 0.72);
            let point2 = this.valueToPoint(minor, config, 0.8);

            degreePane
              .append("line")
              .attr("x1", point1.x)
              .attr("y1", point1.y)
              .attr("x2", point2.x)
              .attr("y2", point2.y)
              .style("stroke", this.minTickStroke)
              .style("stroke-width", "1px");
          }

          let point3 = this.valueToPoint(major, config, 0.72);
          let point4 = this.valueToPoint(major, config, 0.85);
          degreePane
            .append("line")
            .attr("x1", point3.x)
            .attr("y1", point3.y)
            .attr("x2", point4.x)
            .attr("y2", point4.y)
            .style("stroke", this.maxTickStroke)
            .style("stroke-width", "1px");

          let point = this.valueToPoint(major, config, 0.63);
          degreePane
            .append("text")
            .attr("x", point.x + deltaSize / 2)
            .attr("y", point.y + deltaSize / 4)
            .attr("text-anchor", major == min ? "state" : "end")
            .text(major)
            .style("font-size", deltaSize / 2 + "px")
            .style("fill", this.indicaColor)
            .style("stroke-width", "0px");
        }
      }

      degreePane.attr("transform", function() {
        return "translate(" + cx * 2 + ", " + cy + ") rotate(90)";
      });

      let pointerContainer = panel
        .append("g")
        .attr("class", "pointerContainer");

      let midValue = (min + max) / 2;
      let pointerPath = this.buildPointerPath(midValue, config);
      let pointerLine = d3
        .line()
        .x(function(d) {
          return d.x;
        })
        .y(function(d) {
          return d.y;
        })
        .curve(d3.curveBasis);

      let pinePane = pointerContainer.append("g");

      pinePane
        .append("svg:circle")
        .attr("cx", cx)
        .attr("cy", cy * 1.8)
        .attr("r", 0.05 * radius)
        .style("fill", this.pointerCircle)
        .style("opacity", 1);

      let valueSize = Math.round(size / 10);

      this.redraw(value, duration, min, max, range, config, cy, cx); //指针渲染函数

      panel
        .append("svg:text") //添加文本
        .attr("x", cx) //文本位置
        .attr("y", cy / 2 + fontSize * 2)
        .attr("dy", fontSize / 4)
        .attr("text-anchor", "middle") //文字角度
        .text("用电量") //文字内容
        .style("font-size", (fontSize / 3) * 2 + "px") //字体大小
        .style("fill", this.useRangeColor) //颜色
        .style("stroke-width", "0px");
    },
    setConfig(config) {
      return {
        value: config.value,
        size: config.size,
        cx: config.size / 2, //圆心的x坐标
        cy: config.size / 2, //圆心的y坐标
        max: config.max,
        min: config.min,
        range: config.max - config.min, //量程
        radius: (config.size * 0.97) / 2, //半径（稍许留白）
        minorTicks: config.minorTicks,
        majorTicks: config.majorTicks,
        duration: config.duration,
        greenZones: {
          from: config.min,
          to: config.min + (config.max - config.min) * 0.75
        }, //区域1范围
        yellowZones: {
          from: config.min + (config.max - config.min) * 0.75,
          to: config.min + (config.max - config.min) * 0.9
        },
        redColor: config.redColor, //区域2范围
        redZones: {
          from: config.min + (config.max - config.min) * 0.9,
          to: config.max
        } //区域3范围
      };
    },
    redraw(value, duration, min, max, range, config, cy, cx) {
      let self = this;
      let panel = d3.select("#power" + this.id).select(".gauge");
      //指针旋转
      let pointContainer = panel.select(".pointerContainer");
      //设置value值
      pointContainer.selectAll("text").text(value);
      let pointer = pointContainer.selectAll("path");
      //指针移动
      pointer
        .transition()
        .duration(duration) //持续时间
        .attrTween("transform", function() {
          let pointerValue = value;
          //判断超出量程的问题
          if (value > max) pointerValue = max + 0.02 * range;
          else if (value < min) pointerValue = min - 0.02 * range;
          //目标旋转角度：将数值转化为角度，并减去一个直角，
          let targetRotation = self.valueToDegrees(pointerValue, config) - 90;
          //现在的角度
          let currentRotation = self._currentRotation || targetRotation;
          self._currentRotation = targetRotation;
          return function(step) {
            let rotation =
              currentRotation + (targetRotation - currentRotation) * step;
            return " rotate(" + rotation + ", " + cx + ", " + cy + ")"; //定义旋转
          };
        });
    },
    valueTopowers(value, config) {
      return (this.valueToDegrees(value, config) * Math.PI) / 180;
    },
    valueToDegrees(value, config) {
      let { range, min } = this.setConfig(config);
      return (value / range) * 90 - ((min / range) * 90 + 45);
    },
    valueToPoint(value, config, factor) {
      let { cx, cy, radius } = this.setConfig(config);
      return {
        x: cx - radius * factor * Math.cos(this.valueTopowers(value, config)),
        y: cy - radius * factor * Math.sin(this.valueTopowers(value, config))
      };
    },
    buildPointerPath(value, config) {
      let { range } = this.setConfig(config);
      let delta = range / 13,
        head = { x: 50, y: 120 },
        head1 = { x: 60, y: 130 },
        head2 = this.valueToAPoint(value + delta, config, 0.55),
        tailValue = value - (range * (1 / (90 / 360))) / 2,
        tail = { x: 100, y: 260 },
        tail1 = { x: 110, y: 280 },
        tail2 = this.valueToAPoint(tailValue + delta, config, 0.05);
      return [head, head1, tail2, tail, tail1, head2, head];
    },
    valueToAPoint(value, config, factor) {
      let { cx, cy, radius } = this.setConfig(config);
      return {
        x: cx - radius * factor * Math.cos(this.valueTopowers(value, config)),
        y: cy
      };
    },
    buildNumPane(ele) {
      this.createNumPane(ele, 25, 60, 0);
      this.createNumPane(ele, 65, 100, 0);
      this.createNumPane(ele, 105, 140, 0);
      this.createNumPane(ele, 145, 180, 0);
      this.createNumPane(ele, 185, 225, 5);
      this.createNumPane(ele, 230, 270, 9);
    },
    buildPolygonPath(ele, startX, endX, startY, endY, val) {
      let basicNum = (this.basicAddNum + val)
        .toString()
        .substring(1)
        .split("");
      let num = this.basicAddCount;
      let eleMar = 2;
      let eleW = (endX - startX - (num - 1) * eleMar) / num;
      for (let i = 0; i < num; i++) {
        this.createNumPane(
          ele,
          startX + (eleW + eleMar) * i,
          startX + (eleW + eleMar) * i + eleW,
          startY + 4,
          endY - 4,
          basicNum[i],
          i
        );
      }
    },
    createNumPane(ele, start, end, startY, endY, num, index) {
      ele
        .append("polygon")
        .attr(
          "points",
          start +
            `,` +
            startY +
            ` ` +
            end +
            `,` +
            startY +
            `  ` +
            end +
            `,` +
            endY +
            ` ` +
            start +
            `,` +
            endY
        )
        .attr("fill", this.indicaNumFill);
      let txtW = 40 * this.basicSize;
      let txtStartX = Math.abs(end - start - txtW) / 2 + start + 2;
      if (end - start < txtW)
        txtStartX = start - Math.abs(txtW - (end - start)) / 2 + 9.5;

      let txtStartY = Math.abs(endY - startY - txtW / 2) / 2 + startY + 22;
      ele
        .append("svg:text")
        .text(num)
        .attr("id", "powerNum" + this.id + index)
        .attr("x", txtStartX)
        .attr("y", txtStartY)
        .style("font-family", "Digital")
        .style("font-size", txtW + "px")
        .style("font-weight", 800 * this.basicSize)
        .style("fill", this.indicaNumColor)
        .style("stroke-width", "0px");
    }
  }
};
</script>
<style lang='less' scoped>
.power {
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>