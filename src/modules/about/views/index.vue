<template>
  <div class="com-markdown-preview">
    <h3>关于 ACG 中文社区</h3>
    <p>
      ACG 中文社区，由一批热爱
      ACG的工程师/设计师发起，目前已经吸引了互联网各个公司的专业技术人员加入。ACG
      的开发已经日渐完善，可以开始用 ACG 尝试一些小工具。 目前 ACG
      的生态以及社区还不完善。特别是国内交流社区更是寥寥无几，如果各位身边有对
      ACG 感兴趣的，可以拉进群里。 同时，ACG 中文社区网站，大家可以多分享交流。
    </p>
    <h3>社区参与须知</h3>
    <p>
      ACG 中文社区还有很多工作要做。 不论你对 ACG
      了解程度如何，都可以有不同的参与方式。
    </p>
    <ul>
      <li>1.你希望什么功能或者特性，可以提 feature issue</li>
      <li>
        2.你对 ACG 感兴趣并且有一定程度的了解，可以尝试 ACG-china/website API
        项目。
      </li>
      <li>
        3.你对 ACG 还不够了解，但对前端比较熟悉，你可以参与 ACG-china/website-fe
        前端部分。
      </li>
      <li>
        4.你有比较好的文字组织能力，可以撰写 getting start 和 about 相关的内容。
      </li>
      <li>
        5.你有比较好的站长资源，可以帮助网站交换链接 备注：website 和 website-fe
        参与时，先在 issue 品论区 take 这个任务。
      </li>
    </ul>
    <h3>学习资料</h3>
    <ul>
      <li>
        <a href="https://github.com/JuvoS/ACGDoor"
          >https://github.com/JuvoS/ACGDoor</a
        >
      </li>
    </ul>
    <h3>免责声明</h3>
    <p>注意：社区发表的文章仅代表作者个人观点，与本站无关。</p>
  </div>
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
