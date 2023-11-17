# Mtg-api (api)

## Install project

1. Create mongoDb
2. Create .env file with `PORT`, `API`, `API_KEY`, `MONGO_DB`

```
PORT=8000
API=http://192.168.1.19
API_KEY=whatever
MONGO_DB=mongodb://localhost:27017
```

3. Install packages

```bash
npm i
```

4. Start server

```bash
npm run dev
```

5. Navigate to swagger and launch `/register` endpoint to add user  
   _You will need at least one user to authorize api requests_

## Start server

Swagger is automaticaly updated, when change occurs

```bash
npm run dev
```

## Swagger

When you modify endpoint, generate OAS automatically via

```bash
npm run swagger-autogen
```

`API:PORT/api`  
http://localhost:8000/api

# Mtg admin (admin)

Admin web for commander decks and card collection

## Install project

1. Create .env file with `MTG_API`

```
MTG_API=http://192.168.1.19:8000
OCR_API=https://api.ocr.space/
OCR_API_KEY=whatever
```

2. Instal packages

```bash
yarn
```

## Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

## Lint the files

```bash
yarn lint
```

## Format the files

```bash
yarn format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
