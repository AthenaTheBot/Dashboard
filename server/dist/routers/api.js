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
const index_1 = require("../index");
const discord_js_1 = require("discord.js");
const Guild_1 = __importDefault(require("../models/Guild"));
const dayjs_1 = __importDefault(require("dayjs"));
const localizedFormat_1 = __importDefault(require("dayjs/plugin/localizedFormat"));
dayjs_1.default.extend(localizedFormat_1.default);
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
        const serverRes = yield axios_1.default.get(index_1.config.oauthEndpoints.getCurrentUser, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        users.set(accessToken, serverRes.data);
        setTimeout(() => {
            users.delete(accessToken);
        }, index_1.config.cacheTimeouts.users * 60 * 1000);
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
        const serverRes = yield axios_1.default.get(index_1.config.oauthEndpoints.getCurrentUserGuilds, {
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
        }, index_1.config.cacheTimeouts.userGuilds * 60 * 1000);
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
            const commands = JSON.parse(yield fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "..", "data", "commands.json"), "utf-8"));
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
    let guildData = yield Guild_1.default.findById(guild.id).catch((err) => null);
    if (!guildData) {
        guildData = yield Guild_1.default.create({
            _id: guild.id,
            settings: {
                premium: false,
                prefix: "at!",
                language: "en-US",
            },
            modules: {
                moderationModule: {
                    adminRole: null,
                    modRole: null,
                    warnings: [],
                },
                funModule: {},
                utilsModule: {},
            },
            lastUpdated: (0, dayjs_1.default)().format("L LT"),
        });
    }
    delete guildData._doc._id;
    delete guildData._doc.lastUpdated;
    const extraGuildData = yield index_1.botClient.guilds.cache.get(guild.id);
    Object.assign(guild, {
        members: extraGuildData === null || extraGuildData === void 0 ? void 0 : extraGuildData.memberCount,
        channels: {
            text: extraGuildData === null || extraGuildData === void 0 ? void 0 : extraGuildData.channels.cache.filter((x) => x.type == "GUILD_TEXT").size,
            voice: extraGuildData === null || extraGuildData === void 0 ? void 0 : extraGuildData.channels.cache.filter((x) => x.type == "GUILD_VOICE").size,
        },
        roles: extraGuildData === null || extraGuildData === void 0 ? void 0 : extraGuildData.roles.cache.size,
        createdAt: (0, dayjs_1.default)(extraGuildData === null || extraGuildData === void 0 ? void 0 : extraGuildData.createdAt).format("L LTS"),
    });
    return res.status(200).json(Object.assign(Object.assign({}, guild), guildData._doc));
}));
router.post("/guilds/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    const session = (_h = req.signedCookies) === null || _h === void 0 ? void 0 : _h.session;
    if (!session)
        return res.status(400).json({ message: "Bad Request" }).end();
    const guilds = yield getCurrentUserGuilds(session, true, false);
    const guild = guilds === null || guilds === void 0 ? void 0 : guilds.find((x) => x.id === req.params.id);
    if (!guild)
        return res.status(400).json({ message: "Unauthorized" }).end();
    try {
        const guildData = (yield mongoose_1.default.connection
            .collection("guilds")
            .findOne({ _id: req.params.id })
            .catch((err) => null));
        if (!guildData)
            return res.status(500).json({ message: "Server Error" }).end();
        if (req.body.prefix)
            mongoose_1.default.connection
                .collection("guilds")
                .updateOne({ _id: req.params.id }, { $set: { "settings.prefix": req.body.prefix } });
        if (req.body.language)
            mongoose_1.default.connection
                .collection("guilds")
                .updateOne({ _id: req.params.id }, { $set: { "settings.language": req.body.language } });
    }
    catch (err) {
        return res.status(500).json({ message: "Server Error" }).end();
    }
    res.status(200).json({ successfull: true }).end();
}));
router.get("/*", (req, res) => {
    res.status(400).json({ message: "Bad Request" }).end();
});
exports.default = router;