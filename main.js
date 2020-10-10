console.log("加载成功");

//配置我们要引入的模块的路径 jquery 遵从AMD规范， parabola.js不支持AMD规范
require.config({
  paths: {
    jquery: "./jquery-1.11.3",
    "jquery-cookie": "./jquery.cookie",
    index: "./index"
  },
  //jquery-cookie 依赖于jquery
  shim: {
    //设置依赖关系
    "jquery-cookie": ["jquery"],
    //某一个模块，不遵从AMD
  }
})
//调用首页的代码
require(["index"], function(index){
  // index.body();
  index.body();
  // shopping.shopping();

})

