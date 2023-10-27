/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const swaggerAutogen = require('swagger-autogen')() //TODO opravit js na ts
const outputFile = 'src/swagger_output.json'
const endpointsFiles = ['src/routes/routes.ts'] //, 'src/routes/authenticateRoutes.ts'

const doc = {
  info: {
    version: '1.0.0',
    title: 'Cards API', // by default: 'REST API'
    description: 'A simple Express API', // by default: ''
  },
  host: `${process.env.API}:${process.env.PORT}`,
}

swaggerAutogen(outputFile, endpointsFiles, doc)
