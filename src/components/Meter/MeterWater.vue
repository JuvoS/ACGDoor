<template>
  <div class="radian" :id="'panel'+id"></div>
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
      default: 100000
    },
    majorTicks: {
      type: Number,
      default: 9
    },
    minorTicks: {
      type: Number,
      default: 6
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
      rangeFill: "#e0e0e0",
      rangeStroke: "#bbbcb9",
      maxTickStroke: "#5f5e5d",
      minTickStroke: "#666",
      pointerFill: "#00838f",
      pointerCircle: "#00BCD4",
      // indicaNumFill: "#f0eade",
      indicaNumFill: "#111",
      meterColor: "#757575",
      pointerColor: "",
      indicaColor: "#333",
      useRangeColor: "#5f5e5d",
      // indicaNumColor: "#1d1d1d"
      indicaNumColor: "#fff"
    };
  },
  computed: {
    theme() {
      return this.$ls.get("THEME");
    },
    ranNum() {
      return _.random(1000, 9999) + "W";
    }
  },
  watch: {
    meterValue(v) {
      // d3.select("#num" + this.id).text(v + "m³");

      this.pointerRun(v);

      let rangeZones = {
        from: this.config.min,
        to:
          this.config.min +
          (this.config.max - this.config.min) * (v / this.config.max)
      };
      d3.select("#path" + this.ranNum + this.id)
        .transition()
        .duration(this.duration) //持续时间
        .attr(
          "d",
          d3
            .arc()
            .startAngle(this.valueToRadians(rangeZones.from, this.config))
            .endAngle(this.valueToRadians(rangeZones.to, this.config))
            .innerRadius((0.65 * (this.config.size * 0.97)) / 2)
            .outerRadius((0.85 * (this.config.size * 0.97)) / 2)
        );

      let basicNum = (100000000 + v)
        .toString()
        .substring(1)
        .split("");

      basicNum.forEach((ele, i) => {
        d3.select("#poynum" + this.ranNum + this.id + i).text(ele);
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
      this.rangeFill = "none";
      this.rangeStroke = "#bbbcb9";
      this.maxTickStroke = "#5f5e5d";
      this.minTickStroke = "#666";
      this.pointerFill = "#00838f";
      this.pointerCircle = "#00BCD4";
      this.indicaNumFill = "#f0eade";
      this.meterColor = "#757575";
      this.pointerColor = "";
      this.indicaColor = "#e0e0e0";
      this.useRangeColor = "#ccc";
      this.indicaNumColor = "#1d1d1d";
    }
    this.$nextTick(() => {
      this.initMeter();
    });
  },
  methods: {
    initMeter() {
      let config = this.config;

      if (
        document.getElementById("panel" + this.id).offsetWidth != 0 &&
        document.getElementById("panel" + this.id).offsetHeight != 0
      ) {
        this.basicSize =
          Math.min(
            document.getElementById("panel" + this.id).offsetWidth,
            document.getElementById("panel" + this.id).offsetHeight
          ) / config.size;
      } else {
        this.basicSize =
          Math.max(
            (document.getElementById("panel" + this.id).offsetWidth / 4) * 3,
            document.getElementById("panel" + this.id).offsetHeight
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
        rangeZones
      } = this.setConfig(config);

      let self = this; //添加上下文
      let panel = d3
        .select("#panel" + this.id)
        .append("svg")
        .attr("class", "gauge") //添加类名gauge
        .attr("width", size) //设置svg宽度
        .attr("height", size); //设置svg高度

      if (this.border) {
        panel
          .append("circle") //添加circle，圆
          .attr("cx", cx) //设置circle的坐标
          .attr("cy", cy)
          .attr("r", radius) //设置circle的半径
          .style("fill", this.shellFill) //设置circle的填充颜色
          .style("stroke", this.shellStroke) //设置circle的轮廓颜色
          .style("stroke-width", "4px"); //设置circle的轮廓宽度

        panel
          .append("circle")
          .attr("cx", cx)
          .attr("cy", cy)
          .attr("r", 0.9 * radius) //半径不一样
          .style("fill", this.innerFill)
          .style("stroke", this.innerStroke)
          .style("stroke-width", "2px");
      }

      let startXP = 60 * this.basicSize;
      let startYP = 250 * this.basicSize;
      let endXP = 240 * this.basicSize;
      let endYP = 290 * this.basicSize;
      panel
        .append("polygon")
        .attr(
          "points",
          startXP -
            2 +
            `,` +
            (startYP - 2) +
            ` ` +
            (endXP + 2) +
            `,` +
            (startYP - 2) +
            `  ` +
            (endXP + 2) +
            `,` +
            (endYP + 2) +
            ` ` +
            (startXP - 2) +
            `,` +
            (endYP + 2)
        )
        .attr("stroke", this.shellStroke)
        .attr("fill", this.shellFill)
        .attr("stroke-width", 0);

      let polygonPane = panel.append("g").attr("id", "poy" + this.id);
      this.buildPolygonPath(
        polygonPane,
        startXP,
        endXP,
        startYP,
        endYP,
        this.meterValue
      );

      panel
        .append("path")
        .style("fill", this.rangeFill)
        .attr("stroke", this.rangeStroke)
        .attr("id", "path" + this.ranNum + this.id)
        .attr(
          "d",
          d3
            .arc()
            .startAngle(this.valueToRadians(rangeZones.from, config))
            .endAngle(this.valueToRadians(rangeZones.to, config))
            .innerRadius(0.65 * radius)
            .outerRadius(0.85 * radius)
        )
        .attr("transform", function() {
          return "translate(" + cx + ", " + cy + ") rotate(270)";
        });

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
            panel
              .append("svg:line")
              .attr("x1", point1.x)
              .attr("y1", point1.y)
              .attr("x2", point2.x)
              .attr("y2", point2.y)
              .style("stroke", this.minTickStroke)
              .style("stroke-width", "1px");
          }
          let point3 = this.valueToPoint(major, config, 0.72);
          let point4 = this.valueToPoint(major, config, 0.82);
          panel
            .append("svg:line")
            .attr("x1", point3.x)
            .attr("y1", point3.y)
            .attr("x2", point4.x)
            .attr("y2", point4.y)
            .style("stroke", this.maxTickStroke)
            .style("stroke-width", "3px");
          let point = this.valueToPoint(major, config, 0.63);
          panel
            .append("svg:text")
            .attr("x", point.x + deltaSize / 3)
            .attr("y", point.y + deltaSize / 3)
            .attr("text-anchor", major == min ? "state" : "end")
            .text(major)
            .style("font-size", deltaSize / 2 + "px")
            .style("fill", this.indicaColor)
            .style("stroke-width", "0px");
          // }
        }
      }

      let pointerContainer = panel
        .append("g")
        .attr("class", "pointerContainer");

      //中间值
      let midValue = (min + max) / 2;
      //指针的点轨迹
      let pointerPath = this.buildPointerPath(midValue, config);
      //曲线生成器
      let pointerLine = d3
        .line()
        // .interpolate("basis")
        .x(function(d) {
          return d.x;
        })
        .y(function(d) {
          return d.y;
        })
        .curve(d3.curveBasis);

      //画指针
      pointerContainer
        .selectAll("path")
        .data([pointerPath])
        .enter()
        .append("svg:path")
        .attr("d", pointerLine)
        .style("fill", this.pointerFill)
        .style("fill-opacity", 0.7);

      pointerContainer
        .append("svg:circle")
        .attr("cx", cx)
        .attr("cy", cy)
        .attr("r", 0.12 * radius)
        .style("fill", this.pointerCircle)
        .style("opacity", 1);

      let valueSize = Math.round(size / 10);

      this.redraw(value, duration, min, max, range, config, cy, cx);

      // panel
      //   .append("svg:text")
      //   .attr("x", cx)
      //   .attr("y", cy + fontSize * 2)
      //   .attr("dy", fontSize / 2)
      //   .attr("text-anchor", "middle")
      //   .text(value + "m³")
      //   .attr("id", "num" + this.id)
      //   .style("font-size", fontSize + "px")
      //   .style("font-weight", "800")
      //   .style("fill", this.meterColor)
      //   .style("stroke-width", "0px");

      panel
        .append("svg:text")
        .attr("x", cx)
        .attr("y", cy + fontSize * 2)
        .attr("dy", fontSize / 4)
        .attr("text-anchor", "middle")
        .text("用水量")
        .style("font-size", (fontSize / 3) * 2 + "px")
        .style("fill", this.useRangeColor)
        .style("stroke-width", "0px");
    },
    pointerRun(val) {
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
        rangeZones
      } = this.setConfig(this.config);
      this.redraw(val, duration, min, max, range, this.config, cy, cx);
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
        rangeZones: {
          from: config.min,
          to: config.min + (config.max - config.min) * 0.75
        } //区域1范围
      };
    },
    redraw(value, duration, min, max, range, config, cy, cx) {
      let self = this;
      let panel = d3.select("#panel" + this.id).select(".gauge");
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
    valueToRadians(value, config) {
      return (this.valueToDegrees(value, config) * Math.PI) / 180;
    },
    valueToDegrees(value, config) {
      let { range, min } = this.setConfig(config);
      return (value / range) * 270 - ((min / range) * 270 + 45);
    },
    valueToPoint(value, config, factor) {
      let { cx, cy, radius } = this.setConfig(config);
      return {
        x: cx - radius * factor * Math.cos(this.valueToRadians(value, config)),
        y: cy - radius * factor * Math.sin(this.valueToRadians(value, config))
      };
    },
    buildPointerPath(value, config) {
      let { range } = this.setConfig(config);
      let delta = range / 13,
        head = this.valueToPoint(value, config, 0.85),
        head1 = this.valueToPoint(value - delta, config, 0.12),
        head2 = this.valueToPoint(value + delta, config, 0.12),
        tailValue = value - (range * (1 / (270 / 360))) / 2,
        tail = this.valueToPoint(tailValue, config, 0.28),
        tail1 = this.valueToPoint(tailValue - delta, config, 0.12),
        tail2 = this.valueToPoint(tailValue + delta, config, 0.12);
      return [head, head1, tail2, tail, tail1, head2, head];
    },
    buildPolygonPath(ele, startX, endX, startY, endY, val) {
      let basicNum = (100000000 + val)
        .toString()
        .substring(1)
        .split("");
      let num = 8;
      let eleMar = 2;
      let eleW = (endX - startX - (num - 1) * eleMar) / num;
      for (let i = 0; i < num; i++) {
        this.createNumPane(
          ele,
          startX + (eleW + eleMar) * i,
          startX + (eleW + eleMar) * i + eleW,
          startY,
          endY,
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
      let txtW = 30 * this.basicSize;
      let txtStartX = Math.abs(end - start - txtW) / 2 + start + 2;
      if (end - start < txtW)
        txtStartX = start - Math.abs(txtW - (end - start)) / 2 + 7.5;

      let txtStartY = Math.abs(endY - startY - txtW) / 2 + startY + 22;

      ele
        .append("svg:text")
        .text(num)
        .attr("id", "poynum" + this.ranNum + this.id + index)
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
.radian {
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>