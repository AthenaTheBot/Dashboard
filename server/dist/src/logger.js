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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dayjs_1 = __importDefault(require("dayjs"));
const localizedFormat_1 = __importDefault(require("dayjs/plugin/localizedFormat"));
const config_json_1 = __importDefault(require("../config.json"));
dayjs_1.default.extend(localizedFormat_1.default);
const logger = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (config_json_1.default.debug) {
        next();
        return;
    }
    const logFolderPath = path_1.default.join(__dirname, "..", "..", "logs");
    const logFilePath = path_1.default.join(logFolderPath, "requests.log");
    let logData = `[${(0, dayjs_1.default)().format("L LTS")}]:  Client IP: ${req.ip}, Path IP: ${(_a = req.path) === null || _a === void 0 ? void 0 : _a.toString()}`;
    try {
        try {
            yield fs_1.default.accessSync(logFolderPath);
        }
        catch (err) {
            yield fs_1.default.mkdirSync(logFolderPath);
        }
        if (fs_1.default.existsSync(logFilePath)) {
            const logFile = yield fs_1.default.readFileSync(logFilePath, "utf-8");
            if (logFile) {
                logData = logFile.concat("\n", logData);
            }
        }
        yield fs_1.default.writeFileSync(logFilePath, logData, "utf-8");
    }
    catch (err) {
        console.error(err);
    }
    next();
});
exports.default = logger;
