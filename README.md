# Invisible Hotels
https://invisiblehotels.com

A list of our favorite lovely & wonderful hotels around the world. The single page application is built with Next.js and Typescript.

### Install
```npm i```

### Run locally
```npm run dev```

Hotel data is stored on Airtable and can be retrieved via `npm run fetch-content`. Therefore a valid API token has to be included in the `.env.local` file in the root with the API Key and base name:

```
AIRTABLE_TOKEN = ...
AIRTABLE_BASE = ...
```
