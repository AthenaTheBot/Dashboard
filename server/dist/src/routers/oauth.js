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
const axios_1 = __importDefault(require("axios"));
const config_json_1 = __importDefault(require("../../config.json"));
const router = express_1.default.Router();
const exchangeToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serverRes = yield (0, axios_1.default)({
            url: config_json_1.default.oauthEndpoints.tokenExchange,
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: `grant_type=authorization_code&client_id=${config_json_1.default.auth.clientId}&client_id=${config_json_1.default.auth.clientId}&client_secret=${config_json_1.default.auth.clientSecret}&redirect_uri=${config_json_1.default.auth.redirectUri}&code=${token}`,
        });
        return serverRes.data;
    }
    catch (err) {
        console.log(err);
        return null;
    }
});
router.get("/login", (req, res) => {
    const parsedLink = config_json_1.default.links.login
        .replace("$client_id", config_json_1.default.auth.clientId)
        .replace("$redirect_uri", config_json_1.default.auth.redirectUri);
    res.redirect(parsedLink);
});
router.get("/logout", (req, res) => {
    res.clearCookie("session");
    res.redirect("/");
});
router.get("/callback", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.code)
        return res.redirect("/error");
    const auth = yield exchangeToken(req.query.code.toString());
    if (!(auth === null || auth === void 0 ? void 0 : auth.access_token) || !(auth === null || auth === void 0 ? void 0 : auth.expires_in))
        return res.redirect("/error");
    res.cookie("session", auth.access_token, {
        maxAge: auth.expires_in * 1000 - 1000 * 60 * 60 * 2,
        signed: true,
    });
    res.redirect("/");
}));
exports.default = router;
