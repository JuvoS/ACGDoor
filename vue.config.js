const path = require("path"); //引入path模块
function resolve(dir) {
  return path.join(__dirname, dir); //path.join(__dirname)设置绝对路径
}
module.exports = {
  publicPath: "/",
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
    book: {
      entry: "src/modules/book/index.js",
      title: "ACG书乡-ACG Book",
      template: "public/index.html"
    },
    cssanim: {
      entry: "src/modules/cssanim/index.js",
      title: "ACG书乡-ACG CSS Anim",
      template: "public/index.html"
    },
    model: {
      entry: "src/modules/model/index.js",
      title: "ACG书乡-ACG Model",
      template: "public/index.html"
    }
  },
  devServer: {
    host: "localhost",
    port: 7466,
    https: false,
    hotOnly: false,
    proxy: null // 设置代理
    // before: app => {}
  },
  // 第三方插件配置
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'sass',
      patterns: [
        'D:\\JuvoS\\work\\codeLab\\binsh\\ACGDoor\\src\\assets\\variable.less'
      ]
    }
  }
};
