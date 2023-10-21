
import Airtable from 'airtable';
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

Airtable.configure({
    apiKey: process.env.AIRTABLE_TOKEN,
});

const base = new Airtable.base(process.env.AIRTABLE_BASE);
const savedRecords = [];

base('Curated List').select({
    view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {
    records.forEach(function (record) {
        savedRecords.push({
            name: record.get('Name'),
            city: record.get('City'),
            country: record.get('Country'),
            housingType: record.get('Housing Type'),
            vacationType: record.get('Vacation Type'),
            link: record.get('Link')
        })
    });
    fetchNextPage();
}, function done(err) {
    if (err) { console.error(err); return; }
    fs.writeFileSync(
        'data/hotels.json',
        JSON.stringify(savedRecords, null, 2)
    );
    console.log('done,', savedRecords)
});