import { mtgApi } from '@/boot/axios'
import { fetchDelete, fetchGet, fetchPost } from './utils'

function mtgGet<T>(url: string) {
  try {
    return fetchGet<T>(url, mtgApi)
  } catch (e) {
    console.error(e)
    throw e
  }
}

function mtgDelete<T>(url: string) {
  try {
    return fetchDelete<T>(url, mtgApi)
  } catch (e) {
    console.error(e)
    throw e
  }
}

async function mtgPost<T>(url: string, data: unknown) {
  try {
    return fetchPost<T>(url, data, mtgApi)
  } catch (e) {
    console.error(e)
    throw e
  }
}

export { mtgGet, mtgDelete, mtgPost }
