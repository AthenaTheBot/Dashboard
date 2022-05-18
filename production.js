const fs = require("fs-extra");
const path = require("path");
const exec = require("child_process").execSync;
const colors = require("colors");

colors.enable();

const CLIENT_ROOT_PATH = path.join(__dirname, "src", "client");
const SERVER_ROOT_PATH = path.join(__dirname, "src", "server");
const TARGET_PATH = path.join(__dirname, "..", "Athena-Dashboard-Build");

const log = (message) => {
  console.log(`[${colors.bgCyan("athena-dash-build")}]: ${message?.trim()}`);
};

const buildClient = () => {
  log("Starting to build client-side...");

  exec(`yarn client-build`);

  log("Successfully built client-side!");
};

const buildServer = () => {
  log("Starting to build server-side...");

  exec(`yarn server-build`);

  log("Successfully built server-side!");
};

const placeBuildFiles = () => {
  log("Placing build files to a clean directory.");

  fs.ensureDirSync(TARGET_PATH);

  fs.copySync(
    path.join(CLIENT_ROOT_PATH, "build"),
    path.join(TARGET_PATH, "src", "client", "build")
  );

  fs.copySync(
    path.join(SERVER_ROOT_PATH, "dist"),
    path.join(TARGET_PATH, "src", "server", "dist")
  );

  fs.copySync("data", path.join(TARGET_PATH, "data"));

  fs.copySync("keys", path.join(TARGET_PATH, "keys"));

  fs.copySync("config.build.json", path.join(TARGET_PATH, "config.json"));

  fs.copySync(
    path.join(__dirname, "package.json"),
    path.join(TARGET_PATH, "package.json")
  );

  fs.copySync(
    path.join(__dirname, "yarn.lock"),
    path.join(TARGET_PATH, "yarn.lock")
  );

  log("Successfully placed all build files.");
};

(() => {
  buildClient();
  buildServer();
  placeBuildFiles();
})();
