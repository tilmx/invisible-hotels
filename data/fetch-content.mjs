import Airtable from 'airtable';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import http from 'https';

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

Airtable.configure({
    apiKey: process.env.AIRTABLE_TOKEN,
});

const base = new Airtable.base(process.env.AIRTABLE_BASE);
const savedRecords = [];
const imageFolder = './public/images/hotels/'

base('Curated List').select({
    view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {
    records.forEach(function (record) {
        if (record.get('Online')) {
            const onlyFirstImages = record.get('Image')?.slice(0, 3);

            savedRecords.push({
                id: record.get('ID'),
                name: record.get('Name'),
                city: record.get('City'),
                country: record.get('Country'),
                housingType: record.get('Housing Type'),
                vacationType: record.get('Vacation Type'),
                visited: record.get('Last Visit') ? true : false,
                amenities: record.get('Amenities'),
                coordinates: record.get('Coordinates') ? {
                    lat: Number(record.get('Coordinates').split(', ')[0]),
                    long: Number(record.get('Coordinates').split(', ')[1])
                } : undefined,
                images: onlyFirstImages?.map((image, i) => {
                    return {
                        url: record.get('ID') + '-' + i + '.jpg',
                        width: image.width,
                        height: image.height
                    }
                }),
                links: {
                    bookingCom: record.get('Link (Booking.com)'),
                    hotel: record.get('Link (Hotel)')
                }
            })
            onlyFirstImages?.map((image, i) => {
                if (!fs.existsSync(imageFolder)) {
                    fs.mkdirSync(imageFolder, { recursive: true });
                }
                const file = fs.createWriteStream(imageFolder + record.get('ID') + '-' + i + '.jpg');
                http.get(image.url, function (response) {
                    response.pipe(file);
                });
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
    console.log('Done, ', savedRecords, savedRecords.length + ' hotels')
});
