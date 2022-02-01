// Modules
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import http from "http";
import https from "https";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";
import colors from "colors";
import { Client, Intents } from "discord.js";
import { Config } from "./constants";

// Config loader util script
import loadConfig from "./utils/config-loader";

const config = loadConfig(path.join(__dirname, "..", "config.json")) as Config;

if (!config) {
  console.log("An error occured while loading config file, exiting process.");
  process.exit(1);
}

// Routers
import apiRouter from "./routers/api";
import oauthRouter from "./routers/oauth";
import linksRouter from "./routers/links";
import legalDocs from "./routers/legal-docs";

// Logger middleware
import logger from "./utils/logger";

// Enabling colors
colors.enable();

// Creating app instance
const app = express();

// Creating bot instance
const botClient = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Loggining to application
botClient.login(config.auth.botToken);

// Event
botClient.on("ready", () => {
  console.log("Discord application has initalized!");
});

// Creating http and https servers
const httpserver = http.createServer(
  config.debug
    ? app
    : (req, res) => {
        res
          .writeHead(302, {
            Location: "https://" + req.headers["host"] + req.url,
          })
          .end();
      }
);
const httpsserver = https.createServer(
  {
    cert: fs.readFileSync(path.join(__dirname, "..", "certs", "cert.pem")),
    ca: fs.readFileSync(path.join(__dirname, "..", "certs", "chain.pem")),
    key: fs.readFileSync(path.join(__dirname, "..", "certs", "privkey.pem")),
  },
  app
);

// Ports
const httpPort = config.debug ? config.debugPort : 80;
const httpsPort = config.debug ? null : 443;

// Stating http and https servers
try {
  httpserver.listen(config.debug ? config.debugPort : 80);
  if (httpsPort) {
    httpsserver.listen(httpsPort);
  }

  console.log(
    `Athena Dashboard has successfully started!\nHTTP Port: ${colors.green(
      httpPort.toString()
    )}\nHTTPS Port: ${colors.green(httpsPort ? httpsPort?.toString() : "None")}`
  );
} catch (err) {
  console.error(err);
}

// Initializing database connection
try {
  (async () => {
    await mongoose.connect(config.dbUrl);

    console.log(
      `Successfully connected to the database server!\nDatabase URL: ${colors.green(
        config.dbUrl
      )}`
    );
  })();
} catch (err) {
  console.error(err);
}

// Express configuration
app.disable("x-powered-by");
app.use(bodyParser.json());
app.use(cookieParser(config.keys.cookieSign));

// Attaching logger middleware
app.use(logger);

// Attaching routers
app.use("/api", apiRouter);
app.use("/oauth", oauthRouter);
app.use("/legal-docs", legalDocs);
app.use("/", linksRouter);

// Serving static files
app.use(
  "/",
  express.static(path.join(__dirname, "..", "..", "client", "build"))
);

// Main route
app.get("/*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "client", "build", "index.html")
  );
});

export { config, app, botClient };
