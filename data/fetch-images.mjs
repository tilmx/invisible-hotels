import http from 'https';
import fs from 'fs';
import imageList from './images.json' assert { type: "json" };

const imageFolder = './public/images/hotels/'

imageList.forEach(image => {
    if (!fs.existsSync(imageFolder)) {
        fs.mkdirSync(imageFolder, { recursive: true });
    }
    const file = fs.createWriteStream(imageFolder + image.hotel + '.jpg');
    http.get(image.url, function (response) {
        response.pipe(file);
    });
})
