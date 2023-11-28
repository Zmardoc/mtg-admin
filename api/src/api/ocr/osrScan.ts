import ocrBase from './ocrBase'
import { getOcrError, missingOcrImage } from '../../errors'

type TextOverlay = {
  Lines: unknown[]
  HasOverlay: boolean
  Message: string
}
type ParsedResult = {
  TextOverlay: TextOverlay
  TextOrientation: string
  FileParseExitCode: number
  ParsedText: string
  ErrorMessage: string
  ErrorDetails: string
}

type ProcessedImage = {
  ParsedResults: ParsedResult[]
  OCRExitCode: number
  IsErroredOnProcessing: boolean
  ProcessingTimeInMilliseconds: string
  SearchablePDFURL: string
}

async function osrScan(imageBase64: string) {
  if (imageBase64 === '') return missingOcrImage
  try {
    const formData = new FormData()
    formData.append('base64image', imageBase64)
    formData.append('language', 'eng')
    formData.append('detectOrientation', 'true')

    const response = await ocrBase.post<ProcessedImage>('/parse/image', formData)

    return response.data.ParsedResults?.length
      ? response.data.ParsedResults[0].ParsedText.replace(/(\r\n|\n|\r)/gm, '')
      : ''
  } catch (error) {
    return getOcrError(error)
  }
}

export default osrScan
