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
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
const config_json_1 = __importDefault(require("../../config.json"));
const index_1 = require("../index");
const discord_js_1 = require("discord.js");
const router = express_1.default.Router();
let commandsCache = [];
let users = new Map();
const getCurrentUser = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serverRes = yield axios_1.default.get(config_json_1.default.oauthEndpoints.getCurrentUser, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return serverRes.data;
    }
    catch (err) {
        console.log(err);
        return null;
    }
});
const getCurrentUserGuilds = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serverRes = yield axios_1.default.get(config_json_1.default.oauthEndpoints.getCurrentUserGuilds, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return serverRes.data;
    }
    catch (err) {
        console.log(err);
        return null;
    }
});
const convertGuildPermissions = (guild) => {
    const permissions = new discord_js_1.Permissions(guild.permissions_new).toArray();
    return permissions;
};
const checkGuildAvailability = (guildId) => {
    return index_1.botClient.guilds.cache.get(guildId) ? true : false;
};
const capitalizeText = (text) => {
    const firstLetter = text.slice(0, 1).toUpperCase();
    const restText = text.slice(1, text.length);
    return firstLetter + restText;
};
router.get("/commands", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!commandsCache || commandsCache.length == 0) {
        try {
            const commands = JSON.parse(yield fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "..", "..", "data", "commands.json"), "utf-8"));
            const categories = [];
            for (var i = 0; i < commands.length; i++) {
                const categorySeen = categories.filter((x) => x.category == capitalizeText(commands[i].category)).length == 0
                    ? false
                    : true;
                if (categorySeen) {
                    (_b = (_a = categories
                        .find((x) => x.category == capitalizeText(commands[i].category))) === null || _a === void 0 ? void 0 : _a.commands) === null || _b === void 0 ? void 0 : _b.push(commands[i]);
                }
                else {
                    categories.push({
                        category: capitalizeText(commands[i].category),
                        commands: [commands[i]],
                    });
                }
            }
            commandsCache = categories;
        }
        catch (err) {
            res.status(500).json({ status: 500, message: "Server Error" }).end();
            console.log(err);
            return;
        }
    }
    res.status(200).json(commandsCache).end();
}));
router.get("/users/@me", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const session = (_c = req.signedCookies) === null || _c === void 0 ? void 0 : _c.session;
    if (!session)
        return res.status(400).json({ message: "Bad Request" }).end();
    const cache = users.get(session);
    if (cache)
        return res.status(200).json(cache).end();
    const user = yield getCurrentUser(session);
    if (!user)
        return res.status(500).json({ message: "Server Error" }).end();
    res.status(200).json(user).end();
    users.set(session, user);
    setTimeout(() => {
        users.delete(session);
    }, 1000 * 60 * config_json_1.default.cacheTimeouts.users);
}));
router.get("/users/@me/guilds", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const session = (_d = req.signedCookies) === null || _d === void 0 ? void 0 : _d.session;
    if (!session)
        return res.status(400).json({ message: "Bad Request" }).end();
    const guilds = yield getCurrentUserGuilds(session);
    if (!guilds || !Array.isArray(guilds))
        return res.status(500).json({ message: "Server Error" }).end();
    for (var i = 0; i < guilds.length; i++) {
        guilds[i].permissions = convertGuildPermissions(guilds[i]);
        Object.assign(guilds[i], {
            available: checkGuildAvailability(guilds[i].id),
        });
        if (guilds[i].icon) {
            guilds[i].icon = `https://cdn.discordapp.com/icons/${guilds[i].id}/${guilds[i].icon}`;
        }
    }
    const manageableGuilds = guilds.filter((x) => x.permissions.includes("ADMINISTRATOR") ||
        x.permissions.includes("MANAGE_GUILD"));
    return res.status(200).json(manageableGuilds).end();
}));
router.get("/*", (req, res) => {
    res.status(400).json({ message: "Bad Request" }).end();
});
exports.default = router;
