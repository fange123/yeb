let proxyObj = {};
proxyObj["/"] = {
  ws: false,
  target: "http://localhost:8080",
  changeOrigin: true,
  //不要重写请求地址
  pathReWrite: {
    "^/": "/",
  },
};
module.exports = {
  devServer: {
    host: "localhost",
    port: 8080,
    proxy: proxyObj,
  },
};
