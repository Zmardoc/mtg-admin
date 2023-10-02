//import swaggerAutogen from 'swagger-autogen'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const swaggerAutogen = require('swagger-autogen')()
const outputFile = 'src/swagger_output.json'
const endpointsFiles = ['src/routes/routes.ts']

const port = process.env.PORT ? parseInt(process.env.PORT) : 8000 // TODO env je undefined

const doc = {
  info: {
    version: '1.0.0',
    title: 'Cards API', // by default: 'REST API'
    description: 'A simple Express API', // by default: ''
  },
  host: `${process.env.API}:${port}`,
}

swaggerAutogen(outputFile, endpointsFiles, doc)
