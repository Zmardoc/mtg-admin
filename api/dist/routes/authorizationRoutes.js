"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// #swagger.autoBody=true
const express_1 = require("express");
// TODO swagger description
const authenticateToken_1 = __importDefault(require("../authenticateToken"));
const authorizationService_1 = require("../services/authorizationService");
const router = (0, express_1.Router)();
router.post('/login', async (req, res) => {
    (0, authorizationService_1.login)(req, res);
});
router.get('/login-check', authenticateToken_1.default, (_, res) => {
    (0, authorizationService_1.loginCheck)(res);
});
router.post('/register', async (req, res) => {
    (0, authorizationService_1.register)(req, res);
});
exports.default = router;
//# sourceMappingURL=authorizationRoutes.js.map