const gulp = require("gulp");

const htmlmin = require("gulp-htmlmin");
//静态文件
gulp.task("copy-html", function(){
    return gulp.src("*.html")
    // .pipe(
    //     htmlmin({
    //         removeEmptyAttributes:true,//移除所有空属性
    //         collapseWhitespace:true,//压缩 html
    //     })
    // )
    .pipe(gulp.dest("dist/"))  
})

gulp.task("images", function(){
    return gulp.src("*.{jpg,png}")
    .pipe(gulp.dest("dist/images"))
    
})

gulp.task("scripts", function(){
    return gulp.src(["*.js", "!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
})

gulp.task("data", function(){
    return gulp.src(["*.json", "!package.json"])
    .pipe(gulp.dest("dist/data"))
})

//静态资源，希望在运行之前，可以先去执行一次，生成到我们的目录文件夹里
gulp.task("build", ["copy-html", "images", "scripts", "data"], function(){
    console.log("项目建立成功");
})

const sass = require("gulp-sass");
const minifycss = require("gulp-minify-css");
const rename = require("gulp-rename");
//如果涉及到重命名，我们要一个任务一个文件
gulp.task("sass", function(){
    return gulp.src("./sass/index.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifycss())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
})
//css
gulp.task("css", function(){
    return gulp.src("./sass/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
})
//监听
gulp.task("watch", function(){
    gulp.watch("*.html", ['copy-html']);
    gulp.watch("*.{jpg,png}", ['images']);
    gulp.watch(["*.js", "!gulpfile.js"], ['scripts']);
    gulp.watch(["*.json", "!package.json"], ['data']);
    gulp.watch("./sass/index.scss",['sass']);
    gulp.watch("./sass/*.scss", ['css']);
})

//启动服务
const connect = require("gulp-connect");
gulp.task("server", function(){
    connect.
    server({
      root: "dist",
      port: 8888,
      livereload: true
    })
  })

  gulp.task("default", ["watch", "server"]);