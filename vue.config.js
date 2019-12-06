const path = require("path"); //引入path模块
function resolve(dir) {
  return path.join(__dirname, dir); //path.join(__dirname)设置绝对路径
}
module.exports = {
  baseUrl: "/",
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("./src"))
      .set("components", resolve("./src/components"));
    //set第一个参数：设置的别名，第二个参数：设置的路径
  },
  pages: {
    // console: {
    //     // 应用入口配置，相当于单页面应用的main.js，必需项
    //     entry: 'src/modules/console/console.js',

    //     // 应用的模版，相当于单页面应用的public/index.html，可选项，省略时默认与模块名一致
    //     template: 'public/console.html',

    //     // 编译后在dist目录的输出文件名，可选项，省略时默认与模块名一致
    //     filename: 'console.html',

    //     // 标题，可选项，一般情况不使用，通常是在路由切换时设置title
    //     // 需要注意的是使用title属性template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //     title: 'console page',

    //     // 包含的模块，可选项
    //     chunks: ['console']
    // },
    // // 只有entry属性时，直接用字符串表示模块入口
    // client: 'src/modules/client/client.js'

    index: {
      entry: "src/modules/index/index.js",
      title: "ACG门户-ACG Door"
    },
    share: {
      entry: "src/modules/share/index.js",
      title: "ACG分享-ACG Share",
      template: "public/index.html"
    },
    about: {
      entry: "src/modules/about/index.js",
      title: "关于ACG-About ACG",
      template: "public/index.html"
    }
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
};
