import Airtable from 'airtable';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import http from 'https';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

Airtable.configure({
    apiKey: process.env.AIRTABLE_TOKEN,
});

const base = new Airtable.base(process.env.AIRTABLE_BASE);
const savedRecords = [];
const imageList = [];
const imageFolder = './public/images/hotels/'

base('Curated List').select({
    view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {
    records.forEach(function (record) {
        if (record.get('Online')) {
            if (record.get('Image')?.length > 0 && record.get('Image')[0].type === 'image/jpeg') {
                imageList.push({
                    hotel: record.getId(),
                    url: record.get('Image')[0].url,
                    type: record.get('Image')[0].type
                })
                //downloadImage(record.get('Image')[0].url, record.getId())
            }

            savedRecords.push({
                id: record.getId(),
                name: record.get('Name'),
                city: record.get('City'),
                country: record.get('Country'),
                housingType: record.get('Housing Type'),
                vacationType: record.get('Vacation Type'),
                visited: record.get('Last Visit') ? true : false,
                image: record.get('Image')?.length > 0 ? {
                    url: record.getId() + '.jpg',
                    width: record.get('Image')[0].width,
                    height: record.get('Image')[0].height
                } : undefined,
                links: {
                    bookingCom: record.get('Link (Booking.com)'),
                    hotel: record.get('Link (Hotel)')
                }
            })
        }
    });
    fetchNextPage();
}, function done(err) {
    if (err) { console.error(err); return; }

    fs.writeFileSync(
        'data/hotels.json',
        JSON.stringify(savedRecords, null, 2)
    );

    fs.writeFileSync(
        'data/countries.json',
        JSON.stringify(
            savedRecords
                .map(item => item.country)
                .filter(function (x, i, a) {
                    return a.indexOf(x) == i;
                })
                .sort(),
            null, 2)
    );

    imageList.forEach(image => {
        if (!fs.existsSync(imageFolder)) {
            fs.mkdirSync(imageFolder, { recursive: true });
        }
        const file = fs.createWriteStream(imageFolder + image.hotel + '.jpg');
        http.get(image.url, function (response) {
            response.pipe(file);
        });
    })

    console.log('Done, ', savedRecords)
});

