"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUser = exports.insertUser = void 0;
const mongoClient_1 = require("./mongoClient");
const USERS_COLLECTION = 'users';
const userCollection = (0, mongoClient_1.getCollection)(USERS_COLLECTION);
async function findUser(username) {
    return await userCollection.findOne({ username });
}
exports.findUser = findUser;
async function insertUser(user) {
    const result = await userCollection.insertOne(user);
    return result.insertedId;
}
exports.insertUser = insertUser;
//# sourceMappingURL=users.js.map