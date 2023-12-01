"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ocrApiKey = exports.ocrApi = exports.connectionString = exports.port = exports.secretKey = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretKey = process.env.API_KEY;
exports.secretKey = secretKey;
const port = process.env.PORT;
exports.port = port;
const connectionString = process.env.MONGO_DB;
exports.connectionString = connectionString;
const ocrApi = process.env.OCR_API;
exports.ocrApi = ocrApi;
const ocrApiKey = process.env.OCR_API_KEY;
exports.ocrApiKey = ocrApiKey;
//# sourceMappingURL=configEnv.js.map