"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// #swagger.autoBody=true
const express_1 = require("express");
const ocrService_1 = __importDefault(require("../services/ocrService"));
const authenticateToken_1 = __importDefault(require("../authenticateToken"));
const router = (0, express_1.Router)();
router.post('/scan', authenticateToken_1.default, async (req, res) => {
    //TODO swagger, better res.send
    var _a;
    const result = await (0, ocrService_1.default)(req.body.imageBase64, (_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    console.log(result);
    res.send(result);
});
exports.default = router;
//# sourceMappingURL=ocrRoutes.js.map