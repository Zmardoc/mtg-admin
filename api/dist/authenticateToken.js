"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configEnv_1 = require("./config/configEnv");
const errors_1 = require("./errors");
function authenticateToken(req, res, next) {
    var _a;
    try {
        if (!configEnv_1.secretKey) {
            (0, errors_1.setError)(res, errors_1.missingSecretEnv);
            return;
        }
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token) {
            (0, errors_1.setError)(res, errors_1.tokenMissing);
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, configEnv_1.secretKey);
        req.user = decoded;
        next();
    }
    catch (err) {
        (0, errors_1.setError)(res, errors_1.notLoggedIn);
    }
}
exports.default = authenticateToken;
//# sourceMappingURL=authenticateToken.js.map