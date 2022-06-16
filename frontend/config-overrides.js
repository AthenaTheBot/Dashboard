const path = require("path");

module.exports = {
  paths: function (config, env) {
    config.appPath = path.resolve(__dirname, "src/client");
    config.appIndexJs = path.resolve(__dirname, "src/index.js");
    config.appSrc = path.resolve(__dirname, "");
    config.appPublic = path.resolve(__dirname, "public");
    config.appHtml = path.resolve(__dirname, "public/index.html");
    config.appBuild = path.resolve(__dirname, "build");

    return config;
  },
};
