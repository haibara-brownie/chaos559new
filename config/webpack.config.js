const path = require("path");
const package = require("../package.json");

const localTheme = {
  default: require("./themes/dark.js"),
  zyxa: require("./themes/zyxa.js"),
};

const theme = process.env.THEME || "default";

const modifyVars = localTheme[theme];
module.exports = {
  debugIe: false, // 是否在ie下调试(关闭热更新)
  useSwc: false, // 默认true，改为false，将loader调整为babel-loader
  isCombinePortal: true, // 是否开启对接portal的配置
  publicPath: `/docp/${package.packageName}/`,
  useMultipleTheme: false, // 是否开启多主题
  modifyVars, // 非多主题下样式变量
  htmlTagsPlugin: (config) => {
    config.tags = ["conf/env-config.js"];
    return config;
  },
  definePlugin: (config) => {
    config["process.env.NODE_ENV"] = JSON.stringify(process.env.NODE_ENV);
    return config;
  },
  devServer: (config) => {
    config.port = 8800;
    config.client = {
      overlay: {
        errors: false,
        warnings: false,
      },
    };
    config.proxy = [
      {
        context: ["/gateway/local"],
        target: "http://localhost:8098",
        changeOrigin: true,
        pathRewrite: {
          "^/gateway/local": "",
        }
      },
      {
        context: ["/docp/gateway", "/gateway", "/api", "/docp/douc", "/douc"],
        // target: "http://10.0.12.137:18080",
        target: "http://10.102.3.51:18080",
        changeOrigin: true,
      },
    ];
    return config;
  },
};
