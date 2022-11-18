function drawWatermark(path, option = {}) {
  const { scale = 0.3, wmPath } = option;
  var images = require("images");

  //水印图片
  var watermarkImg = wmPath ? images(wmPath) : images("watermask.png");

  //等待加水印的图片
  var sourceImg = path ? images(path) : images("home.png");

  // 比如放置在右下角，先获取原图的尺寸和水印图片尺寸
  var sWidth = sourceImg.width();
  var sHeight = sourceImg.height();
  const w = sWidth * scale;
  watermarkImg.size(w, w / 2);

  var wmWidth = watermarkImg.width();
  var wmHeight = watermarkImg.height();

  console.log(
    "%c [ drawWatermark ] ==> 16 - app.js",
    "font-size:13px; background:pink; color:#bf2c9f;",
    sWidth,
    sHeight,
    wmWidth,
    wmHeight
  );

  const fileName = path.split("/").pop();

  console.log(
    "fileName",
    `https://arthaskj.github.io/mac_site_images/images/${fileName}`
  );

  //设置绘制的坐标位置，右下角距离 5px
  images(sourceImg)
    .draw(watermarkImg, sWidth - wmWidth - 5, sHeight - wmHeight - 5)

    //保存
    .save(`images/${fileName}`);
}

//侧边栏
const fs = require("fs");
const path = require("path");
function getChildren(path, sort = true) {
  let root = [];
  readDirSync(path, root);
  root.forEach((x) => {
    drawWatermark(__dirname + x);
  });

  return root;
}
function readDirSync(path, root) {
  var pa = fs.readdirSync(path);
  pa.forEach(function (ele, index) {
    var info = fs.statSync(path + "/" + ele);
    if (info.isDirectory()) {
      readDirSync(path + "/" + ele, root);
    } else {
      if (checkFileType(ele)) {
        root.push(prefixPath(path, ele));
      }
    }
  });
}
function checkFileType(path) {
  //"png" | "jpg" | "jpeg" | "gif" | "bmp" | "raw"
  return (
    path.includes(".jpg") ||
    path.includes(".png") ||
    path.includes(".jpeg") ||
    path.includes(".gif")
  );
}
function prefixPath(basePath, dirPath) {
  let index = basePath.indexOf("/");
  // 去除一级目录地址
  basePath = basePath.slice(index, path.length);
  // replace用于处理windows电脑的路径用\表示的问题
  return path.join(basePath, dirPath).replace(/\\/g, "/");
}
// module.exports = { getChildren: getChildren };

getChildren("./demoimgs/");

// drawWatermark("./docs/.vuepress/public/logo.jpg");
// drawWatermark();
// drawWatermark("./docs/.vuepress/public/logo.jpg");

module.exports = drawWatermark;
