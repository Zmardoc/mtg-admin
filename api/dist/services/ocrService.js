"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const osrScan_1 = __importDefault(require("../api/ocr/osrScan"));
const errors_1 = require("../errors");
const cardService_1 = require("./cardService");
async function scanCard(imageBase64, userId) {
    const scanResult = await (0, osrScan_1.default)(imageBase64);
    if ((0, errors_1.isError)(scanResult))
        return scanResult;
    const searchResult = await (0, cardService_1.searchCards)(scanResult, userId);
    if ((0, errors_1.isError)(searchResult))
        return searchResult;
    if (!searchResult.length) {
        return null;
    }
    return searchResult[0];
}
exports.default = scanCard;
//# sourceMappingURL=ocrService.js.map