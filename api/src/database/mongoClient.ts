import { Document, MongoClient } from 'mongodb'
import { connectionString } from '../config/configEnv'

let client: MongoClient
const DB_NAME = 'mtg'

if (connectionString) {
  client = new MongoClient(connectionString, { family: 4 })
} else {
  throw new Error('MONGO_DB env variable is not set')
}

async function openConnection() {
  try {
    await client.connect()
    console.log('Connected successfully to server')
  } catch (error) {
    console.error(error)
  }
}

// collectionName is like table, for example cards
function getCollection<CollectionType extends Document>(collectionName: string) {
  const db = client.db(DB_NAME)
  return db.collection<CollectionType>(collectionName)
}

export { getCollection, openConnection }
