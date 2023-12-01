"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ocrBase_1 = __importDefault(require("./ocrBase"));
const errors_1 = require("../../errors");
async function osrScan(imageBase64) {
    var _a;
    if (imageBase64 === '')
        return errors_1.missingOcrImage;
    try {
        const formData = new FormData();
        formData.append('base64image', imageBase64);
        formData.append('language', 'eng');
        formData.append('detectOrientation', 'true');
        const response = await ocrBase_1.default.post('/parse/image', formData);
        return ((_a = response.data.ParsedResults) === null || _a === void 0 ? void 0 : _a.length)
            ? response.data.ParsedResults[0].ParsedText.replace(/(\r\n|\n|\r)/gm, '')
            : '';
    }
    catch (error) {
        return (0, errors_1.getOcrError)(error);
    }
}
exports.default = osrScan;
//# sourceMappingURL=osrScan.js.map