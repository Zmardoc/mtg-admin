import { Document, MongoClient } from 'mongodb'

const DB_PORT = 27017 //TODO do envu a zprovoznit

const url = `mongodb://localhost:${DB_PORT}`
const client = new MongoClient(url, { family: 4 })

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
