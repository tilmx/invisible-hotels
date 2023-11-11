import Airtable from 'airtable';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import http from 'https';
import { getDistance } from 'geolib';

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
                rooms: record.get('Rooms'),
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
                imageCopyright: record.get('Image Copyright'),
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
        JSON.stringify(savedRecords.map(record => {
            return {
                ...record,
                nearby: savedRecords
                    .filter(item => item.id !== record.id)
                    .filter(item => getDistance(
                        { lat: record.coordinates.lat, lon: record.coordinates.long },
                        { lat: item.coordinates.lat, lon: item.coordinates.long },
                        1000
                    ) / 1000 <= 200)
                    .map(item => {
                        return {
                            id: item.id,
                            distance: getDistance(
                                { lat: record.coordinates.lat, lon: record.coordinates.long },
                                { lat: item.coordinates.lat, lon: item.coordinates.long },
                                1000
                            ) / 1000
                        }
                    })
                    .sort((a, b) => a.distance - b.distance)
            }
        }), null, 2)
    );

    fs.writeFileSync(
        'data/hotels-preview.json',
        JSON.stringify([...savedRecords.map(record => {
            return {
                id: record.id,
                name: record.name,
                city: record.city,
                country: record.country,
                housingType: record.housingType,
                vacationType: record.vacationType,
                visited: record.visited,
                coordinates: record.coordinates,
                image: record.images?.at(0),
            }
        })], null, 2)
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

    const onlyHotels = savedRecords.filter(item => item.housingType === "Hotel");
    function calculateRoomCountDistribution(roomCountArray) {
        const roomArray = [];
        roomCountArray.forEach(hotelRooms => {
            var interval = Math.floor(hotelRooms / 10);
            roomArray[interval] = (roomArray[interval] || []).concat(hotelRooms);
        });
        return roomArray.map(element => element.length);
    }

    fs.writeFileSync(
        'data/room-distribution.json',
        JSON.stringify(
            {
                minimum: Math.min(...onlyHotels.map(hotel => hotel.rooms)),
                maximum: Math.max(...onlyHotels.map(hotel => hotel.rooms)),
                distribution: calculateRoomCountDistribution(onlyHotels.map(item => item.rooms))
            },
            null, 2)
    );

    console.log('Done, ', savedRecords, savedRecords.length + ' hotels')
});
