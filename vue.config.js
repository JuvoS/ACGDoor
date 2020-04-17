const path = require("path"); //引入path模块
function resolve(dir) {
  return path.join(__dirname, dir); //path.join(__dirname)设置绝对路径
}
module.exports = {
  publicPath: "/",
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("./src"))
      .set("components", resolve("./src/components"));
    //set第一个参数：设置的别名，第二个参数：设置的路径

    config.module
      .rule("pug")
      .test(/\.pug$/)
      .use("pug-html-loader")
      .loader("pug-html-loader")
      .end();
  },
  pages: {
    index: {
      entry: "src/modules/index/index.js",
      title: "简历-JuvoS(前端/设计师/插画师)",
    },
    work: {
      entry: "src/modules/work/index.js",
      title: "Works by JuvoS",
    },
    demos: {
      entry: "src/modules/demos/index.js",
      title: "Demos by JuvoS",
    },
    about: {
      entry: "src/modules/about/index.js",
      title: "简历-联系JuvoS(前端/设计师/插画师)",
      template: "public/index.html",
    },
  },
  devServer: {
    host: "localhost",
    port: 8866,
    https: false,
    hotOnly: false,
    proxy: null, // 设置代理
    // before: app => {}
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
    "style-resources-loader": {
      preProcessor: "sass",
      patterns: [],
    },
  },
};
