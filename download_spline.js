
import fs from 'fs';
import https from 'https';
import path from 'path';

const url = "https://prod.spline.design/MpY2VNloeC1MGMdV/scene.splinecode";
const dest = path.join(process.cwd(), "public", "scene.splinecode");

const file = fs.createWriteStream(dest);
https.get(url, function (response) {
    response.pipe(file);
    file.on('finish', function () {
        file.close(() => console.log('Download completed.'));
    });
}).on('error', function (err) {
    fs.unlink(dest);
    console.error('Error downloading file:', err.message);
});
