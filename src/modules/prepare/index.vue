<template>
  <div class="prepare">
    <div class="lg"></div>
    <div style="padding-bottom:30px;max-width:400px;text-align:center;">
      Hello there!
      <br />You are about to enter ACG Door website.
      <br />It's a playground for some curious person.
      <br />If you are interested in your own website,
      <br />please visit
      <a :href="cmsUrl" target="_blank" style="color:#000;">{{powerURL}}</a>.
    </div>
    <a class="btn" :href="cmsUrl">Enter the website</a>
  </div>
</template>

<script>
import Performance from "@/utils/performance";
export default {
  computed: {
    cmsUrl() {
      return this.$config.http.baseURL;
    },
    powerURL() {
      return this.$config.powerURL;
    }
  },
  mounted() {
    console.log("### Juvos | 性能映射 ->", Performance.ergodicMemoryInfo());
  }
};
</script>

<style >
html,
body {
  font-size: 14px;
  line-height: 27px;
  margin: 0;
  padding: 0;
}
.prepare {
  background-color: #fafafa;
  color: #111;
  font-family: Helvetica, Arial, sans-serif;
  word-break: break-word;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
}
.lg {
  width: 130px;
  height: 40px;
  margin-bottom: 30px;
  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMS4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0i5Zu+5bGCXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMzk4LjQgNDciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDM5OC40IDQ3OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cGF0aCBkPSJNNzEuMiw4LjljLTAuNy0zLjMtNC0zLTYtNC45Yy0wLjQtMC4zLTAuMy0xLTAuNC0xLjZjLTAuNS0xLjMtMS42LTIuMS0yLjYtMi4xYy0wLjcsMC0xLjMsMC4zLTEuNywxDQoJYy0xLjEsMS43LDIuMywyLjQtMy44LDEuNkM0NS45LDEuNCwzNC45LDEuOSwyNCwxLjZDMTEuNSwxLjIsMyw5LjksNCwyMi4zYzAuNSw1LjgsMC4xLDExLjEtMi43LDE2LjNDLTEsNDMuNywwLDQ1LjIsMi42LDQ1LjUNCgljMy4xLDAuNCwxMC43LDEuNSw5LjktMS43Yy0wLjQtMS40LTQtMC4yLTQuMy0yYy0wLjUtMi44LDQtMy44LDUuNS02YzAuOS0xLjMsNi40LDMuNyw2LjQsNi42YzAsMC44LDEsMi40LDEuNiwyLjUNCgljMi41LDAuNCw1LDAuMyw3LjUsMC4xYzAuNCwwLDEuMi0wLjksMS4yLTEuNWMwLTAuOC0xLTEuMy0xLjUtMS42Yy0wLjktMC41LTEtNi40LDAuOC04LjNjMS4zLTEuNCw0LjQtMi43LDcuMy0yDQoJYzIuOCwwLjcsNS4zLDEuOCw1LDQuNmMtMC4yLDEuNS00LjQsNS00LjEsNi41YzAuMSwwLjgsMy42LTAuMSw0LjMtMC4zYzEuMi0wLjMsMi4xLTEuMiwzLjQtMi45YzIuMyw1LjcsNiw2LjcsOC44LDYuNA0KCWMwLjEsMCwzLjYsMCw0LjQtMWMwLjctMC44LDAuMS0xLjctMC44LTEuOWMtMi45LTAuNy00LjMtMi40LTQuMi01LjRjMC4xLTMuOS0wLjEtNy43LDAtMTEuNWMwLTQuNywyLjgtNy41LDcuNS03LjUNCgljMy42LDAsNy4zLTAuMSwxMC45LDBjMi41LDAsMy4yLTEuOSwzLjctMy42YzAuMi0wLjgtMS0yLjEtMS44LTIuOUM3My4yLDExLjIsNzEuMyw5LjcsNzEuMiw4Ljl6Ii8+DQo8cGF0aCBkPSJNOTMsMS44TDc1LjksNDUuOGg5LjZsMy42LTEwaDE3LjVsMy44LDEwaDkuNkwxMDIuMywxLjhIOTN6IE0xMDMuNiwyOC41SDkxLjhsNS45LTE2LjNsNiwxNi4yVjI4LjV6Ii8+DQo8cGF0aCBkPSJNMTQ4LjgsMzYuN2MtMS44LDEuNS0zLjgsMi4zLTYuMSwyLjNjLTMuMiwwLTUuOS0xLjEtNy44LTMuNkMxMzMsMzMsMTMyLDI5LDEzMiwyMy41YzAtNS4yLDEtOS4xLDMuMS0xMS40DQoJYzItMi4zLDQuNy0zLjQsNy45LTMuNGMyLjMsMCw0LjUsMC42LDYsMS45czIuNywzLjEsMy4yLDUuNGw4LjgtMmMtMS0zLjQtMi40LTYuMS00LjUtOGMtMy4zLTMuMi03LjctNC43LTEzLTQuNw0KCWMtNi4xLDAtMTEuMSwyLTE0LjgsNmMtMy43LDQtNS42LDkuNy01LjYsMTdjMCw2LjksMS44LDEyLjQsNS42LDE2LjNjMy44LDQsOC42LDYsMTQuNCw2YzQuNywwLDguNi0xLDExLjYtMy40DQoJYzMuMS0yLjQsNS4yLTUuOSw2LjUtMTAuN2wtOC42LTIuN0MxNTIsMzIuOSwxNTAuNiwzNS4yLDE0OC44LDM2Ljd6Ii8+DQo8cGF0aCBkPSJNMTg5LjMsMjkuNWgxMC4zdjUuNmMtMS40LDEtMi45LDEuOS00LjksMi43Yy0xLjksMC44LTMuNywxLjEtNS42LDEuMWMtMy43LDAtNi44LTEuMy05LjEtNGMtMi4zLTIuNy0zLjQtNi41LTMuNC0xMS43DQoJYzAtNC45LDEuMS04LjYsMy40LTExYzIuMy0yLjQsNS40LTMuNyw5LjItMy43YzIuNiwwLDQuNywwLjYsNi40LDEuOXMyLjgsMi45LDMuNCw1LjFsOC44LTEuN2MtMC45LTQtMi44LTcuMS01LjktOS40DQoJYy0zLjEtMi4zLTcuMy0zLjQtMTIuOC0zLjRjLTQuMiwwLTcuNywwLjgtMTAuNSwyLjJjLTMuNywxLjktNi41LDQuNy04LjQsOC4yYy0xLjksMy40LTIuOSw3LjUtMi45LDEyLjFjMCw0LjIsMC45LDguMiwyLjYsMTEuNw0KCXM0LjIsNi40LDcuNyw4LjNjMy40LDEuOSw3LjQsMi45LDEyLDIuOWMzLjYsMCw3LjMtMC42LDEwLjctMmMzLjQtMS40LDYuMS0yLjksOC00LjdWMjIuM2gtMTkuMlYyOS41eiIvPg0KPHBhdGggZD0iTTI1MC43LDYuOGMtMS45LTItNC4xLTMuMy02LjYtNC4xYy0xLjktMC42LTQuNi0wLjktOC4zLTAuOWgtMTYuMmgtMC4xdjQzLjloMTYuN2MzLjIsMCw1LjktMC4zLDcuOC0wLjkNCgljMi43LTAuOCw0LjctMS45LDYuMy0zLjRjMi0yLDMuNi00LjYsNC43LTcuOGMwLjktMi42LDEuNC01LjcsMS40LTkuM2MwLTQuMS0wLjQtNy41LTEuNC0xMC4zQzI1My45LDExLjIsMjUyLjYsOC45LDI1MC43LDYuOHoNCgkgTTI0Ni4yLDMyLjFjLTAuNiwxLjktMS40LDMuNC0yLjMsNC4yYy0wLjksMC44LTIuMiwxLjQtMy42LDEuOGMtMS4xLDAuMy0yLjksMC40LTUuNCwwLjRoLTYuNlY5LjZoNGMzLjYsMCw2LDAuMSw3LjMsMC40DQoJYzEuNywwLjQsMi45LDEsNC4xLDJjMS4xLDEsMS45LDIuNCwyLjYsNC4yYzAuNiwxLjgsMC45LDQuMywwLjksNy44UzI0Ni45LDMwLjIsMjQ2LjIsMzIuMXoiLz4NCjxwYXRoIGQ9Ik0yODMuMSwxLjFjLTMuNiwwLTYuOCwwLjYtOS40LDEuOGMtMiwwLjktMy44LDIuMi01LjYsNHMtMy4xLDMuNy00LjEsNmMtMS40LDMuMS0yLDYuOC0yLDExLjJjMCw3LDIsMTIuNCw1LjksMTYuMw0KCWMzLjgsNCw5LjEsNiwxNS42LDZjNi41LDAsMTEuNi0yLDE1LjQtNmMzLjgtNCw1LjctOS42LDUuNy0xNi42YzAtNy4xLTEuOS0xMi44LTUuOS0xNi43QzI5NC43LDMuMSwyODkuNiwxLjEsMjgzLjEsMS4xeiBNMjkxLjksMzUNCgljLTIuMywyLjYtNS4yLDMuOC04LjcsMy44Yy0zLjQsMC02LjQtMS4zLTguNy0zLjhjLTIuMy0yLjYtMy40LTYuMy0zLjQtMTEuMmMwLTUuMSwxLjEtOS4xLDMuMy0xMS41YzIuMi0yLjQsNS4xLTMuNyw4LjgtMy43DQoJYzMuNywwLDYuNiwxLjMsOC44LDMuN2MyLjIsMi40LDMuMyw2LjMsMy4zLDExLjJDMjk1LjQsMjguNywyOTQuMiwzMi41LDI5MS45LDM1eiIvPg0KPHBhdGggZD0iTTMzMC45LDEuMWMtMy42LDAtNi44LDAuNi05LjQsMS44Yy0yLDAuOS0zLjgsMi4yLTUuNiw0cy0zLjEsMy43LTQuMSw2Yy0xLjQsMy4xLTIsNi44LTIsMTEuMmMwLDcsMiwxMi40LDUuOSwxNi4zDQoJYzMuOCw0LDkuMSw2LDE1LjYsNmM2LjUsMCwxMS42LTIsMTUuNC02YzMuOC00LDUuNy05LjYsNS43LTE2LjZjMC03LjEtMS45LTEyLjgtNS45LTE2LjdDMzQyLjUsMy4xLDMzNy40LDEuMSwzMzAuOSwxLjF6IE0zMzkuNSwzNQ0KCWMtMi4zLDIuNi01LjIsMy44LTguNywzLjhjLTMuNCwwLTYuNC0xLjMtOC43LTMuOGMtMi4zLTIuNi0zLjQtNi4zLTMuNC0xMS4yYzAtNS4xLDEuMS05LjEsMy4zLTExLjVjMi4yLTIuNCw1LjEtMy43LDguOC0zLjcNCgljMy43LDAsNi42LDEuMyw4LjgsMy43YzIuMiwyLjQsMy4zLDYuMywzLjMsMTEuMkMzNDMsMjguNywzNDEuOCwzMi41LDMzOS41LDM1eiIvPg0KPHBhdGggZD0iTTM5MywzNy4yYy0yLTMuNC0zLjctNS43LTUtNy4xYy0xLjMtMS40LTIuOC0yLjYtNC43LTMuN2MzLjgtMC42LDYuOC0xLjksOC43LTQuMWMxLjktMi4yLDIuOS00LjksMi45LTguMg0KCWMwLTIuNi0wLjYtNC45LTEuOS02LjljLTEuMy0yLTIuOS0zLjQtNS4xLTQuMnMtNS41LTEuMS0xMC4yLTEuMWgtMTguNnY0My45aDguOFYyNy40aDEuOGMyLDAsMy42LDAuMyw0LjUsMC41czEuOCwwLjksMi43LDEuOA0KCWMwLjksMC45LDIuNCwzLjEsNC43LDYuNWw2LjQsOS42aDEwLjVMMzkzLDM3LjJ6IE0zNzQuNSwyMC41SDM2OGgtMC4xVjkuNGg2LjljMy42LDAsNS43LDAsNi41LDAuMWMxLjQsMC4xLDIuNiwwLjgsMy4zLDEuNw0KCWMwLjgsMC45LDEuMSwyLDEuMSwzLjZjMCwxLjQtMC40LDIuNC0wLjksMy4zYy0wLjUsMC45LTEuNCwxLjUtMi40LDEuOUMzODEuNCwyMC40LDM3OC43LDIwLjUsMzc0LjUsMjAuNXoiLz4NCjwvc3ZnPg0K");
  background-repeat: no-repeat;
  background-position: left center;
  background-size: contain;
}
.btn {
  max-width: 100%;
  display: inline-block;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
  border-radius: 2px;
  height: 48px;
  line-height: 48px;
  padding-right: 18px;
  padding-left: 18px;
  color: #fafafa;
  border-width: 0;
  background-color: #333;
}
.btn:hover {
  background-color: #222;
}
.btn:active {
  background-color: #111;
}
</style>