import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import Dashboard from "./Dashboard";
import { Config, LogType } from "./constants";

// Routes
import apiRoute from "./routes/api/index";
import oauthRoute from "./routes/oauth";
import legalDocsRoute from "./routes/legal-docs";
import linksRoute from "./routes/links";

const app = new Dashboard();

app.loadConfig(path.join(__dirname, "..", "config.json"));

if (!app.config) {
  app.log("Config is not loaded properly, exiting process.", LogType.ERROR);
  process.exit(1);
}

const config = app.config as Config;
const server = app.instances.server;
const bot = app.instances.bot;
const cache = app.cache;

// Express app configuration
server.disable("x-powered-by");
server.use(bodyParser.json());
server.use(cookieParser(config.keys.cookieSign));

// Attaching routes to the express app
server.use("/api", apiRoute);
server.use("/oauth", oauthRoute);
server.use("/legal-docs", legalDocsRoute);
server.use("/", linksRoute);

// Serving static files
server.use(
  "/",
  express.static(path.join(__dirname, "..", "..", "client", "build"))
);

// Main route
server.get("/*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "client", "build", "index.html")
  );
});

(async () => {
  try {
    await app.start();

    app.log("Started dashboard.", LogType.SUCCESS);
  } catch (err) {
    app.log("An error occured while starting app.", LogType.ERROR);
  }
})();

export { config, server, bot, cache };
