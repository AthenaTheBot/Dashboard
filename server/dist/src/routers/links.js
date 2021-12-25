"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_json_1 = __importDefault(require("../../config.json"));
const router = express_1.default.Router();
router.get("/support", (req, res) => {
    res.redirect(config_json_1.default.links.support);
});
router.get("/invite", (req, res) => {
    res.redirect(config_json_1.default.links.invite
        .replace("$client_id", config_json_1.default.auth.clientId)
        .replace("$redirect_uri", config_json_1.default.auth.redirectUri));
});
exports.default = router;
