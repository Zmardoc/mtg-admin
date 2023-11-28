import { mtgApi } from '@/boot/axios'

async function fetchGet<T>(url: string, axios = mtgApi) {
  try {
    const response = await axios.get<T>(url)
    return response.data
  } catch (e) {
    console.error(e)
    throw e
  }
}

async function fetchDelete<T>(url: string, axios = mtgApi) {
  try {
    const response = await axios.delete<T>(url)
    return response.data
  } catch (e) {
    console.error(e)
    throw e
  }
}

async function fetchPost<T>(url: string, data: unknown, axios = mtgApi) {
  try {
    const response = await axios.post<T>(url, data)
    return response.data
  } catch (e) {
    console.error(e)
    throw e
  }
}

export { fetchGet, fetchDelete, fetchPost }
