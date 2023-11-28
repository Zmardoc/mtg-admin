// common type of error response in my app and in scryfall
type ErrorResponse = {
  status: number
  code: string
  details: string
  type?: string | null
  warnings?: string[] | null
  stack?: unknown
}

export type { ErrorResponse }
