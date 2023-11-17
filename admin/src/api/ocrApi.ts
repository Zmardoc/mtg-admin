import { ocrApi } from '@/boot/ocrAxios'
import { fetchFilePost } from './utils'

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

async function ocrPost(url: string, imageDataUrl: string) {
  try {
    if (!process.env.OCR_API_KEY) {
      console.log('No OCR_API_KEY')
      return
    }

    /*  "Parameter name 'file' is invalid. Valid parameters: apikey,url,language,isoverlayrequired,base64image,iscreatesearchablepdf,issearchablepdfhidetextlayer,filetype,addressparsing,scale,detectorientation,istable,ocrengine,detectcheckbox,checkboxtemplate,checkboxtemplateregex",
    "Please check if you need to URL encode the URL passed in request parameters.",
    "Unable to recognize the file type",
    "E216:Unable to detect the file extension, or the file extension is incorrect, and no 'file type' provided in request. Please provide a file with a proper content type or extension, or provide a file type in the request to manually set the file extension."
  ],*/
    const formData = new FormData()
    formData.append('base64image', imageDataUrl)
    formData.append('language', 'eng')

    const result = await fetchFilePost<ProcessedImage>(url, formData, ocrApi)
    return result.ParsedResults?.length
      ? result.ParsedResults[0].ParsedText.replace(/(\r\n|\n|\r)/gm, '')
      : null
  } catch (e) {
    console.error(e)
    throw e
  }
}

export default ocrPost
