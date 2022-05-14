import http from "http";
import https from "https";
import fs from "fs";
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import Dashboard from "./Dashboard";
import { Config, LogType } from "./constants";
import colors from "colors";
import responseHandler from "./middlewares/responseHandler";
import rateLimiter from "./middlewares/rateLimiter";
import redirectDns from "./middlewares/redirectDns";

const app = new Dashboard();

app.loadConfig(path.join(__dirname, "..", "..", "..", "config.json"));

if (!app.config) {
  app.log("Config is not loaded properly, exiting process.", LogType.ERROR);
  process.exit(1);
}

const config = app.config as Config;
const server = app.instances.server;
const bot = app.instances.bot;
const cache = app.cache;

// eslint-disable-next-line
import apiRoute from "./routes/api/index";
// eslint-disable-next-line
import oauthRoute from "./routes/oauth";
// eslint-disable-next-line
import legalDocsRoute from "./routes/legalDocs";
// eslint-disable-next-line
import linksRoute from "./routes/links";

// Express app configuration
server.disable("x-powered-by");
server.use(rateLimiter);
server.use(redirectDns);
server.use(compression());
server.use(bodyParser.json());
server.use(cookieParser(config.keys.cookieSign));
server.use(responseHandler);

// Attaching routes to the express app
server.use("/api", apiRoute);
server.use("/oauth", oauthRoute);
server.use("/legalDocs", legalDocsRoute);
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

let keys: https.ServerOptions | null = null;
if (!config.debug) {
  try {
    const keysPath = path.join(__dirname, "..", "..", "keys");
    keys = {
      key: fs.readFileSync(path.join(keysPath, "privkey.pem"), "utf-8"),
      cert: fs.readFileSync(path.join(keysPath, "cert.pem"), "utf-8"),
      ca: fs.readFileSync(path.join(keysPath, "chain.pem"), "utf-8"),
    };
  } catch (err) {
    app.log(
      "SSL files are not placed properly, exiting process.",
      LogType.ERROR
    );
    process.exit(1);
  }
}

const httpServer = http.createServer(
  app.config.debug
    ? app.instances.server
    : (app.reditectToHTTPS as express.Express)
);
const httpsServer = https.createServer(keys as any, app.instances.server);

(async () => {
  try {
    await app.start();

    httpServer.listen(app.serverPorts.http);
    if (app.serverPorts.https) httpsServer.listen(app.serverPorts.https);

    app.log(
      `HTTP servers has been started. Ports:  (HTTP: ${colors.green(
        app.serverPorts.http as any
      )}), (HTTPS: ${colors.green(app.serverPorts.https as any)})`,
      LogType.SUCCESS
    );

    app.log("Started dashboard.", LogType.SUCCESS);
  } catch (err) {
    app.log("An error occured while starting app.", LogType.ERROR);
  }
})();

export { config, server, bot, cache };