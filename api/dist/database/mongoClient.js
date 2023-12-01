"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openConnection = exports.getCollection = void 0;
const mongodb_1 = require("mongodb");
const configEnv_1 = require("../config/configEnv");
let client;
const DB_NAME = 'mtg';
if (configEnv_1.connectionString) {
    client = new mongodb_1.MongoClient(configEnv_1.connectionString, { family: 4 });
}
else {
    throw new Error('MONGO_DB env variable is not set');
}
async function openConnection() {
    try {
        await client.connect();
        console.log('Connected successfully to server');
    }
    catch (error) {
        console.error(error);
    }
}
exports.openConnection = openConnection;
// collectionName is like table, for example cards
function getCollection(collectionName) {
    const db = client.db(DB_NAME);
    return db.collection(collectionName);
}
exports.getCollection = getCollection;
//# sourceMappingURL=mongoClient.js.map