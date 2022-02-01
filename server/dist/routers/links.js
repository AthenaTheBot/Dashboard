"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../index");
const router = express_1.default.Router();
router.get("/support", (req, res) => {
    res.redirect(index_1.config.links.support);
});
router.get("/invite", (req, res) => {
    res.redirect(index_1.config.links.invite
        .replace("$client_id", index_1.config.auth.clientId)
        .replace("$redirect_uri", index_1.config.auth.redirectUri));
});
exports.default = router;
