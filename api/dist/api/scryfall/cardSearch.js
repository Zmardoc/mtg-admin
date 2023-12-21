"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sryfallBase_1 = __importDefault(require("./sryfallBase"));
function getFrontFace(card) {
    var _a, _b, _c, _d, _e, _f;
    if (card.card_faces && !card.image_uris) {
        return Object.assign(Object.assign({}, card), { name: card.card_faces[0].name, imageUrl: (_b = (_a = card.card_faces[0].image_uris) === null || _a === void 0 ? void 0 : _a.normal) !== null && _b !== void 0 ? _b : null, oracleText: (_c = card.card_faces[0].oracle_text) !== null && _c !== void 0 ? _c : null });
    }
    return Object.assign(Object.assign({}, card), { name: card.name, imageUrl: (_e = (_d = card.image_uris) === null || _d === void 0 ? void 0 : _d.normal) !== null && _e !== void 0 ? _e : null, oracleText: (_f = card.oracle_text) !== null && _f !== void 0 ? _f : null });
}
function getBackFace(card) {
    var _a, _b, _c;
    if (!(card.card_faces && !card.image_uris))
        return null;
    return Object.assign(Object.assign({}, card), { name: card.card_faces[1].name, imageUrl: (_b = (_a = card.card_faces[1].image_uris) === null || _a === void 0 ? void 0 : _a.normal) !== null && _b !== void 0 ? _b : null, oracleText: (_c = card.card_faces[1].oracle_text) !== null && _c !== void 0 ? _c : null });
}
function convertToApi(cards) {
    return cards.map((card) => ({
        id: card.id,
        frontFace: getFrontFace(card),
        backFace: getBackFace(card),
        inCollection: 0,
        prices: card.prices,
    }));
}
function successfullResponse(response) {
    return response.status === 200;
}
async function cardSearch(query) {
    if (query === '')
        return [];
    try {
        const response = await sryfallBase_1.default.get(`/cards/search?q=${query}`);
        if (successfullResponse(response)) {
            return response.data ? convertToApi(response.data.data) : [];
        }
        else {
            return response.data;
        }
    }
    catch (error) {
        return {
            status: 500,
            code: 'scryfall_server_error',
            details: 'Something went wrong on my poor, poor server when calling scryfall api.',
            stack: error,
        };
    }
}
exports.default = cardSearch;
//# sourceMappingURL=cardSearch.js.map