"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCard = exports.updateCard = exports.insertCard = void 0;
const mongoClient_1 = require("./mongoClient");
const CARDS_COLLECTION = 'cards';
const cardCollection = (0, mongoClient_1.getCollection)(CARDS_COLLECTION);
async function findCard(name, userId) {
    return await cardCollection.findOne({ 'frontFace.name': name, userId });
}
exports.findCard = findCard;
async function insertCard(card) {
    await cardCollection.insertOne(card);
    return true;
}
exports.insertCard = insertCard;
async function updateCard(card) {
    await cardCollection.updateOne({ 'frontFace.name': card.frontFace.name }, { $set: card });
    return true;
}
exports.updateCard = updateCard;
//# sourceMappingURL=cards.js.map