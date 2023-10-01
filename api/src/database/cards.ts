import { getCollection } from './mongoClient'

const CARDS_COLLECTION = 'cards'

type Card = {
  name: string
  inCollection: number
}

const cardCollection = getCollection<Card>(CARDS_COLLECTION)

async function findCard(name: string) {
  const collection = await cardCollection
  return await collection.findOne({ name })
}

async function findCards(name: string) {
  const collection = await cardCollection
  return (await collection.find({ name }).toArray()) ?? []
}

async function insertCard(card: Card) {
  const collection = await cardCollection
  await collection.insertOne(card)
}

async function updateCard(card: Card) {
  const collection = await cardCollection
  collection.updateOne({ name: card.name }, { $set: card })
}

export { findCards, insertCard, updateCard, findCard }

export type { Card }
