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
const mongoose_1 = __importDefault(require("mongoose"));
const config_json_1 = __importDefault(require("../../config.json"));
const index_1 = require("../index");
const discord_js_1 = require("discord.js");
const dayjs_1 = __importDefault(require("dayjs"));
const router = express_1.default.Router();
let commandsCache = [];
let users = new Map();
let userGuilds = new Map();
const getCurrentUser = (accessToken, force) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const cachedUser = users.get(accessToken);
    if (!force && cachedUser)
        return cachedUser;
    try {
        const serverRes = yield axios_1.default.get(config_json_1.default.oauthEndpoints.getCurrentUser, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        users.set(accessToken, serverRes.data);
        setTimeout(() => {
            users.delete(accessToken);
        }, config_json_1.default.cacheTimeouts.users * 60 * 1000);
        return serverRes.data;
    }
    catch (err) {
        if (!((_a = err === null || err === void 0 ? void 0 : err.data) === null || _a === void 0 ? void 0 : _a.retry_after)) {
            console.log(err);
        }
        return null;
    }
});
const getCurrentUserGuilds = (accessToken, returnManageable, force) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const cachedUserGuilds = userGuilds.get(accessToken);
    if (!force && cachedUserGuilds) {
        if (returnManageable)
            return cachedUserGuilds.filter((x) => x.permissions.includes("ADMINISTRATOR") ||
                x.permissions.includes("MANAGE_GUILD"));
        else {
            return cachedUserGuilds;
        }
    }
    try {
        const serverRes = yield axios_1.default.get(config_json_1.default.oauthEndpoints.getCurrentUserGuilds, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const guilds = serverRes.data;
        for (var i = 0; i < guilds.length; i++) {
            guilds[i].permissions = convertGuildPermissions(guilds[i]);
            Object.assign(guilds[i], {
                available: checkGuildAvailability(guilds[i].id),
            });
            if (guilds[i].icon) {
                guilds[i].icon = `https://cdn.discordapp.com/icons/${guilds[i].id}/${guilds[i].icon}`;
            }
        }
        userGuilds.set(accessToken, guilds);
        setTimeout(() => {
            userGuilds.delete(accessToken);
        }, config_json_1.default.cacheTimeouts.userGuilds * 60 * 1000);
        if (returnManageable)
            return guilds.filter((x) => x.permissions.includes("ADMINISTRATOR") ||
                x.permissions.includes("MANAGE_GUILD"));
        else
            return guilds;
    }
    catch (err) {
        if (!((_b = err === null || err === void 0 ? void 0 : err.data) === null || _b === void 0 ? void 0 : _b.retry_after)) {
            console.log(err);
        }
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
    var _c, _d;
    if (!commandsCache || commandsCache.length == 0) {
        try {
            const commands = JSON.parse(yield fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "..", "..", "data", "commands.json"), "utf-8"));
            const categories = [];
            for (var i = 0; i < commands.length; i++) {
                const categorySeen = categories.filter((x) => x.category == capitalizeText(commands[i].category)).length == 0
                    ? false
                    : true;
                if (categorySeen) {
                    (_d = (_c = categories
                        .find((x) => x.category == capitalizeText(commands[i].category))) === null || _c === void 0 ? void 0 : _c.commands) === null || _d === void 0 ? void 0 : _d.push(commands[i]);
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
    var _e;
    const session = (_e = req.signedCookies) === null || _e === void 0 ? void 0 : _e.session;
    if (!session)
        return res.status(400).json({ message: "Bad Request" }).end();
    const user = yield getCurrentUser(session, false);
    if (!user)
        return res.status(500).json({ message: "Server Error" }).end();
    res.status(200).json(user).end();
}));
router.get("/users/@me/guilds", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const session = (_f = req.signedCookies) === null || _f === void 0 ? void 0 : _f.session;
    if (!session)
        return res.status(400).json({ message: "Bad Request" }).end();
    const guilds = yield getCurrentUserGuilds(session, true, false);
    if (!guilds || !Array.isArray(guilds))
        return res.status(500).json({ message: "Server Error" }).end();
    return res.status(200).json(guilds).end();
}));
router.get("/guilds/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    const session = (_g = req.signedCookies) === null || _g === void 0 ? void 0 : _g.session;
    if (!session)
        return res.status(400).json({ message: "Bad Request" }).end();
    const guilds = yield getCurrentUserGuilds(session, true, false);
    const guild = guilds === null || guilds === void 0 ? void 0 : guilds.find((x) => x.id === req.params.id);
    if (!guild)
        return res.status(400).json({ message: "Unauthorized" }).end();
    if (!mongoose_1.default.connection)
        return res.status(500).json({ message: "Server Error" }).end();
    const guildData = (yield mongoose_1.default.connection
        .collection("guilds")
        .findOne({ _id: guild.id })
        .catch((err) => null));
    if (!guildData)
        return res.status(500).json({ message: "Server Error" }).end();
    delete guildData._id;
    delete guildData.lastUpdated;
    const extraGuildData = yield index_1.botClient.guilds.cache.get(guild.id);
    Object.assign(guild, {
        members: extraGuildData === null || extraGuildData === void 0 ? void 0 : extraGuildData.memberCount,
        channels: {
            text: extraGuildData === null || extraGuildData === void 0 ? void 0 : extraGuildData.channels.cache.filter((x) => x.type == "GUILD_TEXT").size,
            voice: extraGuildData === null || extraGuildData === void 0 ? void 0 : extraGuildData.channels.cache.filter((x) => x.type == "GUILD_VOICE").size,
        },
        roles: extraGuildData === null || extraGuildData === void 0 ? void 0 : extraGuildData.roles.cache.size,
        createdAt: dayjs_1.default.unix(extraGuildData === null || extraGuildData === void 0 ? void 0 : extraGuildData.createdTimestamp).toString()
    });
    return res.status(200).json(Object.assign(Object.assign({}, guild), guildData));
}));
router.get("/*", (req, res) => {
    res.status(400).json({ message: "Bad Request" }).end();
});
exports.default = router;
