"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const loadConfig = (configPath) => {
    try {
        const configFile = fs_1.default.readFileSync(path_1.default.normalize(configPath), "utf-8");
        const config = JSON.parse(configFile);
        return config;
    }
    catch (err) {
        console.error(err);
        return null;
    }
};
exports.default = loadConfig;
