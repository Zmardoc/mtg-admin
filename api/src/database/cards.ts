import { getCollection } from './mongoClient'

const CARDS_COLLECTION = 'cards'

type Card = {
  name: string
  inCollection: number
}

const cardCollection = getCollection<Card>(CARDS_COLLECTION)

async function findCard(name: string) {
  return await cardCollection.findOne({ name })
}

async function findCards(name: string) {
  return (await cardCollection.find({ name }).toArray()) ?? []
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
