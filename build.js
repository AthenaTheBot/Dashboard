const fs = require("fs-extra");
const commander = require("commander");
const path = require("path");
const exec = require("child_process").execSync;
const program = new commander.Command();
const colors = require("colors");

colors.enable();

const CLIENT_ROOT_PATH = path.join(__dirname, "client");
const SERVER_ROOT_PATH = path.join(__dirname, "server");
const TARGET_PATH = path.join(__dirname, "..", "Athena-Dashboard-Build");

program.version("1.0.0");
program.log = (message) => {
  console.log(`[${colors.bgCyan("athena-dash-build")}]: ${message?.trim()}`);
};

const buildClient = () => {
  program.log("Starting to build client-side...");

  exec(`yarn client-build`);

  program.log("Successfully built client-side!");
};

const buildServer = () => {
  program.log("Starting to build server-side...");

  exec(`yarn server-build`);

  program.log("Successfully built server-side!");
};

const placeBuildFiles = () => {
  program.log("Placing build files to a clean directory.");

  fs.ensureDirSync(TARGET_PATH);

  fs.copySync(
    path.join(CLIENT_ROOT_PATH, "build"),
    path.join(TARGET_PATH, "client", "build")
  );

  fs.copySync(
    path.join(SERVER_ROOT_PATH, "dist"),
    path.join(TARGET_PATH, "server", "dist")
  );

  fs.copySync(
    path.join(SERVER_ROOT_PATH, "data"),
    path.join(TARGET_PATH, "server", "data")
  );

  fs.copySync(
    path.join(SERVER_ROOT_PATH, "keys"),
    path.join(TARGET_PATH, "server", "keys")
  );

  fs.copySync(
    path.join(SERVER_ROOT_PATH, "config.build.json"),
    path.join(TARGET_PATH, "server", "config.json")
  );

  fs.copySync(
    path.join(__dirname, "package.json"),
    path.join(TARGET_PATH, "package.json")
  );

  fs.copySync(
    path.join(__dirname, "yarn.lock"),
    path.join(TARGET_PATH, "yarn.lock")
  );

  program.log("Successfully placed all build files.");
};

program
  .command("build")
  .description(
    "Builds both client and server side and places build files into a clean folder."
  )
  .action((args) => {
    buildClient();
    buildServer();
    placeBuildFiles();
  });

program.parse();
