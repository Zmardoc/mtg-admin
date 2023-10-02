import axios from 'axios'

const mtgApi = axios.create({
  baseURL: process.env.MTG_API,
})

//TODO osetrit 400,500

async function mtgGet<T>(url: string) {
  try {
    const response = await mtgApi.get<T>(url)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

async function mtgDelete<T>(url: string) {
  try {
    const response = await mtgApi.delete<T>(url)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

async function mtgPost<T>(url: string, data: unknown) {
  try {
    const response = await mtgApi.post<T>(url, data)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export { mtgGet, mtgDelete, mtgPost }
