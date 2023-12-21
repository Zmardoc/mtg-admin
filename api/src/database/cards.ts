import { ApiCard } from '../api/scryfall/cardSearch'
import { getCollection } from './mongoClient'

const CARDS_COLLECTION = 'cards'

const cardCollection = getCollection<ApiCard>(CARDS_COLLECTION)

async function findCard(name: string, userId: string) {
  return await cardCollection.findOne({ 'frontFace.name': name, userId })
}

async function insertCard(card: ApiCard) {
  await cardCollection.insertOne(card)
  return true
}

async function updateCard(card: ApiCard) {
  await cardCollection.updateOne({ 'frontFace.name': card.frontFace.name }, { $set: card })
  return true
}

export { insertCard, updateCard, findCard }
