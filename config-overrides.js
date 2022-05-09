const path = require("path");

module.exports = {
  paths: function (config, env) {
    config.appPath = path.resolve(__dirname, "src/client");
    config.appIndexJs = path.resolve(__dirname, "src/client/index.js");
    config.appSrc = path.resolve(__dirname, "src/client");
    config.appPublic = path.resolve(__dirname, "src/client/public");
    config.appHtml = path.resolve(__dirname, "src/client/public/index.html");
    config.appBuild = path.resolve(__dirname, "src/client/build");

    return config;
  },
};
