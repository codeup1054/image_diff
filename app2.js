// 2021-07-16  https://github.com/mapbox/pixelmatch


let date_ob = new Date();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();

// prints time in HH:MM format
const strTime = hours + ":" + minutes+ ":" + seconds;
console.log(strTime);

const express = require('express');
const app = express();
const port = 3000;
// Define the static file path
app.use(express.static(__dirname+'/public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})
app.listen(port, () => console.log('The server running on Port '+port));


const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

const img1 = PNG.sync.read(fs.readFileSync('10255.png'));
const img2 = PNG.sync.read(fs.readFileSync('10255-1.png'));
const {width, height} = img1;
const diff = new PNG({width, height});

pixelmatch(img1.data, img2.data, diff.data, width, height, {threshold: 0.1});

fs.writeFileSync('public/images/diff.png', PNG.sync.write(diff));

