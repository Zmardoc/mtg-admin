import { Document, MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const connectionString = process.env.MONGO_DB
let client: MongoClient

if (connectionString) {
  client = new MongoClient(connectionString, { family: 4 })
} else {
  throw new Error('MONGO_DB env variable is not set')
}

const dbName = 'mtg'

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
  const db = client.db(dbName)
  return db.collection<CollectionType>(collectionName)
}

export { getCollection, openConnection }
