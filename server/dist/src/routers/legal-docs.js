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
const router = express_1.default.Router();
router.get("/:doc", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const legalDocsPath = path_1.default.join(__dirname, "..", "..", "..", "data", "legal-docs");
    const availableDocs = fs_1.default
        .readdirSync(legalDocsPath)
        .filter((file) => file.endsWith(".md"));
    if (availableDocs.includes(req.params.doc + ".md")) {
        const fileData = yield fs_1.default.readFileSync(path_1.default.join(legalDocsPath, req.params.doc + ".md"), "utf-8");
        res.status(200).send(fileData).end();
    }
    else {
        res.status(404).json({ message: "File not found" }).end();
    }
}));
exports.default = router;
