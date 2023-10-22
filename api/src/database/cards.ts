import { getCollection } from './mongoClient'

const CARDS_COLLECTION = 'cards'

type Card = {
  name: string
  inCollection: number
  userId: string
}

const cardCollection = getCollection<Card>(CARDS_COLLECTION)

async function findCard(name: string, userId: string) {
  return await cardCollection.findOne({ name, userId })
}

async function findCards(name: string, userId: string) {
  return (await cardCollection.find({ name, userId }).toArray()) ?? []
}

async function insertCard(card: Card) {
  await cardCollection.insertOne(card)
  return true
}

async function updateCard(card: Card) {
  await cardCollection.updateOne({ name: card.name }, { $set: card })
  return true
}

export { findCards, insertCard, updateCard, findCard }

export type { Card }
