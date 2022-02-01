"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const GuildSchema = new mongoose_1.default.Schema({
    _id: String,
    settings: {
        premium: Boolean,
        prefix: String,
        language: String,
    },
    modules: {
        moderationModule: {
            adminRole: String || null,
            modRole: String || null,
            warnings: Array,
        },
        funModule: Object,
        utilsModule: Object,
    },
    lastUpdated: String,
}, { versionKey: false });
const GuildModel = mongoose_1.default.model("Guild", GuildSchema);
exports.default = GuildModel;
