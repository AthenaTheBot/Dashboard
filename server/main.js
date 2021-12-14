const http = require("http");
const https = require("https");
const path = require("path");
const fs = require("fs");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();

const httpPort = process.env.DEBUG === "true" ? process.env.DEBUG_PORT : 80;
const httpsPort = process.env.DEBUG === "true" ? null : 443;

const httpsOptions = {
  cert: fs.readFileSync(path.join(__dirname, "certs", "cert.pem")),
  ca: fs.readFileSync(path.join(__dirname, "certs", "chain.pem")),
  key: fs.readFileSync(path.join(__dirname, "certs", "privkey.pem")),
};

const app = express();
const httpServer = http.createServer(
  process.env.DEBUG === "true"
    ? app
    : (req, res) => {
        res.writeHead(301, {
          Location: "https://" + req.headers["host"] + req.url,
        });
        res.end();
      }
);
const httpsServer = https.createServer(httpsOptions, app);

// Configuration
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "client", "build")));

app.get("/support", (req, res) => {
  res.redirect("https://discord.com/invite/etsgB9J");
});

app.get("/invite", (req, res) => {
  res.redirect(
    process.env.INVITE_LINK.replace(
      "$REDIRECTURI",
      process.env.REDIRECT_URI
    ).replace("$CLIENTID", process.env.CLIENT_ID)
  );
});

// Oauth Route
const oauthRoute = require("./routers/oauth");
oauthRoute.sj = true;
app.use("/oauth", oauthRoute);

// Api Route
const apiRoute = require("./routers/api");
app.use("/api", apiRoute);

// Main Route
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

try {
  httpServer.listen(httpPort);
  if (process.env.DEBUG !== "true") httpsServer.listen(httpsPort);
} catch (err) {
  return console.log(err);
}

console.log(
  `Web server has been started successfully! HTTP Port: \x1b[32m${httpPort}\x1b[0m | HTTPS Port: \x1b[32m${
    httpsPort ? httpsPort : "None"
  }\x1b[0m`
);
