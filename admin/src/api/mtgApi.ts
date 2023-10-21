import { mtgApi } from '@/boot/axios'

async function mtgGet<T>(url: string) {
  try {
    const response = await mtgApi.get<T>(url)
    return response.data
  } catch (e) {
    console.error(e)
    throw e
  }
}

async function mtgDelete<T>(url: string) {
  try {
    const response = await mtgApi.delete<T>(url)
    return response.data
  } catch (e) {
    console.error(e)
    throw e
  }
}

async function mtgPost<T>(url: string, data: unknown) {
  try {
    const response = await mtgApi.post<T>(url, data)
    return response.data
  } catch (e) {
    console.error(e)
    throw e
  }
}

export { mtgGet, mtgDelete, mtgPost }
