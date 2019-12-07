<template>
  <div></div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "this"
    }
  }
};
</script>

<style scoped>
.com-markdown-preview,
.editor-preview-active,
.editor-preview-active-side {
  background: #fff !important;
  padding: 20px;
  font-size: 16px;
  color: #666;
  font-family: Helvetica Neue, Arial, Hiragino Sans GB, STHeiti, Microsoft YaHei,
    serif;
  -moz-tab-size: 4;
  tab-size: 4;
  word-break: break-all;
}
.com-markdown-preview > :first-child,
.editor-preview-active-side > :first-child,
.editor-preview-active > :first-child {
  margin-top: 0 !important;
}
.com-markdown-preview h3,
.editor-preview-active-side h3,
.editor-preview-active h3 {
  font-size: 1.25em;
  font-weight: 600;
  line-height: 1.25;
  margin: 24px 0 16px;
}

.com-markdown-preview p,
.editor-preview-active-side p,
.editor-preview-active p {
  font-size: 16px;
  line-height: 1.8;
  margin: 0 0 16px;
}
.com-markdown-preview ol,
.com-markdown-preview ul,
.editor-preview-active-side ol,
.editor-preview-active-side ul,
.editor-preview-active ol,
.editor-preview-active ul {
  padding-left: 2em;
  margin-bottom: 16px;
  margin-top: 0;
}
.com-markdown-preview ol li,
.com-markdown-preview ul li,
.editor-preview-active-side ol li,
.editor-preview-active-side ul li,
.editor-preview-active ol li,
.editor-preview-active ul li {
  line-height: 1.5;
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
  font-weight: 500;
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
</style>
