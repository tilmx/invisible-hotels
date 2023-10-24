# Invisible Hotels
https://invisible-hotels.com

A list of our favorite lovely & wonderful hotels around the world. The single page application is built with Next.js and Typescript.

### Install
```npm i```

### Run locally
```npm run dev```

### Fetch hotel list from Airtable
Hotel data is stored on private Airtable base and can be retrieved via `npm run fetch-content` which writes the data to a `data/hotels.json` file. Therefore a valid API token has to be included in the `.env.local` file in the root with the API Key and base name.

```
.env.local
AIRTABLE_TOKEN = ...
AIRTABLE_BASE = ...
```
