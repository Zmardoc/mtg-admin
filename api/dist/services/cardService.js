"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCard = exports.upsertCard = exports.searchCards = void 0;
const cardSearch_1 = __importDefault(require("../api/scryfall/cardSearch"));
const cards_1 = require("../database/cards");
const errors_1 = require("../errors");
function isSuccessfullResponse(response) {
    return response instanceof Array;
}
async function searchCards(searchQuery, userId) {
    // load all cards from scryfall
    const response = await (0, cardSearch_1.default)(searchQuery);
    if (isSuccessfullResponse(response)) {
        try {
            // find cards in database and join them to scryfall response
            const apiResponse = await Promise.all(response.map(async (card) => {
                var _a;
                if (!userId)
                    return card;
                const foundCard = await (0, cards_1.findCard)(card.frontFace.name, userId);
                return Object.assign(Object.assign({}, card), { inCollection: (_a = foundCard === null || foundCard === void 0 ? void 0 : foundCard.inCollection) !== null && _a !== void 0 ? _a : 0 });
            }));
            return apiResponse;
        }
        catch (error) {
            return (0, errors_1.getUnknownError)(error);
        }
    }
    else {
        return response;
    }
}
exports.searchCards = searchCards;
// TODO dont send res and req to service
//TODO better name for this function
async function upsertCard(req, res) {
    var _a;
    if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id))
        return; // TODO nahovno, uz se to pridava v authenticateToken
    const dbCard = await (0, cards_1.findCard)(req.body.card.frontFace.name, req.user.id);
    const card = Object.assign(Object.assign({}, req.body.card), { inCollection: dbCard ? dbCard.inCollection + 1 : 1, userId: req.user.id });
    dbCard ? (0, cards_1.updateCard)(card) : (0, cards_1.insertCard)(card);
    res.send(card);
}
exports.upsertCard = upsertCard;
async function deleteCard(req, res) {
    var _a;
    if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id))
        return; // TODO nahovno, uz se to pridava v authenticateToken
    const dbCard = await (0, cards_1.findCard)(req.query.name, req.user.id);
    if (!dbCard)
        return;
    const card = Object.assign(Object.assign({}, dbCard), { inCollection: dbCard.inCollection - 1, userId: req.user.id });
    (0, cards_1.updateCard)(card);
    res.send(card);
}
exports.deleteCard = deleteCard;
//# sourceMappingURL=cardService.js.map