import { getCollection } from './mongoClient'

const USERS_COLLECTION = 'users'

type User = {
  _id?: number
  username: string
  password: string
}

const userCollection = getCollection<User>(USERS_COLLECTION)

async function findUser(username: string) {
  return await userCollection.findOne({ username })
}

async function insertUser(user: User) {
  const result = await userCollection.insertOne(user)
  return result.insertedId
}

export { insertUser, findUser }
export type { User }
