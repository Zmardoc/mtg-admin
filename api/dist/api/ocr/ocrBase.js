"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const configEnv_1 = require("../../config/configEnv");
const ocrBase = axios_1.default.create({
    baseURL: configEnv_1.ocrApi,
    headers: {
        'Content-Type': 'multipart/form-data',
        apiKey: configEnv_1.ocrApiKey,
    },
});
exports.default = ocrBase;
//# sourceMappingURL=ocrBase.js.map