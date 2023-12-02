"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorizationRoutes_1 = __importDefault(require("./authorizationRoutes"));
const cardRoutes_1 = __importDefault(require("./cardRoutes"));
const ocrRoutes_1 = __importDefault(require("./ocrRoutes"));
// TODO send error when something occures
function default_1(app) {
    // TODO swagger nedava example
    app.use('/api/authorization', authorizationRoutes_1.default);
    app.use('/api/card', cardRoutes_1.default);
    app.use('/api/ocr', ocrRoutes_1.default);
    app.use(express_1.default.static('public'));
}
exports.default = default_1;
//# sourceMappingURL=routes.js.map