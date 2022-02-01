"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.botClient = exports.app = exports.config = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const mongoose_1 = __importDefault(require("mongoose"));
const colors_1 = __importDefault(require("colors"));
const discord_js_1 = require("discord.js");
const config_loader_1 = __importDefault(require("./utils/config-loader"));
const config = (0, config_loader_1.default)(path_1.default.join(__dirname, "..", "config.json"));
exports.config = config;
if (!config) {
    console.log("An error occured while loading config file, exiting process.");
    process.exit(1);
}
const api_1 = __importDefault(require("./routers/api"));
const oauth_1 = __importDefault(require("./routers/oauth"));
const links_1 = __importDefault(require("./routers/links"));
const legal_docs_1 = __importDefault(require("./routers/legal-docs"));
const logger_1 = __importDefault(require("./utils/logger"));
colors_1.default.enable();
const app = (0, express_1.default)();
exports.app = app;
const botClient = new discord_js_1.Client({ intents: [discord_js_1.Intents.FLAGS.GUILDS] });
exports.botClient = botClient;
botClient.login(config.auth.botToken);
botClient.on("ready", () => {
    console.log("Discord application has initalized!");
});
const httpserver = http_1.default.createServer(config.debug
    ? app
    : (req, res) => {
        res
            .writeHead(302, {
            Location: "https://" + req.headers["host"] + req.url,
        })
            .end();
    });
const httpsserver = https_1.default.createServer({
    cert: fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "certs", "cert.pem")),
    ca: fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "certs", "chain.pem")),
    key: fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "certs", "privkey.pem")),
}, app);
const httpPort = config.debug ? config.debugPort : 80;
const httpsPort = config.debug ? null : 443;
try {
    httpserver.listen(config.debug ? config.debugPort : 80);
    if (httpsPort) {
        httpsserver.listen(httpsPort);
    }
    console.log(`Athena Dashboard has successfully started!\nHTTP Port: ${colors_1.default.green(httpPort.toString())}\nHTTPS Port: ${colors_1.default.green(httpsPort ? httpsPort === null || httpsPort === void 0 ? void 0 : httpsPort.toString() : "None")}`);
}
catch (err) {
    console.error(err);
}
try {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connect(config.dbUrl);
        console.log(`Successfully connected to the database server!\nDatabase URL: ${colors_1.default.green(config.dbUrl)}`);
    }))();
}
catch (err) {
    console.error(err);
}
app.disable("x-powered-by");
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)(config.keys.cookieSign));
app.use(logger_1.default);
app.use("/api", api_1.default);
app.use("/oauth", oauth_1.default);
app.use("/legal-docs", legal_docs_1.default);
app.use("/", links_1.default);
app.use("/", express_1.default.static(path_1.default.join(__dirname, "..", "..", "client", "build")));
app.get("/*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "..", "..", "client", "build", "index.html"));
});
