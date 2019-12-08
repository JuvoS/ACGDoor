<template>
  <div class="com-markdown-preview" id="articleInfo"></div>
</template>

<script>
import marked from "marked";
export default {
  props: {
    title: {
      type: String,
      default: "this"
    }
  },
  data() {
    return {
      baseApi: "article"
    };
  },
  mounted() {
    this.fetchArticle("baseMD");
  },
  methods: {
    fetchArticle(keyName) {
      this.$axios
        .get(
          this.$config.restURL +
            "/" +
            this.baseApi +
            "/key?" +
            "keyName=" +
            keyName
        )
        .then(response => {
          console.log("### Juvos |  ->", marked(response.data.keyInfo));
          // marked(this.content)
          document.getElementById("articleInfo").innerHTML = marked(
            response.data.keyInfo
          );
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.com-markdown-preview {
  background: #fff;
  padding: 20px;
  width: 100%;
  font-size: 16px;
  color: #666;
  tab-size: 4;
  word-break: break-all;
}
</style>
<style>
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
  margin-bottom: 0.5em;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 600;
}
p {
  margin-top: 0;
  margin-bottom: 1em;
}
dl,
ol,
ul {
  margin-top: 0;
  margin-bottom: 1em;
}
a {
  color: #1890ff;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
}
pre,
pre[class*="language-"] {
  word-wrap: normal;
  word-break: break-all;
  white-space: pre;
  overflow-x: scroll;
  overscroll-behavior-x: contain;
  margin-top: 0;
  margin-bottom: 20px;
  border-radius: 4px;
  z-index: 0;
  padding: 1em;
  line-height: 1.5;
  color: #ccc;
  background: #2d2d2d;
}
code,
code[class*="language-"],
pre[class*="language-"] {
  color: #ccc;
  background: none;
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  font-size: 1em;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;
  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}
</style>
