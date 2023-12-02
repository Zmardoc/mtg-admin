"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// #swagger.autoBody=true
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const authenticateToken_1 = __importDefault(require("../authenticateToken"));
const cardService_1 = require("../services/cardService");
const router = (0, express_1.Router)();
// TODO better send acording to service result
router.get('/search', authenticateToken_1.default, (0, express_validator_1.query)('q').isString(), async (req, res) => {
    var _a;
    /*#swagger.tags = ['Cards search']
      #swagger.parameters['q'] = {
        schema: {
          $q: 'Counterspell'
        }
    } */
    const result = await (0, cardService_1.searchCards)(req.query.q, (_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    res.send(result);
});
router.post('/upsert', authenticateToken_1.default, (req, res) => {
    /*#swagger.tags = ['Cards']
      #swagger.parameters['card'] = {
        in: 'body',
        schema: {
          $name: 'Vizzedrix'
        }
    } */
    (0, cardService_1.upsertCard)(req, res);
});
router.delete('/', [authenticateToken_1.default, (0, express_validator_1.query)('name').isString()], (req, res) => {
    /*#swagger.tags = ['Cards remove from collection']
      #swagger.parameters['name'] = {
        schema: {
          $name: 'Counterspell'
        }
    } */
    (0, cardService_1.deleteCard)(req, res);
});
exports.default = router;
//# sourceMappingURL=cardRoutes.js.map