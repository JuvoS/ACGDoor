<template>
  <div id="dArea" @dblclick="onCloseLine">
    <svg id="dAreaSvg" />
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  props: {
    initArea: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      svg: undefined,
      pointIndex: 0,
      offsetX: 0,
      offsetY: 0,
      points: [],
      pointsArr: [],
      mark: {},
      areasGroup: undefined,
      areasArr: [],
      drawState: false
    };
  },
  mounted() {
    this.initSvg();
  },
  watch: {
    initArea(v) {
      if (!_.isEmpty(v)) {
        this.onlyDraw(v);
      }
    },
    points(v) {
      this.$emit("on-points", v);
    }
  },
  methods: {
    drawAreas(areas) {
      const _this = this;

      const aGroup = this.areasGroup.selectAll("g.area").data(areas, d => {
        return d.points.map(d => [d.x, d.y].join("#")).join("#");
      });

      this.areasGroup.exit().remove();

      const areaGroups = aGroup
        .enter()
        .append("g")
        .attr("class", "area");

      const polygon = this.areasGroup
        .selectAll("g.area")
        .selectAll("polygon")
        .data(
          d => {
            return [d.points];
          },
          d => {
            return d.map(d => [d.x, d.y].join("#")).join("#");
          }
        );

      polygon
        .enter()
        .append("polygon")
        .merge(polygon)
        .attr("points", d => {
          return d.map(d => [d.x, d.y].join(",")).join(" ");
        })
        .attr("stroke", "#007bff")
        .attr("stroke-width", 1)
        .attr("fill", "#007bff")
        .attr("fill-opacity", 0.25)
        .on("click", this.handlePolygonSelection);

      polygon.exit().remove();

      const circles = areaGroups.selectAll("circle").data(
        d => d.points,
        d => d.x + "#" + d.y
      );

      circles
        .enter()
        .append("circle")
        .attr("r", 4)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("fill", "#007bff")
        .on("click", (d, idx, j) => {
          const parentArea = d3.select(j[idx].parentNode).datum().points;
          const i = parentArea.findIndex(p => p.x === d.x && p.y === d.y);

          if (i === parentArea.length) {
            parentArea.pop();
          } else if (i === 0) {
            parentArea.shift();
          } else {
            parentArea.splice(i, 1);
          }

          this.drawAreas(areas);
        })
        .call(
          d3
            .drag()
            .on("start", function(d) {
              d3.select(this).classed("active", true);
            })
            .on("drag", function(d) {
              d3.select(this)
                .attr("cx", (d.x = d3.event.x))
                .attr("cy", (d.y = d3.event.y));
              _this.drawAreas(areas);
            })
            .on("end", function(d) {
              d3.select(this).classed("active", false);

              _this.$emit("monitor-area", areas[0].points);
            })
        );

      circles.exit().remove();
    },
    initSvg() {
      this.svg = d3.select("#dAreaSvg");
      let _this = this;
      let lineGenerator = d3
        .line()
        .x(function(d) {
          return d[0];
        })
        .y(function(d) {
          return d[1];
        });
      let drag = d3.drag().on("drag", d => {
        d3.select(this)
          .attr("cx", (d.cx = d3.event.x))
          .attr("cy", (d.cy = d3.event.y));
      });
      this.svg.on("click", function(d, i) {
        if (_this.drawState) {
          const [x, y] = d3.mouse(this);
          _this.pointIndex += 1;
          _this.points.push({ x, y });
          _this.pointsArr.push([x, y]);

          if (_this.pointIndex <= 1) {
            _this.svg
              .append("circle")
              .attr("cx", x)
              .attr("cy", y)
              .attr("r", 8)
              .attr("fill", "red")
              .call(drag)
              .on("click", function() {
                _this.pointIndex -= 1;
                _.dropRight(_this.points);
                _.dropRight(_this.pointsArr);
                _this.finish();
              });
          } else {
            _this.svg
              .append("circle")
              .attr("cx", x)
              .attr("cy", y)
              .attr("r", 4)
              .attr("fill", "red")
              .call(drag);
          }

          if (_this.pointIndex >= 1) {
            _this.clearPath();
            _this.svg
              .append("path")
              .attr("stroke", "red")
              .attr("stroke-width", 2)
              .attr("fill", "none")
              .attr("d", lineGenerator(_this.pointsArr));
          }
        }
      });
    },
    resetPoint() {
      this.pointIndex = 0;
      this.points = [];
      this.svg.selectAll("circle").remove();
    },
    clearPolygon() {
      this.svg.selectAll("polygon").remove();
      this.mark = {};
    },
    clearPath() {
      this.svg.selectAll("path").remove();
    },
    clear() {
      this.resetPoint();
      this.clearPath();
      this.pointsArr = [];
      this.areasArr = [];
      this.clearPolygon();
      this.svg.selectAll("g").remove();
      this.drawState = true;
    },
    finish() {
      if (this.pointsArr.length >= 3) {
        let _this = this;
        if (_.isEmpty(this.points)) return;

        _this.clearPath();
        _this.pointsArr = [];
        _this.drawState = false;
        this.svg.selectAll("circle").remove();
        this.svg.selectAll("g").remove();

        this.areasGroup = this.svg.append("g").attr("class", "areas");
        this.areasArr.push({ name: "drawarea", points: this.points });
        this.drawAreas(this.areasArr);
        this.$emit("monitor-area", this.points);
        this.drawState = false;

        this.pointIndex = 0;
        this.points = [];
      } else {
        this.$Message.warning("请至少选择三点");
      }
    },
    onlyDraw(v) {
      this.clear();
      let arArr = [];
      this.areasGroup = this.svg.append("g").attr("class", "areas");
      this.drawAreas(v);
      this.drawState = false;
      this.$emit("monitor-area", v[0].points);

      this.pointIndex = 0;
      this.points = [];
    },
    dragMove(rectangle, obj, prop) {
      var x = d3.event.x;
      var y = d3.event.y;
      setPoints(obj, prop);
      d3.select(rectangle).attr("transform", "translate(" + x + "," + y + ")");
    },
    onCloseLine() {
      // console.log("close line");
    }
  }
};
</script>

<style lang="less" scoped>
.dArea-info {
  position: absolute;
  top: 20px;
  left: 20px;
}
#dAreaSvg {
  border: 1px solid green;
  width: 100%;
  height: 100%;
}
</style>
