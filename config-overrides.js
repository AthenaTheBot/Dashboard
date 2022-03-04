const path = require("path");

module.exports = {
  paths: function (config, env) {
    config.appPath = path.resolve(__dirname, "client");
    config.appIndexJs = path.resolve(__dirname, "client/src/index.js");
    config.appSrc = path.resolve(__dirname, "client/src");
    config.appPublic = path.resolve(__dirname, "client/public");
    config.appHtml = path.resolve(__dirname, "client/public/index.html");
    config.appTsConfig = path.resolve(__dirname, "client/tsconfig.json");
    config.appBuild = path.resolve(__dirname, "client/build");

    return config;
  },
};
